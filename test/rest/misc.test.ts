import { superoak } from "https://deno.land/x/superoak/mod.ts";
import { ServerService } from "../../src/services/server.service.ts";
import { FileSystemService } from "../../src/services/fileSystemService.ts";
const letheanServer = new ServerService();
await letheanServer.warmUpServer();

Deno.test("GET /", async () => {
  const request = await superoak(letheanServer.app);
  await request.get("/").expect(200);
});

Deno.test("GET ", async () => {
  const request = await superoak(letheanServer.app);
  await request.get("").expect(200);
});

Deno.test("GET /app/desktop/", async () => {
  const request = await superoak(letheanServer.app);
  await request.get("/app/desktop/").expect(200);
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
    .expect(FileSystemService.read("users/server.lthn.pub" ));
});

Deno.test('GET /filesystem/read', async () => {
  const request = await superoak(letheanServer.app);
  await request.post("/filesystem/read")
    .set('Content-Type', 'application/json')
    .send(`{"path": "users/server.lthn.pub"}`)
    .expect(200)
    .expect(btoa(`${FileSystemService.read("users/server.lthn.pub")}`));
});

await letheanServer.stopServer();
