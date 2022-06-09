import { ValidationOptions } from "../ValidationOptions.ts";
import { buildMessage, ValidateBy } from "../common/ValidateBy.ts";

export const IS_ENUM = "isEnum";

/**
 * Checks if a given value is an enum
 */
export function isEnum(value: unknown, entity: any): boolean {
  const enumValues = Object.keys(entity).map((k) => entity[k]);
  return enumValues.indexOf(value) >= 0;
}

/**
 * Checks if a given value is an enum
 */
export function IsEnum(
  entity: object,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_ENUM,
      constraints: [entity],
      validator: {
        validate: (value: any, args: any): boolean =>
          isEnum(value, args.constraints[0]),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + "$property must be a valid enum value",
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
