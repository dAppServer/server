import { Module } from "danet/mod.ts";
import { BaseController } from "./app.controller.ts";
import { IOModule } from "@mod/io/io.module.ts";
import { SystemController } from "@mod/system/system.controller.ts";
import { ConfigModule } from "@mod/config/config.module.ts";
import { CryptographyModule } from "@mod/cryptography/cryptography.module.ts";
import { AppsModule } from "@mod/apps/apps.module.ts";

@Module({
  controllers: [BaseController, SystemController],
  injectables: [],
  imports: [IOModule, ConfigModule, CryptographyModule, AppsModule],
})
export class AppModule {}
