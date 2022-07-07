
import { Context, os, path, Router } from "../../../deps.ts";
import { ProcessManager } from "../../services/process/process.service.ts";
import { ProcessManagerRequest } from "../../services/process/processManagerRequest.ts";

const SystemBrowserRouter = new Router();

SystemBrowserRouter.post("/system/browser/openLink", async (context: Context) => {
  const body = context.request.body({ type: "json" });
  const req = await body.value;


  const exeFile = "lthn" +
    (os.platform() === "windows" ? ".exe" : "");

  ProcessManager.run(
    path.join(
      Deno.cwd(),
      exeFile,
    ),
    {"port":"36969"},
    {
      key: exeFile.split("/").pop(),
      stdErr: (stdErr: unknown) => console.log(stdErr),
      stdIn: (stdIn: unknown) => console.log(stdIn),
      stdOut: (stdOut: unknown) => console.log(stdOut),
    } as ProcessManagerRequest,
  );

  setTimeout(() => {
    const openGui = fetch("http://127.0.0.1:36969/system/browser/openLink",
      {
        method: "POST",
        body: JSON.stringify({link: req.link})
      })
  }, 5000)

  context.response.status = 200;
  context.response.body = JSON.stringify({ result: true });
});

export { SystemBrowserRouter };
