import { Context, HttpException, os, path, Router } from "../../../../deps.ts";
import { FileSystemService } from "../../../services/fileSystemService.ts";
import { IniService } from "../../../services/config/ini.service.ts";
import { ProcessManager } from "../../../services/process/process.service.ts";
import { ProcessManagerRequest } from "../../../services/process/processManagerRequest.ts";

const LetheanDaemonRouter = new Router();

LetheanDaemonRouter.post("/daemon/start", async (context: Context) => {
  try {

    const body = context.request.body({ type: "json" });
    const req = await body.value;

    let exeFile = `letheand${os.platform() === "windows" ? ".exe" : ""}`;

    let cmd: any = {}

    const configFile = FileSystemService.path(["conf", req.configFile]);

    if (!FileSystemService.isFile(req.configFile)) {
      console.info(`Config file ${req.configFile} not found`);
      if (!FileSystemService.isDir(path.join(Deno.cwd(), "conf"))) {
        FileSystemService.ensureDir(path.join(Deno.cwd(), "conf"));
      }
      FileSystemService.write(
        configFile,
        new IniService().stringify({
          'log-file': req.logDir,
          "data-dir": req.dataDir,
        }),
      );
    }

    cmd['configFile'] = configFile;


    exeFile = FileSystemService.path(['cli', exeFile])

    ProcessManager.run(
      exeFile,
      cmd,
      {
        key: exeFile.split("/").pop(),
        stdErr: (stdErr: unknown) => console.log(stdErr),
        stdIn: (stdIn: unknown) => console.log(stdIn),
        stdOut: (stdOut: unknown) => console.log(stdOut),
      } as ProcessManagerRequest,
    );
    context.response.body = JSON.stringify({"result": true});

  } catch (e) {
    throw new HttpException("Not Found", 404);
  }

});

LetheanDaemonRouter.post("/daemon/json_rpc", async (context: Context) => {

    const body = context.request.body({ type: "json" });
    const req = await body.value;
    let url = 'json_rpc'
    if(req['url']){
      url = req['url'];
    }
    try {
      const postReq = await fetch(
        `http://127.0.0.1:48782/${url}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req['req']),
        },
      );

      context.response.body = await postReq.text();
    } catch (error) {
      return false
    }

  })

LetheanDaemonRouter.post("/daemon/export", async (context: Context) => {

  const body = context.request.body({ type: "json" });
  const req = await body.value;

  const exeFile = "lethean-blockchain-export" +
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

LetheanDaemonRouter.post("/daemon/import", async (context: Context) => {

  const body = context.request.body({ type: "json" });
  const req = await body.value;

  const exeFile = `lethean-blockchain-import${
    os.platform() === "windows" ? ".exe" : ""
  }`;

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

export { LetheanDaemonRouter }
