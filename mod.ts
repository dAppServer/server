import { ServerService } from "./src/services/server.service.ts";
import { path } from "./deps.ts";
import { LetheanGUI } from "./src/services/display/gui.ts";


console.info("Starting Lethean Server");
const letheanServer = new ServerService();

try {

  switch (Deno.args[0]) {
    case "server":
      console.info("Starting CLI");
      await letheanServer.warmUpServer();
      await letheanServer.startServer().catch((error) => {
        console.error(error);
      });
      break;
    case "gui":
    case undefined:
      let letheanGUI = new LetheanGUI();
      console.info("Starting GUI");
      // create subprocess
      const p = Deno.run({
        cmd: [path.join(Deno.cwd(), "lethean-server"), "server"]
      });

      letheanGUI.start();
      break;
    default:
      console.info(`Command to run: ${Deno.args.join(" ")}`);
      await letheanServer.processCommand(Deno.args).catch((err) => console.log(err));
      break;
  }

} catch (e) {
  console.error(e);
}
console.info("Lethean Server Loaded: http://127.0.0.1:36911");

