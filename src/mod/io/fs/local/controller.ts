import { ModIoFsLocalService } from "@mod/io/fs/local/service.ts";
import { Controller, Post, Body } from "danet/mod.ts";
import { Tag, ReturnedType } from "danetSwagger/decorators.ts";
import { CreateFileDTO, FilePathCheckDTO, FilePathDTO } from "@mod/io/fs/local/interfaces.ts";

@Tag( "Input/Output" )
@Controller("io/storage" )
export class ModIoFsLocalController {
  constructor(private fileSystemService: ModIoFsLocalService) {}

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
   * Reads storage contents
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
   * Writes storage contents
   * @param {CreateFileDTO} body
   * @returns {boolean}
   */
  @Post("write")
  writeFile(@Body() body: CreateFileDTO) {
    const data = atob(body.data);
    return this.fileSystemService.write(body.path, data);
  }

  /**
   * Checks if path is a storage
   * @param {FilePathDTO} body
   * @returns {boolean}
   */
  @Post("is-storage")
  @ReturnedType(FilePathCheckDTO)
  isFile(@Body() body: FilePathDTO): FilePathCheckDTO {
    return {
      path: body.path,
      result: this.fileSystemService.isFile(body.path)
    };
  }

  /**
   * Checks if path is a directory
   * @param {FilePathDTO} body
   * @returns {boolean}
   */
  @Post("is-dir")
  @ReturnedType(FilePathCheckDTO)
  isDir(@Body() body: FilePathDTO): FilePathCheckDTO {
    return {
      path: body.path,
      result: this.fileSystemService.isDir(body.path)
    };
  }

}
