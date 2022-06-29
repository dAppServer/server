import { copy, ensureDirSync, unZipFromFile } from "../../deps.ts";
import { FileSystemService } from "../../src/services/fileSystemService.ts";
import { ZeroMQServer } from "../../src/services/ipc/zeromq.ts";

export interface Destination {
  /**
   * The destination directory
   */
  dir?: string;
  /**
   * The destination file
   */
  file?: string;
  /**
   * The destination file name
   */
  mode?: number;
}

export interface DownloadedFile {
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
    const filename = url.split("/").pop() ?? "";
    const destination: Destination = {
      file: filename,
      dir: FileSystemService.path(dest),
    };
    FileSystemService.ensureDir(dest);
    console.info(`Attempting to download ${url}`);
    const fileObj = await LetheanDownloadService.download(
      new URL(url),
      destination,
    );
    console.info(`Extracting to: ${dest}`);
    await unZipFromFile(
      fileObj.fullPath,
      dest,
      { includeFileName: false },
    );

    await Deno.remove(fileObj.fullPath);
  }

  /**
   * Downloads a file to the destination
   *
   * @param {URL} url
   * @param {Destination} destination
   * @param options
   * @returns {Promise<DownloadedFile>}
   */
  static async download(
    url: URL,
    destination?: Destination,
    options?: RequestInit,
  ): Promise<DownloadedFile> {
    let file: string, dir = "", mode = {};

    const response = await fetch(url, options);
    const finalUrl = response.url.replace(/\/$/, "");
    if (response.status != 200) {
      return Promise.reject(
        new Deno.errors.Http(
          `status ${response.status}-'${response.statusText}' received instead of 200`,
        ),
      );
    }

    if (
      typeof destination === "undefined" ||
      typeof destination.dir === "undefined"
    ) {
      dir = Deno.makeTempDirSync({ prefix: "deno_dwld" });
    } else {
      dir = destination.dir;
    }
    if (
      typeof destination === "undefined" ||
      typeof destination.file === "undefined"
    ) {
      file = finalUrl.substring(finalUrl.lastIndexOf("/") + 1);
    } else {
      file = destination.file;
    }
    if (
      typeof destination != "undefined" &&
      typeof destination.mode != "undefined"
    ) {
      mode = { mode: destination.mode };
    }

    dir = dir.replace(/\/$/, "");
    ensureDirSync(dir);
    //const blob = await response.blob();
    const fullPath = `${dir}/${file}`;
    /** size in bytes */
    const size = parseInt(response.headers.get("Content-Length") ?? "0");
    let total = 0;
    for await(const chunk of response.body!) {
      total += chunk.byteLength;
      ZeroMQServer.sendPubMessage('download', JSON.stringify({
        file: file,
        dir: dir,
        fullPath: fullPath,
        size: size,
        total: total,
      }));
      await Deno.writeFile(fullPath, chunk, { append: true });
    }
//    const buffer = await blob.arrayBuffer();
//    const unit8arr = new Deno.Buffer(buffer).bytes();


    //Deno.writeFileSync(fullPath, unit8arr, mode);
    return Promise.resolve({ file, dir, fullPath, size });
  }
}
