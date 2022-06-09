import assertString from "./util/assertString.ts";
import multilineRegexp from "./util/multilineRegex.ts";

/**
 * Regular Expression to match
 * semantic versioning (SemVer)
 * built from multi-line, multi-parts regexp
 * Reference: https://semver.org/
 */
const semanticVersioningRegex = multilineRegexp([
  "^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)",
  "(?:-((?:0|[1-9]\\d*|\\d*[a-z-][0-9a-z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-z-][0-9a-z-]*))*))",
  "?(?:\\+([0-9a-z-]+(?:\\.[0-9a-z-]+)*))?$",
], "i");

export default function isSemVer(str: string) {
  assertString(str);

  return semanticVersioningRegex.test(str);
}
