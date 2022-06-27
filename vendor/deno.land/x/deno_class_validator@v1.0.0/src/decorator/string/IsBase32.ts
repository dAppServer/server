import { ValidationOptions } from "../ValidationOptions.ts";
import { buildMessage, ValidateBy } from "../common/ValidateBy.ts";
import { isBase32 as isBase32Validator } from "../../deps.ts";

export const IS_BASE32 = "isBase32";

/**
 * Checks if a string is base32 encoded.
 * If given value is not a string, then it returns false.
 */
export function isBase32(value: unknown): boolean {
  return typeof value === "string" && isBase32Validator(value);
}

/**
 * Check if a string is base32 encoded.
 * If given value is not a string, then it returns false.
 */
export function IsBase32(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_BASE32,
      validator: {
        validate: (value, args): boolean => isBase32(value),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + "$property must be base32 encoded",
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
