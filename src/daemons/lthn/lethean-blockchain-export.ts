import os from 'https://deno.land/x/dos@v0.11.0/mod.ts';
import * as path from 'https://deno.land/std/path/mod.ts';
import {Command} from 'https://deno.land/x/cliffy/command/mod.ts';
import {StringResponse} from '../../interfaces/string-response.ts';
import {ProcessManager, ProcessManagerRequest} from '../../services/process.service.ts';

export class LetheanBlockchainExport {

  public static config() {
    const home = os.homeDir();

    return new Command()
      .description('Blockchain Export')
      .option('--daemon-address <string>', 'Use daemon instance at <host>:<port>')
      .option('--data-dir  <string>', 'Specify data directory', {default: path.join(home ? home : '/', 'Lethean', 'data')})
      .option('--testnet-data-dir  <string>', 'Specify testnet data directory', { default: path.join(home ? home : '/', 'Lethean', 'data', 'testnet') })
      .option('--output-file  <string>', 'Specify output file')
      .option('--testnet', 'Run on testnet.')
      .option('--log-level <string>', '0-4 or categories')
      .option('--database <string>', 'available: lmdb')
      .option('--block-stop <string>', 'Stop at block number')
      .option('--blocksdat', 'Output in blocks.dat format')
      .action((args) => {
        const homeDir = os.homeDir();

        const exeFile =
            'lethean-blockchain-export' + (os.platform() === 'windows' ? '.exe' : '');

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
