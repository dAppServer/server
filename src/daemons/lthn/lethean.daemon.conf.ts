import {Command} from 'https://deno.land/x/cliffy/command/mod.ts';
import {LetheanDaemonLetheand} from './letheand.ts';
import {LetheanWalletRpc} from './lethean-wallet-rpc.ts';

export class LetheanDaemonConf {
  public static config() {
    return new Command().description("Lethean Binary Control")
      .command("chain", LetheanDaemonLetheand.config())
      .command("wallet", LetheanWalletRpc.config());
  }
}
