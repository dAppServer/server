import { Module } from "/deps.ts";
import { FileSystemService } from "/modules/io/filesystem/fileSystemService.ts";
import { FileSystemController } from "/modules/io/filesystem/local.controller.ts";
import { DownloadController } from "/modules/io/tcp/download.controller.ts";
import { LetheanDownloadService } from "/modules/io/tcp/download.service.ts";
import { ProcessController } from "/modules/io/process/process.controller.ts";
import { ProcessManager } from "/modules/io/process/process.service.ts";

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
