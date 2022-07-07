import { SizeHint, Webview } from "../../../deps.ts";

/**
 * GUI Service
 *
 * @export
 * @class GuiService
 */
export class GUIService {
  webview: Webview;

  constructor() {

  }

  openLink(link: string) {
    this.webview = new Webview();
    this.webview.size = { width: 1200, height: 900, hint: SizeHint.MAX }
    this.webview.navigate(link);
    this.webview.run();

  }
  /**
   * Open an App window
   *
   * @param {string} app
   */
  start(app = "desktop") {
    console.info(`Loading App GUI: ${app}`);
    this.webview.title = `Lethean ${app}`;

    if (Deno.env.get("DEV") == "true") {
      this.webview.navigate(`http://127.0.0.1:4200/`);
    } else {
      //      this.webview.navigate(`http://127.0.0.1:36911/app/${app}/`);
      this.webview.navigate(`http://127.0.0.1:36911/`);
    }

    this.webview.run();
    return true;
  }
}
