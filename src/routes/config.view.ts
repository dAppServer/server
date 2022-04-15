import { StringResponse } from "../interfaces/string-response.ts";
import { OpenAPIGeneratorService } from "../services/openapi/generator.service.ts";
import { ConfigFileService } from "../services/config/file.service.ts";
import { Command } from "../../deps.ts";

export class RouteConfig {
  public static config() {
    return new Command()
      .description("Configuration")
      .command("openapi", "Returns a openapi json data object")
      .action((args) => {
        throw new StringResponse(
          JSON.stringify(
            OpenAPIGeneratorService.createOpenApiSpec(args),
          ),
        );
      })
      .command("get", "Templated configuration files, adhoc")
      .option("-f,--file <string>", "Specify configuration file")
      .option("-m,--modal <string>", "JSON data to pass to the template engine")
      .action(async (args) => {
        const data = await ConfigFileService.loadFile(args);

        if (data) {
          throw new StringResponse(data);
        }
      });
  }
}
