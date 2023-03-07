import { Module } from "../../../deps.ts";
import { ObjectController } from "./object.controller.ts";
import { ObjectService } from "./object.service.ts";
import { FileController } from "./file.controller.ts";
import { ConfigFileService } from "./file.service.ts";
import { IniController } from "./ini.controller.ts";
import { IniService } from "./ini.service.ts";

@Module({
  controllers: [
    ObjectController,
    FileController,
    IniController
  ],
  injectables: [
    ObjectService,
    ConfigFileService,
    IniService
  ],
})
export class ConfigModule {}
