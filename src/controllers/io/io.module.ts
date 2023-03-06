import { Module } from "../../../deps.ts";
import { FileSystemService } from "../../services/fileSystemService.ts";
import { FileSystemController } from "../../controllers/io/filesystem/local.controller.ts";

@Module({
  controllers: [FileSystemController],
  injectables: [FileSystemService],
})
export class IOModule {}
