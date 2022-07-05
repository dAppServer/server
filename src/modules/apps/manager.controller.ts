import { Context, Router } from "../../../deps.ts";
import { HttpException } from "https://deno.land/x/oak_exception@v0.0.7/src/exception_status.ts";
import { AppManager } from "./manager.service.ts";
import { DockerService } from "src/modules/docker/docker.service.ts";

const AppManagerRouter = new Router();
const apps = new AppManager();

AppManagerRouter.get("/apps/list", async (context: Context) => {
  try {
    context.response.status = 200;
    context.response.body = apps.getConfig();
  } catch (e) {
    context.response.status = 404;
    context.response.body = "Not Found";
  }
});

AppManagerRouter.get("/apps/install", async (context: Context) => {
  try {
      const body = context.request.body({ type: "json" });
      const req = await body.value;

    context.response.status = 200;
    context.response.body = apps.installApp(req.name);
  } catch (e) {
    context.response.status = 404;
    context.response.body = "Not Found";
  }
});
AppManagerRouter.get("/apps/remove", async (context: Context) => {
  try {
      const body = context.request.body({ type: "json" });
      const req = await body.value;

    context.response.status = 200;
    context.response.body = apps.removeApp(req.name);
  } catch (e) {
    context.response.status = 404;
    context.response.body = "Not Found";
  }
});
