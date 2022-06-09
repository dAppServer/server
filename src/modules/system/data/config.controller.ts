
import { Controller, Post, Body, Context, UseGuards } from "../../../../deps.ts";
import { ConfigFileService } from "../../../services/config/file.service.ts";
import { userGuard } from "../../../middleware/user-guard.ts";

@Controller("system/data/config")
@UseGuards(userGuard)
export class SystemDataConfigController {

  @Post('get')
  async upgradeServer(context: Context, @Body() args: any) {
    context.response.body = await ConfigFileService.loadFile(args);
  }
}
