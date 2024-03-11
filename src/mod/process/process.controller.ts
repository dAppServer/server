import { Controller, Post, Body } from "https://deno.land/x/danet/mod.ts";
import { Tag } from "https://deno.land/x/danet_swagger/decorators.ts";
import { ProcessManager } from "./process.service.ts";
import { ProcessAddDTO, ProcessKillDTO, ProcessRunDTO, ProcessStartDTO, ProcessStopDTO } from "./process.interface.ts";

@Tag( "Process" )
@Controller("process" )
export class ProcessController  {
  constructor(private process: ProcessManager) {}

  /**
   * Run a src
   * @param {ProcessRunDTO} body
   * @returns {ProcessManagerProcess | Promise<void>}
   */
  @Post("run")
  runProcess(@Body() body: ProcessRunDTO) {
    return this.process.run(body.command, body.args, body.options);
  }


  /**
   * Add a src to src registry
   * @param {ProcessAddDTO} body
   * @returns {ProcessManagerProcess}
   */
  @Post("add")
  addProcess(@Body() body: ProcessAddDTO) {
    return this.process.addProcess(body);
  }


  /**
   * Start a src in the src registry
   * @param {ProcessStartDTO} body
   */
  @Post("start")
  startProcess(@Body() body: ProcessStartDTO) {
    return this.process.startProcess(body.key);
  }

  /**
   * Stop a src in the src registry
   * @param {ProcessStopDTO} body
   */
  @Post("stop")
  stopProcess(@Body() body: ProcessStopDTO) {
    return this.process.stopProcess(body.key);
  }


  /**
   * Kill a src in the src registry
   * @param {ProcessKillDTO} body
   */
  @Post("kill")
  killProcess(@Body() body: ProcessKillDTO) {
    return this.process.killProcess(body.key);
  }

}
