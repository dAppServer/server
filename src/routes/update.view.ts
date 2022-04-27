import { Command, UpgradeCommand, GithubProvider } from "../../deps.ts";

import { StringResponse } from "../interfaces/string-response.ts";
import { LetheanUpdater } from "../services/update.service.ts";

export class RouteUpdate {
  public static config() {
    return new Command().description("Lethean Updater Service")
      .command(
        "lthn",
        new UpgradeCommand({
          main: "mod.ts",
          args: ["--version", "main"],
          provider: [
            new GithubProvider({
              repository: "letheanVPN/lethean-server",
            }),
          ],
        }),
      )
      .description("Update lthn")
      .command("cli", "Downloads the latest CLI binaries")
      .action(async (args) => {
        await new LetheanUpdater().download().then((dat) => {
          console.info("Updated Lethean Binaries");
        });
      });
  }
}
