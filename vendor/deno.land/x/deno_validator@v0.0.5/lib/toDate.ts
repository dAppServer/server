import assertString from "./util/assertString.ts";

export default function toDate(date: string) {
  assertString(date);
  const d = Date.parse(date);
  return !isNaN(d) ? new Date(d) : null;
}
