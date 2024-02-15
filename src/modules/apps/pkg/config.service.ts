import { ObjectService } from "@module/config/object/object.service.ts";
import { ClientService } from "@module/io/file/local/client.service.ts";
import { Injectable, Logger } from "danet/mod.ts";
@Injectable()
export class AppManagerConfig {
  apps: any;
  log: Logger;

  constructor(private object: ObjectService,
              private fileSystem: ClientService) {
    this.apps = this.getConfig()
    this.log = new Logger("AppManagerConfig");
  }

  saveConfig(): boolean {
    return this.object.setObject("conf", "installed-apps", JSON.stringify(this.apps));
  }

  getConfig() {
    this.apps = this.object.getObject( "conf",  "installed-apps");

    try {
      this.apps = JSON.parse(this.apps);
    } catch (e) {
      this.apps = {};
      this.log.error(e);
      if (!this.fileSystem.isFile("data/objects/conf/installed-apps.json")) {
        this.object.setObject( "conf", "installed-apps",  JSON.stringify(this.apps));
      } else {
        this.log.error("Failed to load config object, but it the file is present. Please check data/objects/apps/installed.json is valid json, or delete the file for it to be remade.");
      }

    }
    if (!this.apps) {
      this.apps = {};
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
