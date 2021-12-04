import {Command} from 'https://deno.land/x/cliffy/command/mod.ts';
import * as path from 'https://deno.land/std/path/mod.ts';
import {ensureDirSync} from 'https://deno.land/std@0.114.0/fs/mod.ts';
import {StringResponse} from '../interfaces/string-response.ts';

import {

  decode as base64Decode,

  encode as base64Encode,

} from 'https://deno.land/std@0.82.0/encoding/base64.ts';



export { base64Decode, base64Encode };
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

  public static config() {
    return new Command().description("File System")
      .command("list", "List entities in path")
      .option("--path <string>", "File path to view")
      .action((args) => {
        const req = FilesystemService.list(args);
        if (Deno.env.get("REST")) {
          throw new StringResponse(req);
        }
      })
      .command("path", "Returns correct")
      .option("--convert <string>", "File path to convert")
      .action((args) => {
        const req = FilesystemService.path(args.convert);
        if (Deno.env.get("REST")) {
          throw new StringResponse(req);
        }
      })
      .command("read", "Returns file")
      .option("--path <string>", "File path to read")
      .action((args) => {
        const req = FilesystemService.read(args);
        if (Deno.env.get("REST")) {
          const textEncoder = new TextEncoder();

          const encodedValue = base64Encode(textEncoder.encode(req));
          throw new StringResponse(encodedValue);
        }
        // throw to console
        throw new StringResponse(req);
      })
      .command("write", "Write a file")
      .option("--path <string>", "File path to read")
      .option("--data <string>", "File data to save")
      .action((args) => {
        let data = args.data
        if (Deno.env.get("REST")) {
          const textDecoder = new TextDecoder('utf-8');

          data = textDecoder.decode(base64Decode(data));
        }
         FilesystemService.write(args.path, data);

        throw new StringResponse('1')
      });
  }
}
