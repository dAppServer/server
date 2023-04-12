import { FileSystemService } from "./fileSystemService.ts";
import { Controller, Post, Body, Tag, Options, Get } from "../../../../deps.ts";
import { CreateFileDTO, FilePathDTO } from "./local.interface.ts";

@Tag( "Input/Output" )
@Controller("io/filesystem" )
export class FileSystemController  {
  constructor(private fileSystemService: FileSystemService) {}

  /**
   * Lists directory contents
   * @param {FilePathDTO} body
   * @returns {string[]}
   */
  @Post("list")
  getDirectoryList(@Body() body: FilePathDTO) {
    return this.fileSystemService.list(body.path);
  }

  /**
   * Lists directory contents with detailed information
   * @param {FilePathDTO} body
   * @returns {Deno.DirEntry[]}
   */
  @Post("list-detailed")
  getDetailedDirectoryList(@Body() body: FilePathDTO) {
    return this.fileSystemService.detailedList(body.path);
  }

  /**
   * Reads file contents
   * @param {FilePathDTO} body
   * @returns {string | boolean}
   */
  @Post("read")
  readFile(@Body() body: FilePathDTO) {

    const result = this.fileSystemService.read(body.path);
    if(result === false) return false;
    return btoa(result);
  }

  /**
   * Writes file contents
   * @param {CreateFileDTO} body
   * @returns {boolean}
   */
  @Post("write")
  writeFile(@Body() body: CreateFileDTO) {
    const data = atob(body.data);
    return this.fileSystemService.write(body.path, data);
  }

  /**
   * Checks if path is a file
   * @param {FilePathDTO} body
   * @returns {boolean}
   */
  @Post("is-file")
  isFile(@Body() body: FilePathDTO) {
    return this.fileSystemService.isFile(body.path);
  }

  /**
   * Checks if path is a directory
   * @param {FilePathDTO} body
   * @returns {boolean}
   */
  @Post("is-dir")
  isDir(@Body() body: FilePathDTO) {
    return this.fileSystemService.isDir(body.path);
  }

}
