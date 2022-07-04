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
import { DockerRouter } from "./modules/docker/docker.controller.ts";
import { XmrigRouter } from "./modules/mining/xmrig/xmrig.controller.ts";
import { MoneroDaemonRouter } from "./modules/chain/xmr/daemon.controller.ts";

export class AppController {

  public app = new Application();

  router = new Router()


  constructor() {

    this.baseRoutes()
    this.moduleRoutes()
  }

  async startServer() {

await this.checkServer()

    const port = Number(Deno.env.get("PORT") || 36911);
    ZeroMQServer.startServer();
    LetheanWebsocketServer.startServer();

    console.log(`Starting: http://localhost:${port}`);
    await this.app.listen({ hostname: "localhost", port: port });
  }
  moduleRoutes(){

    this.app.use(AuthRouter.routes(), AuthRouter.allowedMethods())
    this.app.use(FileSystemRouter.routes(), FileSystemRouter.allowedMethods())
    this.app.use(LetheanDaemonRouter.routes(), LetheanDaemonRouter.allowedMethods())
    this.app.use(LetheanRPCRouter.routes(), LetheanRPCRouter.allowedMethods())
    this.app.use(SystemUpdateRouter.routes(), SystemUpdateRouter.allowedMethods())
    this.app.use(SystemDataConfigRouter.routes(), SystemDataConfigRouter.allowedMethods())
    this.app.use(DockerRouter.routes(), DockerRouter.allowedMethods())
    this.app.use(XmrigRouter.routes(), XmrigRouter.allowedMethods())
    this.app.use(MoneroDaemonRouter.routes(), MoneroDaemonRouter.allowedMethods())
  }

  baseRoutes(){
    this.router.get("/", (ctx: Context) => {
      ctx.response.body = new Date().toString();
    })


    this.app.use(corsMiddleware)
    this.app.use(requestIdMiddleware)
    this.app.use(loggerMiddleware)
    this.app.use(timingMiddleware)

    this.app.use(errorMiddleware)
  }

  async checkServer() {
    try {
      if (Deno.env.get("LETHEAN_SECURITY_CHECK") === "false") {
        console.info("[SERVER] Security check disabled");
      }

      if (!FileSystemService.isFile("users/server.lthn.pub")) {
        console.info("[SECURITY] Missing Server keypair, Generating...");
        await CryptOpenPGP.createServerKeyPair();
      }

      if (!FileSystemService.isFile("users/server.lthn.key")) {
        throw new Error("Missing Server private key, Exiting...");
      }

      if (!FileSystemService.isFile("users/server.lthn.pub")) {
        throw new Error("Missing Server public key, Exiting...");
      }

      if (
        FileSystemService.isFile("users/server.lthn.pub")
      ) {
        console.info("[SERVER] Server.pub found, checking password");
        const password = QuasiSalt.hash(FileSystemService.path("users/server.lthn.pub"));

        if (await CryptOpenPGP.getPrivateKey("server", password)) {
          console.info("[SERVER] Keypair unlocked OK");
        } else {
          throw new Error("[SERVER] Keypair failed, exiting");
        }
      } else {
        throw new Error("[SERVER] Server.pub not found");
      }
    } catch (error) {
      console.error(
        "[SECURITY] Failed to ensure safe environment, shutting down...",
        error
      );

      console.error(error);
       Deno.exit(1);
    }
  }
}
