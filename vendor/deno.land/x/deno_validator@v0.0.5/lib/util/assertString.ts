export default function assertString(input: any) {
  const isString = typeof input === "string" || input instanceof String;

  if (!isString) {
    let invalidType: any = typeof input;
    if (input === null) invalidType = "null";
    else if (invalidType === "object") invalidType = input.constructor.name;

    throw new TypeError(`Expected a string but received a ${invalidType}`);
  }
}
