import assertString from "./util/assertString.ts";
import merge from "./util/merge.ts";

const lat = /^\(?[+-]?(90(\.0+)?|[1-8]?\d(\.\d+)?)$/;
const long = /^\s?[+-]?(180(\.0+)?|1[0-7]\d(\.\d+)?|\d{1,2}(\.\d+)?)\)?$/;

const latDMS =
  /^(([1-8]?\d)\D+([1-5]?\d|60)\D+([1-5]?\d|60)(\.\d+)?|90\D+0\D+0)\D+[NSns]?$/i;
const longDMS =
  /^\s*([1-7]?\d{1,2}\D+([1-5]?\d|60)\D+([1-5]?\d|60)(\.\d+)?|180\D+0\D+0)\D+[EWew]?$/i;

const defaultLatLongOptions = {
  checkDMS: false,
};

export default function isLatLong(str: string, options: any) {
  assertString(str);
  options = merge(options, defaultLatLongOptions);

  if (!str.includes(",")) return false;
  const pair = str.split(",");
  if (
    (pair[0].startsWith("(") && !pair[1].endsWith(")")) ||
    (pair[1].endsWith(")") && !pair[0].startsWith("("))
  ) {
    return false;
  }

  if (options.checkDMS) {
    return latDMS.test(pair[0]) && longDMS.test(pair[1]);
  }
  return lat.test(pair[0]) && long.test(pair[1]);
}
