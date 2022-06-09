import { ValidationOptions } from "../ValidationOptions.ts";
import { buildMessage, ValidateBy } from "../common/ValidateBy.ts";
import {isEAN as isEANValidator} from "../../deps.ts";

export const IS_EAN = "isEAN";

/**
 * Check if the string is an EAN (European Article Number).
 * If given value is not a string, then it returns false.
 */
export function isEAN(value: unknown): boolean {
  return typeof value === "string" && isEANValidator(value);
}

/**
 * Check if the string is an EAN (European Article Number).
 * If given value is not a string, then it returns false.
 */
export function IsEAN(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_EAN,
      validator: {
        validate: (value, args): boolean => isEAN(value),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix + "$property must be an EAN (European Article Number)",
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
