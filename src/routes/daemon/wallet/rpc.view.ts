import os from "https://deno.land/x/dos@v0.11.0/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";
import { Command } from "https://deno.land/x/cliffy/command/mod.ts";
import { StringResponse } from "../../../interfaces/string-response.ts";
import { ProcessManager } from "../../../services/process/process.service.ts";
import { ProcessManagerRequest } from "../../../services/process/processManagerRequest.ts";
import { RouteDaemonWalletCli } from "./cli.view.ts";
import { DaemonChainWalletVpnRpcView } from "./vpn-rpc.view.ts";
import { RPCResponse } from "../../../interfaces/rpc-response.ts";

export class RouteDaemonWalletRpc {
  public static config() {
    return new Command()
      .command("cli", RouteDaemonWalletCli.config())
      .command("vpn", DaemonChainWalletVpnRpcView.config())
      .command("rpc")
      .description("Wallet RPC")
      .option(
        "--daemon-address <string>",
        "Use daemon instance at <host>:<port>",
      )
      .option(
        "--daemon-host <string>",
        "Use daemon instance at host <arg> instead of localhost",
      )
      .option(
        "--password <string>",
        "Wallet password (escape/quote as needed)",
      )
      .option("--password-file <string>", "Wallet password file")
      .option(
        "--daemon-port <string>",
        "Use daemon instance at port <arg> instead of 48782",
      )
      .option(
        "--daemon-login <string>",
        "Specify username[:password] for daemon RPC client",
      )
      .option(
        "--testnet",
        "For testnet. Daemon must also be launched with --testnet flag",
      )
      .option("--restricted-rpc ", "Restricts to view-only commands")
      .option("--rpc-bind-port  <string>", "Sets bind port for server")
      .option(
        "--disable-rpc-login",
        "Disable HTTP authentication for RPC connections served by this process",
      )
      .option(
        "--trusted-daemon",
        "Enable commands which rely on a trusted daemon",
      )
      .option("--rpc-bind-ip  <string>", "Specify ip to bind rpc server")
      .option(
        "--rpc-login  <string>",
        "Specify username[:password] required for RPC server",
      )
      .option(
        "--confirm-external-bind  <string>",
        "Confirm rpc-bind-ip value is NOT a loopback (local) IP",
      )
      .option("--wallet-file  <string>", "Use wallet")
      .option(
        "--generate-from-json  <string>",
        "Generate wallet from JSON format file",
      )
      .option(
        "--wallet-dir  <string>",
        "Directory for newly created wallets",
        {
          default: path.join(Deno.cwd(), "wallets"),
        },
      )
      .option("--log-file  <string>", "Specify log file")
      .option("--log-level  <string>", "0-4 or categories")
      .option(
        "--max-concurrency  <string>",
        "Max number of threads to use for a parallel job",
      )
      .option("--config-file  <string>", "Config file")
      .action((args) => {
        const exeFile = "lethean-wallet-rpc" +
          (os.platform() === "windows" ? ".exe" : "");

        ProcessManager.run(
          path.join(
            Deno.cwd(),
            "cli",
            exeFile,
          ),
          args,
          {
            key: exeFile,
            stdErr: (stdErr: unknown) => console.log(stdErr),
            stdIn: (stdIn: unknown) => console.log(stdIn),
            stdOut: (stdOut: unknown) => console.log(stdOut),
          } as ProcessManagerRequest,
        );
      })
      .command("json_rpc")
      .description("Talk to the wallet RPC via the json_rpc endpoint")
      .option("-r,--request <string>", "payload to send")
      .action((args) => {
        // console.log(await postReq.text())
        if (Deno.env.get("REST")) {
          throw new RPCResponse("http://localhost:36963/json_rpc");
        }
      });
  }
}
