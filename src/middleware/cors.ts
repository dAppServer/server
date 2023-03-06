import { Injectable, DanetMiddleware , HttpContext, NextFunction} from "../../deps.ts";

@Injectable()
export class CorsMiddleware implements DanetMiddleware {
  async action(ctx: HttpContext, next: NextFunction) {
    ctx.response.headers.set("Access-Control-Max-Age", "1");
    ctx.response.headers.set("Access-Control-Allow-Origin", `*`);
    ctx.response.headers.set("Access-Control-Allow-Headers", `*`);
    ctx.response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, HEAD",
    );
    await next();
  }
}
