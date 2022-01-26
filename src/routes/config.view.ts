import {Command} from 'https://deno.land/x/cliffy/command/mod.ts';
import {StringResponse} from '../interfaces/string-response.ts';
import {OpenAPIGeneratorService} from '../services/openapi/generator.service.ts';
import {ConfigFileService} from '../services/config/file.service.ts';


export class RouteConfig {

	public static config() {

		return new Command()
			.description('Configuration')
			.command('openapi', 'Returns a openapi json data object')
			.action((args) => {

				throw new StringResponse(JSON.stringify(OpenAPIGeneratorService.createOpenApiSpec(args)));
			})
			.command('get', 'Gets a file with fresh configuration')
			.option('-f,--file <string>', 'Specify configuration file')
			.action(async (args) => {

				//if (Deno.env.get('REST')) {
				throw new StringResponse(await ConfigFileService.loadFile(args));
				//}
			})


	}
}

