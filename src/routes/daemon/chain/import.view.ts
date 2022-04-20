
import { Command, path, os } from "../../../../deps.ts";
import { StringResponse } from "../../../interfaces/string-response.ts";
import { ProcessManager } from "../../../services/process/process.service.ts";
import { ProcessManagerRequest } from "../../../services/process/processManagerRequest.ts";

export class RouteDaemonChainImport {
  public static config() {
    return new Command()
      .description("Blockchain Import")
      .option("--data-dir <string>", "Specify data directory", {
        default: path.join(Deno.cwd(), "data"),
      })
      .option(
        "--testnet-data-dir <string>",
        "Specify testnet data directory",
        {
          default: path.join(
            Deno.cwd(),
            "data",
            "testnet",
          ),
        },
      )
      .option(
        "--test-drop-download",
        "For net tests: in download, discard ALL blocks instead checking/saving them (very fast)",
      )
      .option(
        "--test-drop-download-height <number>",
        "Like test-drop-download but disards only after around certain height",
      )
      .option(
        "--testnet",
        "Run on testnet. The wallet must be launched with --testnet flag.",
      )
      .option(
        "--enforce-dns-checkpointing <string>",
        "checkpoints from DNS server will be enforced",
      )
      .option(
        "--prep-blocks-threads <string>",
        "Max number of threads to use when preparing block hashes in groups.",
      )
      .option(
        "--fast-block-sync <string>",
        "Sync up most of the way by using embedded, known block hashes.",
      )
      .option(
        "--show-time-stats <string>",
        "Show time-stats when processing blocks/txs and disk synchronization.",
      )
      .option(
        "--block-sync-size <string>",
        "How many blocks to sync at once during chain synchronization (0 = adaptive).",
      )
      .option(
        "--check-updates <string>",
        "Check for new versions of monero: [disabled|notify|download|update]",
      )
      .option(
        "--fluffy-blocks <string>",
        "Relay blocks as fluffy blocks where possible (automatic on testnet)",
      )
      .option(
        "--standard-json <string>",
        "Force standard JSON output (do not return binary data in json fields)",
      )
      .option(
        "--testnet-p2p-bind-port <string>",
        "(=38772)  Port for testnet p2p network protocol",
      )
      .option(
        "--p2p-bind-port <string>",
        "(=48772) Port for p2p network protocol",
      )
      .option(
        "--extra-messages-file <string>",
        "Specify file for extra messages to include into coinbase transactions",
      )
      .option(
        "--db-type <string>",
        "Specify database type, available: lmdb",
      )
      .option(
        "--db-sync-mode <string>",
        "(=fast:async:1000) Specify sync option, using format [safe|fast|fastest]:[sync|async]:[nblocks_per_sync].",
      )
      .option(
        "--db-salvage <string>",
        "Try to salvage a blockchain database if it seems corrupted",
      )
      .option(
        "--count-blocks <string>",
        "Count blocks in bootstrap file and exit",
      )
      .option(
        "--pop-blocks <string>",
        "Remove blocks from end of blockchain",
      )
      .option("--drop-hard-fork <string>", "Drop hard fork subdbs")
      .option("--input-file <string>", "Specify input file")
      .option("--log-level <string>", "0-4 or categories")
      .option("--database <string>", "available: lmdb")
      .option("--batch-size <string>", "available: lmdb")
      .option("--block-stop <string>", "Stop at block number")
      .option(
        "--verify <string>",
        "Verify blocks and transactions during import",
      )
      .option("--batch <string>", "Batch transactions for faster import")
      .option(
        "--resume <string>",
        "Resume from current height if output database already exists",
      )
      .action((args) => {
        const exeFile = `lethean-blockchain-import${
          os.platform() === "windows" ? ".exe" : ""
        }`;

        ProcessManager.run(
          path.join(
            Deno.cwd(),
            "cli",
            exeFile,
          ),
          args,
          {
            key: exeFile.split("/").pop(),
            stdErr: (stdErr: unknown) => console.log(stdErr),
            stdIn: (stdIn: unknown) => console.log(stdIn),
            stdOut: (stdOut: unknown) => console.log(stdOut),
          } as ProcessManagerRequest,
        );
        if (Deno.env.get("REST")) {
          throw new StringResponse("Started");
        }
      });
  }
}
