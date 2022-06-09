
import { Injectable, Controller, Get, Body, Post, Params, Context, HttpException, os, path, Res } from "../../../deps.ts";

import { LetheanAccount } from "../../accounts/user.ts";
import { UserRole } from "../../types/user/user-role.ts";
import { CryptOpenPGP } from "../../services/crypt/openpgp.ts";
import * as jwt from "../../helpers/jwt.ts";

@Controller("auth")

export class AuthController {


  @Post("login")
  async login(
    @Body("payload") payload: string,
    context: Context,
  ) {

    return LetheanAccount.login(atob(payload)).then(async (user) => {
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
            await CryptOpenPGP.encryptPGP(user, JSON.stringify(msg)),
          ),
        })

      } else {
        context.response.status = 401;
        context.response.body = JSON.stringify({ "result": false });
      }
    })
  }

}


