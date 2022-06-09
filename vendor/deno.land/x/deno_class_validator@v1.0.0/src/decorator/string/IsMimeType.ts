import { ValidationOptions } from "../ValidationOptions.ts";
import { buildMessage, ValidateBy } from "../common/ValidateBy.ts";
import {isMimeType as isMimeTypeValidator} from "../../deps.ts";

export const IS_MIME_TYPE = "isMimeType";

/**
 * Check if the string matches to a valid MIME type format
 * If given value is not a string, then it returns false.
 */
export function isMimeType(value: unknown): boolean {
  return typeof value === "string" && isMimeTypeValidator(value);
}

/**
 * Check if the string matches to a valid MIME type format
 * If given value is not a string, then it returns false.
 */
export function IsMimeType(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_MIME_TYPE,
      validator: {
        validate: (value, args): boolean => isMimeType(value),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + "$property must be MIME type format",
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
