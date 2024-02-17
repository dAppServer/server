import {AppModule} from './app.module.ts';

import * as path from "std/path/mod.ts";
import {DanetApplication, Logger, SpecBuilder, SwaggerModule} from "@deps";


export const bootstrap = async () => {
    const application = new DanetApplication();
    // LoggerMiddleware must be the first middleware
    // TimingMiddleware must be the second middleware
    // application.addGlobalMiddlewares(LoggerMiddleware,TimingMiddleware, CorsMiddleware, RequestIDMiddleware, JWTAuthMiddleware);
    application.enableCors()
    await application.init(AppModule)

    try {
        const logger = new Logger('dAppServer')
        const basePath = path.join(Deno.cwd(), 'apps')

        if (Deno.statSync(basePath).isDirectory) {
            logger.log(`Loading dApp's ${basePath}`)
            for await(const f of Deno.readDir(basePath)) {
                const modulePath = path.join(basePath, f.name, `${f.name}.module.ts`)
                if (Deno.statSync(modulePath).isFile) {
                    logger.log(`Found App: ${f.name}`)
                    try {
                        const mod = await import(modulePath)
                        await application.bootstrap(mod[`${f.name[0].toUpperCase() + f.name.slice(1)}Module`])
                    } catch (e) {
                        console.log('Error: ', e);
                    }
                } else {
                    logger.warn(`Unable to load ${f.name}`)
                }
            }
        }
    } catch (e) {}
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
