import { FileSystemService } from "./services/fileSystemService.ts";
import { Body, Context, Controller, Get, Res, Response } from "https://deno.land/x/oak_nest@v1.10.4/mod.ts";

@Controller("")
export class AppController {

  @Get("cert")
  cert() {
    return FileSystemService.read("users/server.lthn.pub");

  }
}
