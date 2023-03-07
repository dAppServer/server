import { Module } from "../../../deps.ts";
import { LetheanDaemonController } from "./lthn/daemon.controller.ts";
import { LetheanWalletController } from "./lthn/wallet.controller.ts";
import { FileSystemService } from "../io/filesystem/fileSystemService.ts";
import { ProcessManager } from "../io/process/process.service.ts";

@Module({
  controllers: [
    LetheanDaemonController,
    LetheanWalletController
  ],
  injectables: [
    FileSystemService,
    ProcessManager
  ],
})
export class ChainsModule {}
