import { Command } from "https://deno.land/x/cliffy@v0.22.2/command/command.ts";
import { StringResponse } from "../interfaces/string-response.ts";
import { LetheanAccount } from "../accounts/user.ts";
import * as jwt from "../helpers/jwt.ts";
import { UserRole } from "../types/user/user-role.ts";
import { CryptOpenPGP } from "../services/crypt/openpgp.ts";

export class AuthRoutes {
  public static config() {
    return new Command().description("Lethean Account Management")
      .command("login", "login to your Lethean account")
      .option("-p, --payload <string>", "the encrypted payload")
      .action((args) =>
        LetheanAccount.login(atob(args.payload)).then(async (user) => {
          if (user) {
            let content = { id: user, roles: [UserRole.USER] };
            let msg = {
              "access_token": await jwt.getAuthToken(content),
              "refresh_token": await jwt.getRefreshToken(content),
            };

            throw new StringResponse(
              JSON.stringify({
                "result": btoa(
                  await CryptOpenPGP.encryptPGP(user, JSON.stringify(msg)),
                ),
              }),
            );
          } else {
            throw new StringResponse(JSON.stringify({ "result": false }));
          }
        })
      );
  }
}
