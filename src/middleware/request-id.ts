import { Injectable, DanetMiddleware , HttpContext, NextFunction} from "https://deno.land/x/danet/mod.ts";
import { crypto } from "std/crypto/mod.ts";
@Injectable()
export class RequestIDMiddleware implements DanetMiddleware {

  async action(ctx: HttpContext, next: NextFunction) {
    let requestId = ctx.request.headers.get("X-Response-Id");
    if (!requestId) {
      /** if request id not being set, set unique request id */
      requestId = crypto.randomUUID();
      ctx.response.headers.set("X-Response-Id", requestId.toString());
    }
    /** add request id in response header */
    ctx.response.headers.set("X-Response-Id", requestId);
    await next();
  }
}
