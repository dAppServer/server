import { ValidationOptions } from "../ValidationOptions.ts";
import { buildMessage, ValidateBy } from "../common/ValidateBy.ts";
import {isDataURI as isDataURIValidator} from "../../deps.ts";

export const IS_DATA_URI = "isDataURI";

/**
 * Check if the string is a data uri format.
 * If given value is not a string, then it returns false.
 */
export function isDataURI(value: unknown): boolean {
  return typeof value === "string" && isDataURIValidator(value);
}

/**
 * Check if the string is a data uri format.
 * If given value is not a string, then it returns false.
 */
export function IsDataURI(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_DATA_URI,
      validator: {
        validate: (value, args): boolean => isDataURI(value),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + "$property must be a data uri format",
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
