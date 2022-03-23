import { FilesystemService } from "../filesystem.service.ts";
import * as path from "https://deno.land/std/path/mod.ts";
import { Destination, download } from "https://deno.land/x/download/mod.ts";
import { LetheanDownloadService } from "../download.service.ts";

export class LetheanAppInstall {

  plugin: {code: string, config: string} = {code: 'lthn-app-setup', config: "https://raw.githubusercontent.com/letheanVPN/lthn-app-setup/main/lthn.json"}

  constructor(plugin?: {code: string, config: string} ) {
    if (plugin){
      this.plugin = plugin
    }

  }

  installed(){
    return FilesystemService.exists({path: path.join('apps', ...this.plugin.code.split('-'),'lthn.json')})
  }

  async install() {

    const jsonResponse = await fetch( this.plugin.config, {cache: "no-cache"});
    const pluginConfig = await jsonResponse.json();

    if(pluginConfig['code'] == this.plugin.code){

      await LetheanDownloadService.downloadZipContents(pluginConfig['app']['url'], path.join(Deno.cwd(),'apps', ...this.plugin.code.split('-')))

    }else {
      console.error("Package code miss match.")
    }

    return true
  }
}
