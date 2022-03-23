import { FilesystemService } from "../filesystem.service.ts";
import { LetheanAppInstall } from "./install.ts";

export class LetheanAppServer {

  static plugins: {name: string, path?: string, config?: any}[] = []

  constructor() {
  }

  /**
   * Load plugins or install the setup app if empty
   *
   * @returns {Promise<void>}
   */
  static async loadPlugins() {
    if (FilesystemService.exists({ path: 'apps/apps.json' })) {

    } else {
      console.info("Could not find server apps configuration, starting setup")
      const setup = new LetheanAppInstall()

      if (!setup.installed()) {
        console.info(`Installing: lthn-app-setup`)
        await setup.install()
      } else {
        LetheanAppServer.plugins.push({ name: 'lthn-app-setup' })
        console.info(`Plugin Found: ${LetheanAppServer.plugins[0].name}`)
      }

    }
  }
}
