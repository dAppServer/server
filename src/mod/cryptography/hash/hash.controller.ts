import { Body, Controller, Post } from "danet/mod.ts";
import { Tag } from "danetSwagger/decorators.ts";
import { QuasiSaltService } from "@mod/cryptography/hash/quasi-salt.service.ts";
import { QuasiSaltHashDTO, QuasiSaltHashVerifyDTO } from "@mod/cryptography/hash/quasi-salt.interface.ts";
import { HashDTO } from "@mod/cryptography/hash/hash.interface.ts";
import { HashService } from "@mod/cryptography/hash/hash.service.ts";

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

  @Post("sha256")
  sha256(@Body() body: HashDTO): string {
    return this.hash.hash(body.input, "SHA-256");
  }

  @Post("sha384")
  sha384(@Body() body: HashDTO): string {
    return this.hash.hash(body.input, "SHA-384");
  }

  @Post("sha512")
  sha512(@Body() body: HashDTO): string {
    return this.hash.hash(body.input, "SHA-512");
  }
}
