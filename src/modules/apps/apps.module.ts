import { Module } from "danet/mod.ts";
import { ObjectService } from "@module/config/object/object.service.ts";
import { LetheanDownloadService } from "@module/io/protocols/http/download/client.service.ts";
import { ClientService } from "@module/io/fs/local/client.service.ts";
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
    ClientService,
    AppManagerConfig,
    AppManager,
    AppManagerInstaller
  ],
})
export class AppsModule {}
