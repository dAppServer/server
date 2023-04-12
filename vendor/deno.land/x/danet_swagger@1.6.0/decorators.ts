import { BODY_TYPE_KEY, MetadataHelper, QUERY_TYPE_KEY } from './deps.ts';
import { Constructor } from './mod.ts';
import { Swagger } from "./swagger.ts";

export const API_PROPERTY = 'api-property';

export const ApiProperty = (property?: Swagger.Schema) =>
(
	// deno-lint-ignore ban-types
	target: Object,
	propertyKey: string | symbol,
) => {
	MetadataHelper.setMetadata(API_PROPERTY, property ?? null, target, propertyKey);
};

export const OPTIONAL_KEY = 'optional';

export const Optional = () =>
(
	// deno-lint-ignore ban-types
	target: Object,
	propertyKey: string | symbol,
) => {
	MetadataHelper.setMetadata(OPTIONAL_KEY, true, target, propertyKey);
};

export const RETURNED_TYPE_KEY = 'returntype';

export const ReturnedType = (returnedType: unknown, isArray?: boolean) =>
(
	target: Object,
	propertyKey: string | symbol,
	descriptor: any,
) => {
	MetadataHelper.setMetadata(
		RETURNED_TYPE_KEY,
		{
			returnedType,
			isArray,
		},
		target,
		propertyKey,
	);
};

export const BodyType = (type: Constructor) =>
(
	target: Object,
	propertyKey: string | symbol,
) => {
	MetadataHelper.setMetadata(BODY_TYPE_KEY, type, target, propertyKey);
};

export const QueryType = (type: Constructor) =>
(
	target: Object,
	propertyKey: string | symbol,
) => {
	MetadataHelper.setMetadata(QUERY_TYPE_KEY, type, target, propertyKey);
};

export const TAGS_KEY = 'tags';

export const Tag = (tagName: string) =>
(
	target: Object,
	propertyKey?: string | symbol,
	descriptor?: PropertyDescriptor,
) => {
	if (propertyKey) {
		MetadataHelper.setMetadata(TAGS_KEY, tagName, target, propertyKey);
	} else {
		MetadataHelper.setMetadata(TAGS_KEY, tagName, target);
	}
};

export const API_SECURITY = 'api-security';
export const API_SECURITY_DATA = 'api-security-data';

export const ApiBasicAuth = () => ApiSecurity('basic')
export const ApiBearerAuth = () => ApiSecurity('bearer')
export const ApiCookieAuth = () => ApiSecurity('cookie')
export const ApiOAuth2 = (data: string[]) => ApiSecurity('oauth2', data)

export const ApiSecurity = (name: string, data: string[] = []) =>
	(
		// deno-lint-ignore ban-types
		target: Object,
		propertyKey?: string | symbol,
		descriptor?: PropertyDescriptor,
	) => {
		if (propertyKey) {
			MetadataHelper.setMetadata(API_SECURITY, {
				[name]: data
			}, target, propertyKey);
		} else {
			MetadataHelper.setMetadata(API_SECURITY, {
				[name]: data
			}, target);
		}
	};