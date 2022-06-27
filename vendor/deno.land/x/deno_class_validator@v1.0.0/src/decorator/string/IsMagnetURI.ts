import { ValidationOptions } from "../ValidationOptions.ts";
import { buildMessage, ValidateBy } from "../common/ValidateBy.ts";
import {isMagnetURI as isMagnetURIValidator} from "../../deps.ts";

export const IS_MAGNET_URI = "isMagnetURI";

/**
 * Check if the string is a magnet uri format.
 * If given value is not a string, then it returns false.
 */
export function isMagnetURI(value: unknown): boolean {
  return typeof value === "string" && isMagnetURIValidator(value);
}

/**
 * Check if the string is a magnet uri format.
 * If given value is not a string, then it returns false.
 */
export function IsMagnetURI(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_MAGNET_URI,
      validator: {
        validate: (value, args): boolean => isMagnetURI(value),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + "$property must be magnet uri format",
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
