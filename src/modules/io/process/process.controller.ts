import { Controller, Post, Body, Tag } from "../../../../deps.ts";
import { ProcessManager } from "./process.service.ts";
import { ProcessAddDTO, ProcessKillDTO, ProcessRunDTO, ProcessStartDTO, ProcessStopDTO } from "./process.interface.ts";

@Tag( "Process" )
@Controller("process" )
export class ProcessController  {
  constructor(private process: ProcessManager) {}

  /**
   * Run a process
   * @param {ProcessRunDTO} body
   * @returns {ProcessManagerProcess | Promise<void>}
   */
  @Post("run")
  runProcess(@Body() body: ProcessRunDTO) {
    return this.process.run(body.command, body.args, body.options);
  }


  /**
   * Add a process to process registry
   * @param {ProcessAddDTO} body
   * @returns {ProcessManagerProcess}
   */
  @Post("add")
  addProcess(@Body() body: ProcessAddDTO) {
    return this.process.addProcess(body);
  }


  /**
   * Start a process in the process registry
   * @param {ProcessStartDTO} body
   */
  @Post("start")
  startProcess(@Body() body: ProcessStartDTO) {
    return this.process.startProcess(body.key);
  }

  /**
   * Stop a process in the process registry
   * @param {ProcessStopDTO} body
   */
  @Post("stop")
  stopProcess(@Body() body: ProcessStopDTO) {
    return this.process.stopProcess(body.key);
  }


  /**
   * Kill a process in the process registry
   * @param {ProcessKillDTO} body
   */
  @Post("kill")
  killProcess(@Body() body: ProcessKillDTO) {
    return this.process.killProcess(body.key);
  }

}
