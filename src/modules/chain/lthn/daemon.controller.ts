import { Body, Controller, Options, os, path, Post, Tag } from "../../../../deps.ts";
import { FileSystemService } from "../../io/filesystem/fileSystemService.ts";
import { IniService } from "../../config/ini/ini.service.ts";
import { ProcessManager } from "../../io/process/process.service.ts";
import { ProcessManagerRequest } from "../../io/process/process.interface.ts";
import { BlockchainLetheanDaemonStartDTO, BlockchainLetheanRPCDTO } from "./lethean.interface.ts";

@Tag("blockchain")
@Controller("blockchain/lethean")
export class LetheanDaemonController {

  constructor(private process: ProcessManager,
              private fileSystem: FileSystemService,
              private ini: IniService) {
  }

  @Post("daemon/start")
  startDaemon(@Body() body: BlockchainLetheanDaemonStartDTO) {
    let exeFile = `letheand${os.platform() === "windows" ? ".exe" : ""}`;
    let cmd: any = {};

    const configFile = this.fileSystem.path(path.join("conf", "lthn", body.configFile));

    if (!this.fileSystem.isFile(path.join("conf", "lthn", body.configFile))) {
      console.info(`Config file ${configFile} not found`);
      if (!this.fileSystem.isDir(path.join("conf", "lthn"))) {
        this.fileSystem.ensureDir(path.join("conf", "lthn"));
      }
      this.fileSystem.write(
        configFile,
        this.ini.stringify({
          "log-file": body.logDir,
          "data-dir": body.dataDir
        })
      );
    }
    cmd["configFile"] = configFile;

    exeFile = this.fileSystem.path(["cli", exeFile]);

    return this.process.run(
      exeFile,
      cmd,
      {
        key: exeFile.split("/").pop(),
        stdErr: (stdErr: unknown) => console.log(stdErr),
        stdIn: (stdIn: unknown) => console.log(stdIn),
        stdOut: (stdOut: unknown) => console.log(stdOut)
      } as ProcessManagerRequest
    );

  }

  @Options("daemon/start")
  test() {}
  @Post("daemon/json_rpc")
  async jsonRpc(@Body() body: BlockchainLetheanRPCDTO) {
    let url = "json_rpc";
    if (body["url"]) {
      url = body["url"];
    }

    const postReq = await fetch(
      `http://127.0.0.1:48782/${url}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body["req"])
      }
    );
    return await postReq.text();

  }

  @Options("daemon/json_rpc")
  test2() {}
  @Post("daemon/export")
  exportBlockchain(@Body() body: any) {
    const exeFile = `lethean-blockchain-export${
      os.platform() === "windows" ? ".exe" : ""
    }`;
    this.process.run(
      this.fileSystem.path(["cli", exeFile]),
      body,
      {
        key: exeFile.split("/").pop(),
        stdErr: (stdErr: unknown) => console.log(stdErr),
        stdIn: (stdIn: unknown) => console.log(stdIn),
        stdOut: (stdOut: unknown) => console.log(stdOut)
      } as ProcessManagerRequest
    );
  }

  @Options("daemon/export")
  test3() {}
  @Post("daemon/import")
  importBlockchain(@Body() body: any) {
    const exeFile = `lethean-blockchain-import${
      os.platform() === "windows" ? ".exe" : ""
    }`;
    this.process.run(
      this.fileSystem.path(["cli", exeFile]),
      body,
      {
        key: exeFile.split("/").pop(),
        stdErr: (stdErr: unknown) => console.log(stdErr),
        stdIn: (stdIn: unknown) => console.log(stdIn),
        stdOut: (stdOut: unknown) => console.log(stdOut)
      } as ProcessManagerRequest
    );
  }
  @Options("daemon/import")
  test4() {}


}

