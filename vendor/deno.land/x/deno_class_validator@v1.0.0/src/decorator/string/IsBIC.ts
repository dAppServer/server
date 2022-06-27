import { ValidationOptions } from "../ValidationOptions.ts";
import { buildMessage, ValidateBy } from "../common/ValidateBy.ts";
import {isBIC as isBICValidator} from "../../deps.ts";

export const IS_BIC = "isBIC";

/**
 * Check if a string is a BIC (Bank Identification Code) or SWIFT code.
 * If given value is not a string, then it returns false.
 */
export function isBIC(value: unknown): boolean {
  return typeof value === "string" && isBICValidator(value);
}

/**
 * Check if a string is a BIC (Bank Identification Code) or SWIFT code.
 * If given value is not a string, then it returns false.
 */
export function IsBIC(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_BIC,
      validator: {
        validate: (value, args): boolean => isBIC(value),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + "$property must be a BIC or SWIFT code",
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
