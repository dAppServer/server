import { Injectable, DanetMiddleware , HttpContext, NextFunction, uuid} from "../../deps.ts";

@Injectable()
export class RequestIDMiddleware implements DanetMiddleware {

  async action(ctx: HttpContext, next: NextFunction) {
    let requestId = ctx.request.headers.get("X-Response-Id");
    if (!requestId) {
      /** if request id not being set, set unique request id */
      requestId = uuid.generate();
      ctx.response.headers.set("X-Response-Id", requestId.toString());
    }
    /** add request id in response header */
    ctx.response.headers.set("X-Response-Id", requestId);
    await next();
    
  }
}
