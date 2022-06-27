import { ValidationOptions } from "../ValidationOptions.ts";
import { buildMessage, ValidateBy } from "../common/ValidateBy.ts";
import {isPort as isPortValidator} from "../../deps.ts";

export const IS_PORT = "isPort";

/**
 * Check if the string is a valid port number.
 */
export function isPort(value: unknown): boolean {
  return typeof value === "string" && isPortValidator(value);
}

/**
 * Check if the string is a valid port number.
 */
export function IsPort(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_PORT,
      validator: {
        validate: (value, args): boolean => isPort(value),
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + "$property must be a port",
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
