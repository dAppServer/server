import { ServerService } from "./src/services/server.service.ts";
import "./deps.ts"
import { LetheanGUI } from "./src/services/display/gui.ts";

console.info("Starting Lethean Server");
const letheanServer = new ServerService();

await letheanServer.warmUpServer();
try {

  if (Deno.args.length && Deno.args[0] !== 'gui') {
    console.info(`Command to run: ${Deno.args.join(" ")}`);
    await letheanServer.processCommand(Deno.args).catch((err) => console.log(err));
  } else {
    if(Deno.args[0] == 'gui'){
      new LetheanGUI().startGUI()
    }else{
      await letheanServer.startServer().catch((error) => {
        console.error(error)
      });
    }


  }

} catch (e) {
  console.error(e);
}
console.info("Lethean Server Loaded: http://127.0.0.1:36911");

