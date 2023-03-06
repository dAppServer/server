import { BODY_TYPE_KEY, MetadataHelper, QUERY_TYPE_KEY } from './deps.ts';
import { Constructor } from './mod.ts';

export const ApiProperty = () =>
(
	// deno-lint-ignore ban-types
	target: Object,
	propertyKey: string | symbol,
) => {
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
			isArray
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
