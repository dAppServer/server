import * as path from 'https://deno.land/std/path/mod.ts';
import {ensureDirSync} from 'https://deno.land/std@0.114.0/fs/mod.ts';

export class FilesystemService {
  /**
   * Return a system path to the Lethean data folder
   *
   * @param pathname
   * @returns {string}
   */
  static path(pathname: any): string {
    // turn .. into . @todo turn this into a loop, keep going on end result until no .. remains
    pathname = pathname.replace(/\.\./g, ".");

    if (pathname.match("/")) {
      pathname = pathname.split("/");
    } else if (pathname.match("\\")) {
      pathname = pathname.split("\\");
    }

    //@ts-ignore @todo grab --home-dir if passed to backend start
    const home: string = Deno.env.get("HOME") !== undefined
      ? Deno.env.get("HOME")
      : "./";

    return path.join(home, "Lethean", ...pathname);
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
   * @returns {string}
   */
  static read(args: any) {
    return Deno.readTextFileSync(FilesystemService.path(args.path));
  }

  static list(args: any) {
    const ret = [];
    for (const dirEntry of Deno.readDirSync(FilesystemService.path(args.path))) {
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
    ensureDirSync(path);
    Deno.writeTextFileSync(FilesystemService.path(path), data);
    return "1";
  }
}
