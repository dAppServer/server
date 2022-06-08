
import { LetheanUpdater } from "../../services/update.service.ts";
import { Controller, Post } from "../../../deps.ts";

@Controller("system/update")
export class SystemUpdateController {

  @Post('cli')
  upgradeServer(){
    new LetheanUpdater().download().then((dat:any) => {
      console.info("Updated Lethean Binaries");
    });
  }
}
