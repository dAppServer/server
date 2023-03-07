import {
	DanetApplication,
	MetadataHelper,
	ModuleConstructor,
	moduleMetadataKey,
	path,
	trimSlash,
} from './deps.ts';
import { Swagger } from './swagger.ts';
import Schema = Swagger.Schema;
import Path = Swagger.Path;
import { MethodDefiner } from './method-definer.ts';

export type Constructor<T = unknown> = new (...args: any[]) => T;

export class SwaggerModule {
	static async createDocument(app: DanetApplication, spec: Swagger.Spec) {
		const definition = await this.generateModuleDefinition(app.entryModule);
		spec.paths = definition.paths;
		spec.components = {
			...spec.components,
			schemas: definition.schemas,
		};
		return spec;
	}

	private static async generateModuleDefinition(Module: ModuleConstructor) {
		const { controllers, imports } = MetadataHelper.getMetadata<any>(
			moduleMetadataKey,
			Module,
		);
		const definition: {
			paths: { [key: string]: Path };
			schemas: { [key: string]: Schema };
		} = { paths: {}, schemas: {} };
		if (imports) {
			for (const childModule of imports) {
				const childDef = await this.generateModuleDefinition(childModule);
				definition.paths = { ...definition.paths, ...childDef.paths };
				definition.schemas = { ...definition.schemas, ...childDef.schemas };
			}
		}
		if (controllers) {
			for (const controller of controllers) {
				const { paths, schemas } = this.generateControllerDefinition(
					controller,
				);
				definition.paths = {
					...definition.paths,
					...paths,
				};
				definition.schemas = {
					...definition.schemas,
					...schemas,
				};
			}
		}
		return definition;
	}

	private static generateControllerDefinition(Controller: Constructor) {
		let paths: { [key: string]: Swagger.Path } = {};
		let schemas: { [key: string]: Schema } = {};
		const propertyNames = Object.getOwnPropertyNames(Controller.prototype);
		for (const methodName of propertyNames) {
			if (methodName !== 'constructor') {
				const methodDefiner = new MethodDefiner(Controller, methodName);
				const newDefinition = methodDefiner.addMethodDefinitionToActual(
					paths,
					schemas,
				);
				paths = newDefinition.paths;
				schemas = newDefinition.schemas;
			}
		}
		return { paths, schemas };
	}

  static async setup(
    apiPath: string,
    app: DanetApplication,
    document: Swagger.Spec
  ) {
    apiPath = trimSlash(apiPath);
    app.danetRouter.router.get(`/${apiPath}`, async (context, next) => {
      context.response.body = `<!DOCTYPE html><html lang="en">
        <head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="SwaggerUI"/><title>SwaggerUI</title>
        <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui.css" /></head>
        <body><div id="swagger-ui"></div>
        <script src="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui-bundle.js" crossorigin></script>
        <script src="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui-standalone-preset.js" crossorigin></script>
        <script>window.onload = () => {
            let url = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname.split("/").filter(s => s.length > 0).join("/");
            window.ui = SwaggerUIBundle({url: url + "/json",dom_id: "#swagger-ui", presets: [SwaggerUIBundle.presets.apis,SwaggerUIStandalonePreset],layout: "StandaloneLayout"});};
        </script></body></html>`;
      await next();
    });
    app.danetRouter.router.get(`/${apiPath}/json`, async (context, next) => {
      context.response.body = document;
      await next();
    });
  }
}

export { SpecBuilder } from './builder.ts';
