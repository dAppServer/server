
import { Context, Router } from "../../../../deps.ts";
import { ConfigFileService } from "../../../services/config/file.service.ts";

const SystemDataConfigRouter = new Router();


SystemDataConfigRouter.post("/system/data/config/get", async (context: Context) => {

  const body = context.request.body({ type: "json" });
  const req = await body.value;

    context.response.body = await ConfigFileService.loadFile(req);

})

export {SystemDataConfigRouter}
