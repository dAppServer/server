
import  * as path from "std/path/mod.ts";

const home = Deno.env.get('HOME') ? Deno.env.get('HOME') as string : Deno.cwd();

if(path.join(home,'Lethean') !== Deno.cwd()){
  Deno.chdir(path.join(home,'Lethean'))
}

import { bootstrap } from './src/bootstrap.ts';

const application = await bootstrap();
await application.listen(Number(Deno.env.get('PORT') || 36911));
