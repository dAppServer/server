import { ensureDirSync, Injectable, path } from "../../deps.ts";

/**
 * @class
 * @classdesc This class is responsible for handling the filesystem.
 */
@Injectable()
export class FileSystemService {
  /**
   * Return a system path to the Lethean folder
   *
   * @param pathname
   * @returns {string}
   */
  static path(pathname: any): string {
    if (pathname == undefined) {
      return Deno.cwd();
    }

    if (typeof pathname === 'string') {
      pathname = pathname.replace(/\.\./g, ".");
      if (pathname.match("/")) {
        pathname = pathname.split("/");
      } else if (pathname.match("\\\\")) {
        pathname = pathname.split("\\\\");
      }else {
        pathname = [pathname];
      }

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
   * @returns {string} | false
   * @param path
   */
  static read(path: string) {
    try {
      return Deno.readTextFileSync(FileSystemService.path(path)) as string;
    } catch (e) {
      return false;
    }
  }

  /**
   * Checks if a directory exists
   *
   * @returns {boolean}
   * @param path
   */
  static isDir(path: string) {
    if (path.length == 0) return false;

    try {
      return Deno.statSync(FileSystemService.path(path)).isDirectory;
    } catch (e) {
      return false;
    }
  }

  /**
   * Checks if a file exists
   *
   * @returns {boolean}
   * @param path
   */
  static isFile(path: string) {
    if (path.length == 0) return false;

    try {

      return Deno.statSync(FileSystemService.path(path)).isFile;
    } catch (e) {
      return false;
    }
  }

  /**
   *  List all files in a directory  (recursive)
   *
   *  @returns {string[]}
   *  @example
   *   FileSystemService.list( "./")
   * @param path
   */
  static list(path: string): string[] {
    const ret = [];
    try {
      for (
          const dirEntry of Deno.readDirSync(
          FileSystemService.path(path),
      )
          ) {
        if (!dirEntry.name.startsWith(".")) {
          ret.push(dirEntry.name);
        }
      }
      return ret;
    }catch (e) {
      return []
    }
  }

  /**
   * Write to the Lethean data folder
   *
   * @returns boolean
   * @param filepath string
   * @param data string
   */
  static write(filepath: string, data: string) {
    try {
      FileSystemService.ensureDir(path.dirname(filepath));

      Deno.writeTextFileSync(filepath, data);
    } catch (e) {
      return false;
    }

    return true;
  }

  /**
   * Makes sure the directory structure is in place for path
   *
   * @param {string} path relative path to the Lethean folder
   */
  static ensureDir(path: string) {
    try {
      ensureDirSync(FileSystemService.path(path));
    } catch (e) {
      return false;
    }
    return true;
  }

  /**
   * Delete a file
   *
   * @param filepath string
   */
  static delete(filepath: string) {
    try {
      Deno.removeSync(FileSystemService.path(filepath));
    } catch (e) {
      return false;
    }
    return true;
  }
}
