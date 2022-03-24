import { LetheanCli } from "../lethean-cli.ts";
import { ZeroMQServer } from "./ipc/zeromq.ts";
import { WebsocketServer } from "./tcp/websocket.server.ts";
import { Filter } from "./console-to-html.service.ts";
import * as path from "https://deno.land/std/path/mod.ts";
import os from "https://deno.land/x/dos@v0.11.0/mod.ts";
import { ensureDirSync } from "https://deno.land/std/fs/mod.ts";
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.0/mod.ts";
import { LetheanAppServer } from "./apps/server.ts";

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

  async warmUpServer() {
    await LetheanAppServer.loadPlugins();
    await LetheanCli.init();
  }

  async startServer() {
    ZeroMQServer.startServer();
    WebsocketServer.startServer();

    //this.app.use(staticFiles("apps/lthn/app/desktop", {prefix: 'app/desktop'}));

    this.app.use(oakCors({
      origin: "*",
      methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"],
      allowedHeaders: ["content-type"],
      maxAge: 1
    }));


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

    this.app.addEventListener("listen", ({ hostname, port, secure }) => {
      console.info(
        `Listening on: ${secure ? "https://" : "http://"}${
          hostname ??
          "localhost"
        }:${port}`
      );
    });

    await this.app.listen({
      "hostname": "127.0.0.1",
      "port": 36911
//      "certFile": `${path.join(this.home, "Lethean", "conf", "public.pem")}`,
//      "keyFile": `${path.join(this.home, "Lethean", "conf", "private.pem")}`,
    });
  }

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
        //console.log(`Adding route: ${[base, key].join("/")}`);
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
    this.router.post(path, async (context) => {

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

        console.info(payload);
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
          "Access-Control-Allow-Origin": "*"
        });

        if ((error.message as string).startsWith("http")) {
          context.response.body = await this.performRequest(error.message, context);
        } else {
          context.response.body = error.message;
        }


      }
    });

    this.router.options(path, (context) => {
      context.response.status = 204;
      context.response.headers = new Headers({
        "Content-Type":
          "application/x-www-form-urlencoded, text/plain, application/json",
        "Access-Control-Allow-Origin": "*"
      });
    });
  }

  /**
   * Bootstraps the REST Router
   */
  loadRoutes() {
    Deno.env.set("REST", "1");
    this.discoverRoute("", LetheanCli.options.commands);

    this.router.get("/app/desktop/(.*)", async (context) => {
      context.response.headers = new Headers({
        "Access-Control-Allow-Origin": "*"
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

    this.router.get("/", async (context) => {
      // context.response.status = 200;
      context.response.headers = new Headers({
        "Access-Control-Allow-Origin": "*"
      });
      try {
        await context.send({
          root: path.join(Deno.cwd(), "apps", "lthn", "app", "setup"),
          index: "lthn.json"
        });
      } catch (e) {
        console.error(e);
      }
    });

    console.info("HTTPS API Routes loaded");
  }


  async performRequest(path: string, context: any) {
    try {
      console.warn(path);
      console.warn(await context.request.body({ type: "text" }).value);
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
