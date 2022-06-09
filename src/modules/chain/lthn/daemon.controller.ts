import { Injectable, Controller, Get, Body, Post, Params, Context, HttpException, os, path, UseGuards } from "../../../../deps.ts";
import { FileSystemService } from "../../../services/fileSystemService.ts";
import { IniService } from "../../../services/config/ini.service.ts";
import { ProcessManager } from "../../../services/process/process.service.ts";
import { ProcessManagerRequest } from "../../../services/process/processManagerRequest.ts";
import { userGuard } from "../../../middleware/user-guard.ts";

@Controller("daemon")
@UseGuards(userGuard)
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
      configFile = "letheand.conf";
    }
    if(!dataDir) {
      dataDir = "data";
    }

    let exeFile = `letheand${os.platform() === "windows" ? ".exe" : ""}`;

    let cmd: any = {}

      configFile = FileSystemService.path(["conf", configFile]);

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
    return true
  }

  @Post("/json_rpc")
  async jsonRpc(context: Context, @Body() body: any) {

    if(body === undefined){
      throw new HttpException("No Request Data", 400)
    }
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
    } catch (error) {
      return false
    }

  }
}
