import { createApp } from "https://deno.land/x/servest@v1.3.4/mod.ts";
import { cors } from "https://deno.land/x/servest@v1.3.4/middleware/cors.ts";
import { Command } from "https://deno.land/x/cliffy/command/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";
import os from "https://deno.land/x/dos@v0.11.0/mod.ts";
import { LetheanCli } from "../../lethean-cli.ts";
import { Filter } from "../console-to-html.service.ts";
import { WebsocketServer } from "./websocket.server.ts";
import { ZeroMQServer } from "../ipc/zeromq.ts";

import { ensureDirSync, existsSync } from "https://deno.land/std/fs/mod.ts";

/**
 * @deprecated
 */
export class RestService {
  static app = createApp();

  static home: string = (os.homeDir() ? os.homeDir() : "") as string;

  static pathPerms: any = {
    backend: false,
    filesystem: true,
    daemon: true,
    update: true,
    help: false,
    completions: false,
  };

  /**
   * Recursive tree scan of known commands adding addRoute() to each one found
   *
   * @param {string} base
   * @param routes
   */
  static discoverRoute(base: string, routes: any) {
    for (const dat of routes) {
      const key = dat[0], value = dat[1];
      if (
        RestService.pathPerms[key] === undefined ||
        RestService.pathPerms[key] !== false
      ) {
        console.log(`Adding route: ${[base, key].join("/")}`);
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
  static addRoute(path: string, handle: any) {
    /**
     * setup the help documentation
     */
    this.app.get(path, async (req) => {
      await req.respond({
        status: 200,
        headers: new Headers({
          "content-type": "text/html",
        }),
        body: RestService.templateOutput(handle.getHelp()),
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
  static loadRoutes() {
    Deno.env.set("REST", "1");
    this.discoverRoute("", LetheanCli.options.commands);

    this.app.handle("/", async (req) => {
      await req.respond({
        status: 200,
        headers: new Headers({
          "content-type": "text/html",
        }),
        body: RestService.templateOutput(LetheanCli.options.getHelp()),
      });
    });
  }

  /**
   * Start TLS HTTP Rest Server & ZeroMQ Websocket
   */
  public static run() {
    this.loadRoutes();

    this.app.use(cors({
      origin: "*",
      methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"],
      allowedHeaders: ["content-type"],
      maxAge: 1,
    }));

    // 'content-type': 'application/x-www-form-urlencoded, text/plain, application/json',
    //						'Access-Control-Allow-Origin': 'https://localhost'

    // if (existsSync(path.join(RestService.home, 'Lethean', 'conf', 'private.pem'))) {
    // 	console.log(`Localhost SSL Found: ${path.join(RestService.home, 'Lethean', 'conf', 'private.pem')}`);
    // } else {
    // 	console.log('No localhost ssl cert found, injecting a pre made one so we can start a tls server and fix this');
    // 	RestService.injectPem();
    // }

    this.app.listenTls({
      "hostname": "localhost",
      "port": 36911,
      "certFile": `${
        path.join(RestService.home, "Lethean", "conf", "public.pem")
      }`,
      "keyFile": `${
        path.join(RestService.home, "Lethean", "conf", "private.pem")
      }`,
    });

    ZeroMQServer.startServer();
    WebsocketServer.startServer();
  }

  static templateOutput(input: string) {
    return new Filter().toHtml(
      `<html><head></head><body  style="background: radial-gradient(circle,#08f2b5 0%,#158297 100%); "><pre style=" margin-left: 2vw; width: 96vw; background: rgb(33, 33, 33);">${input}</pre></body></html>`,
    );
  }

  public static config() {
    return new Command()
      .description("Backend Services for Application GUI")
      .command("start", "Start Application Helper Daemon")
      .action(() => RestService.run())
      .command("ipc")
      .description("Start ZeroMQ server")
      .action(() => ZeroMQServer.startServer());
  }
}
