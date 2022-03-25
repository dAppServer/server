import { FilesystemService } from "../filesystem.service.ts";
import * as path from "https://deno.land/std/path/mod.ts";
import { LetheanDownloadService } from "../download.service.ts";

/**
 * Install an app from the Lethean repository
 * @param appName The name of the app to install
 * @param version The version of the app to install
 * @param destination The destination folder to install the app to
 */
export class LetheanAppInstall {

  plugin: {code: string, config: string} = {code: 'lthn-app-setup', config: "https://raw.githubusercontent.com/letheanVPN/lthn-app-setup/main/lthn.json"}

  /**
   * Init a plugin on the system
   *
   * @param {{code: string, config: string}} plugin
   */
  constructor(plugin?: {code: string, config: string} ) {
    if (plugin){
      this.plugin = plugin
    }

  }

  /**
   * Checks if the package is installed
   *
   * @returns {boolean}
   */
  installed(){
    return FilesystemService.existsDir({path: path.join('apps', ...this.plugin.code.split('-'))})
  }

  /**
   * Attempts to install the package locally
   *
   * @returns {Promise<boolean>}
   */
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
