import assertString from "./util/assertString.ts";

export default function whitelist(str: string, chars: string) {
  assertString(str);
  return str.replace(new RegExp(`[^${chars}]+`, "g"), "");
}
