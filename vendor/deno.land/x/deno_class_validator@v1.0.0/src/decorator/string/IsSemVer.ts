import { ValidationOptions } from "../ValidationOptions.ts";
import { buildMessage, ValidateBy } from "../common/ValidateBy.ts";
import {isSemVer as isSemVerValidator} from "../../deps.ts";

export const IS_SEM_VER = "isSemVer";

/**
 * Check if the string is a Semantic Versioning Specification (SemVer).
 * If given value is not a string, then it returns false.
 */
export function isSemVer(value: unknown): boolean {
  return typeof value === "string" && isSemVerValidator(value);
}

/**
 * Check if the string is a Semantic Versioning Specification (SemVer).
 * If given value is not a string, then it returns false.
 */
export function IsSemVer(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_SEM_VER,
      validator: {
        validate: (value, args): boolean => isSemVer(value),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix +
            "$property must be a Semantic Versioning Specification",
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
