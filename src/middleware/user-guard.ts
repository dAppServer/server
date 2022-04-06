import { AuthUser, Context, UserRole } from "./../types.ts";
import { hasUserRole } from "../helpers/roles.ts";
import { httpErrors } from "../../deps.ts";
import { getJwtPayload } from "../helpers/jwt.ts";
import { ServerService } from "../services/server.service.ts";

/**
 * has user role middleware
 * checks authorization for context user, user roles
 */
export const userGuard = (roles?: UserRole | [] ) => {
  return async (context: Context, next: any) => {
    if (!context.request.url.pathname.startsWith('/auth')) {

      try {

        const authUser: AuthUser | null = context.request.headers.get('Authorization')
          ? await getJwtPayload(context.request.headers.get('Authorization') as string)
          : null;

        if (authUser) {
          context.response.status = 200
        } else {
          context.response.status = 401;
          context.throw(401, 'Not authorised');
          // throw new httpErrors.Unauthorized("Unauthorized user");
        }

        //if roles specified, then check auth user's roles
        if (roles) {
          const isRoleMatched = hasUserRole(authUser, roles);

          //if no role mached throw forbidden error
          if (!isRoleMatched) {
            context.response.status = 403;
            context.throw(403, 'Forbidden');
          }
        }

      }catch (e) {
        context.response.status = 401;
        context.throw(401, 'Not authorised');
      }

    }
    await next();
  }
}

