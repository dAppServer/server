import { Module } from "danet/mod.ts";
import { ClientService } from "@module/io/fs/local/client.service.ts";
import { FileSystemController } from "@module/io/fs/local/client.controller.ts";
import { DownloadClientController } from "@module/io/protocols/http/download/client.controller.ts";
import { LetheanDownloadService } from "@module/io/protocols/http/download/client.service.ts";
import {clientService} from "@module/io/fs/s3/client.service.ts";

@Module({
  controllers: [
    FileSystemController,
    DownloadClientController
  ],
  injectables: [
    ClientService,
    LetheanDownloadService,
      clientService
  ],
})
export class IOModule {}
