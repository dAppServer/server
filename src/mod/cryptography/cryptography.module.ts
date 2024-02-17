import { Module } from "danet/mod.ts";
import { HashController } from "@mod/cryptography/hash/hash.controller.ts";
import { QuasiSaltService } from "@mod/cryptography/hash/quasi-salt.service.ts";
import { OpenPGPService } from "@mod/cryptography/openpgp/openpgp.service.ts";
import { HashService } from "@mod/cryptography/hash/hash.service.ts";
import { OpenPGPController } from "@mod/cryptography/openpgp/openpgp.controller.ts";

@Module({
  controllers: [
    HashController,
    OpenPGPController
  ],
  injectables: [
    QuasiSaltService,
    HashService,
    OpenPGPService
  ],
})
export class CryptographyModule {}
