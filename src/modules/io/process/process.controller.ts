import { Controller, Post, Body, Tag } from "../../../../deps.ts";
import { ProcessManager } from "./process.service.ts";
import { ProcessAddDTO, ProcessKillDTO, ProcessRunDTO, ProcessStartDTO, ProcessStopDTO } from "./process.interface.ts";

@Tag( "Process" )
@Controller("process" )
export class ProcessController  {
  constructor(private process: ProcessManager) {}


  @Post("run")
  runProcess(@Body() body: ProcessRunDTO) {
    return this.process.run(body.command, body.args, body.options);
  }


  @Post("add")
  addProcess(@Body() body: ProcessAddDTO) {
    return this.process.addProcess(body);
  }


  @Post("start")
  startProcess(@Body() body: ProcessStartDTO) {
    return this.process.startProcess(body.key);
  }

  @Post("stop")
  stopProcess(@Body() body: ProcessStopDTO) {
    return this.process.stopProcess(body.key);
  }


  @Post("kill")
  killProcess(@Body() body: ProcessKillDTO) {
    return this.process.killProcess(body.key);
  }

}
