import { Context, Router } from "../../../deps.ts";
import { HttpException } from "https://deno.land/x/oak_exception@v0.0.7/src/exception_status.ts";
import { DockerService } from "./docker.service.ts";

const DockerRouter = new Router();

DockerRouter.get("/docker/containers", async (context: Context) => {
  try {
    context.response.body = await new DockerService().listContainers();
  } catch (e) {
    throw new HttpException("Not Found", 404);
  }
});

DockerRouter.post("/docker/containers/start", async (context: Context) => {
  try {
    const body = context.request.body({ type: "json" });
    const req = await body.value;

    context.response.body = await new DockerService().startContainer(req.id);
  } catch (e) {
    throw new HttpException("Not Found", 404);
  }
});
DockerRouter.post("/docker/containers/stop", async (context: Context) => {
  try {
    const body = context.request.body({ type: "json" });
    const req = await body.value;

    context.response.body = await new DockerService().stopContainer(req.id);
  } catch (e) {
    throw new HttpException("Not Found", 404);
  }
});
DockerRouter.post("/docker/containers/kill", async (context: Context) => {
  try {
    const body = context.request.body({ type: "json" });
    const req = await body.value;

    context.response.body = await new DockerService().killContainer(req.id);
  } catch (e) {
    throw new HttpException("Not Found", 404);
  }
});

DockerRouter.post("/docker/containers/restart", async (context: Context) => {
  try {
    const body = context.request.body({ type: "json" });
    const req = await body.value;

    context.response.body = await new DockerService().restartContainer(req.id);
  } catch (e) {
    throw new HttpException("Not Found", 404);
  }
});
DockerRouter.post("/docker/containers/delete", async (context: Context) => {
  try {
    const body = context.request.body({ type: "json" });
    const req = await body.value;

    context.response.body = await new DockerService().deleteContainer(req.id);
  } catch (e) {
    throw new HttpException("Not Found", 404);
  }
});
DockerRouter.post("/docker/containers/create", async (context: Context) => {
  try {
    const body = context.request.body({ type: "json" });
    const req = await body.value;

    context.response.body = await new DockerService().createContainer(
      req.name,
      req.container,
    );
  } catch (e) {
    throw new HttpException("Not Found", 404);
  }
});

export { DockerRouter };
