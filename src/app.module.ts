import { Module } from "../deps.ts";
import { BaseController } from "./app.controller.ts";
import { FileSystemService } from "./services/fileSystemService.ts";
import { OpenPGPService } from "./services/crypt/openpgp.ts";
import { SystemController } from "./controllers/system.controller.ts";
import { IOModule } from "./controllers/io/io.module.ts";

@Module({
  controllers: [BaseController, SystemController],
  injectables: [FileSystemService, OpenPGPService],
  imports: [IOModule],
})
export class AppModule {}
