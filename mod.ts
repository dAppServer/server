//import  * as path from "std/path/mod.ts";
import { bootstrap } from "./src/bootstrap.ts";
import { buildSpec } from "./src/openapi.ts";

//const home = Deno.env.get('HOME') ? Deno.env.get('HOME') as string : Deno.cwd();

// if(path.join(home,'Lethean') !== Deno.cwd()){
//   Deno.chdir(path.join(home,'Lethean'))
// }

if (Deno.args.length > 0) {
  if (Deno.args.find((arg) => arg === "--openapi")) {
    console.log("Swagger API Docs + JSON Definition");
    Deno.writeTextFileSync("openapi.json", JSON.stringify(await buildSpec()));
    console.log(`openapi.json created in dir: ${Deno.cwd()}`);
    Deno.exit(0);
  }
} else {
  const application = await bootstrap();
  await application.listen(Number(Deno.env.get("PORT") || 36911));
}

