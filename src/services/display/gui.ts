import { Webview } from "https://raw.githubusercontent.com/Snider/webview_deno/main/mod.ts";

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
  startGUI(app = 'desktop'){
    this.webview.navigate(`http://127.0.0.1:36911/app/${app}/`);
    this.webview.run();
  }
}




