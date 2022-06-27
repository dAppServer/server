import { ValidationOptions } from "../ValidationOptions.ts";
import { buildMessage, ValidateBy } from "../common/ValidateBy.ts";
import {isAscii as isAsciiValidator} from "../../deps.ts";

export const IS_ASCII = "isAscii";

/**
 * Checks if the string contains ASCII chars only.
 * If given value is not a string, then it returns false.
 */
export function isAscii(value: unknown): boolean {
  return typeof value === "string" && isAsciiValidator(value);
}

/**
 * Checks if the string contains ASCII chars only.
 * If given value is not a string, then it returns false.
 */
export function IsAscii(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_ASCII,
      validator: {
        validate: (value, args): boolean => isAscii(value),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix + "$property must contain only ASCII characters",
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
