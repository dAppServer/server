import { Command } from "https://deno.land/x/cliffy/command/mod.ts";
import { StringResponse } from "../interfaces/string-response.ts";
import { decode as base64Decode } from "https://deno.land/std@0.82.0/encoding/base64.ts";
import { StoredObjectService } from "../services/config/store.ts";

export class RouteObject {
  public static config() {
    return new Command()
      .description("Configured File Service")
      .command("get", "Returns a store json data object")
      .option("-g,--group <string>", "Object Group", { default: "lthn" })
      .option("-o,--object <string>", "Object key to fetch")
      .action((args) => {
        throw new StringResponse(StoredObjectService.getObject(args));
      })
      .command("set", "Returns a store json data object")
      .option("-o,--object <string>", "Object key to set")
      .option("-g,--group <string>", "Object Group", { default: "lthn" })
      .option("-d,--data <string>", "Data object to save")
      .action((args) => {
        const textDecoder = new TextDecoder("utf-8");
        const decodedValue = textDecoder.decode(base64Decode(args.data));

        StoredObjectService.setObject({
          group: args.group,
          object: args.object,
          data: decodedValue,
        });

        throw new StringResponse("saved");
      })
      .command("remove", "Remove an object from storage")
      .option("-g,--group <string>", "Object Group", { default: "lthn" })
      .option("-o,--object <string>", "Object key to remove")
      .action((args) => {
        StoredObjectService.removeObject(args);
        throw new StringResponse("removed");
      })
      .command("clear", "clears object storage")
      .option("-g,--group <string>", "Object Group", { default: "lthn" })
      .action((args) => {
        StoredObjectService.clearObjects(args);
        throw new StringResponse("removed");
      })
      .command("count", "returns object count for group")
      .option("-g,--group <string>", "Object Group", { default: "lthn" })
      .action((args) => {
        const ret = StoredObjectService.countObjects(args);
        throw new StringResponse(ret.length.toString());
      });
  }
}
