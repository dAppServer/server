import { PluginConfig, PluginType } from "../../interfaces/apps/plugin-config.ts";
import { StoredObjectService } from "../../services/config/store.ts";
import { LetheanDownloadService } from "../../services/download.service.ts";
import { FileSystemService } from "../../services/fileSystemService.ts";
import { ensureDir, path } from "../../../deps.ts";
import { AppManagerConfig } from "./config.service.ts";


export class AppManagerInstaller {

  public app: any;
  public config: AppManagerConfig;

  constructor() {
    this.config = new AppManagerConfig()
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

        this.app = { "name": pluginConfig["name"], "version": pluginConfig["version"], "pkg": pkg };

        if (pluginConfig["type"] == "app") {
          this.app["directory"] = this.getAppDirectory(pluginConfig["code"]);

          if (pluginConfig["menu"]) {
            await this.installMenu(pluginConfig);
          }
        }
        this.config.addConfigKey(pluginConfig["code"], this.app)
        return
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

      if (Deno.build.os === "darwin" && Deno.build.arch == "aarch64" && (plugin["downloads"] && !plugin["downloads"]["aarch64"])) {

        await LetheanDownloadService.downloadContents(
          plugin["downloads"]["x86_64"][Deno.build.os]["url"],
          this.getAppDirectory(plugin["code"])
        );
      } else if (plugin["downloads"]) {
        await LetheanDownloadService.downloadContents(
          plugin["downloads"][Deno.build.arch][Deno.build.os]["url"],
          this.getAppDirectory(plugin["code"])
        );

      }

      if (plugin["namespace"]) {
        await ensureDir(FileSystemService.path(path.join("data", plugin["namespace"])));
        await ensureDir(FileSystemService.path(path.join("conf", plugin["namespace"])));
      }

    } else if (plugin["type"] && PluginType.APP) {

      if (plugin["downloads"]) {
        await LetheanDownloadService.downloadContents(
          plugin["downloads"]["app"],
          this.getAppDirectory(plugin["code"])
        );
      } else if (plugin["app"]) {
        await LetheanDownloadService.downloadContents(
          plugin["app"]["url"],
          this.getAppDirectory(plugin["code"])
        );
        if (plugin["app"]["hooks"] && plugin["app"]["hooks"]["rename"] &&
          plugin["app"]["hooks"]["rename"]["from"] &&
          plugin["app"]["hooks"]["rename"]["to"]) {
          Deno.renameSync(`${this.getAppDirectory(plugin["code"])}/${plugin["app"]["hooks"]["rename"]["from"]}`,
            `${this.getAppDirectory(plugin["code"])}/${plugin["app"]["hooks"]["rename"]["to"]}`);
        }
      }


    } else {
      console.log("Plugin type not known");
      return false;
    }

  }

  installDependants(plugin: PluginConfig) {
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
    let menu = JSON.parse(StoredObjectService.getObject({ group: "conf", object: "menu" }) as string);
    if (!menu.forEach((item: any) => {
      if (item["title"]) {
        return true;
      }
    })) {
      menu.push({ app: plugin["code"], ...plugin["menu"]["main"] });
    }
    return StoredObjectService.setObject({ group: "conf", object: "menu", data: JSON.stringify(menu) });

  }

  /**
   * Uninstall user installed application
   *
   * @param {string} code
   * @returns {boolean | boolean}
   */
  uninstall(code: string): boolean {
    if (this.app && this.app["directory"]) {
      FileSystemService.delete(this.app["directory"]);
      try {
        let menu = JSON.parse(StoredObjectService.getObject({ group: "conf", object: "menu" }) as string);
        let newMenu: string[] = menu.map((item: any) => {
          if (item["title"] !== code) {
            return item;
          }
        });
        return StoredObjectService.setObject({ group: "conf", object: menu, data: JSON.stringify(newMenu) });
      } catch (e) {
        return false;
      }
    }

    return false;

  }

  /**
   * Returns the installation directory for a app
   *
   * @param {string} code
   * @returns {string}
   */
  getAppDirectory(code: string){
    return `apps/${code.split("-").join("/")}`
  }

}

