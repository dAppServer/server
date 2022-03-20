import { ServerService } from "./src/services/server.service.ts";
import "./src/utils.ts";

console.info("Starting Lethean Server");
const letheanServer = new ServerService();

await letheanServer.warmUpServer();
try {
  if (Deno.args.length) {
    console.info(`Command to run: ${Deno.args.join(" ")}`);
    await letheanServer.processCommand(Deno.args).catch((err) => console.log(err));
  } else {
    await letheanServer.startServer();
  }

} catch (e) {
  console.error(e);
}
console.info("Lethean Server Loaded: http://127.0.0.1:36911");

