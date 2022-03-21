import { Command } from "https://deno.land/x/cliffy/command/mod.ts";
import { CompletionsCommand } from "https://deno.land/x/cliffy/command/completions/mod.ts";
import { HelpCommand } from "https://deno.land/x/cliffy/command/help/mod.ts";
import { RouteFilesystem } from "./routes/filesystem.view.ts";
import { RouteUpdate } from "./routes/update.view.ts";
import { RouteObject } from "./routes/object.view.ts";
import { RouteDaemonChainStart } from "./routes/daemon/chain/start.view.ts";
import { RouteDaemonChainExport } from "./routes/daemon/chain/export.view.ts";
import { RouteDaemonChainImport } from "./routes/daemon/chain/import.view.ts";
import { RouteDaemonWalletRpc } from "./routes/daemon/wallet/rpc.view.ts";
import { RouteConfig } from "./routes/config.view.ts";
import { RPCResponse } from "./interfaces/rpc-response.ts";

export class LetheanCli {
  public static options: any;

  static async run(args: string[]) {
    //console.log(`Arguments passed ${args.join(", ")}`);
    return await LetheanCli.options.parse(args);
  }

  static async init() {
    LetheanCli.options = await new Command()
      .name("lethean-server")
      .version("0.1.2")
      .description("Command line interface for Lethean")
      .command(
        "daemon",
        new Command().description("Lethean Binary Control")
          .command(
            "chain",
            new Command().description("Lethean Binary Control")
              .command("start", RouteDaemonChainStart.config())
              .command("json_rpc")
              .description(
                "Talk to the Daemon RPC via the json_rpc endpoint",
              )
              .option("-r,--request <string>", "payload to send")
              .option(
                "--jsonpath <string>",
                "Endpoint page to use",
                {
                  default: "json_rpc",
                },
              )
              .action( (args) => {

                if (Deno.env.get("REST")) {
                  throw new RPCResponse(args['jsonpath'])
                }
              })
              .command("export", RouteDaemonChainExport.config())
              .command("import", RouteDaemonChainImport.config()),
          )
          .command("wallet", RouteDaemonWalletRpc.config()),
      )
      .command("update", RouteUpdate.config())
      .command("filesystem", RouteFilesystem.config())
      .command("config", RouteConfig.config())
      .command("object", RouteObject.config())
      // .command("account", LetheanAccount.config())
      //			.command("vpn",
      //				new Command().description('VPN Functions')
      //						.command('provider', LetheanToolsProvider.config()
      //						.command('client', LetheanDaemonDvpnClient.config())
      //					))
      .command("help", new HelpCommand())
      .command("completions", new CompletionsCommand());
  }
}
