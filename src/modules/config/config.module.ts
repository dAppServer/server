import { Module } from "danet/mod.ts";
import { ObjectController } from "@module/config/object/object.controller.ts";
import { ObjectService } from "@module/config/object/object.service.ts";
import { FileController } from "@module/config/file/file.controller.ts";
import { ConfigFileService } from "@module/config/file/file.service.ts";
import { IniController } from "@module/config/ini/ini.controller.ts";
import { IniService } from "@module/config/ini/ini.service.ts";

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
