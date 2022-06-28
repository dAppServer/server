
import { LetheanUpdater } from "../../services/update.service.ts";
import { Context, Router } from "../../../deps.ts";

const SystemUpdateRouter = new Router();


SystemUpdateRouter.post("/system/update/cli", async (context: Context) => {


    new LetheanUpdater().download().then((dat:any) => {
      console.info("Updated Lethean Binaries");
    });

    context.response.status = 200
    context.response.body = JSON.stringify({result:true})

  })

export {SystemUpdateRouter}
