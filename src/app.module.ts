import { Module } from "../deps.ts";
import { BaseController } from "./app.controller.ts";
import { OpenPGPService } from "./services/crypt/openpgp.ts";
import { IOModule } from "./modules/io/io.module.ts";
import { AuthModule } from "./modules/auth/auth.module.ts";
import { SystemController } from "./modules/system/system.controller.ts";
import { ConfigModule } from "./modules/config/config.module.ts";

@Module({
  controllers: [BaseController, SystemController],
  injectables: [ OpenPGPService],
  imports: [IOModule, AuthModule, ConfigModule],
})
export class AppModule {}
