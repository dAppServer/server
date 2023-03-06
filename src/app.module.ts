import { Module } from "../deps.ts";
import { BaseController } from "./app.controller.ts";
import { FileSystemService } from "./services/fileSystemService.ts";
import { OpenPGPService } from "./services/crypt/openpgp.ts";
import { SystemController } from "./controllers/system.controller.ts";

@Module({
  controllers: [BaseController, SystemController],
  injectables: [FileSystemService, OpenPGPService],
})
export class AppModule {}
