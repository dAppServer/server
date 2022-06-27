import { ValidationOptions } from "../ValidationOptions.ts";
import { buildMessage, ValidateBy } from "../common/ValidateBy.ts";
import { isEmail as isEmailValidator } from "../../deps.ts";
import type { ValidatorJS } from "../../deps.ts";

export const IS_EMAIL = "isEmail";

/**
 * Checks if the string is an email.
 * If given value is not a string, then it returns false.
 */
export function isEmail(
  value: unknown,
  options?: ValidatorJS.IsEmailOptions,
): boolean {
  return typeof value === "string" && isEmailValidator(value, options);
}

/**
 * Checks if the string is an email.
 * If given value is not a string, then it returns false.
 */
export function IsEmail(
  options?: ValidatorJS.IsEmailOptions,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_EMAIL,
      constraints: [options],
      validator: {
        validate: (value, args): boolean =>
          isEmail(value, args!.constraints[0]),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + "$property must be an email",
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
