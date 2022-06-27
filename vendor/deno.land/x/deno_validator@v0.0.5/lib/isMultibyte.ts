import assertString from "./util/assertString.ts";

/* eslint-disable no-control-regex */
const multibyte = /[^\x00-\x7F]/;

/* eslint-enable no-control-regex */

export default function isMultibyte(str: string) {
  assertString(str);
  return multibyte.test(str);
}
