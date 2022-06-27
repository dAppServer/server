import { Context } from "../../deps.ts";
const timingMiddleware = async (ctx: Context, next: any) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
};

export { timingMiddleware };
