import { Module } from "danet/mod.ts";
import { FileSystemService } from "@module/io/filesystem/fileSystemService.ts";
import { FileSystemController } from "@module/io/filesystem/local.controller.ts";
import { DownloadController } from "@module/io/tcp/download.controller.ts";
import { LetheanDownloadService } from "@module/io/tcp/download.service.ts";
import { ProcessController } from "@module/io/process/process.controller.ts";
import { ProcessManager } from "@module/io/process/process.service.ts";

@Module({
  controllers: [
    FileSystemController,
    DownloadController,
    ProcessController
  ],
  injectables: [
    FileSystemService,
    LetheanDownloadService,
    ProcessManager
  ],
})
export class IOModule {}
