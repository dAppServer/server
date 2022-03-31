import { Validity, Rule } from "../types.ts";
import { required } from "./required.ts";
import { ValidationUtils } from "../interfaces.ts";

export function requiredWhen(
  callback: (
    fieldValue: any,
    validationUtils: ValidationUtils,
  ) => boolean | Promise<boolean>,
): Rule {
  return async function requiredWhenRule(
    value: any,
    utils: ValidationUtils,
  ): Promise<Validity> {
    const result = callback(value, utils);
    const isRequired = result instanceof Promise ? await result : result;
    if (isRequired) {
      return required(value);
    }
  };
}
