import { Module } from "https://deno.land/x/danet/mod.ts";
import { ModIoFsLocalService } from "./fs/local/service.ts";
import { ModIoFsLocalController } from "./fs/local/controller.ts";
import { DownloadClientController } from "./protocols/http/download/client.controller.ts";
import { LetheanDownloadService } from "./protocols/http/download/client.service.ts";
import {ModIoFsS3Service} from "./fs/s3/service.ts";
import {MysqlService} from "./storage/database/mysql.service.ts";

@Module({
  imports: [

  ],
  controllers: [
    ModIoFsLocalController,
    DownloadClientController
  ],
  injectables: [
    ModIoFsLocalService,
    LetheanDownloadService,
      ModIoFsS3Service,
    MysqlService
  ],
})
export class IOModule {}
