import { Swagger } from './swagger.ts';
import { Constructor } from './mod.ts';
import { API_PROPERTY, API_SECURITY, OPTIONAL_KEY, RETURNED_TYPE_KEY, TAGS_KEY } from './decorators.ts';
import { RequestBodyBuilder, ResponseBuilder } from './builder.ts';
import DataType = Swagger.DataType;
import DataFormat = Swagger.DataFormat;
import Path = Swagger.Path;
import Operation = Swagger.Operation;
import Schema = Swagger.Schema;
import {
	BODY_TYPE_KEY,
	MetadataHelper,
	pathToRegexp,
	QUERY_TYPE_KEY,
	trimSlash,
} from './deps.ts';
import Parameter = Swagger.Parameter;

const primitiveTypes = [
	'string',
	'number',
	'boolean',
	'date',
	'object',
	'array',
];

function isPrimitive(type: string) {
	return primitiveTypes.includes(type);
}

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
		this.addSecurity(actualPath);
		schemas = {
			...schemas,
			...this.schemas,
		};

		return {
			schemas,
			paths,
		};
	}

	private addSecurity(actualPath: Operation) {
		const controllerSecurity = MetadataHelper.getMetadata<Record<string, string[]>>(
			API_SECURITY,
			this.Controller,
		);
		const methodSecurity = MetadataHelper.getMetadata<Record<string, string[]>>(
			API_SECURITY,
			this.Controller.prototype,
			this.methodName,
		);
		if (methodSecurity || controllerSecurity) {
			actualPath.security = [];
			if (methodSecurity) {
				actualPath.security.push(methodSecurity)
			}
			if (controllerSecurity) {
				actualPath.security.push(controllerSecurity)
			}
			actualPath.security = [...new Map(actualPath.security.map(v => [JSON.stringify(v), v])).values()]
		}
	}
	private addTags(actualPath: Operation) {
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
			actualPath.tags = [controllerTag, methodTag].filter((t) => !!t);
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
				const isRequired = !MetadataHelper.getMetadata(
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
						required: isRequired,
					};
					if (isPrimitive(propertyTypeName.toLowerCase())) {
						paramToAdd.schema = this.getPropertyType(
							propertyTypeName.toLowerCase(),
						);
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

	private getPropertyType(propertyType: string) {
		if (propertyType === 'date') {
			return {
				type: 'string' as DataType,
				format: 'date-time' as DataFormat,
			};
		} else {
			return {
				type: propertyType as DataType,
			};
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
			returnedType: Constructor;
			isArray: boolean | undefined;
		};
		if (returnedValue) {
			if (isPrimitive(returnedValue.returnedType.name.toLowerCase())) {
				if (returnedValue.isArray) {
					actualPath.responses[200] = new ResponseBuilder().jsonContent({
						type: 'array',
						items: {
							type: returnedValue.returnedType.name.toLowerCase() as DataType,
						},
					}).setDescription('').get();
				} else {
					actualPath.responses[200] = new ResponseBuilder().jsonContent({
						type: returnedValue.returnedType.name.toLowerCase() as DataType,
					}).setDescription('').get();
				}
			} else {
				if (returnedValue.isArray) {
					actualPath.responses[200] = new ResponseBuilder().jsonContent({
						type: 'array',
						items: {
							'$ref': `#/components/schemas/${returnedValue.returnedType.name}`,
						},
					}).setDescription('').get();
				} else {
					actualPath.responses[200] = new ResponseBuilder().jsonContent({
						'$ref': `#/components/schemas/${returnedValue.returnedType.name}`,
					}).setDescription('').get();
				}
				this.generateTypeSchema(returnedValue.returnedType);
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
				const isOptional = !!(MetadataHelper.getMetadata(
					OPTIONAL_KEY,
					Type.prototype,
					propertyName,
				) as boolean);
				const attributesProperties = MetadataHelper.getMetadata(
					API_PROPERTY,
					Type.prototype,
					propertyName,
				);
				if (typeFunction) {
					const propertyType = typeFunction.name;
					if (isPrimitive(propertyType.toLowerCase())) {
						schema![name]!.properties![propertyName] = this.getPropertyType(
							propertyType.toLowerCase(),
						);
					} else {
						schema![name]!.properties![propertyName] = {
							$ref: `#/components/schemas/${propertyType}`,
						};
					}
					if (!isOptional) {
						if (!(schema![name]!.required)) {
							schema![name]!.required = [];
						}
						schema![name]!.required!.push(propertyName);
					}
					if (attributesProperties) {
						schema![name]!.properties![propertyName] = {
							...schema![name]!.properties![propertyName],
							...attributesProperties,
						}
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
