import { Module } from "../../../deps.ts";
import { HashController } from "./hash/hash.controller.ts";
import { QuasiSaltService } from "./hash/quasi-salt.service.ts";
import { OpenPGPService } from "./openpgp/openpgp.ts";
import { HashService } from "./hash/hash.service.ts";

@Module({
  controllers: [
    HashController
  ],
  injectables: [
    QuasiSaltService,
    HashService,
    OpenPGPService
  ],
})
export class CryptographyModule {}
