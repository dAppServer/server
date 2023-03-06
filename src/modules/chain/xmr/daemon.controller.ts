import {
  Context,
  copy,
  decompress,
  ensureDir,
  HttpException,
  os,
  path,
  Router,
  Untar,
} from "../../../../deps.ts";
import { FileSystemService } from "src/modules/io/filesystem/fileSystemService.ts";
import { IniService } from "../../../services/config/ini.service.ts";
import { ProcessManager } from "../../../services/process/process.service.ts";
import { ProcessManagerRequest } from "../../../services/process/processManagerRequest.ts";
import {
  Destination,
  LetheanDownloadService,
} from "../../../services/download.service.ts";
import { ZeroMQServer } from "../../io/ipc/zeromq.ts";

const MoneroDaemonRouter = new Router();

MoneroDaemonRouter.post("/chain/xmr/start", async (context: Context) => {
  try {
    const body = context.request.body({ type: "json" });
    const req = await body.value;

    let exeFile = `monerod${os.platform() === "windows" ? ".exe" : ""}`;

    let cmd: any = {};

    const configFile = FileSystemService.path(["conf", req.configFile]);

    if (!FileSystemService.isFile(req.configFile)) {
      console.info(`Config file ${req.configFile} not found`);
      if (!FileSystemService.isDir(path.join(Deno.cwd(), "conf"))) {
        FileSystemService.ensureDir(path.join(Deno.cwd(), "conf"));
      }
      FileSystemService.write(
        configFile,
        new IniService().stringify({
          "log-file": req.logDir,
          "data-dir": req.dataDir,
        }),
      );
    }

    cmd["configFile"] = configFile;

    exeFile = FileSystemService.path(["cli", exeFile]);

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
    context.response.body = JSON.stringify({ "result": true });
  } catch (e) {
    throw new HttpException("Not Found", 404);
  }
});

MoneroDaemonRouter.post("/chain/xmr/json_rpc", async (context: Context) => {
  const body = context.request.body({ type: "json" });
  const req = await body.value;
  let url = "json_rpc";
  if (req["url"]) {
    url = req["url"];
  }
  try {
    const postReq = await fetch(
      `http://127.0.0.1:48782/${url}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req["req"]),
      },
    );

    context.response.body = await postReq.text();
  } catch (error) {
    return false;
  }
});

MoneroDaemonRouter.post("/chain/xmr/export", async (context: Context) => {
  const body = context.request.body({ type: "json" });
  const req = await body.value;

  const exeFile = "monero-blockchain-export" +
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

MoneroDaemonRouter.post("/chain/xmr/import", async (context: Context) => {
  const body = context.request.body({ type: "json" });
  const req = await body.value;

  const exeFile = `monero-blockchain-import${
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

MoneroDaemonRouter.post("/chain/xmr/download", async (context: Context) => {
  context.response.status = 200;
  context.response.body = "";
  const platform = os.platform();
  const base = `https://downloads.getmonero.org/cli/`;
  let url;
  switch (platform) {
    case "darwin":
      url = base + "monero-mac-x64-v0.17.3.2.tar.bz2";
      break;
    case "linux":
      url = base + "monero-linux-x64-v0.17.3.2.tar.bz2";
      break;
    case "windows":
      url = base + "monero-win-x64-v0.17.3.2.zip";
      break;
  }
  url = new URL(url);
  const filename: string = url.pathname.split("/").pop() ?? "";

  try {
    const destination: Destination = {
      file: filename,
      dir: path.join(Deno.cwd(), "cli"),
    };

    FileSystemService.ensureDir(path.join(Deno.cwd(), "cli"));

    console.info(`Attempting to download ${url}`);
    const fileObj = await LetheanDownloadService.download(url, destination);
    console.info(`Downloaded to: ${destination.dir}`);

    console.info(`Unpacking file: ${fileObj.fullPath}`);
  } catch (err) {
    console.error(err);
  }
  ZeroMQServer.sendPubMessage("update-cli", "Done");
});

export { MoneroDaemonRouter };
