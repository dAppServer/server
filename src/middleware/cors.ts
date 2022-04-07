import { Context } from "./../types.ts";
const corsMiddleware = async (ctx: Context, next: any) => {

  ctx.response.headers.set("Access-Control-Allow-Origin", `*`);
  ctx.response.headers.set("Access-Control-Allow-Headers", `*`);
  await next();
};

export { corsMiddleware };
