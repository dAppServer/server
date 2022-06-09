import { AuthUser, Context, UserRole } from "./../types.ts";
import { getJwtPayload } from "../helpers/jwt.ts";
import { FileSystemService } from "../services/fileSystemService.ts";
import { CanActivate } from "../../deps.ts";


export class userGuard implements CanActivate {
  async canActivate(context: Context): Promise<boolean> {

      if (!context.request.url.pathname.startsWith('/auth') && FileSystemService.list('users').map((file:string) => file.endsWith('.lthn')).includes(true)) {

        try {

          const authUser: AuthUser | null = context.request.headers.get('Authorization')
            ? await getJwtPayload(context.request.headers.get('Authorization') as string)
            : null;

          if (authUser) {
            context.response.status = 200
            return true
          } else {
            context.response.status = 401;
            context.response.body =  'Not authorised';
            return false
            // throw new httpErrors.Unauthorized("Unauthorized user");
          }


        }catch (e) {
          context.response.status = 401;
          context.response.body =  'Not authorised';
          return false;
        }

      }


    // throw new ForbiddenException('this is AuthGuard error');
    return true;
  }
}


