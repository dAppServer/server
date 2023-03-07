import { Module } from "../../../deps.ts";
import { HashController } from "./hash/hash.controller.ts";
import { QuasiSaltService } from "./hash/quasi-salt.service.ts";
import { OpenPGPService } from "./openpgp/openpgp.service.ts";
import { HashService } from "./hash/hash.service.ts";
import { OpenPGPController } from "./openpgp/openpgp.controller.ts";

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
