import { FileSystemService } from "../../services/fileSystemService.ts";
import { ensureDir, path } from "../../../deps.ts";
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
      "https://raw.githubusercontent.com/letheanVPN/lthn-app-setup/main/lthn.json"
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
    this.getConfig();
  }

  /**
   * Checks if the package is installed
   *
   * @returns {boolean}
   */
  installed() {
    return FileSystemService.isDir(
      `apps/${this.plugin.code.split("-").join("/")}`
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
      /**
       * for types bin and core, we are just downloading backend services to be used by te server
       */
      if (pluginConfig["type"] == "bin" || pluginConfig["type"] == "core") {
        const downloadUrl = pluginConfig["downloads"]["aarch64"] == undefined ? pluginConfig["downloads"]["x86_64"][Deno.build.os]["url"] : pluginConfig["downloads"][Deno.build.arch][Deno.build.os]["url"];
        let installDir = "";
        if (pluginConfig["type"] === "bin") {
          installDir = path.join("cli", pluginConfig["install"]);
          pluginConfig["directory"] =  FileSystemService.path(installDir)
        } else if (pluginConfig["type"] === "core" && pluginConfig["code"] === "server") {
          installDir = path.join(pluginConfig["install"]);
        }
        await LetheanDownloadService.downloadContents(
          downloadUrl,
          installDir
        );

        if (pluginConfig["namespace"]) {
          await ensureDir(FileSystemService.path(path.join("data", pluginConfig["namespace"])));
          await ensureDir(FileSystemService.path(path.join("conf", pluginConfig["namespace"])));
        }

        /**
         * the type `app` is the only way to get UI elements in and cant included binaries, but can depend on a binary package
         */
      } else {

        await LetheanDownloadService.downloadContents(
          pluginConfig["app"]["url"],
          `apps/${pluginConfig["code"].split("-").join("/")}`
        );

      }
      StoredObjectService.setObject({ group: "apps", object: pluginConfig["code"], data: JSON.stringify(pluginConfig) });

      this.apps[pluginConfig["code"]] = { "name": pluginConfig["name"], "version": pluginConfig["version"], "pkg": pkg };

      if(pluginConfig['type'] == 'app'){
        this.apps[pluginConfig["code"]]['directory'] = `apps/${pluginConfig["code"].split("-").join("/")}`

        if(pluginConfig['menu']){
          let menu = JSON.parse(StoredObjectService.getObject({ group: 'apps', object: 'menu'}) as string)
          if(!menu.forEach((item: any) => { if(item['title']){return true}})){
            menu.push({app: pluginConfig['code'], ...pluginConfig['menu']['main']})
          }
          StoredObjectService.setObject({ group: "apps", object: 'menu', data: JSON.stringify(menu) });

        }
      }
    } else {
      console.error("Package code miss match.", pluginConfig["code"], name);
    }

    return true;
  }

  uninstall(code: string){
    if(this.apps[code] && this.apps[code]['directory']){
      FileSystemService.delete(this.apps[code]['directory'])
      try {
        let menu = JSON.parse(StoredObjectService.getObject({ group: 'apps', object: 'menu' }) as string)
        let newMenu: string[] = menu.map((item: any) => {
          if (item['title'] !== code) {
            return item
          }
        })
        StoredObjectService.setObject({ group: "apps", object: menu, data: JSON.stringify(newMenu) });
      }catch (e) {

      }
      }

  }
  /**
   * Load application install state
   *
   * @returns {Promise<any>}
   */
  getConfig() {
    this.apps = StoredObjectService.getObject({
      group: "apps",
      object: "installed"
    });

    try {
      this.apps = JSON.parse(this.apps);
    } catch (e) {

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
    if (pkg) {
      await this.install(name, pkg);
    }

    return this.saveConfig();
  }

  /**
   * Remove known Application
   *
   * @param {string} name
   * @returns {Promise<any>}
   */
  removeApp(name: string) {
    if (this.apps[name]) {
      this.uninstall(name)
      delete this.apps[name];
    }
    return this.saveConfig();
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

  async getMarketPlaceApps(opts?: { dir: string }) {
    let dir = "";
    if (opts && opts.dir) {
      dir = `${opts.dir}/`;
    }
    let url = `https://raw.githubusercontent.com/dAppServer/app-marketplace/main/${dir}index.json`;

    const postReq = await fetch(
      url,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return await postReq.json();

  }
}
