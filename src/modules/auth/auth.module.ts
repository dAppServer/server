import { Module } from "../../../deps.ts";
import { OpenPGPService } from "../../services/crypt/openpgp.ts";
import { AuthLetheanController } from "./lethean/lethean.controller.ts";
import { AuthLetheanService } from "./lethean/lethean.service.ts";
import { IOModule } from "../io/io.module.ts";

@Module({
  controllers: [AuthLetheanController],
  injectables: [OpenPGPService, AuthLetheanService],
  imports: [IOModule]
})
export class AuthModule {}
