import { Module } from "../../../deps.ts";
import { AuthLetheanController } from "./lethean/lethean.controller.ts";
import { AuthLetheanService } from "./lethean/lethean.service.ts";
import { IOModule } from "../io/io.module.ts";
import { CryptographyModule } from "../cryptography/cryptography.module.ts";

@Module({
  controllers: [AuthLetheanController],
  injectables: [ AuthLetheanService],
  imports: [IOModule, CryptographyModule]
})
export class AuthModule {}
