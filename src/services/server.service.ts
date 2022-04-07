import { LetheanCli } from "../lethean-cli.ts";
import { ZeroMQServer } from "./ipc/zeromq.ts";
import { LetheanWebsocketServer } from "./tcp/websocket.server.ts";
import { LetheanAppServer } from "./apps/server.ts";
import { Application, os, path, Router } from "../../deps.ts";
import { FileSystemService } from "./fileSystemService.ts";
import { CryptOpenPGP } from "./crypt/openpgp.ts";
import { QuasiSalt } from "./crypt/quasi-salt.ts";
import { userGuard } from "../middleware/user-guard.ts";
import { UserRole } from "../types/user/user-role.ts";
import { JWTAuthMiddleware } from "../middleware/jwt-auth.ts";
import { errorMiddleware } from "../middleware/error.ts";
import { loggerMiddleware } from "../middleware/logger.ts";
import { timingMiddleware } from "../middleware/timing.ts";
import { requestIdMiddleware } from "../middleware/request-id.ts";
import { corsMiddleware } from "../middleware/cors.ts";

/**
 * Server Service
 *
 * @export
 * @class ServerService
 */
export class ServerService {
  constructor() {
  }

  app: Application = new Application();
  router: Router = new Router();
  home: string = (os.homeDir() ? os.homeDir() : "") as string;
  static JWT: CryptoKey
  static pathPerms: any = {
    backend: false,
    filesystem: true,
    daemon: true,
    update: true,
    help: false,
    completions: false,
    auth: true,
  };

  /**
   * Initialize the server
   */
  async warmUpServer() {
    console.info("[SERVER] Checking Security of Environment");
    await this.securityCheck();
    ServerService.JWT = await crypto.subtle.generateKey(
      { name: "HMAC", hash: "SHA-512" },
      true,
      ["sign", "verify"],
    );

    console.info("[SERVER] Checks pass, Initializing server...");
    await LetheanAppServer.loadPlugins();
    await LetheanCli.init();

    this.loadRoutes();

    this.app.use(timingMiddleware);
    this.app.use(requestIdMiddleware);
    this.app.use(JWTAuthMiddleware());
    this.app.use(errorMiddleware);
    this.app.use(loggerMiddleware);
    this.app.use(corsMiddleware);
    this.app.use(this.router.routes());
    this.app.use(this.router.allowedMethods());


    this.app.addEventListener("error", (evt) => {
      // Will log the thrown error to the console.
      //console.error(evt.error);
    });
  }

  /**
   * Password is a sha256 of the server.pub path
   * e.g: QuasiSalt.hash(path.join(Deno.cwd(), 'users', 'server.lthn.pub'))
   */
  async securityCheck() {
    try {
      if (Deno.env.get("LETHEAN_SECURITY_CHECK") === "false") {
        console.info("[SERVER] Security check disabled");
        return;
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
        const password = QuasiSalt.hash(
          path.join(Deno.cwd(), "users", "server.lthn.pub"),
        );
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
      );

      console.error(error);
      Deno.exit(1);
    }
  }

  async stopServer() {
    await LetheanWebsocketServer.stopServer();
  }
  /**
   * @description Initialize the server
   * @returns {any}
   */
  startServer() {
    ZeroMQServer.startServer();
    LetheanWebsocketServer.startServer();

    //this.app.use(staticFiles("apps/lthn/app/desktop", {prefix: 'app/desktop'}));



    this.app.addEventListener("listen", ({ hostname, port, secure }) => {
      console.info(
        `Listening on: ${secure ? "https://" : "http://"}${
          hostname ??
            "localhost"
        }:${port}`,
      );
    });

    return this.app.listen({
      "hostname": "127.0.0.1",
      "port": 36911,
      //      "certFile": `${path.join(this.home, "Lethean", "conf", "public.pem")}`,
      //      "keyFile": `${path.join(this.home, "Lethean", "conf", "private.pem")}`,
    });
  }

  /**
   * @description Load the routes
   */
  async processCommand(args: any) {
    try {
      await LetheanCli.run(args);
    } catch (error) {
      console.log(error.message);
      Deno.exit(2);
    }
  }

  /**
   * Recursive tree scan of known commands adding addRoute() to each one found
   *
   * @param {string} base
   * @param routes
   */
  discoverRoute(base: string, routes: any) {
    for (const dat of routes) {
      const key = dat[0], value = dat[1];
      if (
        ServerService.pathPerms[key] === undefined ||
        ServerService.pathPerms[key] !== false
      ) {
        //console.debug(`Adding route: ${[base, key].join("/")}`);
        this.addRoute([base, key].join("/"), value);
        if (value.commands) {
          this.discoverRoute([base, key].join("/"), value.commands);
        }
      }
    }
  }

  /**
   * Creates the cors enabled HTTPS Endpoint for the path and attaches the run() function
   *
   * GET - Will trigger the --help docs for the path and display a HTML page
   * POST - Will trigger the run() function and convert the POST data to commands
   *
   * @param {string} path url path
   * @param handle
   */
  addRoute(path: string, handle: any) {
    /**
     * setup the help documentation
     */
        this.router.get(path, userGuard(UserRole.USER),(context) => {
          context.response.status = 200;
          context.response.body = ''//handle.getHelp();
        });

    /**
     * Setup the action runner
     */

    this.router.post(
      path,
      userGuard(UserRole.USER),
      async (context) => {
        //console.error(context.request.url.pathname.replace("/", "").split("/"))
        let cmdArgs: string[] = [];
        if (context.request.url.pathname.length > 0) {
          cmdArgs = context.request.url.pathname.replace("/", "").split("/");
        }
        const payload = await context.request.body({ type: "json" }).value;

        //console.error(await context.request.body({ type: "json" }).value)

        if (payload["jsonpath"]) {
          cmdArgs.push(`--jsonpath="${payload["jsonpath"]}"`);
          if (payload["request"]) {
            cmdArgs.push(
              `--request="${JSON.stringify(payload["request"])}"`,
            );
          }
        } else if (payload["jsonrpc"]) {
          cmdArgs.push(`--request="${payload}"`);
        } else {
          //console.info(payload);
          for (const key in payload) {
            const value = payload[key].length > 1 ? `=${payload[key]}` : "";
            cmdArgs.push(
              "--" +
                key.replace(/([A-Z])/g, (x: string) => "-" + x.toLowerCase()) +
                value,
            );
          }
        }

        try {
          await LetheanCli.run(cmdArgs);
          // to send a response throw new StringResponse()
        } catch (error) {
          context.response.status = 200;
          context.response.headers = new Headers({
            "content-type": "text/plain"
          });

          if ((error.message as string).startsWith("http")) {
            context.response.body = await this.performRequest(
              error.message,
              context,
            );
          } else {
            context.response.body = error.message;
          }
        }
      },
    );


    this.router.options(
      path,
      userGuard(UserRole.USER),
      (context) => {
        context.response.status = 204;
        context.response.headers = new Headers({
          "Content-Type":
            "application/x-www-form-urlencoded, text/plain, application/json"
        });
      },
    );
  }

  /**
   * Bootstraps the REST Router
   */
  loadRoutes() {
    Deno.env.set("REST", "1");
    this.discoverRoute("", LetheanCli.options.commands);

    this.router.get(
      "/app/desktop/(.*)",
      userGuard(UserRole.USER),
      async (context) => {

        try {
          await context.send({
            root: FileSystemService.path("apps/lthn"),
            index: "index.html",
          });
        } catch (e) {
          console.error(e);
        }
      },
    );
    this.router.get("/cert", async (context) => {

      try {
        const cert = FileSystemService.read("users/server.lthn.pub");

        if (cert) {
          context.response.status = 200;
          context.response.body = cert;
        } else {
          context.response.status = 404;
        }
      } catch (e) {
        console.error(e);
      }
    });
    this.router.get('(.*)',
      userGuard(UserRole.USER),
      async (context) => {
        context.response.status = 200;
        try {
          //console.info(context.request.url.pathname);
          await context.send({
            root: FileSystemService.path("apps/lthn/app/desktop"),
            index: "index.html",
          });
        } catch (e) {
          context.response.status = 404;
          //console.error(e);
        }
      },
    );

    console.info("HTTPS API Routes loaded");
  }

  /**
   * Discovers the routes for the given command
   *
   * @param {string} path
   * @param context
   */
  async performRequest(path: string, context: any) {
    try {
      //console.warn(path);
      //console.warn(await context.request.body({ type: "text" }).value);
      const postReq = await fetch(
        path,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: await context.request.body({ type: "text" }).value,
        },
      );
      return await postReq.text();
    } catch (error) {
      console.warn(error);
    }
  }
}
