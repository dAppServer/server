import { Module } from "danet/mod.ts";
import { ClientService } from "@mod/io/fs/local/client.service.ts";
import { FileSystemController } from "@mod/io/fs/local/client.controller.ts";
import { DownloadClientController } from "@mod/io/protocols/http/download/client.controller.ts";
import { LetheanDownloadService } from "@mod/io/protocols/http/download/client.service.ts";
import {clientService} from "@mod/io/fs/s3/client.service.ts";
import {MysqlService} from "@mod/io/storage/database/mysql/mysql.service.ts";

@Module({
  controllers: [
    FileSystemController,
    DownloadClientController
  ],
  injectables: [
    ClientService,
    LetheanDownloadService,
      clientService,
    MysqlService
  ],
})
export class IOModule {}
