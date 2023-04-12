import { Body, Controller, path, Post, Tag } from "/deps.ts";
import { FileSystemService } from "/modules/io/filesystem/fileSystemService.ts";
import { ProcessManager } from "/modules/io/process/process.service.ts";
import { ProcessManagerRequest } from "/modules/io/process/process.interface.ts";
import { BlockchainLetheanWalletStartDTO } from "/modules/chain/lthn/lethean.interface.ts";

@Tag("blockchain")
@Controller("blockchain/lethean")
export class LetheanWalletController {
  constructor(private process: ProcessManager,
              private fileSystem: FileSystemService) {
  }

  @Post("wallet/start")
  startWallet(@Body() body: BlockchainLetheanWalletStartDTO) {
    const exeFile = "lethean-wallet-rpc" +
      (Deno.build.os === "windows" ? ".exe" : "");

    body["walletDir"] = this.fileSystem.path(body["walletDir"]);
    this.process.run(
      path.join(
        Deno.cwd(),
        "cli",
        "lthn",
        exeFile
      ),
      body,
      {
        key: exeFile.split("/").pop(),
        stdErr: (stdErr: unknown) => console.log(stdErr),
        stdIn: (stdIn: unknown) => console.log(stdIn),
        stdOut: (stdOut: unknown) => console.log(stdOut)
      } as ProcessManagerRequest
    );
  }

  @Post("wallet/json_rpc")
  async walletJsonRpc(@Body() body: any) {
    let url = "json_rpc";
    if (body["url"]) {
      url = body["url"];
    }
    const postReq = await fetch(
      `http://127.0.0.1:36963/${url}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      }
    );

    return await postReq.text();
  }

}
