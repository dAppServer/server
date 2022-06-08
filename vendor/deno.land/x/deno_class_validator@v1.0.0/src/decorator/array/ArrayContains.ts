import { ValidationOptions } from "../ValidationOptions.ts";
import { buildMessage, ValidateBy } from "../common/ValidateBy.ts";

export const ARRAY_CONTAINS = "arrayContains";

/**
 * Checks if array contains all values from the given array of values.
 * If null or undefined is given then this function returns false.
 */
export function arrayContains(array: unknown, values: any[]): boolean {
  if (!(array instanceof Array)) return false;

  return values.every((value) => array.indexOf(value) !== -1);
}

/**
 * Checks if array contains all values from the given array of values.
 * If null or undefined is given then this function returns false.
 */
export function ArrayContains(
  values: any[],
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: ARRAY_CONTAINS,
      constraints: [values],
      validator: {
        validate: (value, args): boolean =>
          arrayContains(value, args!.constraints[0]),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix + "$property must contain $constraint1 values",
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
