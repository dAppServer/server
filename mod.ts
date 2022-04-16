import { ServerService } from "./src/services/server.service.ts";

console.info("Starting Lethean Server");
const letheanServer = new ServerService();

try {

  if(Deno.args.length == 0 || Deno.args[0] == "server") {
    console.info("Starting CLI");
    await letheanServer.warmUpServer();
    await letheanServer.startServer().catch((error) => {
      console.error(error);
    });
  }else{
    console.info(`Command to run: ${Deno.args.join(" ")}`);
    await letheanServer.processCommand(Deno.args).catch((err) =>
      console.log(err)
    );
  }

} catch (e) {
  console.error(e);
}
console.info("Lethean Server Loaded: http://127.0.0.1:36911");
