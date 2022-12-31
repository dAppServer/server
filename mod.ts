import { AppController } from "./src/app.controller.ts";
import { parse, path } from "./deps.ts";

const startAgs = parse(Deno.args, {
  string: ['port'],
  boolean: ["background", "openapi"]
});
const home:string = Deno.env.get('HOME') ? Deno.env.get('HOME') : Deno.cwd();

if(path.join(home,'Lethean') !== Deno.cwd()){
  Deno.chdir(path.join(home,'Lethean'))
}

const app = new AppController(startAgs);

if(startAgs['openapi']){

  //console.log(await app.app.state)
  // cray cray bizznitches gravitate towards me, :smirk:
  app.router.forEach((route) => {
    console.log(route)
  })

  console.info("Lethean Server Process Ended")
} else {

  app.startServer().then((r: any) => {
    console.log(r);
    console.info("Lethean Server Process Ended")
  });
}





