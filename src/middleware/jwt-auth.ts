import { AuthUser, Context } from "./../types.ts";
import { getJwtPayload } from "../helpers/jwt.ts";

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
    try {
      const authHeader = ctx.request.headers.get("Authorization");
      if (authHeader) {
        const token = authHeader.replace(/^bearer/i, "").trim();
        const user = await getJwtPayload(token);
        if (user) {
          ctx.user = user as AuthUser;
        }
      }
    } catch (err) {}

    await next();
  };
};

export { JWTAuthMiddleware };
