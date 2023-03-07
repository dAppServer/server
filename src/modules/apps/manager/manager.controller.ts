import { AppManager } from "../manager/manager.service.ts";
import { AppManagerConfig } from "../pkg/config.service.ts";
import { Body, Controller, Get, Param, Post, Tag } from "../../../../deps.ts";
import { MarketplaceGetDTO } from "./manager.interface.ts";


@Tag("Apps")
@Controller("apps")
export class AppManagerController {

  constructor(private apps: AppManager, private appConfig: AppManagerConfig) {
  }

  @Get("installed")
  listApps() {
    return this.appConfig.getConfig();
  }

  @Post("marketplace")
  getMarketPlaceApps(@Body() body: MarketplaceGetDTO) {
    if (body.dir) {
      return this.apps.getMarketPlaceApps({ dir: body.dir });
    } else {
      return this.apps.getMarketPlaceApps();
    }
  }

  @Post("install")
  async installApp(@Param("code") code: string, @Param("pkg") pkg?: string) {
    return await this.apps.installApp(code, pkg);
  }

  @Post("remove")
  removeApp(@Param("code") code: string) {
    return this.apps.removeApp(code);
  }
}

