// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Swagger {
	export type DataType =
		| 'integer'
		| 'number'
		| 'boolean'
		| 'string'
		| 'array'
		| 'object'
		| 'file'
		| 'undefined';

	export type DataFormat =
		| 'int32'
		| 'int64'
		| 'float'
		| 'double'
		| 'byte'
		| 'binary'
		| 'date'
		| 'date-time'
		| 'password';

	export type Protocol = 'http' | 'https' | 'ws' | 'wss';

	export type SupportedSpecMajorVersion = 3;

	export interface Spec {
		info: Info;
		tags?: Tag[];
		externalDocs?: ExternalDocs;
		openapi: '3.0.3';
		servers: Server[];
		components: Components;
		paths: { [name: string]: Path };
		security?: SecurityRequirementObject;
	}

	export type SecurityRequirementObject = Record<string, string[]>;

	export interface Components {
		callbacks?: { [name: string]: unknown };
		examples?: { [name: string]: Example | string };
		headers?: { [name: string]: unknown };
		links?: { [name: string]: unknown };
		parameters?: { [name: string]: Parameter };
		requestBodies?: { [name: string]: unknown };
		responses?: { [name: string]: Response };
		schemas?: { [name: string]: Schema };
		securitySchemes?: { [name: string]: SecurityScheme };
	}

	export interface Server {
		url: string;
		description?: string;
		variables?: Record<string, ServerVariable>;
	}

	export interface ServerVariable {
		enum?: string[] | boolean[] | number[];
		default: string | boolean | number;
		description?: string;
	}

	export interface Info {
		title: string;
		version?: string;
		description?: string;
		termsOfService?: string;
		contact?: Contact;
		license?: License;
	}

	export interface Contact {
		name?: string;
		email?: string;
		url?: string;
	}

	export interface License {
		name: string;
		url?: string;
	}

	export interface ExternalDocs {
		url: string;
		description?: string;
	}

	export interface Tag {
		name: string;
		description?: string;
		externalDocs?: ExternalDocs;
	}

	export interface Example {
		value: unknown;
		summary?: string;
		description?: string;
	}

	export interface BaseParameter extends Omit<Schema, 'required'> {
		name: string;
		in: 'query' | 'header' | 'path' | 'formData' | 'body';
		required?: boolean;
		description?: string;
		example?: unknown;
		examples?: { [name: string]: Example | string };
		schema: Schema;
		format?: DataFormat;
		deprecated?: boolean;
	}

	export interface BodyParameter extends BaseParameter {
		in: 'body';
	}

	export interface QueryParameter extends BaseParameter {
		in: 'query';
		allowEmptyValue?: boolean;
		collectionFormat?: 'csv' | 'ssv' | 'tsv' | 'pipes' | 'multi';
	}

	export function isQueryParameter(
		parameter: BaseParameter,
	): parameter is QueryParameter {
		return parameter.in === 'query';
	}

	export interface PathParameter extends BaseParameter {
		in: 'path';
	}

	export interface HeaderParameter extends BaseParameter {
		in: 'header';
	}

	export interface FormDataParameter extends BaseParameter {
		in: 'formData';
		collectionFormat?: 'csv' | 'ssv' | 'tsv' | 'pipes' | 'multi';
	}

	export type Parameter =
		| BodyParameter
		| FormDataParameter
		| QueryParameter
		| PathParameter
		| HeaderParameter;

	export interface Path {
		$ref?: string;
		get?: Operation;
		put?: Operation;
		post?: Operation;
		delete?: Operation;
		options?: Operation;
		head?: Operation;
		patch?: Operation;
		parameters?: Parameter[];
	}

	export interface Operation {
		tags?: string[];
		summary?: string;
		description?: string;
		externalDocs?: ExternalDocs;
		operationId: string;
		consumes?: string[];
		parameters?: Parameter[];
		responses: { [name: string]: Response };
		schemes?: Protocol[];
		deprecated?: boolean;
		security?: SecurityRequirementObject[];
		requestBody?: RequestBody;

		[ext: `x-${string}`]: unknown;
	}

	export interface RequestBody {
		content: { [requestMediaType: string]: MediaType };
		description?: string;
		required?: boolean;
	}

	export interface MediaType {
		schema?: Schema;
		example?: unknown;
		examples?: { [name: string]: Example | string };
		encoding?: { [name: string]: unknown };
	}

	export interface Response {
		description: string;
		content?: {
			[responseMediaType: string]: {
				schema: Schema;
				examples?: { [name: string]: Example | string };
			};
		};
		headers?: { [name: string]: Header };
	}

	export class Schema {
		type?: DataType;
		nullable?: boolean;
		anyOf?: Schema[];
		allOf?: Schema[];
		deprecated?: boolean;
		format?: DataFormat;
		additionalProperties?: boolean | Schema;
		properties?: { [propertyName: string]: Schema };
		discriminator?: string;
		readOnly?: boolean;
		xml?: XML;
		externalDocs?: ExternalDocs;
		example?: unknown;
		required?: string[];
		$ref?: string;
		title?: string;
		description?: string;
		default?: string | boolean | number | unknown;
		multipleOf?: number;
		maximum?: number;
		exclusiveMaximum?: number;
		minimum?: number;
		exclusiveMinimum?: number;
		maxLength?: number;
		minLength?: number;
		pattern?: string;
		maxItems?: number;
		minItems?: number;
		uniqueItems?: boolean;
		maxProperties?: number;
		minProperties?: number;
		enum?: Array<boolean | string | number | null>;
		'x-enum-varnames'?: string[];
		items?: Schema;
		[ext: `x-${string}`]: unknown;
	}

	export interface Header extends Omit<Schema, 'required'> {
		required?: boolean;
		description?: string;
		example?: unknown;
		examples?: {
			[name: string]: Example | string;
		};
		schema: Schema;
		type?: DataType;
		format?: DataFormat;
	}

	export interface XML {
		type?: string;
		namespace?: string;
		prefix?: string;
		attribute?: string;
		wrapped?: boolean;
	}

	export type SecuritySchemeType =
		| 'apiKey'
		| 'http'
		| 'oauth2'
		| 'openIdConnect';

	export interface SecurityScheme {
		type: SecuritySchemeType;
		description?: string;
		name?: string;
		in?: string;
		scheme?: string;
		bearerFormat?: string;
		flows?: OAuthFlows;
		openIdConnectUrl?: string;
	}

	export interface OAuthFlows {
		implicit?: OAuthFlow;
		password?: OAuthFlow;
		clientCredentials?: OAuthFlow;
		authorizationCode?: OAuthFlow;
	}

	export interface OAuthFlow {
		authorizationUrl?: string;
		tokenUrl?: string;
		refreshUrl?: string;
		scopes: ScopesObject;
	}

	export type ScopesObject = Record<string, any>;
}
