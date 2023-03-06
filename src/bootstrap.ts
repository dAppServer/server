import { AppModule } from './app.module.ts';
import { DanetApplication, SpecBuilder, SwaggerModule } from "../deps.ts";
import { CorsMiddleware } from "./middleware/cors.ts";
import { LoggerMiddleware } from "./middleware/logger.ts";
import { TimingMiddleware } from "./middleware/timing.ts";
import { RequestIDMiddleware } from "./middleware/request-id.ts";
import { JWTAuthMiddleware } from "./middleware/jwt-auth.ts";

export const bootstrap = async () => {
  const application = new DanetApplication();
  await application.init(AppModule);
  // LoggerMiddleware must be the first middleware
  // TimingMiddleware must be the second middleware
  application.addGlobalMiddlewares(LoggerMiddleware,TimingMiddleware, CorsMiddleware, RequestIDMiddleware, JWTAuthMiddleware);

  // Swagger API Docs + JSON Definition
  const spec = new SpecBuilder()
    .setTitle('Lethean Server')
    .setDescription('Lethean dAppServer')
    .setVersion('1.0')
    .build();
  const document = await SwaggerModule.createDocument(application, spec);
  await SwaggerModule.setup('api', application, document);
  // Static file server
//  const staticAssetsPath = `${Deno.cwd()}/apps`;
//  application.useStaticAssets(staticAssetsPath);
  return application;
}
