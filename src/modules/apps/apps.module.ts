import { Module } from "../../../deps.ts";
import { ObjectService } from "../config/object/object.service.ts";
import { LetheanDownloadService } from "../io/tcp/download.service.ts";
import { FileSystemService } from "../io/filesystem/fileSystemService.ts";
import { AppManagerConfig } from "./pkg/config.service.ts";
import { AppManagerController } from "./manager/manager.controller.ts";
import { AppManager } from "./manager/manager.service.ts";
import { AppManagerInstaller } from "./pkg/installer.service.ts";

@Module({
  controllers: [
    AppManagerController
  ],
  injectables: [
    ObjectService,
    LetheanDownloadService,
    FileSystemService,
    AppManagerConfig,
    AppManager,
    AppManagerInstaller
  ],
})
export class AppsModule {}
