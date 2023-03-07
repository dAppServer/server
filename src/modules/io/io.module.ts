import { Module } from "../../../deps.ts";
import { FileSystemService } from "./filesystem/fileSystemService.ts";
import { FileSystemController } from "./filesystem/local.controller.ts";
import { DownloadController } from "./tcp/download.controller.ts";
import { LetheanDownloadService } from "./tcp/download.service.ts";
import { ProcessController } from "./process/process.controller.ts";
import { ProcessManager } from "./process/process.service.ts";

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
