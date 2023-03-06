import { Injectable, DanetMiddleware , HttpContext, NextFunction} from "../../deps.ts";

@Injectable()
export class TimingMiddleware implements DanetMiddleware {
  async action(ctx: HttpContext, next: NextFunction) {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.response.headers.set("X-Response-Time", `${ms}ms`);
  }
}
