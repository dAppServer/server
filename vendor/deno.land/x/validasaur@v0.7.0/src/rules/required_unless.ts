import { Validity, Rule } from "../types.ts";
import { required } from "./required.ts";

export function requiredUnless(field: string, fieldValue: any): Rule {
  return function requiredUnlessRule(value: any, { getValue }): Validity {
    const val = getValue(field);
    if (val !== fieldValue) {
      return required(value);
    }
  };
}
