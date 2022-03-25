import { Webview } from "https://raw.githubusercontent.com/Snider/webview_deno/main/mod.ts";

/**
 * GUI Service
 *
 * @export
 * @class GuiService
 */
export class LetheanGUI {

  webview: Webview;

  constructor() {
    this.webview = new Webview();
  }

  /**
   * Open an App window
   *
   * @param {string} app
   */
   start(app = 'desktop') {
    console.info(`Loading App GUI: ${app}`)
    this.webview.title = `Lethean ${app}`
    this.webview.navigate(`http://127.0.0.1:36911/app/${app}/`);
    this.webview.run();
    return true;
  }
}




