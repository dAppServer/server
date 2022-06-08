import assertString from "./util/assertString.ts";

// Accepted chars - 123456789ABCDEFGH JKLMN PQRSTUVWXYZabcdefghijk mnopqrstuvwxyz
const base58Reg = /^[A-HJ-NP-Za-km-z1-9]*$/;

export default function isBase58(str: string) {
  assertString(str);
  if (base58Reg.test(str)) {
    return true;
  }
  return false;
}
