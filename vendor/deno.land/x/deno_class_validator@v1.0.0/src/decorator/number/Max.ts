import { ValidationOptions } from "../ValidationOptions.ts";
import { buildMessage, ValidateBy } from "../common/ValidateBy.ts";

export const MAX = "max";

/**
 * Checks if the first number is less than or equal to the second.
 */
export function max(num: unknown, max: number): boolean {
  return typeof num === "number" && typeof max === "number" && num <= max;
}

/**
 * Checks if the first number is less than or equal to the second.
 */
export function Max(
  maxValue: number,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: MAX,
      constraints: [maxValue],
      validator: {
        validate: (value, args): boolean => max(value, args!.constraints[0]),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix + "$property must not be greater than $constraint1",
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
