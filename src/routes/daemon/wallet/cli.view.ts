import os from 'https://deno.land/x/dos@v0.11.0/mod.ts';
import * as path from 'https://deno.land/std/path/mod.ts';
import {Command} from 'https://deno.land/x/cliffy/command/mod.ts';
import {StringResponse} from '../../../interfaces/string-response.ts';
import {ProcessManager} from '../../../services/process/process.service.ts';
import {ProcessManagerRequest} from '../../../services/process/processManagerRequest.ts';


export class RouteDaemonWalletCli {

  public static config() {

    return new Command()
      .description('Wallet CLI')
      .option('--daemon-address <string>', 'Use daemon instance at <host>:<port>')
      .option('--daemon-host <string>', 'Use daemon instance at host <arg> instead of localhost')
      .option('--password <string>', 'Wallet password (escape/quote as needed)')
      .option('--password-file <string>', 'Wallet password file')
      .option('--daemon-port <string>', 'Use daemon instance at port <arg> instead of 48782')
      .option('--daemon-login <string>', 'Specify username[:password] for daemon RPC client')
      .option('--testnet', 'For testnet. Daemon must also be launched with --testnet flag')
      .option('--restricted-rpc ', 'Restricts to view-only commands')
      .option('--wallet-file  <string>', 'Use wallet <arg>')
      .option('--generate-new-wallet <string>', 'Generate new wallet and save it to <arg>')
      .option('--generate-from-view-key <string>', 'Generate incoming-only wallet from view key')
      .option('--generate-from-keys <string>', 'Generate wallet from private keys')
      .option('--generate-from-multisig-keys <string>', 'Generate a master wallet from multisig wallet keys')
      .option('--generate-from-json <string>', 'Generate wallet from JSON format file')
      .option('--upgrade-legacy <string>', 'Upgrade a pre-rebase .wallet file <arg> to the new format which is compatible with this wallet')
      .option('--mnemonic-language <string>', 'Language for mnemonic')
      .option('--command <string>', 'run command, hint, use exit to stop auto sync')
      .option('--restore-deterministic-wallet', 'Recover wallet using Electrum-style mnemonic seed')
      .option('--non-deterministic', 'Create non-deterministic view and spend keys')
      .option('--electrum-seed <string>', 'Specify Electrum seed for wallet recovery/creation')
      .option('--trusted-daemon', 'Enable commands which rely on a trusted daemon')
      .option('--allow-mismatched-daemon-version', 'Allow communicating with a daemon that uses a different RPC version')
      .option('--restore-height  <string>', 'Restore from specific blockchain height')
      .option('--disable-rpc-login', 'Disable HTTP authentication for RPC connections served by this process')
      .option('--log-file <string>', 'Specify log file')
      .option('--log-level <string>', '0-4 or categories')
      .option('--max-concurrency <string>', 'Max number of threads to use for a parallel job')
      .option('--config-file <string>', 'Config file')
      .action((args) => {
        const homeDir = os.homeDir();

        const exeFile =
            'lethean-wallet-cli' + (os.platform() === 'windows' ? '.exe' : '');

        ProcessManager.run(
            path.join(homeDir ? homeDir : './', 'Lethean', 'cli', exeFile),
            args,
            {
              key: exeFile,
              stdErr: (stdErr: unknown) => console.log(stdErr),
              stdIn: (stdIn: unknown) => console.log(stdIn),
              stdOut: (stdOut: unknown) => console.log(stdOut)
            } as ProcessManagerRequest
        );
        if (Deno.env.get('REST')) {
          throw new StringResponse('Started');
        }
      });
  }
}
