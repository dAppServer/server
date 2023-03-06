import { AppModule } from './app.module.ts';
import { DanetApplication } from '../deps.ts';
import { CorsMiddleware } from "./middleware/cors.ts";
import { LoggerMiddleware } from "./middleware/logger.ts";
import { TimingMiddleware } from "./middleware/timing.ts";

export const bootstrap = async () => {
  const application = new DanetApplication();
  await application.init(AppModule);
  // LoggerMiddleware must be the first middleware
  // TimingMiddleware must be the second middleware
  application.addGlobalMiddlewares(LoggerMiddleware,TimingMiddleware, CorsMiddleware);
  return application;
}
