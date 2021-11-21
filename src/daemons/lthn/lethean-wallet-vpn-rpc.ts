import os from 'https://deno.land/x/dos@v0.11.0/mod.ts';
import * as path from 'https://deno.land/std/path/mod.ts';
import {Command} from 'https://deno.land/x/cliffy/command/mod.ts';
import {StringResponse} from '../../interfaces/string-response.ts';
import {ProcessManager, ProcessManagerRequest} from '../../services/process.service.ts';

export class LetheanWalletVpnRpc {

  public static config() {
    const home = os.homeDir();

    return new Command()
      .description('Wallet VPN RPC')
      .option('--daemon-address <string>', 'Use daemon instance at <host>:<port>')
      .option('--daemon-host <string>', 'Use daemon instance at host <arg> instead of localhost')
      .option('--password <string>', 'Wallet password (escape/quote as needed)')
      .option('--password-file <string>', 'Wallet password file')
      .option('--daemon-port <string>', 'Use daemon instance at port <arg> instead of 48782')
      .option('--daemon-login <string>', 'Specify username[:password] for daemon RPC client')
      .option('--testnet', 'For testnet. Daemon must also be launched with --testnet flag')
      .option('--restricted-rpc', 'Restricts to view-only commands')
      .option('--vpn-rpc-bind-port <string>', 'Sets bind port for VPN RPC server')
      .option('--trusted-daemon', 'Enable commands which rely on a trusted daemon')
      .option('--rpc-bind-ip <string>', 'Specify ip to bind rpc server')
      .option('--rpc-login <string>', 'Specify username[:password] required for RPC server')
      .option('--confirm-external-bind', 'Confirm rpc-bind-ip value is NOT a loopback (local) IP')
      .option('--wallet-file <string>', 'Use wallet')
      .option('--generate-from-json <string>', 'Generate wallet from JSON format file')
      .option('--log-file <string>', 'Specify log file')
      .option('--log-level <string>', '0-4 or categories')
      .option('--max-concurrency <string>', 'Max number of threads to use for a parallel job')
      .option('--config-file <string>', 'Config file')
      .action((args) => {
        const homeDir = os.homeDir();

        const exeFile =
            'lethean-wallet-vpn-rpc' + (os.platform() === 'windows' ? '.exe' : '');

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
