import { Injectable, Controller, Get, Body, Post, Params, Context } from "../../../../deps.ts";
import { FileSystemService } from "../../../services/fileSystemService.ts";
import { os, path } from "../../../../deps.ts";
import { IniService } from "../../../services/config/ini.service.ts";
import { ProcessManager } from "../../../services/process/process.service.ts";
import { ProcessManagerRequest } from "../../../services/process/processManagerRequest.ts";

@Controller("daemon")

export class ChainLetheanController {


  @Post("/start")
  async startLetheanDaemon(
    @Body("ticker") ticker: string,
    @Body("logDir") logDir: string,
    @Body("configFile") configFile: string,
    @Body("dataDir") dataDir: string,
    ) {

    if(!ticker) {
      ticker = "LTHN";
    }

    if(!logDir) {
      logDir = "logs";
    }

    if(!configFile) {
      configFile = "config.ini";
    }
    if(!dataDir) {
      dataDir = "data";
    }

    let exeFile = `letheand${os.platform() === "windows" ? ".exe" : ""}`;
    let cmd: any = {}
    if (configFile !== undefined) {
      configFile = [
        "conf",
        configFile,
      ].join("/");

      if (!FileSystemService.isFile(configFile)) {
        console.info(`Config file ${configFile} not found`);
        if (!FileSystemService.isDir(path.join(Deno.cwd(), "conf"))) {
          FileSystemService.ensureDir(path.join(Deno.cwd(), "conf"));
        }
        FileSystemService.write(
          configFile,
          new IniService().stringify({
            'log-file': logDir,
            "data-dir": dataDir,
          }),
        );
      }

      cmd['configFile'] = configFile;

    }

    exeFile = path.join(
      Deno.cwd(),
      "cli",
      exeFile,
    );

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
    return true
  }

  @Post("/json_rpc")
  async jsonRpc(context: Context, @Body() body: any) {
    //console.log(body)
    let url = 'json_rpc'
    if(body['url']){
      url = body['url'];
    }
    try {
      const postReq = await fetch(
        `http://127.0.0.1:48782/${url}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body['req']),
        },
      );

      return await postReq.text();

      //return await postReq.text();
    } catch (error) {
      console.warn(error);
    }

  }
}
