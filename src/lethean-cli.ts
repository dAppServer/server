import {Command} from 'https://deno.land/x/cliffy/command/mod.ts';
import {CompletionsCommand} from 'https://deno.land/x/cliffy/command/completions/mod.ts';
import {HelpCommand} from 'https://deno.land/x/cliffy/command/help/mod.ts';
import {RestService} from './services/tcp/rest.service.ts';
import {RouteFilesystem} from './routes/filesystem.view.ts';
import {RouteUpdate} from './routes/update.view.ts';
import {RouteObject} from './routes/object.view.ts';
import {RouteDaemonChainStart} from './routes/daemon/chain/start.view.ts';
import {RouteDaemonChainExport} from './routes/daemon/chain/export.view.ts';
import {RouteDaemonChainImport} from './routes/daemon/chain/import.view.ts';
import {RouteDaemonWalletRpc} from './routes/daemon/wallet/rpc.view.ts';
import {RouteConfig} from './routes/config.view.ts';
import {StringResponse} from './interfaces/string-response.ts';

export class LetheanCli {

  public static options: any;

  static async run(args: string[]) {
    return await LetheanCli.options.parse(args);
  }

  static async init() {
    LetheanCli.options = await new Command()
        .name('lethean-server')
        .version('0.1.2')
        .description('Command line interface for Lethean')
        .command('daemon', new Command().description('Lethean Binary Control')
            .command('chain', new Command().description('Lethean Binary Control')
                .command('start', RouteDaemonChainStart.config())
                .command('json_rpc')
                .description('Talk to the Daemon RPC via the json_rpc endpoint')
                .option('-r,--request <string>', 'payload to send')
                .option('--jsonpath <string>', 'Endpoint page to use', {default: 'json_rpc'})
                .action(async (args) => {
                  //console.log(args.request.slice(1, args.request.length-1))
                  const postReq = await fetch(`http://localhost:48782/${args.jsonpath.replace(/['"]+/g, '')}`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: args.request.slice(1, args.request.length - 1)
                  });
                  if (Deno.env.get('REST')) {
                    throw new StringResponse(await postReq.text());

                  }
                })
                .command('export', RouteDaemonChainExport.config())
                .command('import', RouteDaemonChainImport.config()))
            .command('wallet', RouteDaemonWalletRpc.config()))
        .command('update', RouteUpdate.config())
        .command('backend', RestService.config())
        .command('filesystem', RouteFilesystem.config())
        .command('config', RouteConfig.config())
        .command('object', RouteObject.config())
        // .command("account", LetheanAccount.config())
        //			.command("vpn",
        //				new Command().description('VPN Functions')
        //						.command('provider', LetheanToolsProvider.config()
        //						.command('client', LetheanDaemonDvpnClient.config())
        //					))
        .command('help', new HelpCommand())
        .command('completions', new CompletionsCommand());
  }
}
