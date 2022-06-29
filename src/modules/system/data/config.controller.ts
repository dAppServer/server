
import { Context, Router } from "../../../../deps.ts";
import { ConfigFileService } from "../../../services/config/file.service.ts";
import { StoredObjectService } from "../../../services/config/store.ts";

const SystemDataConfigRouter = new Router();


SystemDataConfigRouter.post("/system/data/config/get", async (context: Context) => {

  const body = context.request.body({ type: "json" });
  const req = await body.value;

    context.response.body = await ConfigFileService.loadFile(req);

})

SystemDataConfigRouter.post("/system/data/object/get", async (context: Context) => {

  const body = context.request.body({ type: "json" });
  const req = await body.value;

    context.response.body = StoredObjectService.getObject({group: req.group, object: req.req});
    context.response.status = 200;
})
SystemDataConfigRouter.post("/system/data/object/set", async (context: Context) => {

  const body = context.request.body({ type: "json" });
  const req = await body.value;

  StoredObjectService.setObject({
    group: req.group,
    object: req.object,
    data: JSON.stringify(req.data),
  });
context.response.status = 200
})

SystemDataConfigRouter.post("/system/data/object/remove", async (context: Context) => {

  const body = context.request.body({ type: "json" });
  const req = await body.value;

  context.response.status = 200;
  StoredObjectService.removeObject(req);

})
SystemDataConfigRouter.post("/system/data/object/clear", async (context: Context) => {

  const body = context.request.body({ type: "json" });
  const req = await body.value;

  context.response.status = 200;
  StoredObjectService.clearObjects(req);

})

SystemDataConfigRouter.post("/system/data/object/count", async (context: Context) => {

  const body = context.request.body({ type: "json" });
  const req = await body.value;

  context.response.status = 200;
  const ret = StoredObjectService.countObjects(req);
  context.response.body = ret.length.toString()

})

export {SystemDataConfigRouter}
