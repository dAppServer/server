import { Context, HttpException, os, path, Router } from "../../../../deps.ts";
import { FileSystemService } from "../../../services/fileSystemService.ts";
import { IniService } from "../../../services/config/ini.service.ts";
import { ProcessManager } from "../../../services/process/process.service.ts";
import { ProcessManagerRequest } from "../../../services/process/processManagerRequest.ts";

const LetheanRPCRouter = new Router();

LetheanRPCRouter.post("/daemon/wallet/rpc", async (context: Context) => {
  const body = context.request.body({ type: "json" });
  const req = await body.value;
  const exeFile = "lethean-wallet-rpc" +
    (os.platform() === "windows" ? ".exe" : "");

  ProcessManager.run(
    path.join(
      Deno.cwd(),
      "cli",
      exeFile,
    ),
    req,
    {
      key: exeFile.split("/").pop(),
      stdErr: (stdErr: unknown) => console.log(stdErr),
      stdIn: (stdIn: unknown) => console.log(stdIn),
      stdOut: (stdOut: unknown) => console.log(stdOut),
    } as ProcessManagerRequest,
  );

});

export { LetheanRPCRouter }
