import { Module } from "danet/mod.ts";
import { ObjectService } from "@mod/config/object/object.service.ts";
import { LetheanDownloadService } from "@mod/io/protocols/http/download/client.service.ts";
import { ClientService } from "@mod/io/fs/local/client.service.ts";
import { AppManagerConfig } from "@mod/apps/pkg/config.service.ts";
import { AppManagerController } from "@mod/apps/manager/manager.controller.ts";
import { AppManager } from "@mod/apps/manager/manager.service.ts";
import { AppManagerInstaller } from "@mod/apps/pkg/installer.service.ts";

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
