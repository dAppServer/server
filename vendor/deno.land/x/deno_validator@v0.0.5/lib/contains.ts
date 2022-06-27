import assertString from "./util/assertString.ts";
import toString from "./util/toString.ts";
import merge from "./util/merge.ts";

const defaulContainsOptions = {
  ignoreCase: false,
};

export default function contains(str: string, elem: any, options: any) {
  assertString(str);
  options = merge(options, defaulContainsOptions);
  return options.ignoreCase
    ? str.toLowerCase().indexOf(toString(elem).toLowerCase()) >= 0
    : str.indexOf(toString(elem)) >= 0;
}
