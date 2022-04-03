import { createHash } from "../../../deps.ts";

export class QuasiSalt {
  constructor() {
  }
  static get keyMap() {
    return {
      "o": "0",
      "l": "1",
      "e": "3",
      "a": "4",
      "s": "z",
      "t": "7",
    };
  }

  static hash(input: string): string {
    return createHash("sha256")
      .update(input + this.createSalt(input))
      .toString() as string;
  }

  /**
   * Creates a quasi-salt from a string.
   * @param input The input string.
   */
  //  static createSaltV2(input: string): string {
  //    if (!input) {
  //      return '';
  //    }
  //
  //    let i: number = input.length;
  //    let salt:string[] = []
  //    while (i--) {
  //      const char:string = input[i];
  //      salt.push(char === this.keyMap[char] !== undefined ? this.keyMap[char] : char);
  //    }
  //
  //    return salt.join('');
  //  }

  static createSalt(input: string): string {
    if (!input) {
      return "";
    }
    return input
      .replace("o", "0")
      .replace(/l/gi, "1")
      .replace(/e/gi, "3")
      .replace(/a/gi, "4")
      .replace(/s/gi, "z")
      .replace(/t/gi, "7");
  }
}
