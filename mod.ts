import { AppController } from "./src/app.controller.ts";
import { parse } from "./deps.ts";

const app = new AppController(parse(Deno.args));

app.startServer().then((r: any) => console.log(r));



