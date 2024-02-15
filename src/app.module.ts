import { Module } from "danet/mod.ts";
import { BaseController } from "./app.controller.ts";
import { IOModule } from "@module/io/io.module.ts";
import { AuthModule } from "@module/auth/auth.module.ts";
import { SystemController } from "@module/system/system.controller.ts";
import { ConfigModule } from "@module/config/config.module.ts";
import { CryptographyModule } from "@module/cryptography/cryptography.module.ts";
import { AppsModule } from "@module/apps/apps.module.ts";
import { ChainsModule } from "@module/chain/chain.module.ts";

@Module({
  controllers: [BaseController, SystemController],
  injectables: [],
  imports: [IOModule, AuthModule, ConfigModule, CryptographyModule, AppsModule],
})
export class AppModule {}
