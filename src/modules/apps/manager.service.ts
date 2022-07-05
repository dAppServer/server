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
  async install() {
    const jsonResponse = await fetch(this.plugin.config, { cache: "no-cache" });
    const pluginConfig = await jsonResponse.json();

    if (pluginConfig["code"] == this.plugin.code) {
      await LetheanDownloadService.downloadZipContents(
        pluginConfig["app"]["url"],
        `apps/${this.plugin.code.split("-").join("/")}`,
      );
    } else {
      console.error("Package code miss match.");
    }

    return true;
  }

  /**
   * Load application install state
   *
   * @returns {Promise<any>}
   */
  getConfig() {
    this.apps = JSON.parse(StoredObjectService.getObject({
      group: "apps",
      object: "installed",
    }));
    return this.apps;
  }

  /**
   * Install Known Application
   *
   * @param {string} name
   * @returns {Promise<any>}
   */
  installApp(name: string) {
    if(!this.apps[name]){
      this.apps[name] = true;
    }
    return  this.saveConfig()
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
}
