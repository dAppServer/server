import { Module } from "../deps.ts";
import { BaseController } from "./app.controller.ts";
import { FileSystemService } from "./services/fileSystemService.ts";
import { OpenPGPService } from "./services/crypt/openpgp.ts";

@Module({
  controllers: [BaseController],
  injectables: [FileSystemService, OpenPGPService],
})
export class AppModule {}
