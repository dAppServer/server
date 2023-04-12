import { ApiProperty, Optional } from "/deps.ts";

export class DownloadDestination implements DownloadDestination{
  /**
   * The destination directory
   */
  @ApiProperty()
  dir: string;
  /**
   * The destination filename
   */
  @ApiProperty()
  file: string;
  /**
   * The destination file mode
   */
  @ApiProperty()
  @Optional()
  mode?: number;

  constructor(file: string, dir: string, mode?: number) {
    this.file = file;
    this.dir = dir;
    this.mode = mode;
  }
}

export class DownloadedFile {
  /**
   * The name of the file
   */
  file: string;
  /**
   * The path to the file
   */
  dir: string;
  /**
   * The mode of the file
   */
  fullPath: string;
  /**
   * The mode of the file
   */
  size: number;

  constructor(file: string, dir: string, fullPath: string, size: number) {
    this.file = file;
    this.dir = dir;
    this.fullPath = fullPath;
    this.size = size;
  }
}

export class FileDownloadRequest {
  /**
   * The url to download
   */
  @ApiProperty()
  url: string;

  @ApiProperty()
  file: string;

  @ApiProperty()
  dir: string;

  @ApiProperty()
  @Optional()
  mode?: number;

}
