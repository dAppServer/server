import { superoak } from "https://deno.land/x/superoak/mod.ts";
import { ServerService } from "../../src/services/server.service.ts";
import { FilesystemService } from "../../src/services/filesystem.service.ts";
const letheanServer = new ServerService();
await letheanServer.warmUpServer();


Deno.test("GET /", async () => {
  const request = await superoak(letheanServer.app);
  await request.get("/").expect(200);
});

Deno.test("Error: Path not found", async () => {
  const request = await superoak(letheanServer.app);
  await request.get("/somethingw4aedaRandom").expect(404);
});


Deno.test("GET /cert", async () => {
  const request = await superoak(letheanServer.app);
  await request.get("/cert")
    .expect(200)
    .expect("Content-Type", "text/plain; charset=utf-8")
    .expect(FilesystemService.read({path: "users/server.lthn.pub"}));
});

await letheanServer.stopServer()
