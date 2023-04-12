import { ini, Injectable, path, renderFile, render } from "/deps.ts";
import { FileSystemService } from "/modules/io/filesystem/fileSystemService.ts";

@Injectable()
export class ConfigFileService {

  constructor(private fileSystem: FileSystemService) {}

  /**
   * Render a template file
   * @param {string} file
   * @param model
   * @returns {Promise<any>}
   */
  public async renderTemplateFile( file: string, model: any ) {
    const modelArg = {
      ...model, // user data
      dir: this.fileSystem.path( "conf"),
    };
    return await renderFile(
      this.fileSystem.path(path.join("conf", "templates", file)),
      modelArg,
    );
  }

  /**
   * Render a template string
   * @param {string} template
   * @param model
   * @returns {Promise<any>}
   */
  public async renderTemplateString( template: string, model: any ) {
    return await render(
      template,
      model,
    );
  }

  /**
   *
   * @param {string} filename
   * @returns {Promise<string | boolean>}
   */
  public loadFile(filename: string) {
    try {
      const file = this.fileSystem.read(path.join("conf", filename));

      return file ? file : false;
    } catch (error) {
      return false;
    }
  }
}
