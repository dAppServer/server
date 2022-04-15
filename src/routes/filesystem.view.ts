
import { StringResponse } from "../interfaces/string-response.ts";

import { FileSystemService } from "../services/fileSystemService.ts";
import { Command } from "../../deps.ts";

export class RouteFilesystem {
  public static config() {
    return new Command().description("File System")
      .command("list", "List entities in path")
      .option("--path <string>", "File path to view")
      .action((args) => {
        const req = FileSystemService.list(args.path);
        if (Deno.env.get("REST")) {
          throw new StringResponse(JSON.stringify(req));
        }
      })
      .command("path", "Returns correct")
      .option("--convert <string>", "File path to convert")
      .action((args) => {
        const req = FileSystemService.path(args.convert);
        if (Deno.env.get("REST")) {
          throw new StringResponse(req);
        }
      })
      .command("read", "Returns file")
      .option("--path <string>", "File path to read")
      .action((args) => {
        const req = FileSystemService.read(args.path);
        if (req) {
          if (Deno.env.get("REST")) {
            throw new StringResponse(btoa(req));
          }
          // throw to console
          throw new StringResponse(req);
        }
      })
      .command("write", "Write a file")
      .option("--path <string>", "File path to read")
      .option("--data <string>", "File data to save")
      .action((args) => {
        let data = args.data;
        if (Deno.env.get("REST")) {
          data = atob(data)
        }
        FileSystemService.write(args.path, data);

        throw new StringResponse("1");
      });
  }
}
