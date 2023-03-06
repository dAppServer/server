import { Context, HttpException, os, path, Router } from "../../../deps.ts";

import { LetheanAccount } from "../../accounts/user.ts";
import { UserRole } from "../../types/user/user-role.ts";
import { OpenPGPService } from "../../services/crypt/openpgp.ts";
import * as jwt from "../../helpers/jwt.ts";
import { FileSystemService } from "../../services/fileSystemService.ts";

const AuthRouter = new Router();

AuthRouter.get("/cert", (context: Context) => {
  context.response.body = FileSystemService.read("users/server.lthn.pub");
});

AuthRouter.post("/auth/login", async (context: Context) => {
  const body = context.request.body({ type: "json" });
  const req = await body.value;

  return LetheanAccount.login(atob(req.payload)).then(async (user) => {
    if (user) {
      const content = { id: user, roles: [UserRole.USER] };
      const msg = {
        "access_token": await jwt.getAuthToken(content),
        "refresh_token": await jwt.getRefreshToken(content),
      };

      context.response.headers.set("Content-Type", "application/json");
      context.response.status = 200;
      context.response.body = JSON.stringify({
        "result": btoa(
          await OpenPGPService.encryptPGP(user, JSON.stringify(msg)),
        ),
      });
    } else {
      context.response.status = 401;
      context.response.body = JSON.stringify({ "result": false });
    }
  });
});

export { AuthRouter };
