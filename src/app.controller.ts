import { FileSystemService } from "./services/fileSystemService.ts";
import { Application, Context, Router } from "../deps.ts";
import { AuthRouter } from "./modules/auth/auth.controller.ts";
import { ZeroMQServer } from "./services/ipc/zeromq.ts";
import { LetheanWebsocketServer } from "./services/tcp/websocket.server.ts";
import { CryptOpenPGP } from "./services/crypt/openpgp.ts";
import { QuasiSalt } from "./services/crypt/quasi-salt.ts";
import { loggerMiddleware } from "./middleware/logger.ts";
import { requestIdMiddleware } from "./middleware/request-id.ts";
import { timingMiddleware } from "./middleware/timing.ts";
import { JWTAuthMiddleware } from "./middleware/jwt-auth.ts";
import { errorMiddleware } from "./middleware/error.ts";
import { FileSystemRouter } from "./modules/system/files/local.ts";
import { corsMiddleware } from "./middleware/cors.ts";
import { LetheanDaemonRouter } from "./modules/chain/lthn/daemon.controller.ts";
import { SystemUpdateRouter } from "./modules/system/update.controller.ts";
import { SystemDataConfigRouter } from "./modules/system/data/config.controller.ts";
import { LetheanRPCRouter } from "./modules/chain/lthn/rpc.controller.ts";
//import { DockerRouter } from "./modules/docker/docker.controller.ts";
import { XmrigRouter } from "./modules/mining/xmrig/xmrig.controller.ts";
import { MoneroDaemonRouter } from "./modules/chain/xmr/daemon.controller.ts";
import { AppManagerRouter } from "./modules/apps/manager.controller.ts";
import { SystemBrowserRouter } from "./modules/browser/window.controller.ts";

/**
 * Main system boot, the aim is to reduce lines and includes here, not functionality.
 * adding is fine, if it MUST go here (more of a note to Snider than reader)
 */
export class AppController {
  public app = new Application();

  router: Router = new Router();
  port = 36911;
  loadSockets = true;

  constructor(args?: any) {

    if (args && args.port) {
      console.log(args);
      this.port = args.port;
      this.loadSockets = false;
    }
    this.baseRoutes();
    this.moduleRoutes();

    this.app.use(async (context: Context, next: any) => {
      try {
        await context.send({
          root: `${Deno.cwd()}/apps`
        });
      } catch {
        await next();
      }
    });
  }

  async startServer() {
    await this.checkServer();
    if (this.loadSockets) {
      ZeroMQServer.startServer();
      LetheanWebsocketServer.startServer();
    }


    console.log(`Starting: http://localhost:${this.port}`);
    await this.app.listen({ hostname: "localhost", port: this.port });
  }

  /**
   * Module loader
   * @todo Changes needed to this function
   *  - Add routing instructions to the itw3 package standard
   *  - register watcher to load/unload new apps into the routing table
   *  - register error middleman if in dev mode
   *  - AppRouterFactory - abstract class to enforce core functionality
   */
  moduleRoutes() {
    this.router.use(AuthRouter.routes(), AuthRouter.allowedMethods());
    this.router.use(FileSystemRouter.routes(), FileSystemRouter.allowedMethods());
    this.router.use(
      LetheanDaemonRouter.routes(),
      LetheanDaemonRouter.allowedMethods()
    );
    this.router.use(LetheanRPCRouter.routes(), LetheanRPCRouter.allowedMethods());
    this.router.use(
      SystemUpdateRouter.routes(),
      SystemUpdateRouter.allowedMethods()
    );
    this.router.use(
      SystemDataConfigRouter.routes(),
      SystemDataConfigRouter.allowedMethods()
    );
//    this.app.use(DockerRouter.routes(), DockerRouter.allowedMethods());
    this.router.use(AppManagerRouter.routes(), AppManagerRouter.allowedMethods());
    this.router.use(XmrigRouter.routes(), XmrigRouter.allowedMethods());
    this.router.use(
      MoneroDaemonRouter.routes(),
      MoneroDaemonRouter.allowedMethods()
    );

    this.app.use(this.router.routes(), this.router.allowedMethods())
    console.info(`Loaded Routes`)
  }

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
  baseRoutes() {

    this.app.use(corsMiddleware);
    this.app.use(requestIdMiddleware);
    this.app.use(loggerMiddleware);
    this.app.use(timingMiddleware);

    this.app.use(errorMiddleware);
  }

  /**
   * Environment check, to ensure its safe, disallow non user paths if not admin/sys user etc
   *
   * @todo checkServer tasks
   * - move checks to their relevant app/core domains, scan dirs, BUT: dont cross the streams, let external apps have their own load after the software
   *
   * @returns {Promise<void>}
   */
  async checkServer() {
    const error = [];
    try {

      console.info(`[SERVER] Dir: ${Deno.cwd()}`)
      // check the base folders exsists, can be done better later
      if (!FileSystemService.isDir('wallets')) {
        FileSystemService.ensureDir('wallets')
      }
      if (!FileSystemService.isDir('apps')) {
        FileSystemService.ensureDir('apps')
      }
      if (!FileSystemService.isDir('conf')) {
        FileSystemService.ensureDir('conf')
      }
      if (!FileSystemService.isDir('cli')) {
        FileSystemService.ensureDir('cli')
      }
      if (!FileSystemService.isDir('data')) {
        FileSystemService.ensureDir('data')
      }

      if (Deno.env.get("LETHEAN_SECURITY_CHECK") === "false") {
        console.info("[SERVER] Security check disabled");
      }
      // create OpenPGP keypair if non found for the installed path
      if (!FileSystemService.isFile("users/server.lthn.pub")) {
        console.info("[SECURITY] Missing Server keypair, Generating...");
        await CryptOpenPGP.createServerKeyPair();
      }

      if (!FileSystemService.isFile("users/server.lthn.key")) {
        error.push("Missing Server private key, Exiting...");
      }

      if (!FileSystemService.isFile("users/server.lthn.pub")) {
        error.push("Missing Server public key, Exiting...");
      }
      // check to see if we are able to unlock the private key for the paths OpenPGP key
      if (
        FileSystemService.isFile("users/server.lthn.pub")
      ) {
        console.info("[SERVER] Server.pub found, checking password");
        const password = QuasiSalt.hash(
          FileSystemService.path("users/server.lthn.pub")
        );

        if (await CryptOpenPGP.getPrivateKey("server", password)) {
          console.info("[SERVER] Keypair unlocked OK");
        } else {
          error.push("[SERVER] Server.pub not found");
        }
      } else {
        error.push("[SERVER] Server.pub not found");
      }


    } catch (error) {
      error.push("[SECURITY] Failed to ensure safe environment, shutting down...");
    }

    if (error.length > 0) {
      error.forEach((item: string) => console.error);
      Deno.exit(1);
    }
  }
}
