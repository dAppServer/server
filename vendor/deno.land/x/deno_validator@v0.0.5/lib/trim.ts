import rtrim from "./rtrim.ts";
import ltrim from "./ltrim.ts";

export default function trim(str: string, chars: string) {
  return rtrim(ltrim(str, chars), chars);
}
