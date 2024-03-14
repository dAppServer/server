import { ProcessManagerRequest } from "./process.interface.ts";
import { Sub } from "https://deno.land/x/jszmq@v1.3.1/mod.ts";
import {ZeroMQServerService} from "@mod/io/protocols/websocket/zeromq/server.service.ts";
import { readLines } from "https://deno.land/std@0.220.0/io/mod.ts";
import { EventEmitterModule, EventEmitter } from 'https://deno.land/x/danet/mod.ts'
const eventEmitter = new EventEmitter()
/**
 * Interacts with the external binary directly handling its stdIn, stdOut, stdErr
 * its a async event emitter that mimicks NodeJs's event emitter
 */
export class ProcessManagerProcess  {
  private request;

  public process: any;

  /**
   * @param {ProcessManagerRequest} request
   */
  constructor(request: ProcessManagerRequest) {

    this.request = request;
  }

  /**
   * Starts the src
   */
  public async run() {
    const processArgs: any = {
      cmd: this.request.command,
    };

    // check if we have a stdIn
    if (this.request.stdIn) {
      processArgs["stdin"] = "piped";
    }
    // check if we have a stdOut
    if (this.request.stdOut) {
      processArgs["stdout"] = "piped";
    }
    // check if we have a stdIn
    if (this.request.stdErr) {
      processArgs["stderr"] = "piped";
    }
    console.log(processArgs);

    try {
      const process = Deno.run(processArgs);
      // const sock = new Sub();
      const that = this;
      // sock.connect("ws://127.0.0.1:36910/pub");
      // await sock.subscribe(`${this.request.key}-stdIn`);
      // console.log(`Subscribed to ${this.request.key}-stdIn/pub`);
      // sock.on("message", function (endpoint, topic, message) {
      //   if (topic.toString() === `${that.request.key}-stdIn`) {
      //     //console.log(that.src);
      //     if (process.stdin) {
      //       that.request.stdOut(message.toString());
      //       process.stdin.write(message);
      //     }
      //   }
      // });
      if (this.request.stdOut) {
        //@ts-ignore
        for await (const line of readLines(process.stdout)) {
          if (line.trim()) {
            console.log(line.toString());
            eventEmitter.emit("stdout", line);
            // that.request.stdOut();
            //  ZeroMQServerService.sendPubMessage(that.request.key, line);
            // super.emit("stdout", line);
          }
        }
      }

      if (this.request.stdErr) {
        //@ts-ignore
        for await (const line of readLines(process.stderr)) {
          if (line.trim()) {
            console.error(line.toString());
            eventEmitter.emit("stderr", line);
            // that.request.stdErr(line.toString());
            //  ZeroMQServerService.sendPubMessage(that.request.key, line);
            //super.emit("stderr", line);
          }
        }
      }

      //  super.emit("end", 0);
      return process;
    } catch (e) {
      console.log(e);
      //e.preventDefault();
    }
  }
}
