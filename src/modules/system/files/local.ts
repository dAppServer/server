import { Injectable, Controller, Get, Post, Context, Body, Params } from "../../../../deps.ts";

import { FileSystemService } from "../../../services/fileSystemService.ts";

@Controller("system/files")
@Injectable()
export class SystemFilesController {

  @Post("list", {
    isAbsolute: false
  })
  listFiles(@Params("path") path: string) {

    const req = FileSystemService.list(path);

    return JSON.stringify(req);

  }

  @Post("path")
  path(@Params("convert") convert: string) {
    return FileSystemService.path(convert);

  }

  @Post("read")
  pathLookup(@Params("path") path: string) {

    const req = FileSystemService.read(path);
    if (!req) {
      return undefined;
    } else {
      return btoa(req);
    }

  }

  @Post("write")
  writeFile(@Params("path") path: string, @Params("data") data: string) {

    try {
      FileSystemService.write(path, atob(data));
    } catch (e) {
      return false
    }
    return true;
  }

  @Post("file-check")
  fileCheck(@Params("path") path: string) {

    try {
      return JSON.stringify({ "result": FileSystemService.isFile(path) });
    } catch (e) {
      return false
    }

  }

  @Post("dir-check")
  dirCheck(@Params("path") path: string) {

    try {
      return JSON.stringify({ "result": FileSystemService.isDir(path) });
    } catch (e) {
      return false
    }
  }

}
