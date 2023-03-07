import { ObjectService } from "../../config/object/object.service.ts";
import { FileSystemService } from "../../io/filesystem/fileSystemService.ts";
import { Injectable } from "../../../../deps.ts";

@Injectable()
export class AppManagerConfig {
  public apps: any;

  constructor(private object: ObjectService,
              private fileSystem: FileSystemService) {
    this.apps = this.getConfig()
  }

  saveConfig() {
    return this.object.setObject("conf", "installed-apps", JSON.stringify(this.apps));
  }

  getConfig() {
    this.apps = this.object.getObject( "conf",  "installed-apps");

    try {
      this.apps = JSON.parse(this.apps);
    } catch (e) {
      this.apps = {};
      if (!this.fileSystem.isFile("data/objects/conf/installed-apps.json")) {
        this.object.setObject( "conf", "installed-apps",  JSON.stringify(this.apps));
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
