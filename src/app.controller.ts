import { Controller, Get, Tag } from "../deps.ts";
import { ZeroMQServer } from "./services/ipc/zeromq.ts";
import { LetheanWebsocketServer } from "./services/tcp/websocket.server.ts";
//import { AuthRouter } from "./modules/auth/auth.controller.ts";
//import { LetheanWebsocketServer } from "./services/tcp/websocket.server.ts";
import { OpenPGPService } from "./services/crypt/openpgp.ts";
import { QuasiSalt } from "./services/crypt/quasi-salt.ts";
import { FileSystemService } from "./services/fileSystemService.ts";
//import { FileSystemRouter } from "./modules/system/files/local.ts";
//import { corsMiddleware } from "./middleware/cors.ts";
//import { LetheanDaemonRouter } from "./modules/chain/lthn/daemon.controller.ts";
//import { SystemUpdateRouter } from "./modules/system/update.controller.ts";
//import { SystemDataConfigRouter } from "./modules/system/data/config.controller.ts";
//import { LetheanRPCRouter } from "./modules/chain/lthn/rpc.controller.ts";
////import { DockerRouter } from "./modules/docker/docker.controller.ts";
//import { XmrigRouter } from "./modules/mining/xmrig/xmrig.controller.ts";
//import { MoneroDaemonRouter } from "./modules/chain/xmr/daemon.controller.ts";
//import { AppManagerRouter } from "./modules/apps/manager.controller.ts";
//import { SystemBrowserRouter } from "./modules/browser/window.controller.ts";

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

  /**
   * Module loader
   * @todo Changes needed to this function
   *  - Add routing instructions to the itw3 package standard
   *  - register watcher to load/unload new apps into the routing table
   *  - register error middleman if in dev mode
   *  - AppRouterFactory - abstract class to enforce core functionality
   */
//  moduleRoutes() {
//    this.router.use(AuthRouter.routes(), AuthRouter.allowedMethods());
//    this.router.use(FileSystemRouter.routes(), FileSystemRouter.allowedMethods());
//    this.router.use(
//      LetheanDaemonRouter.routes(),
//      LetheanDaemonRouter.allowedMethods()
//    );
//    this.router.use(LetheanRPCRouter.routes(), LetheanRPCRouter.allowedMethods());
//    this.router.use(
//      SystemUpdateRouter.routes(),
//      SystemUpdateRouter.allowedMethods()
//    );
//    this.router.use(
//      SystemDataConfigRouter.routes(),
//      SystemDataConfigRouter.allowedMethods()
//    );
////    this.app.use(DockerRouter.routes(), DockerRouter.allowedMethods());
//    this.router.use(AppManagerRouter.routes(), AppManagerRouter.allowedMethods());
//    this.router.use(XmrigRouter.routes(), XmrigRouter.allowedMethods());
//    this.router.use(
//      MoneroDaemonRouter.routes(),
//      MoneroDaemonRouter.allowedMethods()
//    );
//
//    this.app.use(this.router.routes(), this.router.allowedMethods())
//    console.info(`Loaded Routes`)
//  }



}
