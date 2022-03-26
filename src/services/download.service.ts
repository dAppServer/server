import { unZipFromFile } from "https://deno.land/x/zip@v1.1.0/unzip.ts";
import { FilesystemService } from "./filesystem.service.ts";
import { ensureDirSync } from "https://deno.land/std/fs/mod.ts";


export interface Destination {
  /**
   * The destination directory
   */
  dir?: string,
  /**
   * The destination file
   */
  file?: string,
  /**
   * The destination file name
   */
  mode?: number
}


export interface DownloadedFile {
  /**
   * The name of the file
   */
  file: string,
  /**
   * The path to the file
   */
  dir:string,
  /**
   * The mode of the file
   */
  fullPath: string,
  /**
   * The mode of the file
   */
  size: number
}

/**
 * @class DownloadService
 * @description
 * Service to download files from the internet
 */
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
    const fileObj = await LetheanDownloadService.download(new URL(url), destination);



    await unZipFromFile(
      fileObj.fullPath,
      dest,
      { includeFileName: false }
    );

    await Deno.remove(fileObj.fullPath)
  }

  /**
   * Downloads a file to the destination
   *
   * @param {URL} url
   * @param {Destination} destination
   * @returns {Promise<DownloadedFile>}
   */
  static async download(
    url:URL,
    destination?:Destination,
    options?:RequestInit
  ): Promise<DownloadedFile>{
    let file:string;
    let fullPath:string;
    let dir:string = '';
    let mode:object = {};
    let finalUrl:string;
    let size:number;

    const response = await fetch(url, options);
    finalUrl = response.url.replace(/\/$/, "");
    if(response.status != 200){
      return Promise.reject(
        new Deno.errors.Http(`status ${response.status}-'${response.statusText}' received instead of 200`)
      );
    }
    const blob = await response.blob();
    /** size in bytes */
    size = blob.size;
    const buffer = await blob.arrayBuffer();
    const unit8arr = new Deno.Buffer(buffer).bytes();
    if( typeof destination === 'undefined' || typeof destination.dir === 'undefined' ){
      dir = Deno.makeTempDirSync({ prefix: 'deno_dwld' });
    } else {
      dir = destination.dir;
    }
    if(typeof destination === 'undefined' || typeof destination.file === 'undefined' ){
      file = finalUrl.substring(finalUrl.lastIndexOf('/')+1);
    } else {
      file = destination.file;
    }
    if(typeof destination != 'undefined' && typeof destination.mode != 'undefined' ){
      mode = { mode: destination.mode }
    }

    dir = dir.replace(/\/$/, "");
    ensureDirSync(dir)

    fullPath = `${dir}/${file}`;
    Deno.writeFileSync(fullPath, unit8arr, mode);
    return Promise.resolve({file, dir, fullPath, size});
  }

}
