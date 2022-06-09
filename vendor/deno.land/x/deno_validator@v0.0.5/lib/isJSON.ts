import assertString from "./util/assertString.ts";
import merge from "./util/merge.ts";

const default_json_options = {
  allow_primitives: false,
};

export default function isJSON(str: string, options: any) {
  assertString(str);
  try {
    options = merge(options, default_json_options);
    let primitives: any[] = [];
    if (options.allow_primitives) {
      primitives = [null, false, true];
    }

    const obj = JSON.parse(str);
    return primitives.includes(obj) || (!!obj && typeof obj === "object");
  } catch (e) { /* ignore */ }
  return false;
}
