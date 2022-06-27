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

  req['walletDir'] = FileSystemService.path(req['walletDir'])
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
  context.response.body =  'started'
});

LetheanRPCRouter.post("/daemon/wallet/json_rpc", async (context: Context) => {

    const body = context.request.body({ type: "json" });
    const req = await body.value;
    let url = 'json_rpc'
    if (req['url']) {
      url = req['url'];
    }
    try {
      const postReq = await fetch(
        `http://127.0.0.1:36963/${url}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req['req']),
        },
      );

      context.response.body = await postReq.text();
     // console.log(req)
    } catch (error) {
      return false
    }
  }
)

export { LetheanRPCRouter }
