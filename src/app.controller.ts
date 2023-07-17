import { Controller, Get } from "danet/mod.ts";
import { Tag } from "danetSwagger/decorators.ts";
import { ZeroMQServer } from "@module/io/ipc/zeromq.ts";
import { LetheanWebsocketServer } from "@module/io/tcp/websocket.server.ts";

/**
 * Main system boot, the aim is to reduce lines and includes here, not functionality.
 * adding is fine, if it MUST go here (more of a note to Snider than reader)
 */
@Controller("")
export class BaseController {

  constructor() {
    ZeroMQServer.startServer();
    LetheanWebsocketServer.startServer();

  }
  @Tag("Info")
  @Get("/")
  welcomePage(): string {
    return "Welcome to the ITW3 API";
  }
}
