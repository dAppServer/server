import { FileSystemService } from "../../services/fileSystemService.ts";
import { LetheanAppInstall } from "./install.ts";

/**
 * LetheanAppServer
 *
 * @export
 * @class LetheanAppServer
 */
export class LetheanAppServer {
  static plugins: { name: string; path?: string; config?: any }[] = [];

  constructor() {
  }

  /**
   * Load plugins or install the setup app if empty
   *
   * @returns {Promise<void>}
   */
  static async loadPlugins() {
    const setup = new LetheanAppInstall();
    const desktop = new LetheanAppInstall({
      code: "lthn-app-desktop",
      config:
        "https://raw.githubusercontent.com/letheanVPN/lthn-app-desktop/main/lthn.json",
    });

    if (!setup.installed()) {
      console.info(`Installing: lthn-app-setup`);
      await setup.install();
    } else {
      LetheanAppServer.plugins.push({ name: "lthn-app-setup" });
      console.info(`Plugin Found: ${LetheanAppServer.plugins[0].name}`);
    }

    if (!desktop.installed()) {
      console.info(`Installing: lthn-app-desktop`);
      await desktop.install();
    } else {
      LetheanAppServer.plugins.push({ name: "lthn-app-desktop" });
      console.info(`Plugin Found: ${LetheanAppServer.plugins[1].name}`);
    }
  }
}
