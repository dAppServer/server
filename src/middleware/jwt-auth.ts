import { AuthUser, Context } from "./../types.ts";
import { getJwtPayload } from "../helpers/jwt.ts";
import { FileSystemService } from "../services/fileSystemService.ts";


/** *
 * JWTAuth middleware
 * Decode authorization bearer token
 * and attach as an user in application context
 */
const JWTAuthMiddleware = () => {
  return async (
    ctx: Context,
    next: any,
  ) => {
    console.log(ctx.request.url.pathname)
    if (!ctx.request.url.pathname.startsWith('/auth') && FileSystemService.list('users').map((file:string) => file.endsWith('.lthn')).includes(true)) {

      try {
        const authUser: AuthUser | null = ctx.request.headers.get('Authorization')
          ? await getJwtPayload(ctx.request.headers.get('Authorization') as string)
          : null;
        if (authUser) {
          ctx.response.status = 200
        } else {
          ctx.response.status = 401;
          ctx.throw(401, 'Not authorised');
          // throw new httpErrors.Unauthorized("Unauthorized user");
        }
        await next();
      } catch (err) {
      }
    }
    await next();
  };
};

export { JWTAuthMiddleware };
