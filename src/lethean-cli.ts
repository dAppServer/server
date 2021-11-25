import {Command} from 'https://deno.land/x/cliffy/command/mod.ts';
import {CompletionsCommand} from 'https://deno.land/x/cliffy/command/completions/mod.ts';
import {HelpCommand} from 'https://deno.land/x/cliffy/command/help/mod.ts';
import {LetheanAccount} from './accounts/user.ts';
import {RestService} from './services/rest.service.ts';
import {LetheanUpdater} from './services/update.service.ts';
import {LetheanDaemonConf} from './daemons/lthn/lethean.daemon.conf.ts';
import {FilesystemService} from './services/filesystem.service.ts';

export class LetheanCli {

  public static options: any;

  static async run(args: string[]) {
    return await LetheanCli.options.parse(args);
  }

  static async init() {
    LetheanCli.options = await new Command()
      .name("lthn")
      .version("0.1.2")
      .description("Command line interface for Lethean")
      .command("daemon", LetheanDaemonConf.config())
      .command("update", LetheanUpdater.config())
      .command("backend", RestService.config())
      .command("filesystem", FilesystemService.config())
      .command("account", LetheanAccount.config())
      //			.command("vpn",
      //				new Command().description('VPN Functions')
      //						.command('provider', LetheanToolsProvider.config()
      //						.command('client', LetheanDaemonDvpnClient.config())
      //					))
      .command("help", new HelpCommand())
      .command("completions", new CompletionsCommand());
  }
}
