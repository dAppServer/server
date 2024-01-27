import { AppModule } from './app.module.ts';
import { DanetApplication } from "danet/mod.ts";
import { SpecBuilder, SwaggerModule } from "danetSwagger/mod.ts";
export const bootstrap = async () => {
  const application = new DanetApplication();
  // LoggerMiddleware must be the first middleware
  // TimingMiddleware must be the second middleware
  // application.addGlobalMiddlewares(LoggerMiddleware,TimingMiddleware, CorsMiddleware, RequestIDMiddleware, JWTAuthMiddleware);
  application.enableCors();
  await application.init(AppModule);


  // Swagger API Docs + JSON Definition
  const spec = new SpecBuilder()
    .setTitle('Lethean Server')
    .setDescription('Lethean dAppServer')
    .setVersion('3.1.1')
    .addServer('http://localhost:36911')
    .setContact('Lethean', 'https://lethean.io', 'hello@lt.hn')
    .setLicense('EUPL-1.2', 'https://eupl.eu/1.2/en/')
    .build();
  const document = await SwaggerModule.createDocument(application, spec);
  await SwaggerModule.setup('api', application, document);

  return application;
}
