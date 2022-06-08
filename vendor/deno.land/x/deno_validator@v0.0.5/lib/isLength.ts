import assertString from "./util/assertString.ts";

/* eslint-disable prefer-rest-params */
export default function isLength(str: string, options: any) {
  assertString(str);
  let min;
  let max;
  if (typeof (options) === "object") {
    min = options.min || 0;
    max = options.max;
  } else { // backwards compatibility: isLength(str, min [, max])
    min = arguments[1] || 0;
    max = arguments[2];
  }
  const surrogatePairs = str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
  const len = str.length - surrogatePairs.length;
  return len >= min && (typeof max === "undefined" || len <= max);
}
