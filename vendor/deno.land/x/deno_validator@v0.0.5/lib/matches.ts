import assertString from "./util/assertString.ts";

export default function matches(str: string, pattern: string | RegExp, modifiers: string) {
  assertString(str);
  let np = pattern;
  if (Object.prototype.toString.call(pattern) !== "[object RegExp]") {
    np = new RegExp(pattern, modifiers);
  }
  return (np as RegExp).test(str);
}
