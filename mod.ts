#!/usr/bin/env -S deno run --allow-net --allow-read --allow-write --allow-env --unstable
import  * as path from "std/path/mod.ts";
/**
 * @env HOME - The home directory of the user or server sandbox directory.
 * @env PORT - The port to listen on, default 36911.
 */
const startDir = Deno.env.get('HOME') ? Deno.env.get('HOME') as string : Deno.cwd();
console.log('startDir',startDir)
if(!Deno.cwd().endsWith('.dappserver')){
    try {
        if(Deno.statSync(path.join(startDir,'.dappserver')).isDirectory){
           // console.log('DappServer installed')
        }
    } catch (e) {
        Deno.mkdirSync(path.join(startDir,'.dappserver'))
    }

   Deno.chdir(path.join(startDir,'.dappserver'))
    console.log('Server Dir', Deno.cwd())
}

import { bootstrap } from './src/bootstrap.ts';

const application = await bootstrap();
await application.listen(Number(Deno.env.get('PORT') || 36911));
