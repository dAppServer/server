import { Swagger } from './swagger.ts';
import RequestBody = Swagger.RequestBody;
import Schema = Swagger.Schema;
import Response = Swagger.Response;
import Header = Swagger.Header;

import ServerVariable = Swagger.ServerVariable;
import SecurityRequirementObject = Swagger.SecurityRequirementObject;

export class RequestBodyBuilder {
	private requestBody: RequestBody = {
		content: {},
		required: true,
	};
	jsonContent(schema: Schema) {
		this.requestBody.content = {
			'application/json': {
				schema,
			},
		};
		return this;
	}

	setDescription(description: string) {
		this.requestBody.description = description;
		return this;
	}

	get() {
		return { ...this.requestBody };
	}
}

export class ResponseBuilder {
	private response: Response = {
		description: '',
	};

	jsonContent(schema: Schema) {
		this.response.content = {
			'application/json': {
				schema,
			},
		};
		return this;
	}

	setDescription(description: string) {
		this.response.description = description;
		return this;
	}

	setHeader(headers: { [name: string]: Header }) {
		this.response.headers = headers;
		return this;
	}

	get() {
		return this.response;
	}
}

export class SpecBuilder {
	private spec: Swagger.Spec = {
		info: {
			title: '',
		},
		tags: [],
		servers: [],
		openapi: '3.0.3',
		components: {},
		paths: {},
	};

	public setTitle(title: string): this {
		this.spec.info.title = title;
		return this;
	}

	public setDescription(description: string): this {
		this.spec.info.description = description;
		return this;
	}

	public setVersion(version: string): this {
		this.spec.info.version = version;
		return this;
	}

	public setTermsOfService(termsOfService: string): this {
		this.spec.info.termsOfService = termsOfService;
		return this;
	}

	public setContact(name: string, url: string, email: string): this {
		this.spec.info.contact = { name, url, email };
		return this;
	}

	public setLicense(name: string, url: string): this {
		this.spec.info.license = { name, url };
		return this;
	}

	public addServer(
		url: string,
		description?: string,
		variables?: Record<string, ServerVariable>,
	): this {
		this.spec.servers.push({ url, description, variables });
		return this;
	}

	public setExternalDoc(description: string, url: string): this {
		this.spec.externalDocs = { description, url };
		return this;
	}

	public addTag(
		name: string,
		description = '',
		externalDocs?: Swagger.ExternalDocs,
	): this {
		const tag: Swagger.Tag = {
			name,
			description,
		};
		if (externalDocs) {
			tag.externalDocs = externalDocs;
		}
		this.spec.tags!.push(tag);
		return this;
	}

	public addSecurity(name: string, options: Swagger.SecurityScheme): this {
		this.spec.components.securitySchemes = {
			...this.spec.components.securitySchemes,
			[name]: options,
		};
		return this;
	}

	public addSecurityRequirements(
		name: string | SecurityRequirementObject,
		requirements: string[] = [],
	): this {
		let securityRequirement: SecurityRequirementObject;

		if (typeof name === 'string') {
			securityRequirement = { [name]: requirements };
		} else {
			securityRequirement = name;
		}

		this.spec.security = {
			...this.spec.security,
			...securityRequirement,
		};
		return this;
	}

	public addBearerAuth(
		options: Partial<Swagger.SecurityScheme> = {
			type: 'http',
		},
		name = 'bearer',
	): this {
		this.addSecurity(name, {
			...options,
			scheme: 'bearer',
			bearerFormat: 'JWT',
		} as Swagger.SecurityScheme);
		return this;
	}

	public addOAuth2(
		options: Partial<Swagger.SecurityScheme> = {
			type: 'oauth2',
		},
		name = 'oauth2',
	): this {
		this.addSecurity(name, {
			...options,
			type: 'oauth2',
			flows: {
				implicit: {
					scopes: {},
				},
			},
		});
		return this;
	}

	public addApiKey(
		options: Partial<Swagger.SecurityScheme> = {
			type: 'apiKey',
		},
		name = 'api_key',
	): this {
		this.addSecurity(name, {
			...options,
			type: 'apiKey',
			in: 'header',
			name,
		});
		return this;
	}

	public addBasicAuth(
		options: Partial<Swagger.SecurityScheme> = {
			type: 'http',
		},
		name = 'basic',
	): this {
		this.addSecurity(name, {
			...options,
			type: 'http',
			scheme: 'basic',
		});
		return this;
	}

	public addCookieAuth(
		cookieName = 'connect.sid',
		options: Partial<Swagger.SecurityScheme> = {
			type: 'apiKey',
		},
		securityName = 'cookie',
	): this {
		this.addSecurity(securityName, {
			...options,
			type: 'apiKey',
			in: 'cookie',
			name: cookieName,
		});
		return this;
	}

	public build() {
		return this.spec;
	}
}
