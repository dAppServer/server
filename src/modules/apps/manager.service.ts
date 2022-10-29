import { FileSystemService } from "../../services/fileSystemService.ts";
import { AppManagerInstaller } from "./installer.service.ts";
import { AppManagerConfig } from "./config.service.ts";

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
  private config: AppManagerConfig

  /**
   * Init a plugin on the system
   *
   * @param {{code: string, config: string}} plugin
   */
  constructor(plugin?: { code: string; config: string }) {
    if (plugin) {
      this.plugin = plugin;
    }

    this.config =  new AppManagerConfig()
    this.apps = this.config.getConfig()

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
      const AppInstaller = new AppManagerInstaller()

      return await AppInstaller.install(name, pkg);
    }

    return false;
  }

  /**
   * Remove known Application
   *
   * @param {string} name
   * @returns {Promise<any>}
   */
  removeApp(name: string) {
    if (this.apps[name]) {
      const AppInstaller = new AppManagerInstaller()
       AppInstaller.uninstall(name);
      const AppConfig = new AppManagerConfig()
      AppConfig.removeConfigKey(name)
    }
    return false
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
