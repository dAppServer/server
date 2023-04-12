import { Module } from "danet/mod.ts";
import { ObjectService } from "@module/config/object/object.service.ts";
import { LetheanDownloadService } from "@module/io/tcp/download.service.ts";
import { FileSystemService } from "@module/io/filesystem/fileSystemService.ts";
import { AppManagerConfig } from "@module/apps/pkg/config.service.ts";
import { AppManagerController } from "@module/apps/manager/manager.controller.ts";
import { AppManager } from "@module/apps/manager/manager.service.ts";
import { AppManagerInstaller } from "@module/apps/pkg/installer.service.ts";

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
