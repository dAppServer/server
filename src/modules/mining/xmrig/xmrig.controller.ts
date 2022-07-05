import { Context, HttpException, os, path, Router } from "../../../../deps.ts";

import { XmrigService } from "./xmrig.service.ts";
import { FileSystemService } from "../../../services/fileSystemService.ts";
import { ProcessManager } from "../../../services/process/process.service.ts";
import { ProcessManagerRequest } from "../../../services/process/processManagerRequest.ts";

const XmrigRouter = new Router();
const xmrig = new XmrigService();
XmrigRouter.get("/mining/xmrig", async (context: Context) => {
  try {
    context.response.body = "";
  } catch (e) {
    throw new HttpException("Not Found", 404);
  }
});
XmrigRouter.get("/mining/xmrig/isInstalled", async (context: Context) => {
  try {
    context.response.body = JSON.stringify({ result: xmrig.isInstalled() });
  } catch (e) {
    throw new HttpException("Not Found", 404);
  }
});
XmrigRouter.get("/mining/xmrig/downloads", async (context: Context) => {
  try {
    context.response.body = JSON.stringify(await xmrig.getReleaseDownloads());
  } catch (e) {
    throw new HttpException("Not Found", 404);
  }
});

XmrigRouter.post("/mining/xmrig/download", async (context: Context) => {
  try {
    const body = context.request.body({ type: "json" });
    const req = await body.value;

    context.response.status = 200;
    context.response.body = JSON.stringify(await xmrig.downloadXmrig(req.id));
  } catch (e) {
    throw new HttpException("Not Found", 404);
  }
});

XmrigRouter.post("/mining/xmrig/start", async (context: Context) => {
  try {
    const body = context.request.body({ type: "json" });
    const req = await body.value;

    let exeFile = `xmrig${os.platform() === "windows" ? ".exe" : ""}`;

    exeFile = FileSystemService.path(["cli", "xmrig-6.18.0", exeFile]);

    ProcessManager.run(
      exeFile,
      req,
      {
        key: exeFile.split("/").pop(),
        stdErr: (stdErr: unknown) => console.log(stdErr),
        stdIn: (stdIn: unknown) => console.log(stdIn),
        stdOut: (stdOut: unknown) => console.log(stdOut),
      } as ProcessManagerRequest,
    );
    context.response.body = JSON.stringify({ "result": true });
  } catch (e) {
    throw new HttpException("Not Found", 404);
  }
});

export { XmrigRouter };
