/**
 * Build RegExp object from an array
 * of multiple/multi-line regexp parts
 *
 * @param {string[]} parts
 * @param {string} flags
 * @return {object} - RegExp object
 */
export default function multilineRegexp(parts: string[], flags: string) {
  const regexpAsStringLiteral = parts.join("");

  return new RegExp(regexpAsStringLiteral, flags);
}
