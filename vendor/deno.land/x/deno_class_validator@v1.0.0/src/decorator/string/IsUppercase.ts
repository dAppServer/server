import { ValidationOptions } from "../ValidationOptions.ts";
import { buildMessage, ValidateBy } from "../common/ValidateBy.ts";
import {isUppercase as isUppercaseValidator} from "../../deps.ts";

export const IS_UPPERCASE = "isUppercase";

/**
 * Checks if the string is uppercase.
 * If given value is not a string, then it returns false.
 */
export function isUppercase(value: unknown): boolean {
  return typeof value === "string" && isUppercaseValidator(value);
}

/**
 * Checks if the string is uppercase.
 * If given value is not a string, then it returns false.
 */
export function IsUppercase(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_UPPERCASE,
      validator: {
        validate: (value, args): boolean => isUppercase(value),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + "$property must be uppercase",
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
