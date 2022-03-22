import { Command } from "https://deno.land/x/cliffy/command/mod.ts";
import {
  GithubProvider,
  UpgradeCommand,
} from "https://deno.land/x/cliffy/command/upgrade/mod.ts";
import { StringResponse } from "../interfaces/string-response.ts";
import { LetheanUpdater } from "../services/update.service.ts";

export class RouteUpdate {
  public static config() {
    return new Command().description("Lethean Updater Service")
      .command(
        "lthn",
        new UpgradeCommand({
          main: "src/server.ts",
          args: ["--version", "main"],
          provider: [
            new GithubProvider({
              repository: "letheanVPN/lthn",
            }),
          ],
        }),
      )
      .description("Update lthn")
      .command("cli", "Downloads the latest CLI binaries")
      .action(async (args) => {
        await new LetheanUpdater().download(args).then((dat) => {
          console.info("Updated Lethean Binaries")
        });
      });
  }
}
