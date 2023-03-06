import { AppModule } from './app.module.ts';
import { DanetApplication } from '../deps.ts';
import { CorsMiddleware } from "./middleware/cors.ts";

export const bootstrap = async () => {
  const application = new DanetApplication();
  await application.init(AppModule);
  application.addGlobalMiddlewares(CorsMiddleware);
  return application;
}
