import { FileSystemService } from "../../io/filesystem/fileSystemService.ts";
import { AppManagerInstaller } from "../pkg/installer.service.ts";
import { AppManagerConfig } from "../pkg/config.service.ts";
import { Injectable } from "../../../../deps.ts";

/**
 * Install an app from the Lethean repository
 * @param appName The name of the app to install
 * @param version The version of the app to install
 * @param destination The destination folder to install the app to
 */
@Injectable()
export class AppManager {
  plugin: { code: string; config: string } = {
    code: "lthn-app-setup",
    config:
      "https://raw.githubusercontent.com/letheanVPN/lthn-app-setup/main/lthn.json"
  };
  public apps: any;
  private config: AppManagerConfig;

  /**
   * Init a plugin on the system
   *
   * @param configService
   * @param fileSystem
   * @param installer
   */
  constructor(private configService: AppManagerConfig,
              private fileSystem: FileSystemService,
              private installer: AppManagerInstaller
  ) {
    this.apps = this.configService.getConfig();

  }

  loadPlugin(plugin?: { code: string; config: string }) {
    if (plugin) {
      this.plugin = plugin;
    }


  }

  /**
   * Checks if the package is installed
   *
   * @returns {boolean}
   */
  installed() {
    return this.fileSystem.isDir(
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
      return await this.installer.install(name, pkg);
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
      this.installer.uninstall(name);
      this.configService.removeConfigKey(name);
    }
    return false;
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
