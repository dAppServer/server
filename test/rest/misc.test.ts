import { ServerService } from "../../src/services/server.service.ts";
import { FileSystemService } from "../../src/services/fileSystemService.ts";

import { LetheanAccount } from "../../src/accounts/user.ts";
import { CryptOpenPGP } from "../../src/services/crypt/openpgp.ts";
import { QuasiSalt } from "../../src/services/crypt/quasi-salt.ts";
import { IResponse, superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import { assertExists, assertEquals } from "https://deno.land/std@0.129.0/testing/asserts.ts";


Deno.test("console.error", async () => {
  assertExists(console.error, "console.error");
});

Deno.test("console.info", async () => {
  assertExists(console.info, "console.info");
});

Deno.test("console.warn", async () => {
  assertExists(console.warn, "console.warn");
});

const letheanServer = new ServerService();
await letheanServer.warmUpServer();


  const authRequest = await superoak(letheanServer.app);

  await LetheanAccount.create("test", "test");
  const auth = await CryptOpenPGP.sign(
    `{"id":"${QuasiSalt.hash("test")}"}`,
    QuasiSalt.hash("test"),
    "test",
  );

  const encryptedTest = await CryptOpenPGP.encryptPGP(
    "server",
    auth,
  );


  assertEquals(
    await LetheanAccount.login(encryptedTest),
    QuasiSalt.hash("test"),
  );

  const authToken = await authRequest.post("/auth/login")
    .set("Content-Type", "application/json")
    .send(`{"payload": "${btoa(encryptedTest)}"}`)
    .expect(200)
    .set("Accept", "application/json")
    .then(async (response1: any) => {
      const reply = atob(JSON.parse(response1.text)['result'])
      return JSON.parse(await CryptOpenPGP.decryptPGP(QuasiSalt.hash("test"), reply, 'test'))
    }).catch((e:any) => {
      console.error(e);
    });

  //console.log(authToken)




//Deno.test("GET /", async () => {
//  const request = await superoak(letheanServer.app);
//  await request.get("/").set("Authorization", authToken['access_token']).expect(200);
//});
//
//Deno.test("GET / - no auth", async () => {
//  const request = await superoak(letheanServer.app);
//  await request.get("/").expect(401);
//});
//
//Deno.test("GET ", async () => {
//  const request = await superoak(letheanServer.app);
//  await request.get("").set("Authorization", authToken['access_token']).expect(200);
//});

//Deno.test("GET - no auth", async () => {
//  const request = await superoak(letheanServer.app);
//  await request.get("").expect(401);
//});

//Deno.test("GET /app/desktop/", async () => {
//  const request = await superoak(letheanServer.app);
//  await request.get("/app/desktop/").set("Authorization", authToken['access_token']).expect(200);
//});
//
//Deno.test("GET /app/desktop/ - no auth", async () => {
//  const request = await superoak(letheanServer.app);
//  await request.get("/app/desktop/").expect(401);
//});

Deno.test("Error: Path not found", async () => {
  const request = await superoak(letheanServer.app);
  await request.get("/somethingw4aedaRandom").set("Authorization", authToken['access_token']).expect(404);
});

Deno.test("Error: Path not found -- no auth", async () => {
  const request = await superoak(letheanServer.app);
  await request.get("/somethingw4aedaRandom").expect(401);
});

Deno.test("GET /cert", async () => {
  const request = await superoak(letheanServer.app);
  await request.get("/cert")
    .expect(200)
    .expect("Content-Type", "text/plain; charset=utf-8")
    .expect(FileSystemService.read("users/server.lthn.pub"));
});

Deno.test("POST /filesystem/read", async () => {
  const request = await superoak(letheanServer.app);
  await request.post("/filesystem/read")
    .set("Authorization", authToken['access_token'])
    .set("Content-Type", "application/json")
    .send(`{"path": "users/server.lthn.pub"}`)
    .expect(200)
    .expect(btoa(`${FileSystemService.read("users/server.lthn.pub")}`));
});

Deno.test("POST /filesystem/read -- no auth", async () => {
  const request = await superoak(letheanServer.app);
  await request.post("/filesystem/read")
    .set("Content-Type", "application/json")
    .send(`{"path": "users/server.lthn.pub"}`)
    .expect(401);
});

Deno.test("GET /filesystem/read", async () => {
  const request = await superoak(letheanServer.app);
  await request.post("/filesystem/read")
    .set("Authorization", authToken['access_token'])
    .set("Content-Type", "application/json")
    .send(`{"path": "users/server.lthn.pub"}`)
    .expect(200)
    .expect(btoa(`${FileSystemService.read("users/server.lthn.pub")}`));
});

await letheanServer.stopServer();
