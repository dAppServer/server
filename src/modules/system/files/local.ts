import { Injectable, Controller, Get, Post, Params, Body } from "../../../../deps.ts";

import { FileSystemService } from "../../../services/fileSystemService.ts";


@Controller("system/files")
@Injectable()
export class SystemFilesController {

  @Post("list", {
    isAbsolute: false
  })

  listFiles(@Body("path") path: string) {

    const req = FileSystemService.list(path);

    return JSON.stringify(req);

  }

  @Post("path")
  path(@Body("convert") convert: string) {
    return FileSystemService.path(convert);

  }

  @Post("read")
  pathLookup(@Body("path") path: string) {

    const req = FileSystemService.read(path);
    if (!req) {
      return undefined;
    } else {
      return btoa(req);
    }

  }

  @Post("write")
  writeFile(@Body("path") path: string,
            @Body("data") data: string) {

    try {
      FileSystemService.write(path, atob(data));
    } catch (e) {
      return false
    }
    return true;
  }

  @Post("file-check")
  fileCheck(@Body("path") path: string) {

    try {
      return JSON.stringify({ "result": FileSystemService.isFile(path) });
    } catch (e) {
      return false
    }

  }

  @Post("dir-check")
  dirCheck(@Body("path") path: string) {

    try {
      return JSON.stringify({ "result": FileSystemService.isDir(path) });
    } catch (e) {
      return false
    }
  }

}
