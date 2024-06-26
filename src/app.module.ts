import { Module, EventEmitter, EventEmitterModule } from "https://deno.land/x/danet/mod.ts";
import { BaseController } from "./app.controller.ts";
import { IOModule } from "./mod/io/io.module.ts";
import { SystemController } from "./mod/system/system.controller.ts";
import { ConfigModule } from "./mod/config/config.module.ts";
import { CryptographyModule } from "./mod/cryptography/cryptography.module.ts";
import { AppsModule } from "./mod/apps/apps.module.ts";
import {ProcessModule} from "./mod/process/process.module.ts";
import {DockerModule} from "./mod/docker/docker.module.ts";
import {BlockchainLTHNModule} from "./blockchain/lthn/lthn.module.ts";

@Module({
  controllers: [BaseController, SystemController],
  injectables: [],
  imports: [
      EventEmitterModule,
    IOModule,
    ConfigModule,
    CryptographyModule,
    AppsModule,
    ProcessModule,
    DockerModule,
    BlockchainLTHNModule],
})
export class AppModule {}
