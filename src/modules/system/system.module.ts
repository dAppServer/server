import { Module } from "../../../deps.ts";
import { SystemFilesController } from "./files/local.ts";
import { SystemUpdateController } from "../../modules/system/update.controller.ts";
import { SystemDataConfigController } from "../../modules/system/data/config.controller.ts";
import { FileSystemService } from "../../services/fileSystemService.ts";

@Module({
  controllers: [SystemFilesController, SystemUpdateController, SystemDataConfigController],
  providers: [FileSystemService]
})
export class SystemModule {}
