import assertString from "./util/assertString.ts";

/* eslint-disable no-control-regex */
const ascii = /^[\x00-\x7F]+$/;

/* eslint-enable no-control-regex */

export default function isAscii(str: string) {
  assertString(str);
  return ascii.test(str);
}
