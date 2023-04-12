import { AuthUser } from "/types/auth/auth-user.ts";
import { getJwtPayload } from "/helpers/jwt.ts";
import { FileSystemService } from "/modules/io/filesystem/fileSystemService.ts";
import { Injectable, DanetMiddleware, HttpContext, NextFunction, Logger } from "danet/mod.ts";

/**
 * JSON Web Token middleware
 */
@Injectable()
export class JWTAuthMiddleware implements DanetMiddleware {

  private logger = new Logger("Request");

  constructor(private fileService: FileSystemService){}

  async action(ctx: HttpContext, next: NextFunction) {
    if (
      !ctx.request.url.pathname.startsWith("/auth") &&
      this.fileService.list("users").map((file: string) =>
        file.endsWith(".lthn")
      ).includes(true)
    ) {
      try {
        const authUser: AuthUser | null =
          ctx.request.headers.get("Authorization")
            ? await getJwtPayload(
              ctx.request.headers.get("Authorization") as string
            )
            : null;
        if (authUser) {
          ctx.response.status = 200;
        } else {
         // ctx.response.status = 401;
          //ctx.throw(401, "Not authorised");
          // throw new httpErrors.Unauthorized("Unauthorized user");
        }
        //await next();
      } catch (err) {
      }
    }
    await next();
  }
}
