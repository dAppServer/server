import { ValidationOptions } from "../ValidationOptions.ts";
import { buildMessage, ValidateBy } from "../common/ValidateBy.ts";
import {isHexadecimal as isHexadecimalValidator} from "../../deps.ts";

export const IS_HEXADECIMAL = "isHexadecimal";

/**
 * Checks if the string is a hexadecimal number.
 * If given value is not a string, then it returns false.
 */
export function isHexadecimal(value: unknown): boolean {
  return typeof value === "string" && isHexadecimalValidator(value);
}

/**
 * Checks if the string is a hexadecimal number.
 * If given value is not a string, then it returns false.
 */
export function IsHexadecimal(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_HEXADECIMAL,
      validator: {
        validate: (value, args): boolean => isHexadecimal(value),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + "$property must be a hexadecimal number",
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
