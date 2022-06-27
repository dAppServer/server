import { ValidationOptions } from "../ValidationOptions.ts";
import { buildMessage, ValidateBy } from "../common/ValidateBy.ts";

export const IS_OBJECT = "isObject";

/**
 * Checks if the value is valid Object.
 * Returns false if the value is not an object.
 */
export function isObject(value: unknown): value is object {
  return value != null &&
    (typeof value === "object" || typeof value === "function") &&
    !Array.isArray(value);
}

/**
 * Checks if the value is valid Object.
 * Returns false if the value is not an object.
 */
export function IsObject(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_OBJECT,
      validator: {
        validate: (value, args): boolean => isObject(value),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + "$property must be an object",
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
