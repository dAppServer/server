import { Module } from "https://deno.land/x/danet/mod.ts";
import { ModIoFsLocalService } from "@mod/io/fs/local/service.ts";
import { ModIoFsLocalController } from "@mod/io/fs/local/controller.ts";
import { DownloadClientController } from "@mod/io/protocols/http/download/client.controller.ts";
import { LetheanDownloadService } from "@mod/io/protocols/http/download/client.service.ts";
import {ModIoFsS3Service} from "@mod/io/fs/s3/service.ts";
import {MysqlService} from "@mod/io/storage/database/mysql/mysql.service.ts";

@Module({
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
