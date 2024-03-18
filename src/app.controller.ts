import { Controller, Get, Res } from "https://deno.land/x/danet/mod.ts";
import { Tag } from "https://deno.land/x/danet_swagger/decorators.ts";
import { ZeroMQServerService } from "./mod/io/protocols/websocket/zeromq/server.service.ts";
import { LetheanWebsocketServer } from "./mod/io/protocols/websocket/websocket.server.ts";
import {ModIoFsLocalService} from "./mod/io/fs/local/service.ts";

/**
 * Main system boot, the aim is to reduce lines and includes here, not functionality.
 * adding is fine, if it MUST go here (more of a note to Snider than reader)
 */
@Controller("")
export class BaseController {

  constructor(private fs: ModIoFsLocalService) {
    ZeroMQServerService.startServer();
    LetheanWebsocketServer.startServer();

  }
  @Tag("Info")
  @Get("/h")
  welcomePage(@Res() res): string {
    const file = 'dappui/dist/dappui/browser/index.html'
    if(this.fs.isFile(file)){
        const html = this.fs.read(file);
        res.headers.append( 'Content-Type', 'text/html')
        return html ? html : 'Welcome to the ITW3 API'
    }
    return "Welcome to the ITW3 API";
  }
}
