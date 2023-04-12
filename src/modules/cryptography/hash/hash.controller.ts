import { Body, Controller, Post } from "danet/mod.ts";
import { Tag } from "danetSwagger/decorators.ts";
import { QuasiSaltService } from "/modules/cryptography/hash/quasi-salt.service.ts";
import { QuasiSaltHashDTO, QuasiSaltHashVerifyDTO } from "/modules/cryptography/hash/quasi-salt.interface.ts";
import { HashDTO } from "/modules/cryptography/hash/hash.interface.ts";
import { HashService } from "/modules/cryptography/hash/hash.service.ts";

@Tag("Cryptography")
@Controller("crypto/hash")
export class HashController {

  constructor(private quasi: QuasiSaltService, private hash: HashService) {}
  @Post("quasi-salted-hash")
  createQuasiSalt(@Body() body: QuasiSaltHashDTO): string {
    return this.quasi.hash(body.input);
  }

  @Post("quasi-salted-hash-verify")
  verifyQuasiSalt(@Body() body: QuasiSaltHashVerifyDTO): boolean {
    return this.quasi.verify(body.input, body.hash);
  }

  @Post("md2")
  md2(@Body() body: HashDTO): string {
    return this.hash.hashMd2(body.input);
  }

  @Post("md4")
  md4(@Body() body: HashDTO): string {
    return this.hash.hashMd4(body.input);
  }

  @Post("md5")
  md5(@Body() body: HashDTO): string {
    return this.hash.hashMd5(body.input);
  }

  @Post("rmd160")
  rmd160(@Body() body: HashDTO): string {
    return this.hash.hashRmd160(body.input);
  }

  @Post("rmd320")
  rmd320(@Body() body: HashDTO): string {
    return this.hash.hashRmd320(body.input);
  }

  @Post("sha1")
  sha1(@Body() body: HashDTO): string {
    return this.hash.hashSha1(body.input);
  }

  @Post("sha224")
  sha224(@Body() body: HashDTO): string {
    return this.hash.hashSha224(body.input);
  }

  @Post("sha256")
  sha256(@Body() body: HashDTO): string {
    return this.hash.hashSha256(body.input);
  }

  @Post("sha384")
  sha384(@Body() body: HashDTO): string {
    return this.hash.hashSha384(body.input);
  }

  @Post("sha512")
  sha512(@Body() body: HashDTO): string {
    return this.hash.hashSha512(body.input);
  }

  @Post("sha3-224")
  sha3_224(@Body() body: HashDTO): string {
    return this.hash.hashSha3_224(body.input);
  }

  @Post("sha3-256")
  sha3_256(@Body() body: HashDTO): string {
    return this.hash.hashSha3_256(body.input);
  }

  @Post("sha3-384")
  sha3_384(@Body() body: HashDTO): string {
    return this.hash.hashSha3_384(body.input);
  }

  @Post("sha3-512")
  sha3_512(@Body() body: HashDTO): string {
    return this.hash.hashSha3_512(body.input);
  }

  @Post("keccak224")
  keccak224(@Body() body: HashDTO): string {
    return this.hash.hashKeccak224(body.input);
  }

  @Post("keccak256")
  keccak256(@Body() body: HashDTO): string {
    return this.hash.hashKeccak256(body.input);
  }

  @Post("keccak384")
  keccak384(@Body() body: HashDTO): string {
    return this.hash.hashKeccak384(body.input);
  }

  @Post("keccak512")
  keccak512(@Body() body: HashDTO): string {
    return this.hash.hashKeccak512(body.input);
  }

}
