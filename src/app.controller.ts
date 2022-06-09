import { FileSystemService } from "./services/fileSystemService.ts";
import { Controller, Get, UseGuards } from "../deps.ts";

@Controller("")
export class AppController {

  @Get("/cert")
  cert() {
    return FileSystemService.read("users/server.lthn.pub");
  }
}
