import { Module } from "../../../deps.ts";
import { AuthLetheanController } from "./lethean/lethean.controller.ts";
import { AuthLetheanService } from "./lethean/lethean.service.ts";
import { IOModule } from "../io/io.module.ts";
import { CryptographyModule } from "../cryptography/cryptography.module.ts";
import { OpenPGPService } from "../cryptography/openpgp/openpgp.service.ts";
import { QuasiSaltService } from "../cryptography/hash/quasi-salt.service.ts";

@Module({
  controllers: [AuthLetheanController],
  injectables: [ AuthLetheanService, OpenPGPService, QuasiSaltService]
})
export class AuthModule {}
