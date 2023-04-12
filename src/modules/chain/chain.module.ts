import { Module } from "danet/mod.ts";
import { LetheanDaemonController } from "@module/chain/lthn/daemon.controller.ts";
import { LetheanWalletController } from "@module/chain/lthn/wallet.controller.ts";
import { FileSystemService } from "@module/io/filesystem/fileSystemService.ts";
import { ProcessManager } from "@module/io/process/process.service.ts";

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
