import { Module } from "danet/mod.ts";
import { ObjectService } from "/modules/config/object/object.service.ts";
import { LetheanDownloadService } from "/modules/io/tcp/download.service.ts";
import { FileSystemService } from "/modules/io/filesystem/fileSystemService.ts";
import { AppManagerConfig } from "/modules/apps/pkg/config.service.ts";
import { AppManagerController } from "/modules/apps/manager/manager.controller.ts";
import { AppManager } from "/modules/apps/manager/manager.service.ts";
import { AppManagerInstaller } from "/modules/apps/pkg/installer.service.ts";

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
