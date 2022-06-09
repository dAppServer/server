import assertString from "./util/assertString.ts";

import { fullWidth } from "./isFullWidth.ts";
import { halfWidth } from "./isHalfWidth.ts";

export default function isVariableWidth(str: string) {
  assertString(str);
  return fullWidth.test(str) && halfWidth.test(str);
}
