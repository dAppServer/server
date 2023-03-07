import { Module } from "../../../deps.ts";
import { ObjectController } from "./object.controller.ts";
import { ObjectService } from "./object.service.ts";
import { FileController } from "./file.controller.ts";
import { ConfigFileService } from "./file.service.ts";

@Module({
  controllers: [
    ObjectController,
    FileController
  ],
  injectables: [
    ObjectService,
    ConfigFileService
  ],
})
export class ConfigModule {}
