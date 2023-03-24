import { AppManager } from "../manager/manager.service.ts";
import { AppManagerConfig } from "../pkg/config.service.ts";
import { Body, Controller, Get, Options, Param, Post, ReturnedType, Tag } from "../../../../deps.ts";
import { MarketplaceGetDTO } from "./manager.interface.ts";


@Tag("Apps")
@Controller("apps")
export class AppManagerController {

  constructor(private apps: AppManager, private appConfig: AppManagerConfig) {
  }

  @Get("installed")
  @ReturnedType(String)
  listApps() {
    return this.appConfig.getConfig();
  }

  @Options("installed")
  test() {}

  @Get("marketplace")
  @ReturnedType(String)
  getMarketPlaceApps(@Param('dir') dir?: string) {

    if (dir) {
      return this.apps.getMarketPlaceApps({ dir: dir });
    } else {
      return this.apps.getMarketPlaceApps();
    }
  }

  @Options("marketplace")
  test2() {}

  @Post("install")
  async installApp(@Param("code") code: string, @Param("pkg") pkg?: string) {
    return await this.apps.installApp(code, pkg);
  }

  @Options("install")
  test3() {}

  @Post("remove")
  removeApp(@Param("code") code: string) {
    return this.apps.removeApp(code);
  }

  @Options("remove")
  test4() {}
}

