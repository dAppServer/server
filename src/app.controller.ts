import { Controller, Get, Logger } from "../deps.ts";
import { ZeroMQServer } from "./services/ipc/zeromq.ts";
import { LetheanWebsocketServer } from "./services/tcp/websocket.server.ts";
//import { AuthRouter } from "./modules/auth/auth.controller.ts";
//import { ZeroMQServer } from "./services/ipc/zeromq.ts";
//import { LetheanWebsocketServer } from "./services/tcp/websocket.server.ts";
import { OpenPGPService } from "./services/crypt/openpgp.ts";
import { QuasiSalt } from "./services/crypt/quasi-salt.ts";
import { FileSystemService } from "./services/fileSystemService.ts";
//import { loggerMiddleware } from "./middleware/logger.ts";
//import { requestIdMiddleware } from "./middleware/request-id.ts";
//import { timingMiddleware } from "./middleware/timing.ts";
//import { JWTAuthMiddleware } from "./middleware/jwt-auth.ts";
//import { errorMiddleware } from "./middleware/error.ts";
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

  private logger: Logger = new Logger('LetheanServer');

  constructor(private fileService: FileSystemService, private openpgp: OpenPGPService) {

    this.checkServer().then(r => {
      ZeroMQServer.startServer();
      LetheanWebsocketServer.startServer();
    });
    
//
//    this.app.use(async (context: Context, next: any) => {
//      try {
//        await context.send({
//          root: `${Deno.cwd()}/apps`
//        });
//      } catch {
//        await next();
//      }
//    });
  }

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

  /**
   * Badly named "pre-load everything we must load + user has asked to be booted"
   *
   * This MUST be run ONLY ONCE on BOOT, never adjusted or run again until reboot.
   * Everything loaded here MUST be immutable, runtime changes is considered a security signal.
   *
   * @todo Warm up stage loading tasks
   *  - add ability for apps to load into the routing table to itw3 package standard
   *
   */
//  baseRoutes() {
//
//    this.app.use(requestIdMiddleware);
//    this.app.use(loggerMiddleware);
//    this.app.use(timingMiddleware);
//
//    this.app.use(errorMiddleware);
//  }

  /**
   * Environment check, to ensure its safe, disallow non user paths if not admin/sys user etc
   *
   * @todo checkServer tasks
   * - move checks to their relevant app/core domains, scan dirs, BUT: dont cross the streams, let external apps have their own load after the software
   *
   * @returns {Promise<void>}
   */
  @Get("/check")
  async checkServer() {
    const error = [];
    try {

      this.logger.log(`[SERVER] Dir: ${Deno.cwd()}`)
      // check the base folders exsists, can be done better later
      if (!this.fileService.isDir('wallets')) {
        this.fileService.ensureDir('wallets')
      }
      if (!this.fileService.isDir('apps')) {
        this.fileService.ensureDir('apps')
      }
      if (!this.fileService.isDir('conf')) {
        this.fileService.ensureDir('conf')
      }
      if (!this.fileService.isDir('cli')) {
        this.fileService.ensureDir('cli')
      }
      if (!this.fileService.isDir('data')) {
        this.fileService.ensureDir('data')
      }

      if (Deno.env.get("LETHEAN_SECURITY_CHECK") === "false") {
        this.logger.log("[SERVER] Security check disabled");
      }
      // create OpenPGP keypair if non found for the installed path
      if (!this.fileService.isFile("users/server.lthn.pub")) {
        this.logger.log("[SECURITY] Missing Server keypair, Generating...");
        await this.openpgp.createServerKeyPair();
      }

      if (!this.fileService.isFile("users/server.lthn.key")) {
        this.logger.error("Missing Server private key, Exiting...");
        Deno.exit(1);
      }

      if (!this.fileService.isFile("users/server.lthn.pub")) {
        this.logger.error("Missing Server public key, Exiting...");
        Deno.exit(1);
      }
      // check to see if we are able to unlock the private key for the paths OpenPGP key
      if (
        this.fileService.isFile("users/server.lthn.pub")
      ) {
        this.logger.log("[SERVER] Server.pub found, checking password");
        const password = QuasiSalt.hash(
          this.fileService.path("users/server.lthn.pub")
        );

        if (await this.openpgp.getPrivateKey("server", password)) {
          this.logger.log("[SERVER] Keypair unlocked OK");
        } else {
          this.logger.error("[SERVER] Server.pub not found");
          Deno.exit(1);
        }
      } else {
        this.logger.error("[SERVER] Server.pub not found");
        Deno.exit(1);
      }


    } catch (error) {
      this.logger.error(error.toString());
      this.logger.error("[SECURITY] Failed to ensure safe environment, shutting down...");
      Deno.exit(1);
    }

  }
}
