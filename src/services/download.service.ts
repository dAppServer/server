import { unZipFromFile } from "https://deno.land/x/zip@v1.1.0/unzip.ts";
import { Destination, download } from "https://deno.land/x/download/mod.ts";
import { FilesystemService } from "./filesystem.service.ts";

export class LetheanDownloadService {

  /**
   * Downloads and extracts a zip file's contents to the dest directory
   *
   * @param {string} url
   * @param {string} dest
   * @returns {Promise<void>}
   */
  static async downloadZipContents(url: string, dest: string) {

    const filename =  url.split('/').pop() ?? ''
    const destination: Destination = {
      file: filename,
      dir: './apps'
    }
    FilesystemService.ensureDir(dest)
    console.info(`Attempting to download ${url}`)
    const fileObj = await download(url, destination);



    await unZipFromFile(
      fileObj.fullPath,
      dest,
      { includeFileName: false }
    );

    await Deno.remove(fileObj.fullPath)
  }
}
