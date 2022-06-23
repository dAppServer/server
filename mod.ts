
import { AppModule } from "./src/app.module.ts";
import {  NestFactory, oakCors, path, Context } from "./deps.ts";
import { ZeroMQServer } from "./src/services/ipc/zeromq.ts";
import { LetheanWebsocketServer } from "./src/services/tcp/websocket.server.ts";
import { FileSystemService } from "./src/services/fileSystemService.ts";
import { CryptOpenPGP } from "./src/services/crypt/openpgp.ts";
import { QuasiSalt } from "./src/services/crypt/quasi-salt.ts";
import {loggerMiddleware} from "./src/middleware/logger.ts";
import {errorMiddleware} from "./src/middleware/error.ts";
import { JWTAuthMiddleware } from "./src/middleware/jwt-auth.ts";



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
      const password = QuasiSalt.hash(FileSystemService.path( "users/server.lthn.pub"));

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

const app = await NestFactory.create(AppModule);

app.setGlobalPrefix("api");
//
// Timing
app.use(async (ctx: Context, next:any) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
});

//app.use(oakCors());
app.use(JWTAuthMiddleware)


app.use(app.routes());

const port = Number(Deno.env.get("PORT") || 36911);
ZeroMQServer.startServer();
LetheanWebsocketServer.startServer();

console.log(`Starting: http://localhost:${port}`);
await app.listen({ hostname: "localhost", port: port });
