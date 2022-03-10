import { renderFile } from "https://deno.land/x/mustache/mod.ts";
import os from "https://deno.land/x/dos@v0.11.0/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";

export class ConfigFileService {
  public static async loadFile(args: { file: string; model: any }) {
    const homeDir = os.homeDir();
    const model = {
      ...args.model, // user data
      dir: path.join(homeDir ? homeDir : "./", "Lethean", "conf"),
    };
    return await renderFile(
      path.join(
        homeDir ? homeDir : "./",
        "Lethean",
        "conf",
        "templates",
        args.file,
      ),
      model,
    );
  }
}
