import { Context, UserRole } from "./../types.ts";
import { hasUserRole } from "../helpers/roles.ts";
import { httpErrors } from "../../deps.ts";

/**
 * has user role middleware
 * checks authorization for context user, user roles
 */
const userGuard = (roles?: UserRole | [] ) => {
  return async (context: Context, next:any) => {
    if (!context.request.url.pathname.startsWith('/auth')) {

      // if auth user not found, throw error
      const { user } = context;
      if (!user) {
        context.response.status = 401;
        context.throw(401, 'Not authorised');
       // throw new httpErrors.Unauthorized("Unauthorized user");
      }

      //if roles specified, then check auth user's roles
      if (roles) {
        const isRoleMatched = hasUserRole(user, roles);

        //if no role mached throw forbidden error
        if (!isRoleMatched) {
          context.response.status = 403;
          context.throw(403, 'Forbidden');
        }
      }

    }
    await next();
  };
};

export { userGuard };
