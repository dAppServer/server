import  * as path from "https://deno.land/x/std/path/mod.ts";
import { bootstrap } from "./src/bootstrap.ts";
import { buildSpec } from "./src/openapi.ts";
import { Command, HelpCommand, CompletionsCommand, UpgradeCommand, GithubProvider, DenoLandProvider } from "https://deno.land/x/cliffy/command/mod.ts";
import packageFile from "./package.json" with { type: "json" };
import {ModIoFsLocalService} from "./src/mod/io/fs/local/service.ts";
const fs = new ModIoFsLocalService();
//const home = Deno.env.get('HOME') ? Deno.env.get('HOME') as string : Deno.cwd();

// if(path.join(home,'Lethean') !== Deno.cwd()){
//   Deno.chdir(path.join(home,'Lethean'))
// }
const cmds = await new Command()
    .name('lthn')
    .version(`v${packageFile.version}`)
    .command(
        "openapi",
        "Creates OpenAPI definition json file.",
    )
    .action(async (_) => {
      // Disable console.log to avoid printing the entire spec to the console
      const origLog = console.log;
      console.log = function() {
        return;
      };
      Deno.writeTextFileSync("openapi.json", JSON.stringify(await buildSpec()));
      console.log = origLog;
      console.log(`openapi.json created in dir: ${Deno.cwd()}`);
      Deno.exit(0);
    })
    .command(
        "start",
        "Starts the server.",
    )
    .option("-u, --ui <path:string>", "UI HTML files.")
    .action(async (options) => {
      const application = await bootstrap();
      if(options['ui']){
          const staticAssetsPath = path.dirname(path.fromFileUrl(import.meta.url)) +'/'+ options['ui'];
          console.log('Static Assets Path:', staticAssetsPath)
          application.useStaticAssets(staticAssetsPath);
      }

      await application.listen(Number(Deno.env.get("PORT") || 36911));

    })
    .command("help", new HelpCommand().global())
    .command("completions", new CompletionsCommand())
    .command(
        "upgrade",
        new UpgradeCommand({
          main: "mod.ts",
          args: ["--allow-all", "--unstable"],
          provider: [
              new DenoLandProvider({ name: "lthn"}),
              new GithubProvider({ repository: "dappserver/server" }),
          ],
        }),
    )
    .parse(Deno.args);

if(Deno.args.length === 0){
    console.log('No command provided, use --help for more information')
  Deno.exit(0)
}
