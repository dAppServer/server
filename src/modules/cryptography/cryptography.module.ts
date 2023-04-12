import { Module } from "danet/mod.ts";
import { HashController } from "@module/cryptography/hash/hash.controller.ts";
import { QuasiSaltService } from "@module/cryptography/hash/quasi-salt.service.ts";
import { OpenPGPService } from "@module/cryptography/openpgp/openpgp.service.ts";
import { HashService } from "@module/cryptography/hash/hash.service.ts";
import { OpenPGPController } from "@module/cryptography/openpgp/openpgp.controller.ts";

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
