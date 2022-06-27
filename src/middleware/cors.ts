import { Context } from "../../deps.ts";
const corsMiddleware = async (ctx: Context, next: any) => {

  ctx.response.headers.set("Access-Control-Max-Age", '1');
  ctx.response.headers.set("Access-Control-Allow-Origin", `*`);
  ctx.response.headers.set("Access-Control-Allow-Headers", `*`);
  ctx.response.headers.set("Access-Control-Allow-Methods", 'GET, POST, OPTIONS, HEAD');
  await next();
};

export { corsMiddleware };
