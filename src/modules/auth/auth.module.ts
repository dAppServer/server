import { Module } from "danet/mod.ts";
import { AuthLetheanController } from "@module/auth/lethean/lethean.controller.ts";
import { AuthLetheanService } from "@module/auth/lethean/lethean.service.ts";
import { OpenPGPService } from "@module/cryptography/openpgp/openpgp.service.ts";
import { QuasiSaltService } from "@module/cryptography/hash/quasi-salt.service.ts";

@Module({
  controllers: [AuthLetheanController],
  injectables: [ AuthLetheanService, OpenPGPService, QuasiSaltService]
})
export class AuthModule {}
