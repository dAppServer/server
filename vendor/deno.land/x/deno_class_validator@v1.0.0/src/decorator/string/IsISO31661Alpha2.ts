import { ValidationOptions } from "../ValidationOptions.ts";
import { buildMessage, ValidateBy } from "../common/ValidateBy.ts";
import {isISO31661Alpha2 as isISO31661Alpha2Validator} from "../../deps.ts";

export const IS_ISO31661_ALPHA_2 = "isISO31661Alpha2";

/**
 * Check if the string is a valid [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) officially assigned country code.
 */
export function isISO31661Alpha2(value: unknown): boolean {
  return typeof value === "string" && isISO31661Alpha2Validator(value);
}

/**
 * Check if the string is a valid [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) officially assigned country code.
 */
export function IsISO31661Alpha2(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_ISO31661_ALPHA_2,
      validator: {
        validate: (value, args): boolean => isISO31661Alpha2(value),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix + "$property must be a valid ISO31661 Alpha2 code",
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
