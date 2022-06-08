import { ValidationOptions } from "../ValidationOptions.ts";
import { buildMessage, ValidateBy } from "../common/ValidateBy.ts";

export const IS_INT = "isInt";

/**
 * Checks if value is an integer.
 */
export function isInt(val: unknown): boolean {
  return typeof val === "number" && Number.isInteger(val);
}

/**
 * Checks if value is an integer.
 */
export function IsInt(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_INT,
      validator: {
        validate: (value, args): boolean => isInt(value),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + "$property must be an integer number",
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
