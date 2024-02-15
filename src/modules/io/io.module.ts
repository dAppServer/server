import { Module } from "danet/mod.ts";
import { ClientService } from "@module/io/file/local/client.service.ts";
import { FileSystemController } from "@module/io/file/local/client.controller.ts";
import { DownloadController } from "@module/io/tcp/download.controller.ts";
import { LetheanDownloadService } from "@module/io/tcp/download.service.ts";
import {clientService} from "@module/io/file/s3/client.service.ts";

@Module({
  controllers: [
    FileSystemController,
    DownloadController
  ],
  injectables: [
    ClientService,
    LetheanDownloadService,
      clientService
  ],
})
export class IOModule {}
