import { LetheanCli } from "../lethean-cli.ts";
import { ZeroMQServer } from "./ipc/zeromq.ts";
import { WebsocketServer } from "./tcp/websocket.server.ts";
import { Filter } from "./console-to-html.service.ts";
import { createApp } from "https://deno.land/x/servest@v1.3.4/app.ts";
import { cors } from "https://deno.land/x/servest@v1.3.4/middleware/cors.ts";
import * as path from "https://deno.land/std/path/mod.ts";
import os from "https://deno.land/x/dos@v0.11.0/mod.ts";

export class ServerService {
  constructor() {}
  app = createApp();
  home: string = (os.homeDir() ? os.homeDir() : "") as string;
  static pathPerms: any = {
    backend: false,
    filesystem: true,
    daemon: true,
    update: true,
    help: false,
    completions: false,
  };

  async warmUpServer() {
    await LetheanCli.init();
  }

  startServer() {
    ZeroMQServer.startServer();
    WebsocketServer.startServer();

    this.loadRoutes();

    this.app.use(cors({
      origin: "*",
      methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"],
      allowedHeaders: ["content-type"],
      maxAge: 1,
    }));

    this.app.listenTls({
      "hostname": "localhost",
      "port": 36911,
      "certFile": `${path.join(this.home, "Lethean", "conf", "public.pem")}`,
      "keyFile": `${path.join(this.home, "Lethean", "conf", "private.pem")}`,
    });
  }

  async processCommand(args: any) {
    try {
      await LetheanCli.run(args);
    } catch (error) {
      console.error(error.message);
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
    this.app.get(path, async (req) => {
      await req.respond({
        status: 200,
        headers: new Headers({
          "content-type": "text/html",
        }),
        body: this.templateOutput(handle.getHelp()),
      });
    });

    /**
     * Setup the action runner
     */
    this.app.post(path, async (req) => {
      const cmdArgs = req.url.replace("/", "").split("/");

      const payload = await req.json();

      if (payload["jsonpath"]) {
        cmdArgs.push(`--jsonpath="${payload["jsonpath"]}"`);
        cmdArgs.push(
          `--request="${JSON.stringify(payload["request"])}"`,
        );
      } else if (payload["jsonrpc"]) {
        cmdArgs.push(`--request="${JSON.stringify(payload)}"`);
      } else {
        for (const key in payload) {
          const value = payload[key].length > 1 ? `=${payload[key]}` : "";
          cmdArgs.push(
            "--" + key.replace(/([A-Z])/g, (x: string) =>
              "-" + x.toLowerCase()) +
              value,
          );
        }
      }

      try {
        await LetheanCli.run(cmdArgs);
        // to send a response throw new StringResponse()
      } catch (error) {
        return await req.respond({
          status: 200,
          headers: new Headers({
            "content-type":
              "application/x-www-form-urlencoded, text/plain, application/json",
          }),
          body: error.message,
        });
      }
    });

    this.app.options(path, async (req) => {
      console.log("OPTIONS");
      return await req.respond({
        status: 204,
        headers: new Headers({
          "Content-Type":
            "application/x-www-form-urlencoded, text/plain, application/json",
        }),
      });
    });
  }
  /**
   * Bootstraps the REST Router
   */
  loadRoutes() {
    Deno.env.set("REST", "1");
    this.discoverRoute("", LetheanCli.options.commands);

    this.app.handle("/", async (req) => {
      await req.respond({
        status: 200,
        headers: new Headers({
          "content-type": "text/html",
        }),
        body: this.templateOutput(LetheanCli.options.getHelp()),
      });
    });

    console.log("HTTPS API Routes loaded");
  }

  templateOutput(input: string) {
    return new Filter().toHtml(
      `<html><head></head><body  style="background: radial-gradient(circle,#08f2b5 0%,#158297 100%); "><pre style=" margin-left: 2vw; width: 96vw; background: rgb(33, 33, 33);">${input}</pre></body></html>`,
    );
  }
}
