import { assertExists, assertStrictEquals, copy, decompress, ensureDir, ensureDirSync, path, readerFromStreamReader, Untar } from "../../../../deps.ts";
import { FileSystemService } from "../../../services/fileSystemService.ts";

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
    const url: string = download['url'] as string;

    const filename: string = download['name']

    const response = await fetch(url);

    assertStrictEquals(response.status, 200);
    assertExists(response.body);

    if(url.endsWith('.zip')){

      //const blob = await response.blob();

      /** size in bytes */
      const size = parseInt(response.headers.get("Content-Length") ?? "0");
      let total = 0;
      for await(const chunk of response.body!) {
        total += chunk.byteLength;
        await Deno.writeFile(path.join(Deno.cwd(), "cli", filename), chunk, { append: true });
      }
      await decompress(path.join(Deno.cwd(), "cli", filename), path.join(Deno.cwd(), "cli"));
    }else if(url.endsWith('.tar.gz')){
      if(response.body == null){
        return false;
      }
      const streamReader = response.body
        .pipeThrough(new DecompressionStream("gzip"))
        .getReader();

      const denoReader = readerFromStreamReader(streamReader);
      const untar = new Untar(denoReader);

      for await (const entry of untar) {
        const { fileName, type } = entry;
        if (type === "directory") {
          await ensureDir(path.join(Deno.cwd(), "cli", fileName));
          continue;
        }

        await Deno.writeFile(
          path.join(Deno.cwd(), "cli", fileName),
          new Uint8Array(),
          { mode: 0o777 },
        );
        const file = await Deno.open(
          path.join(Deno.cwd(), "cli", fileName),
          { write: true },
        );
        await copy(entry, file);
      }

    }

    return true


  }

}
