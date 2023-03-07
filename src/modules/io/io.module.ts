import { Module } from "../../../deps.ts";
import { FileSystemService } from "./filesystem/fileSystemService.ts";
import { FileSystemController } from "./filesystem/local.controller.ts";
import { DownloadController } from "./tcp/download.controller.ts";
import { LetheanDownloadService } from "./tcp/download.service.ts";

@Module({
  controllers: [
    FileSystemController,
    DownloadController
  ],
  injectables: [
    FileSystemService,
    LetheanDownloadService
  ],
})
export class IOModule {}
