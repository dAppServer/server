import { Context, HttpException, os, path, Router } from "../../../../deps.ts";

import { XmrigService } from "./xmrig.service.ts";
import { FileSystemService } from "src/modules/io/filesystem/fileSystemService.ts";
import { ProcessManager } from "../../io/process/process.service.ts";
import { ProcessInterface } from "src/modules/io/process/process.interface.ts";

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

    exeFile = FileSystemService.path(["cli", "xmrig", "xmrig-6.18.0", exeFile]);

    req['config'] = FileSystemService.path(["conf", "xmrig", "config.json"]);

    if(req['logFile']){
      req['logFile'] = FileSystemService.path(req['logFile']);
    }

    req['httpPort'] = "36979"
    //req['cpuMaxThreadsHint'] = '50'
//    args['httpPort'] = '36979'
//    args['httpHost'] = 'localhost' --tls --tls-fingerprint 420c7850e09b7c0bdcf748a7da9eb3647daf8515718f36d9ccfdd6b9ff834b14
    req['httpAccessToken'] = 'dave1wasneverhere'
    if(req['url'].startsWith('pool.hashvault.pro')){
      //req['tls'] = true
      //req['tlsFingerprint'] = '420c7850e09b7c0bdcf748a7da9eb3647daf8515718f36d9ccfdd6b9ff834b14'
    }

    ProcessManager.run(
      exeFile,
      req,
      {
        key: exeFile.split("/").pop(),
        stdErr: (stdErr: unknown) => console.log(stdErr),
        stdIn: (stdIn: unknown) => console.log(stdIn),
        stdOut: (stdOut: unknown) => console.log(stdOut),
      } as ProcessInterface,
    );
    context.response.body = JSON.stringify({ "result": true });
  } catch (e) {
    throw new HttpException("Not Found", 404);
  }
});

XmrigRouter.post("/mining/xmrig/api", async (context: Context) => {
  const body = context.request.body({ type: "json" });
  const req = await body.value;
  let endpoint = "/2/summary";
  if (req["endpoint"]) {
    endpoint = req["endpoint"];
  }
  let method = "GET"
  if (req["method"]) {
    method = req["method"];
  }
  try {
    // console.log(url, req)
    const postReq = await fetch(
      `http://127.0.0.1:36979${endpoint}`,
      {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer dave1wasneverhere"
        },
        body: JSON.stringify(req['request']),
      },
    );
    context.response.status = 200;
    context.response.body = await postReq.text();
    // console.log(context.response.body)
  } catch (error) {
    return false;
  }
});



export { XmrigRouter };
