import { FileSystemService } from "../../services/fileSystemService.ts";
import { path } from "../../../deps.ts";
import { LetheanDownloadService } from "../../services/download.service.ts";
import { StoredObjectService } from "../../services/config/store.ts";
/**
 * Install an app from the Lethean repository
 * @param appName The name of the app to install
 * @param version The version of the app to install
 * @param destination The destination folder to install the app to
 */
export class AppManager {
  plugin: { code: string; config: string } = {
    code: "lthn-app-setup",
    config:
      "https://raw.githubusercontent.com/letheanVPN/lthn-app-setup/main/lthn.json",
  };
  public apps: any;

  /**
   * Init a plugin on the system
   *
   * @param {{code: string, config: string}} plugin
   */
  constructor(plugin?: { code: string; config: string }) {
    if (plugin) {
      this.plugin = plugin;
    }
    this.getConfig()
  }

  /**
   * Checks if the package is installed
   *
   * @returns {boolean}
   */
  installed() {
    return FileSystemService.isDir(
      `apps/${this.plugin.code.split("-").join("/")}`,
    );
  }

  /**
   * Attempts to install the package locally
   *
   * @returns {Promise<boolean>}
   */
  async install(name: string, pkg: string) {
    const jsonResponse = await fetch(pkg, { cache: "no-cache" });
    const pluginConfig = await jsonResponse.json();

    if (pluginConfig["code"] == name) {

      if(pluginConfig['type'] === 'bin') {
        const downloadUrl = pluginConfig["downloads"]["aarch64"] == undefined ? pluginConfig["downloads"]["x86_64"][Deno.build.os]['url'] : pluginConfig["downloads"][Deno.build.arch][Deno.build.os]['url'];
        await LetheanDownloadService.downloadContents(
          downloadUrl,
          pluginConfig["install"]
        );
        StoredObjectService.setObject({ group: "apps", object: pluginConfig["code"], data: JSON.stringify(pluginConfig) })

        this.apps[pluginConfig["code"]] = {"name": pluginConfig["name"], "version": pluginConfig["version"], "pkg": pkg}
      }
    } else {
      console.error("Package code miss match.", pluginConfig["code"], name);
    }

    return true;
  }

  /**
   * Load application install state
   *
   * @returns {Promise<any>}
   */
  getConfig() {
    this.apps = StoredObjectService.getObject({
      group: "apps",
      object: "installed",
    });

    try{
      this.apps = JSON.parse(this.apps)
    }catch (e) {

    }
    return this.apps;
  }

  /**
   * Install Known Application
   *
   * @param {string} name
   * @param pkg
   * @returns {Promise<any>}
   */
  async installApp(name: string, pkg?: string) {
    if (!this.apps[name]) {
      this.apps[name] = pkg ? pkg : true;
    }
    if(pkg){
      await this.install(name, pkg)
    }

    return this.saveConfig()
  }

  /**
   * Remove known Application
   *
   * @param {string} name
   * @returns {Promise<any>}
   */
  removeApp(name: string) {
    if(this.apps[name]){
      delete this.apps[name];
    }
    return  this.saveConfig();
  }


  /**
   * Save application install state
   *
   * @returns {Promise<void>}
   */
   saveConfig() {
    return StoredObjectService.setObject({
      group: "apps",
      object: "installed",
      data: JSON.stringify(this.apps)
    });

  }

  async getMarketPlaceApps(opts?:{dir:string}) {
    let dir = ''
     if(opts && opts.dir){
       dir = `${opts.dir}/`
     }
    let url = `https://raw.githubusercontent.com/dAppServer/app-marketplace/main/${dir}index.json`

    const postReq = await fetch(
      url,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      },
    );

    return await postReq.json();

  }
}
