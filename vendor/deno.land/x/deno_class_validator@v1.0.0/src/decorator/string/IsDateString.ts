import { ValidationOptions } from "../ValidationOptions.ts";
import { buildMessage, ValidateBy } from "../common/ValidateBy.ts";
import type { ValidatorJS } from "../../deps.ts";
import { isISO8601 } from "./IsISO8601.ts";

export const IS_DATE_STRING = "isDateString";

/**
 * Alias for IsISO8601 validator
 */
export function isDateString(
  value: unknown,
  options?: ValidatorJS.IsISO8601Options,
): boolean {
  return isISO8601(value, options);
}

/**
 * Alias for IsISO8601 validator
 */
export function IsDateString(
  options?: ValidatorJS.IsISO8601Options,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_DATE_STRING,
      constraints: [options],
      validator: {
        validate: (value, args): boolean => isDateString(value),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix + "$property must be a valid ISO 8601 date string",
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
