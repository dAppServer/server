import { Context, Router, HttpException } from "../../../../deps.ts";

import { XmrigService } from "./xmrig.service.ts";

const XmrigRouter = new Router();
const xmrig = new XmrigService()
XmrigRouter.get("/mining/xmrig", async (context: Context) => {
  try {

    context.response.body = await new DockerService().listContainers()

  } catch (e) {
    throw new HttpException("Not Found", 404);
  }

});
XmrigRouter.get("/mining/xmrig/isInstalled", async (context: Context) => {
  try {
    context.response.body = JSON.stringify({result: xmrig.isInstalled()})

  } catch (e) {
    throw new HttpException("Not Found", 404);
  }

});
XmrigRouter.get("/mining/xmrig/downloads", async (context: Context) => {
  try {
    context.response.body = JSON.stringify( await xmrig.getReleaseDownloads())

  } catch (e) {
    throw new HttpException("Not Found", 404);
  }

});

XmrigRouter.post("/mining/xmrig/download", async (context: Context) => {
  try {
    const body = context.request.body({ type: "json" });
    const req = await body.value;

    context.response.body = JSON.stringify( await xmrig.downloadXmrig(req.id))

  } catch (e) {
    throw new HttpException("Not Found", 404);
  }

});


export { XmrigRouter }
