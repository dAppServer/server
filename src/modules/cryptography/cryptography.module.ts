import { Module } from "/deps.ts";
import { HashController } from "/modules/cryptography/hash/hash.controller.ts";
import { QuasiSaltService } from "/modules/cryptography/hash/quasi-salt.service.ts";
import { OpenPGPService } from "/modules/cryptography/openpgp/openpgp.service.ts";
import { HashService } from "/modules/cryptography/hash/hash.service.ts";
import { OpenPGPController } from "/modules/cryptography/openpgp/openpgp.controller.ts";

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
