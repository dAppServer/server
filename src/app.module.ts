import { Module } from "/deps.ts";
import { BaseController } from "/app.controller.ts";
import { IOModule } from "/modules/io/io.module.ts";
import { AuthModule } from "/modules/auth/auth.module.ts";
import { SystemController } from "/modules/system/system.controller.ts";
import { ConfigModule } from "/modules/config/config.module.ts";
import { CryptographyModule } from "/modules/cryptography/cryptography.module.ts";
import { AppsModule } from "/modules/apps/apps.module.ts";
import { ChainsModule } from "/modules/chain/chain.module.ts";

@Module({
  controllers: [BaseController, SystemController],
  injectables: [],
  imports: [IOModule, AuthModule, ConfigModule, CryptographyModule, AppsModule, ChainsModule],
})
export class AppModule {}
