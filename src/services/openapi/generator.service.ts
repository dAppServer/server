import {LetheanCli} from '../../lethean-cli.ts';
import {RestService} from '../../services/tcp/rest.service.ts';

export class OpenAPIGeneratorService {

	public static openapi: any = {
		openapi: '3.0.0',
		info: {
			title: 'Lethean Clientside API',
			version: '1.0.0'
		},
		servers: [
			{
				url: "https://localhost:36911",
				description: "Lethean Clientside Service"
			}
		],

		paths: {},
	};

	/**
	 * servers:
	 *   - url: http://api.example.com/v1
	 *     description: Optional server description, e.g. Main (production) server
	 *   - url: http://staging-api.example.com
	 *     description: Optional server description, e.g. Internal staging server for testing
	 * @param args
	 * @returns {any}
	 */
	public static createOpenApiSpec(args: any) {


		OpenAPIGeneratorService.discoverRoute('', LetheanCli.options.commands);

		return OpenAPIGeneratorService.openapi;
	}

	static discoverRoute(base: string, routes: any) {
		for (const dat of routes) {
			const key = dat[0], value = dat[1];
			if (
				RestService.pathPerms[key] === undefined ||
				RestService.pathPerms[key] !== false
			) {
				//console.log(`Adding route: ${[base, key].join('/')}`);
				const pathKey = [base, key].join('/');
//console.log(value.options)
				const pathOptions:any ={};

				for(const opt of value.options){
					//console.log(opt)

					const name = opt.name.replace(/(-[a-z])/g, (x: string) => '' + x.replace('-','').toUpperCase())
					pathOptions[name] = {
						//@ts-ignore
						description: opt.description,
						type: opt.args[0] ? opt.args[0].type : 'boolean'
					}
				}
				//console.log(pathOptions)
				this.openapi.paths[pathKey] = {
					post: {
						description: value.desc,
						requestBody: {
							required: true,
							content: {
								"application/json": {
									schema: {
										type: 'object',
										properties: {
											...pathOptions
										}
									}
								}
							}
						},
						responses: {
							200: {
								description: "OK"
							}
						}
					}
				}
				//this.addRoute([base, key].join('/'), value);
				if (value.commands) {
					this.discoverRoute([base, key].join('/'), value.commands);
				}

			}
		}
	}

}
