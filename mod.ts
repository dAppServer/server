
import { AppModule } from "./src/app.module.ts";
import { Context, NestFactory, oakCors } from "./deps.ts";

const app = await NestFactory.create(AppModule);

app.setGlobalPrefix("api");
//
// Timing
app.use(async (ctx: Context, next:any) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

app.use(oakCors());
app.use(app.routes());

const port = Number(Deno.env.get("PORT") || 36911);


console.log(`Starting: http://localhost:${port}`);
await app.listen({ port });
