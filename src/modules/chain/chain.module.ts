import { Module } from "danet/mod.ts";
import { LetheanDaemonController } from "/modules/chain/lthn/daemon.controller.ts";
import { LetheanWalletController } from "/modules/chain/lthn/wallet.controller.ts";
import { FileSystemService } from "/modules/io/filesystem/fileSystemService.ts";
import { ProcessManager } from "/modules/io/process/process.service.ts";

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
