import { LetheanCli } from "../lethean-cli.ts";
import { ZeroMQServer } from "./ipc/zeromq.ts";
import { WebsocketServer } from "./tcp/websocket.server.ts";
import { Filter } from "./console-to-html.service.ts";
import * as path from "https://deno.land/std/path/mod.ts";
import os from "https://deno.land/x/dos@v0.11.0/mod.ts";
import { ensureDirSync, existsSync } from "https://deno.land/std/fs/mod.ts";
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import staticFiles from "https://deno.land/x/static_files/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.0/mod.ts";
import { RPCResponse } from "../interfaces/rpc-response.ts";
import { RouterContext } from "https://deno.land/x/oak@v10.4.0/router.ts";
import { FilesystemService } from "./filesystem.service.ts";
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

//     if (!existsSync(path.join(this.home, 'Lethean', 'conf', 'private.pem'))) {
//     	console.log('No localhost ssl cert found, injecting a pre made one so we can start a tls server and fix this');
//     	this.injectPem();
//     }
    // this.app.use(oakCors({ origin: /^.+(localhost|127.0.0.1):(36911|1234)$/ }));
    this.loadRoutes();
    this.app.use(this.router.routes());
    this.app.use(this.router.allowedMethods());


    // Logger
    this.app.use(async (ctx, next) => {
      await next();
      const rt = ctx.response.headers.get("X-Response-Time");
//      console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
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
    this.router.get(path, (context) => {
      context.response.status = 200;
      context.response.headers = new Headers({
        "content-type": "text/html",
        "Access-Control-Allow-Origin": "*"
      });
      context.response.body = this.templateOutput(handle.getHelp());
    });

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

    this.router.get("/app/desktop/(.*)", async (context: RouterContext<any>) => {
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

  templateOutput(input: string) {
    return new Filter().toHtml(
      `<html><head></head><body  style="background: radial-gradient(circle,#08f2b5 0%,#158297 100%); "><pre style=" margin-left: 2vw; width: 96vw; background: rgb(33, 33, 33);">${input}</pre></body></html>`
    );
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

  private injectPem() {
    const home = os.homeDir();
    ensureDirSync(path.join(home ? home : "~", "Lethean", "conf"));
    ensureDirSync(path.join(home ? home : "~", "Lethean", "users"));
    ensureDirSync(path.join(home ? home : "~", "Lethean", "wallets"));

    Deno.writeTextFileSync(
      path.join(home ? home : "~", "Lethean", "conf", "private.pem"),
      `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC3mX00xr2raI17
FF0hTvnT1NxBkv4HwMXJ2UCKW6VQ0jfTd9TxQCW2BRsFrUaXsa0xFGrIFiN0k7cr
7anDpSnp2x8tMIahWbzxwaSaEIsPmUBNDlI5D8aQ/0Gi7Zn1I3hsFAJ+Xx1wwYk4
g1CkGSiQGTMJ+f8RWCzRY3YftMUZPs82Pdda20XrDWJSNyWYJNXm/Qt20eXnYKQQ
pFIyUm28O/4w4E+rcti6AkdXmy548MUu+XefaGOkKM0ccLMVcZOavfHtKMLPQEcC
3FVOY76+NSvdovKlgGomPPjs2+IHGHW6h3Eic6sb3CfAG8YpZXhmOfxTxef9Nh1i
1s53mSWJAgMBAAECggEADbIl/GoM8RHyEpSLeUtzvdZwUyCc0ZroRkKYxW7JD2qM
c+UfCJt2lLRJy+vH9dNGblWtvNz7P8bbJaxA0JGWuwANEdO/tJ6bRn+MVgUrknol
/qQ1rwBbGYA+dwx5bSd8ZAzpaLWTXntuzz1Ae+qiiNP7EjXzeJRBd6HkncCK6XM8
2bo1TB+2Sqw9mehETqZdkzqOvHaiPTMak/Yv/Jl6pjz7hw/LoOfki2CDZfeoDNh1
x/s7u3A4Lp31OxKGOu/02HvbxWFIourZqeWIzBi5QTXPdNGzt6CTJUg6L0iHjWki
HTRXfXwUI/7JrqFs98MtRTlC329vpySvvb2uMbUi2QKBgQD51hJnXlAAqVhDbVDJ
92vqdw4AGr9Mo2412mnK9cVnJOE8HHM5LsMuqY7TzB1w7t+IH+j8NbtRpo6JxF3F
XaWWlgYH8HPBmYE3MS9JKt6wpJyt6wY6njZhruaQVb9eEz7TprwCKFUgSdyC3ot2
tbkXz2VNIFVfOUDqdurEEk+L5QKBgQC8IRORGSSkHJ1OibAxfxY0GK3leRkUzSZG
JlbygdAnAsFgyyAespyLlTesANYoDooh1R9iz2DvYu3EC4WDCVye+bPXqiSrq9HU
gymy9KKdHm+asFq6swLY2S/PIudoxRi7EEVn4c0eOMRktExEQOYOBlR930zenMn+
6QUZrKbA1QKBgAMUiJWNrB7V96idKGnVCxeQ8DNAISuouCshzjwaW5yx77T2BNWn
pfBlVsV1tsc1qrva6NxzLSQMkaVRLnbIeMoqf1iJtmOkqNstWA/m32f+H5BlXWZL
nRAHQAB3jixywEuLurWsGaCUSIu0grOr+eQ5Ql55D5Rk+E/rt2lDcIehAoGAcS2o
+trYe06nqG8XK7/cGL1cKLhgyW3d/8fi+QP1uPJkahnpme40VZkQpA7gx7pviYkQ
174RABNRHWcdDEcejJmGg1FdvFWi56l89adNCR8dXz+HZdh59wE6TPAfrZ0dkrRo
POXQI8VdCYSaeVldzcQrIoqrUSWcNBn1sot2yn0CgYA+x7ttCDuuUS14GKVPzj4x
P+wm0SYZlfhIXPlq8hDOPkWrri8SfvPm4HZnhBnQ+XCCV6siD39FsBV+/o7Oscmr
Hzdy9maORT5Ls/9auaJR4pYFiZdEJ92+7uuaysJxUIR09RIgSvZzjBXKbMMk1Hh4
AhLxWdfgyjUnMmu+CyXsOg==
-----END PRIVATE KEY-----`
    );
    Deno.writeTextFileSync(
      path.join(home ? home : "~", "Lethean", "conf", "public.pem"),
      `-----BEGIN CERTIFICATE-----
MIIDDzCCAfegAwIBAgIUDbxDwcHyiWphlrCTmQFFw0qOMrowDQYJKoZIhvcNAQEL
BQAwFDESMBAGA1UEAwwJMTI3LjAuMC4xMB4XDTIyMDMxODExMTIxN1oXDTIyMDQx
NzExMTIxN1owFDESMBAGA1UEAwwJMTI3LjAuMC4xMIIBIjANBgkqhkiG9w0BAQEF
AAOCAQ8AMIIBCgKCAQEAt5l9NMa9q2iNexRdIU7509TcQZL+B8DFydlAilulUNI3
03fU8UAltgUbBa1Gl7GtMRRqyBYjdJO3K+2pw6Up6dsfLTCGoVm88cGkmhCLD5lA
TQ5SOQ/GkP9Bou2Z9SN4bBQCfl8dcMGJOINQpBkokBkzCfn/EVgs0WN2H7TFGT7P
Nj3XWttF6w1iUjclmCTV5v0LdtHl52CkEKRSMlJtvDv+MOBPq3LYugJHV5suePDF
Lvl3n2hjpCjNHHCzFXGTmr3x7SjCz0BHAtxVTmO+vjUr3aLypYBqJjz47NviBxh1
uodxInOrG9wnwBvGKWV4Zjn8U8Xn/TYdYtbOd5kliQIDAQABo1kwVzAUBgNVHREE
DTALgglsb2NhbGhvc3QwCwYDVR0PBAQDAgeAMBMGA1UdJQQMMAoGCCsGAQUFBwMB
MB0GA1UdDgQWBBTo7mdQFJ8ZjYh8+2U86WVbpt2bLzANBgkqhkiG9w0BAQsFAAOC
AQEANNXIQEc6uwh33Scr+zAzbvGwwvAvUzKZ6lnoFFyXugRkWlWpDc4XlESKmC6J
VERPcvbK6/7PXLloINs1COsRGeqO146/xLzouVp9l/LHBt1NUvilWkLi8+TXrmJK
7PkWqtZLC8ZD90G7IG/rUwuf0O9BAIe7KOpuswPqWRoH7RCZHWjh61N6xpuYk7kE
bCVkXbjWl3QwzAi6NU6RB6JUfGPXzdEcVdObRIbrAuWQ6qgq4KBhv8ov4L6kg/0+
nRWqQNOMN9b+ADixaJZezekV5TUbs2swsu8OzW+fVNUZDmtrPvLbtNL6cgzKMLXl
IQIy+HTxSq+H0oTafriFZQ+OjQ==
-----END CERTIFICATE-----`
    );
  }
}
