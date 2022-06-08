import { Module } from "../deps.ts";
import { AppController } from "./app.controller.ts";
import { ChainLetheanModule } from "./modules/chain/lthn/lthn.module.ts";
import { SystemModule } from "./modules/system/system.module.ts";
import { FileSystemService } from "./services/fileSystemService.ts";

@Module({
  imports: [
//    UserModule,
    ChainLetheanModule,
    SystemModule,
  ],
  providers: [
    FileSystemService
  ],
  controllers: [AppController],
})
export class AppModule {}
