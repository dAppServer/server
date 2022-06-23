import { FileSystemService } from "./services/fileSystemService.ts";
import { Context, Controller, Get, UseGuards } from "../deps.ts";

@Controller("")
export class AppController {

  @Get("cert")
  cert(context: Context) {
    context.response.body = FileSystemService.read("users/server.lthn.pub");
  }
}
