import assertString from "./util/assertString.ts";
import { decimal } from "./alpha.ts";

const numericNoSymbols = /^[0-9]+$/;

export default function isNumeric(str: string, options: any) {
  assertString(str);
  if (options && options.no_symbols) {
    return numericNoSymbols.test(str);
  }
  return (new RegExp(
    `^[+-]?([0-9]*[${(options || {}).locale
      ? decimal[options.locale]
      : "."
    }])?[0-9]+$`,
  )).test(str);
}
