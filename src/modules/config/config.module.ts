import { Module } from "../../../deps.ts";
import { ObjectController } from "./object/object.controller.ts";
import { ObjectService } from "./object/object.service.ts";
import { FileController } from "./file/file.controller.ts";
import { ConfigFileService } from "./file/file.service.ts";
import { IniController } from "./ini/ini.controller.ts";
import { IniService } from "./ini/ini.service.ts";

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
