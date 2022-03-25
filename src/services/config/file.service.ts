import { renderFile } from "https://deno.land/x/mustache/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";

/**
 * File Service
 *
 * @export
 * @class FileService
 */
export class ConfigFileService {
  public static async loadFile(args: { file: string; model: any }) {

    const model = {
      ...args.model, // user data
      dir: path.join(Deno.cwd(), "conf"),
    };
    return await renderFile(
      path.join(
        Deno.cwd(),
        "conf",
        "templates",
        args.file,
      ),
      model,
    );
  }
}
