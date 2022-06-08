
import { Controller, Post, Body, Context } from "../../../../deps.ts";
import { ConfigFileService } from "../../../services/config/file.service.ts";

@Controller("system/data/config")
export class SystemDataConfigController {

  @Post('get')
  async upgradeServer(context: Context, @Body() args: any) {
    context.response.body = await ConfigFileService.loadFile(args);
  }
}
