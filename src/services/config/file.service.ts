import { ini, path, renderFile } from "../../../deps.ts";

/**
 * File Service
 *
 * @export
 * @class FileService
 */
export class ConfigFileService {
  /**
   * Render file template
   *
   * @param {any} args{file: string, model: any}
   * @returns {Promise<string>}
   * @memberof FileService
   */
  public static async loadTemplateFile(args: { file: string; model: any }) {
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

  /**
   * Loads a file from the config directory
   *
   * @static
   * @param {string} filename
   * @returns {Promise<string>}
   * @memberof FileService
   */
  public static async loadFile(filename: string) {
    try {
      const file = await Deno.readFile(
        path.join(
          Deno.cwd(),
          "conf",
          filename,
        ),
      );
      return file.length > 0 ? file.toString() : "";
    } catch (error) {
      return null;
    }
  }
}
