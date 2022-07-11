import { Context, HttpException, Router } from "../../../../deps.ts";
import { FileSystemService } from "../../../services/fileSystemService.ts";

const FileSystemRouter = new Router();

FileSystemRouter.post("/system/files/list", async (context: Context) => {
  try {
    const body = context.request.body({ type: "json" });
    const req = await body.value;

    context.response.body = JSON.stringify(FileSystemService.list(req.path));
    context.response.status = 200;
  } catch (e) {
    context.response.status = 404;
    context.response.body = "Not Found";
  }
});

FileSystemRouter.post("/system/files/detailed-list", async (context: Context) => {
  try {
    const body = context.request.body({ type: "json" });
    const req = await body.value;

    context.response.body = JSON.stringify(FileSystemService.detailedList(req.path));
    context.response.status = 200;
  } catch (e) {
    context.response.status = 404;
    context.response.body = "Not Found";
  }
});

FileSystemRouter.post("/system/files/path", async (context: Context) => {
  try {
    const body = context.request.body({ type: "json" });
    const req = await body.value;

    context.response.body = JSON.stringify(FileSystemService.path(req.convert));
  } catch (e) {
    throw new HttpException("Not Found", 404);
  }
});

FileSystemRouter.post("/system/files/read", async (context: Context) => {
  try {
    const body = context.request.body({ type: "json" });
    const req = await body.value;

    const data = FileSystemService.read(req.path);
    if (data) {
      context.response.body = btoa(data);
    }
  } catch (e) {
    throw new HttpException("Not Found", 404);
  }
});

FileSystemRouter.post("/system/files/write", async (context: Context) => {
  try {
    const body = context.request.body({ type: "json" });
    const req = await body.value;
    try {
      FileSystemService.write(req.path, atob(req.data));
    } catch (e) {
      throw new HttpException("Write Failed", 500);
    }
    context.response.body = JSON.stringify(FileSystemService.path(req.convert));
  } catch (e) {
    throw new HttpException("Not Found", 404);
  }
});

FileSystemRouter.post("/system/files/file-check", async (context: Context) => {
  try {
    const body = context.request.body({ type: "json" });
    const req = await body.value;

    context.response.body = JSON.stringify({
      "result": FileSystemService.isFile(req.path),
    });
  } catch (e) {
    throw new HttpException("Not Found", 404);
  }
});

FileSystemRouter.post("/system/files/dir-check", async (context: Context) => {
  try {
    const body = context.request.body({ type: "json" });
    const req = await body.value;

    context.response.body = JSON.stringify({
      "result": FileSystemService.isDir(req.path),
    });
  } catch (e) {
    throw new HttpException("Not Found", 404);
  }
});

export { FileSystemRouter };
