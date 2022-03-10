import { Command } from "https://deno.land/x/cliffy/command/mod.ts";
import { StringResponse } from "../interfaces/string-response.ts";
import {
  decode as base64Decode,
  encode as base64Encode,
} from "https://deno.land/std@0.82.0/encoding/base64.ts";
import { FilesystemService } from "../services/filesystem.service.ts";

export class RouteFilesystem {
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
        let data = args.data;
        if (Deno.env.get("REST")) {
          const textDecoder = new TextDecoder("utf-8");

          data = textDecoder.decode(base64Decode(data));
        }
        FilesystemService.write(args.path, data);

        throw new StringResponse("1");
      });
  }
}
