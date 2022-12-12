import { StoredObjectService } from "../../services/config/store.ts";
import { FileSystemService } from "../../services/fileSystemService.ts";

export class AppManagerConfig {
  public apps: any;

  constructor() {
    this.apps = this.getConfig()
  }

  saveConfig() {
    return StoredObjectService.setObject({
      group: "conf",
      object: "installed-apps",
      data: JSON.stringify(this.apps)
    });

  }

  getConfig() {
    this.apps = StoredObjectService.getObject({
      group: "conf",
      object: "installed-apps"
    });

    try {
      this.apps = JSON.parse(this.apps);
    } catch (e) {
      this.apps = {};
      if (!FileSystemService.isFile("data/objects/conf/installed-apps.json")) {
        StoredObjectService.setObject({
          group: "conf",
          object: "installed-apps",
          data: JSON.stringify(this.apps)
        });
      } else {
        console.error("Failed to load config object, but it the file is present. Please check data/objects/apps/installed.json is valid json, or delete the file for it to be remade.");
      }

    }
    return this.apps;
  }

  addConfigKey(code: string, data: any){
    this.getConfig()
    this.apps[code] = data;
    return this.saveConfig()
  }
  removeConfigKey(code: string){
    this.getConfig()
    delete this.apps[code];
    return this.saveConfig()
  }
}
