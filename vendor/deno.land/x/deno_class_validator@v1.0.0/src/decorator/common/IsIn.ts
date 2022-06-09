import { ValidationOptions } from "../ValidationOptions.ts";
import { buildMessage, ValidateBy } from "../common/ValidateBy.ts";

export const IS_IN = "isIn";

/**
 * Checks if given value is in a array of allowed values.
 */
export function isIn(
  value: unknown,
  possibleValues: readonly unknown[],
): boolean {
  return !(possibleValues instanceof Array) ||
    possibleValues.some((possibleValue) => possibleValue === value);
}

/**
 * Checks if given value is in a array of allowed values.
 */
export function IsIn(
  values: readonly any[],
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_IN,
      constraints: [values],
      validator: {
        validate: (value, args): boolean => isIn(value, args!.constraints[0]),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix +
            "$property must be one of the following values: $constraint1",
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
