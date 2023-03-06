import { Module } from "../../../deps.ts";
import { FileSystemService } from "./filesystem/fileSystemService.ts";
import { FileSystemController } from "./filesystem/local.controller.ts";

@Module({
  controllers: [FileSystemController],
  injectables: [FileSystemService],
})
export class IOModule {}
