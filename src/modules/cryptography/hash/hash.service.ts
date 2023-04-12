import { createHash, Injectable } from "/deps.ts";

@Injectable()
export class HashService {

  constructor() {
  }

  hashMd2(input: string): string {
    return createHash("md2").update(input).toString() as string;
  }

  hashMd4(input: string): string {
    return createHash("md4").update(input).toString() as string;
  }

  hashMd5(input: string): string {
    return createHash("md5").update(input).toString() as string;
  }

  hashRmd160(input: string): string {
    return createHash("ripemd160").update(input).toString() as string;
  }

  hashRmd320(input: string): string {
    return createHash("ripemd320").update(input).toString() as string;
  }

  hashSha1(input: string): string {
    return createHash("sha1").update(input).toString() as string;
  }

  hashSha224(input: string): string {
    return createHash("sha224").update(input).toString() as string;
  }

  hashSha256(input: string): string {
    return createHash("sha256").update(input).toString() as string;
  }

  hashSha384(input: string): string {
    return createHash("sha384").update(input).toString() as string;
  }

  hashSha512(input: string): string {
    return createHash("sha512").update(input).toString() as string;
  }

  hashSha3_224(input: string): string {
    return createHash("sha3-224").update(input).toString() as string;
  }

  hashSha3_256(input: string): string {
    return createHash("sha3-256").update(input).toString() as string;
  }

  hashSha3_384(input: string): string {
    return createHash("sha3-384").update(input).toString() as string;
  }

  hashSha3_512(input: string): string {
    return createHash("sha3-512").update(input).toString() as string;
  }

  hashKeccak224(input: string): string {
    return createHash("keccak224").update(input).toString() as string;
  }

  hashKeccak256(input: string): string {
    return createHash("keccak256").update(input).toString() as string;
  }

  hashKeccak384(input: string): string {
    return createHash("keccak384").update(input).toString() as string;
  }

  hashKeccak512(input: string): string {
    return createHash("keccak512").update(input).toString() as string;
  }

}
