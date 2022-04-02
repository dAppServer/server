
import { ensureDirSync, path } from "../../deps.ts";

/**
 * @class
 * @classdesc This class is responsible for handling the filesystem.
 *
 */
export class FilesystemService {
  /**
   * Return a system path to the Lethean data folder
   *
   * @param pathname
   * @returns {string}
   */
  static path(pathname: any): string {
    if (pathname == undefined) {
      return Deno.cwd();
    }

    pathname = pathname.replace(/\.\./g, ".");

    if (pathname.match("/")) {
      pathname = pathname.split("/");
    } else if (pathname.match("\\")) {
      pathname = pathname.split("\\");
    }

    return path.join(Deno.cwd(), ...pathname);
  }

  /**
   * Read a file from the Lethean folder
   *
   * @openapi
   * /filesystem/write:
   * post:
   *    description: Reads a file from the filesystem
   *
   * @param args {path:string} relative path
   * @returns {string} | false
   */
  static read(args: { path: string }) {
    try {
      return Deno.readTextFileSync(args.path);
    } catch (e) {
      return false;
    }

  }

  /**
   * Checks if a directory exists
   *
   * @param {{path: string}} args
   * @returns {boolean}
   */
  static existsDir(args: { path: string }) {

    try {
      return !!Deno.readDirSync(FilesystemService.path(args.path));
    } catch (e) {
      return false;
    }
  }

  /**
   * Checks if a file exists
   *
   * @param {{path: string}} args
   * @returns {boolean}
   */
  static existsFile(args: { path: string }) {

    try {
      return !!Deno.readFileSync(args.path);
    } catch (e) {
      return false;
    }
  }

  /**
   *  List all files in a directory  (recursive)
   *
   *  @param {{path: string}} args
   *  @returns {string[]}
   *  @example
   *   FilesystemService.list({path: "./"})
   */
  static list(args: any) {
    const ret = [];
    for (
      const dirEntry of Deno.readDirSync(
      FilesystemService.path(args.path)
    )
      ) {
      if (!dirEntry.name.startsWith(".")) {
        ret.push(dirEntry.name);
      }
    }
    return JSON.stringify(ret);
  }

  /**
   * Write to the Lethean data folder
   *
   * @param {string} filepath relative path
   * @param {string} data string data to save
   * @returns {string}
   */
  static write(filepath: string, data: string) {
    FilesystemService.ensureDir(path.dirname(filepath));

    Deno.writeTextFileSync(filepath, data);
    return "1";
  }

  /**
   * Makes sure the directory structure is in place for path
   *
   * @param {string} path relative path
   * @param {string} path
   */
  static ensureDir(path: string) {
    return ensureDirSync(path);
  }

  static delete(filepath: string) {
    return Deno.removeSync(path.join(Deno.cwd(),filepath));
  }
}
