
import { uuid, Context } from "../../deps.ts";

/**
 * requestId middleware
 * attach requestId in request & response header
 */
const requestIdMiddleware = async (ctx: Context, next: any) => {
  let requestId = ctx.request.headers.get("X-Response-Id");
  if (!requestId) {
    /** if request id not being set, set unique request id */
    requestId = uuid.generate();
    ctx.response.headers.set("X-Response-Id", requestId.toString());
  }
  await next();
  /** add request id in response header */
  ctx.response.headers.set("X-Response-Id", requestId);
};

export { requestIdMiddleware };
