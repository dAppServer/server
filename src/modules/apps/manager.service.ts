import { FileSystemService } from "../../services/fileSystemService.ts";
import { ensureDir, path } from "../../../deps.ts";
import { LetheanDownloadService } from "../../services/download.service.ts";
import { StoredObjectService } from "../../services/config/store.ts";
import { PluginConfig, PluginType } from "../../interfaces/apps/plugin-config.ts";

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
    try {

      // obviously lots wrong here, i know, validation
      const jsonResponse = await fetch(pkg, { cache: "no-cache" });
      const pluginConfig = await jsonResponse.json() as PluginConfig;

      if (pluginConfig["code"] == name) {
        /**
         * for types bin and core, we are just downloading backend services to be used by te server
         */
        await this.installDependants(pluginConfig);
        await this.installDownload(pluginConfig);
        StoredObjectService.setObject({ group: "apps", object: pluginConfig["code"], data: JSON.stringify(pluginConfig) });

        this.apps[pluginConfig["code"]] = { "name": pluginConfig["name"], "version": pluginConfig["version"], "pkg": pkg };

        if (pluginConfig["type"] == "app") {
          this.apps[pluginConfig["code"]]["directory"] = `apps/${pluginConfig["code"].split("-").join("/")}`;

          if (pluginConfig["menu"]) {
            await this.installMenu(pluginConfig);
          }
          return;
        }
      } else {
        // @todo finish cleaning this up
        console.log(`Package code miss match. ${pluginConfig["code"]} ${name}`);
        return false;
      }

    } catch (e) {
      console.log(e);
      return false;
    }
    return true;
  }

  /**
   *
   * @param {PluginConfig} plugin
   * @returns {Promise<void>}
   */
  async installDownload(plugin: PluginConfig) {

    if (plugin["type"] === PluginType.BIN || plugin["type"] === PluginType.CORE) {

      let installDir = "";

      if (Deno.build.arch == "aarch64" && plugin["downloads"]["aarch64"]) {

        await LetheanDownloadService.downloadContents(
          plugin["downloads"]["x86_64"][Deno.build.os]["url"],
          installDir
        );
      } else {
        await LetheanDownloadService.downloadContents(
          plugin["downloads"][Deno.build.arch][Deno.build.os]["url"],
          installDir
        );

      }

      if (plugin["namespace"]) {
        await ensureDir(FileSystemService.path(path.join("data", plugin["namespace"])));
        await ensureDir(FileSystemService.path(path.join("conf", plugin["namespace"])));
      }

    } else if (plugin["type"] && PluginType.APP) {
      await LetheanDownloadService.downloadContents(
        plugin["downloads"]["app"],
        `apps/${plugin["code"].split("-").join("/")}`
      );
    } else {
      console.log("Plugin type not known");
      return false;
    }

  }

  async installDependants(plugin: PluginConfig) {
    if (plugin["depends"] && plugin["depends"].length > 0) {
      plugin["depends"].forEach((item: string) => {
        console.log(item);
      });
    }
  }


  /**
   * adds menu entries to application menu
   *
   * @param {PluginConfig} plugin
   * @returns {boolean}
   */
  installMenu(plugin: PluginConfig) {
    let menu = JSON.parse(StoredObjectService.getObject({ group: "apps", object: "menu" }) as string);
    if (!menu.forEach((item: any) => {
      if (item["title"]) {
        return true;
      }
    })) {
      menu.push({ app: plugin["code"], ...plugin["menu"]["main"] });
    }
    return StoredObjectService.setObject({ group: "apps", object: "menu", data: JSON.stringify(menu) });

  }

  /**
   * Uninstall user installed application
   *
   * @param {string} code
   * @returns {boolean | boolean}
   */
  uninstall(code: string): boolean {
    if (this.apps[code] && this.apps[code]["directory"]) {
      FileSystemService.delete(this.apps[code]["directory"]);
      try {
        let menu = JSON.parse(StoredObjectService.getObject({ group: "apps", object: "menu" }) as string);
        let newMenu: string[] = menu.map((item: any) => {
          if (item["title"] !== code) {
            return item;
          }
        });
        return StoredObjectService.setObject({ group: "apps", object: menu, data: JSON.stringify(newMenu) });
      } catch (e) {
        return false;
      }
    }

    return false;

  }

  /**
   * Load application install state from the stored object service
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
      this.apps = {}
      if(!FileSystemService.isFile('data/objects/apps/installed.json')){
        StoredObjectService.setObject({
          group: "apps",
          object: "installed",
          data: this.apps
        });
      }else{
        console.error("Failed to load config object, but it the file is present. Please check data/objects/apps/installed.json is valid json, or delete the file for it to be remade.")
      }

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
      this.uninstall(name);
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
