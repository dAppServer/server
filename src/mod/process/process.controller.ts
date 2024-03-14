import { Controller, Post, Body, Param, WebSocket } from "https://deno.land/x/danet/mod.ts";
import { WebSocketController } from "https://deno.land/x/danet/src/router/websocket/decorator.ts";
import { Tag } from "https://deno.land/x/danet_swagger/decorators.ts";
import { ProcessService } from "./process.service.ts";
import { ProcessAddDTO, ProcessKillDTO, ProcessRunDTO, ProcessStartDTO, ProcessStopDTO } from "./process.interface.ts";
import {OnWebSocketMessage} from "https://deno.land/x/danet@2.3.0/src/router/websocket/decorator.ts";

@Tag( "Process" )
@Controller("process" )
export class ProcessController  {
  constructor(private process: ProcessService) {}

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
