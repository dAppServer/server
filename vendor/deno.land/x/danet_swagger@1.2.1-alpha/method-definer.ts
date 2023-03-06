import { Swagger } from './swagger.ts';
import { Constructor } from './mod.ts';
import { OPTIONAL_KEY, RETURNED_TYPE_KEY, TAGS_KEY } from './decorators.ts';
import { RequestBodyBuilder, ResponseBuilder } from './builder.ts';
import DataType = Swagger.DataType;
import Path = Swagger.Path;
import Operation = Swagger.Operation;
import Schema = Swagger.Schema;
import { BODY_TYPE_KEY, MetadataHelper, pathToRegexp, QUERY_TYPE_KEY, trimSlash } from './deps.ts';
import Parameter = Swagger.Parameter;

export class MethodDefiner {
	private pathKey: string;
	private readonly httpMethod: keyof Path;
	private readonly pathUrl: string;
	private pathTokens: pathToRegexp.Token[] = [];
	private containsUrlParams = false;
	private schemas: { [key: string]: Schema } = {};
	constructor(private Controller: Constructor, private methodName: string) {
		this.pathKey = trimSlash(
			MetadataHelper.getMetadata<string>('endpoint', Controller),
		);
		this.httpMethod = MetadataHelper.getMetadata<string>(
			'method',
			Controller.prototype[methodName],
		).toLowerCase() as keyof Path;
		const urlPath = trimSlash(
			MetadataHelper.getMetadata<string>(
				'endpoint',
				Controller.prototype[methodName],
			),
		);
		this.pathUrl = urlPath ? `/${this.pathKey}/${urlPath}` : `/${this.pathKey}`;
		this.pathUrl = this.getPathTokenAndTransformUrl(this.pathUrl);
	}

	public addMethodDefinitionToActual(
		paths: { [p: string]: Path },
		schemas: { [p: string]: Schema },
	) {
		paths = this.addActualMethodPath(paths);
		const actualPath = (paths[this.pathUrl][this.httpMethod] as Operation);
		this.addTags(actualPath);
		this.addUrlParams(actualPath);
		this.addQueryParams(actualPath);
		this.addResponse(actualPath);
		this.addRequestBody(actualPath);
		schemas = {
			...schemas,
			...this.schemas,
		};

		return {
			schemas,
			paths,
		};
	}

	private addTags(actuaPath: Operation) {
		const controllerTag = MetadataHelper.getMetadata<string>(
			TAGS_KEY,
			this.Controller,
		);
		const methodTag = MetadataHelper.getMetadata<string>(
			TAGS_KEY,
			this.Controller.prototype,
			this.methodName,
		);
		if (controllerTag || methodTag) {
			actuaPath.tags = [controllerTag, methodTag].filter((t) => !!t);
		}
	}

	private addUrlParams(actualPath: Operation) {
		if (this.containsUrlParams && !actualPath.parameters) {
			actualPath.parameters = [];
		}
		for (const item of this.pathTokens) {
			if (typeof item === 'string') continue;
			actualPath.parameters!.push({
				name: `${item.name}`,
				in: 'path',
				description: '',
				required: true,
				schema: {
					type: 'string',
				},
			});
		}
	}

	private addQueryParams(actualPath: Operation) {
		const queryType = MetadataHelper.getMetadata(
			QUERY_TYPE_KEY,
			this.Controller.prototype,
			this.methodName,
		) as Constructor;
		if (queryType) {
			if (!actualPath.parameters) {
				actualPath.parameters = [];
			}
			this.generateTypeSchema(queryType);
			const emptyInstance = Reflect.construct(queryType, []);
			Object.getOwnPropertyNames(emptyInstance).forEach((propertyName) => {
				const typeFunction = MetadataHelper.getMetadata(
					'design:type',
					queryType.prototype,
					propertyName,
				) as Constructor<any>;
				const isOptional = !MetadataHelper.getMetadata(
					OPTIONAL_KEY,
					queryType.prototype,
					propertyName,
				) as boolean;
				if (typeFunction) {
					const propertyType = typeFunction;
					const propertyTypeName = propertyType.name;
					const paramToAdd: Partial<Parameter> = {
						name: `${propertyName}`,
						in: 'query',
						description: '',
						required: isOptional,
					};
					if ([ 'string', 'number' ].includes(propertyTypeName.toLowerCase())) {
						paramToAdd.schema = {
							type: propertyTypeName.toLowerCase() as DataType,
						};
					} else {
						this.generateTypeSchema(propertyType);
						paramToAdd.schema = {
							$ref: `#/components/schemas/${propertyTypeName}`,
						};
					}
					actualPath.parameters!.push(paramToAdd as Parameter);
				}
			});
		}
	}

	private getPathTokenAndTransformUrl(urlPath: string) {
		let pathWithParams = '';
		this.pathTokens = pathToRegexp.parse(urlPath);
		for (const item of this.pathTokens) {
			if (typeof item === 'string') {
				pathWithParams += item;
			} else {
				this.containsUrlParams = true;
				pathWithParams += `${item.prefix}{${item.name}}`;
			}
		}
		return pathWithParams;
	}

	private addActualMethodPath(paths: { [p: string]: Path }) {
		return {
			...paths,
			[this.pathUrl]: {
				...paths[this.pathUrl],
				[this.httpMethod]: {
					operationId: this.methodName,
					responses: {
						200: {
							description: '',
						},
					},
				},
			},
		};
	}

	private addResponse(actualPath: Operation) {
		const returnedValue = MetadataHelper.getMetadata(
			RETURNED_TYPE_KEY,
			this.Controller.prototype,
			this.methodName,
		) as {
			returnedType: Constructor,
			isArray: boolean | undefined
		};
		if (returnedValue) {
			this.generateTypeSchema(returnedValue.returnedType);
			if (returnedValue.isArray) {
				actualPath.responses[200] = new ResponseBuilder().jsonContent({
					type: 'array',
					items : {
						'$ref': `#/components/schemas/${returnedValue.returnedType.name}`
					},
				}).setDescription('').get();
			} else {
				actualPath.responses[200] = new ResponseBuilder().jsonContent({
					'$ref': `#/components/schemas/${returnedValue.returnedType.name}`,
				}).setDescription('').get();
			}
		}
		return null;
	}

	private addRequestBody(actualPath: Operation) {
		const bodyType = MetadataHelper.getMetadata(
			BODY_TYPE_KEY,
			this.Controller.prototype,
			this.methodName,
		) as Constructor;
		if (bodyType) {
			actualPath.requestBody = new RequestBodyBuilder().jsonContent({
				'$ref': `#/components/schemas/${bodyType.name}`,
			}).setDescription('').get();
			this.generateTypeSchema(bodyType);
		}
		return null;
	}

	private generateTypeSchema(Type: Constructor<any>) {
		const emptyInstance = Reflect.construct(Type, []);
		const name = Type.name;
		const schema: {
			[key: string]: Swagger.Schema;
		} = {
			[Type.name]: {
				properties: {},
			},
		};
		Object.getOwnPropertyNames(emptyInstance).forEach((propertyName) => {
			if (schema && schema[name] && schema[name].properties) {
				const typeFunction = MetadataHelper.getMetadata(
					'design:type',
					Type.prototype,
					propertyName,
				) as Function;
				if (typeFunction) {
					const propertyType = typeFunction.name;
					if ([ 'string', 'number' ].includes(propertyType.toLowerCase())) {
						schema![name]!.properties![propertyName] = {
							type: propertyType.toLowerCase() as DataType,
						};
					} else {
						schema![name]!.properties![propertyName] = {
							$ref: `#/components/schemas/${propertyType}`,
						};
					}
				}
			}
		});

		this.schemas = {
			...this.schemas,
			...schema,
		};
	}
}
