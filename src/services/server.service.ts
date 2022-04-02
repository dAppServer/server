import { LetheanCli } from "../lethean-cli.ts";
import { ZeroMQServer } from "./ipc/zeromq.ts";
import { WebsocketServer } from "./tcp/websocket.server.ts";
import { LetheanAppServer } from "./apps/server.ts";
import { Router, Application, os, oakCors, path} from '../../deps.ts'
import { FilesystemService } from "./filesystem.service.ts";
import { CryptOpenPGP } from "./crypt/openpgp.ts";
import { QuasiSalt } from "./crypt/quasi-salt.ts";
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
  static pathPerms: any = {
    backend: false,
    filesystem: true,
    daemon: true,
    update: true,
    help: false,
    completions: false
  };

  /**
   * Initialize the server
   */
  async warmUpServer() {
    console.info("[SERVER] Checking Security of Environment");
    await this.securityCheck();

    console.info("[SERVER] Checks pass, Initializing server...");
    await LetheanAppServer.loadPlugins();
    await LetheanCli.init();

    this.loadRoutes();
    this.app.use(this.router.routes());
    this.app.use(this.router.allowedMethods());


    // Logger
    this.app.use(async (ctx, next) => {
      await next();
      const rt = ctx.response.headers.get("X-Response-Time");
    });

// Timing
    this.app.use(async (ctx, next) => {
      const start = Date.now();
      await next();
      const ms = Date.now() - start;
      ctx.response.headers.set("X-Response-Time", `${ms}ms`);
    });
    this.app.addEventListener("error", (evt) => {
      // Will log the thrown error to the console.
      console.error(evt.error);
    });
  }

  /**
   * Password is a sha256 of the server.pub path
   * e.g: QuasiSalt.hash(path.join(Deno.cwd(), 'users', 'server.lthn.pub'))
   */
  async securityCheck() {
    try {

      if(Deno.env.get('LETHEAN_SECURITY_CHECK') === 'false') {
        console.info("[SERVER] Security check disabled");
        return;
      }

      if (!FilesystemService.existsFile({ path: 'users/server.lthn.pub' })) {
        console.info('[SECURITY] Missing Server keypair, Generating...');
        await CryptOpenPGP.createServerKeyPair()
      }


      if(!FilesystemService.existsFile({ path: 'users/server.lthn.key' })) {
        throw new Error('Missing Server private key, Exiting...');
      }

      if(!FilesystemService.existsFile({ path: 'users/server.lthn.pub' })) {
        throw new Error('Missing Server public key, Exiting...');
      }


      if(Deno.statSync(path.join(Deno.cwd(), 'users', 'server.lthn.pub')).isFile) {
        console.info("[SERVER] Server.pub found, checking password");
        const password = QuasiSalt.hash(path.join(Deno.cwd(), 'users', 'server.lthn.pub'));
        if(await CryptOpenPGP.getPrivateKey('server', password)) {
          console.info("[SERVER] Keypair unlocked OK");
        } else {
          throw new Error("[SERVER] Keypair failed, exiting");
        }
      } else {
        throw new Error("[SERVER] Server.pub not found");
      }


    } catch (error) {
      console.error("[SECURITY] Failed to ensure safe environment, shutting down...");

      console.error(error);
      Deno.exit(1);
    }



  }

  /**
   * @description Initialize the server
   * @returns {any}
   */
   startServer() {
    ZeroMQServer.startServer();
    WebsocketServer.startServer();

    //this.app.use(staticFiles("apps/lthn/app/desktop", {prefix: 'app/desktop'}));

    this.app.use(oakCors({
      origin: "*",
      methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"],
      allowedHeaders: ["content-type"],
      maxAge: 1
    }));


    this.app.addEventListener("listen", ({ hostname, port, secure }) => {
      console.info(
        `Listening on: ${secure ? "https://" : "http://"}${
          hostname ??
          "localhost"
        }:${port}`
      );
    });

    return this.app.listen({
      "hostname": "127.0.0.1",
      "port": 36911
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
//    this.router.get(path, (context) => {
//      context.response.status = 200;
//      context.response.headers = new Headers({
//        "content-type": "text/html",
//        "Access-Control-Allow-Origin": "*"
//      });
//      context.response.body = this.templateOutput(handle.getHelp());
//    });

    /**
     * Setup the action runner
     */
    this.router.post(path, oakCors({
      origin: "*",
      methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"],
      allowedHeaders: ["content-type"],
      maxAge: 1
    }), async (context) => {

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
            `--request="${JSON.stringify(payload["request"])}"`
          );
        }

      } else if (payload["jsonrpc"]) {
        cmdArgs.push(`--request="${payload}"`);
      } else {

        //console.info(payload);
        for (const key in payload) {
          const value = payload[key].length > 1 ? `=${payload[key]}` : "";
          cmdArgs.push(
            "--" + key.replace(/([A-Z])/g, (x: string) =>
              "-" + x.toLowerCase()) +
            value
          );
        }
      }


      try {
        await LetheanCli.run(cmdArgs);
        // to send a response throw new StringResponse()
      } catch (error) {
        context.response.status = 200;
        context.response.headers = new Headers({
          "content-type":
            "application/x-www-form-urlencoded, text/plain, application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*"
        });

        if ((error.message as string).startsWith("http")) {
          context.response.body = await this.performRequest(error.message, context);
        } else {
          context.response.body = error.message;
        }


      }
    });

    this.router.options(path, oakCors({
      origin: "*",
      methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"],
      allowedHeaders: ["content-type"],
      maxAge: 1
    }), (context) => {
      context.response.status = 204;
      context.response.headers = new Headers({
        "Content-Type":
          "application/x-www-form-urlencoded, text/plain, application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
      });
    });
  }

  /**
   * Bootstraps the REST Router
   */
  loadRoutes() {
    Deno.env.set("REST", "1");
    this.discoverRoute("", LetheanCli.options.commands);

    this.router.get("/app/desktop/(.*)",oakCors({
      origin: "*",
      methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"],
      allowedHeaders: ["content-type"],
      maxAge: 1
    }), async (context) => {
      context.response.headers = new Headers({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
      });
      try {
        await context.send({
          root: path.join(Deno.cwd(), "apps", "lthn"),
          index: "index.html"
        });
      } catch (e) {
        console.error(e);
      }


    });
    this.router.get('/cert', async (context) => {
      context.response.headers = new Headers({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
      });
      try {
        const cert = FilesystemService.read({ path : path.join(Deno.cwd(), "users", 'server.lthn.pub')});

        if (cert){
          context.response.status = 200;
          context.response.body = cert;
        } else {
          context.response.status = 404;
        }
      } catch (e) {
        console.error(e);
      }
    });
    this.router.get("(.*)", oakCors({
      origin: "*",
      methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"],
      allowedHeaders: ["content-type"],
      maxAge: 1
    }), async (context) => {
      // context.response.status = 200;
      context.response.headers = new Headers({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
      });
      try {
        //console.info(context.request.url.pathname);
        await context.send({
          root: path.join(Deno.cwd(), "apps", "lthn", "app", "desktop"),
          index: "index.html"
        });
      } catch (e) {
        context.response.status = 404;
        //console.error(e);
      }
    });



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
            "Content-Type": "application/json"
          },
          body: await context.request.body({ type: "text" }).value
        }
      );
      return await postReq.text();
    } catch (error) {
      console.warn(error);
    }


  }

}
