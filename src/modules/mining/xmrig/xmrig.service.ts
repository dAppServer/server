import { assertExists, assertStrictEquals, copy, decompress, ensureDir, ensureDirSync, path, readerFromStreamReader, Untar } from "../../../../deps.ts";
import { FileSystemService } from "../../../services/fileSystemService.ts";
import { Destination, LetheanDownloadService } from "../../../services/download.service.ts";

export class XmrigService {


  isInstalled(){
    return FileSystemService.isDir('cli/xmrig')
  }

  async getReleaseDownloads() {

    let data = await fetch('https://api.xmrig.com/1/latest_release/xmrig')

    return await data.json()
  }

  async downloadXmrig(id:string) {

    const downloads = await this.getReleaseDownloads()

    let download;

    downloads['assets'].map((item:any) => {
      if(item['id'] === id){
          download = item
      }
    })
    //console.log(download)

    if(download == undefined){
      return false;
    }
   // const url = "https://github.com/xmrig/xmrig/releases/download/v6.18.0/xmrig-6.18.0-macos-arm64.tar.gz";
    const url = new URL(download['url'] as string);

    const filename: string = download['name']


    const destination: Destination = {
      file: filename,
      dir: path.join(Deno.cwd(), "cli"),
    };

    FileSystemService.ensureDir(path.join(Deno.cwd(), "cli"));

    console.info(`Attempting to download ${url}`);
    const fileObj = await LetheanDownloadService.download(url, destination);
    console.info(`Downloaded to: ${destination.dir}`);

    console.info(`Unpacking file: ${fileObj.fullPath}`);

    return true


  }

}
