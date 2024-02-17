import { Module } from "https://deno.land/x/danet/mod.ts";
import { ObjectController } from "@mod/config/object/object.controller.ts";
import { ObjectService } from "@mod/config/object/object.service.ts";
import { FileController } from "@mod/config/file/file.controller.ts";
import { ConfigFileService } from "@mod/config/file/file.service.ts";
import { IniController } from "@mod/config/ini/ini.controller.ts";
import { IniService } from "@mod/config/ini/ini.service.ts";

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
