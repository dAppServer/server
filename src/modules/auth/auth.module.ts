import { Module } from "/deps.ts";
import { AuthLetheanController } from "/modules/auth/lethean/lethean.controller.ts";
import { AuthLetheanService } from "/modules/auth/lethean/lethean.service.ts";
import { OpenPGPService } from "/modules/cryptography/openpgp/openpgp.service.ts";
import { QuasiSaltService } from "/modules/cryptography/hash/quasi-salt.service.ts";

@Module({
  controllers: [AuthLetheanController],
  injectables: [ AuthLetheanService, OpenPGPService, QuasiSaltService]
})
export class AuthModule {}
