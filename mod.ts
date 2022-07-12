import { AppController } from "./src/app.controller.ts";
import { parse } from "./deps.ts";

const startAgs = parse(Deno.args);
if (startAgs["serve"]) {

} else {

  const app = new AppController(startAgs);

  app.startServer().then((r: any) => console.log(r));
}



