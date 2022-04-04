import { Command } from "https://deno.land/x/cliffy@v0.22.2/command/command.ts";
import { StringResponse } from "../interfaces/string-response.ts";
import { LetheanAccount } from "../accounts/user.ts";

export class AuthRoutes {
  public static config() {
    return new Command().description("Lethean Account Management")
      .command("login", "login to your Lethean account")
      .option("-p, --payload <string>", "the encrypted payload")
      .action((args) =>
        LetheanAccount.login(atob(args.payload)).then((user) => {
          if (user) {
            throw new StringResponse(JSON.stringify({ "result": 1 }));
          } else {
            throw new StringResponse(JSON.stringify({ "result": 0 }));
          }
        })
      );
  }
}
