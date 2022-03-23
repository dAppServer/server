import * as path from "https://deno.land/std/path/mod.ts";
import { ensureDirSync } from "https://deno.land/std@0.114.0/fs/mod.ts";

export class FilesystemService {
  /**
   * Return a system path to the Lethean data folder
   *
   * @param pathname
   * @returns {string}
   */
  static path(pathname: any): string {
    if(pathname == undefined){
      return Deno.cwd()
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
      return Deno.readTextFileSync(FilesystemService.path(args.path));
    }catch (e){
      return false;
    }

  }

  /**
   * Checks if a file exists
   *
   * @param {{path: string}} args
   * @returns {boolean}
   */
  static exists(args: { path: string }){

    try {
      return !!Deno.readDirSync(FilesystemService.path(args.path));
    }catch (e){
      return false
    }
  }

  static list(args: any) {
    const ret = [];
    for (
      const dirEntry of Deno.readDirSync(
        FilesystemService.path(args.path),
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
   * @param {string} path relative path
   * @param {string} data string data to save
   * @returns {string}
   */
  static write(path: string, data: string) {
    FilesystemService.ensureDir(path)
    Deno.writeTextFileSync(FilesystemService.path(path), data);
    return "1";
  }

  /**
   * Makes sure the directory structure is in place for path
   *
   * @param {string} path
   */
  static ensureDir(path: string){
    return ensureDirSync(path);
  }
}
