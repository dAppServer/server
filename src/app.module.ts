import { Module } from "../deps.ts";
import { BaseController } from "./app.controller.ts";
import { FileSystemService } from "./services/fileSystemService.ts";
import { OpenPGPService } from "./services/crypt/openpgp.ts";
import { SystemController } from "./controllers/system.controller.ts";
import { IOModule } from "./controllers/io/io.module.ts";
import { AuthLetheanController } from "./controllers/auth/lethean.controller.ts";
import { AuthLetheanService } from "./services/auth/lethean.service.ts";

@Module({
  controllers: [BaseController, SystemController, AuthLetheanController],
  injectables: [FileSystemService, OpenPGPService, AuthLetheanService],
  imports: [IOModule],
})
export class AppModule {}
