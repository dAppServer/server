import { Module } from "danet/mod.ts";
import { ObjectController } from "/modules/config/object/object.controller.ts";
import { ObjectService } from "/modules/config/object/object.service.ts";
import { FileController } from "/modules/config/file/file.controller.ts";
import { ConfigFileService } from "/modules/config/file/file.service.ts";
import { IniController } from "/modules/config/ini/ini.controller.ts";
import { IniService } from "/modules/config/ini/ini.service.ts";

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
