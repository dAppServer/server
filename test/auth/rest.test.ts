import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import { ServerService } from "../../src/services/server.service.ts";
import { FileSystemService } from "../../src/services/fileSystemService.ts";
import { CryptOpenPGP } from "../../src/services/crypt/openpgp.ts";
import { QuasiSalt } from "../../src/services/crypt/quasi-salt.ts";
import { assertEquals } from "https://deno.land/std@0.129.0/testing/asserts.ts";
import { LetheanAccount } from "../../src/accounts/user.ts";
const letheanServer = new ServerService();
await letheanServer.warmUpServer();
import { expect } from "https://deno.land/x/expect@v0.2.9/mod.ts";

Deno.test("POST /auth/login -- good", async () => {
  const request = await superoak(letheanServer.app);
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
  await request.post("/auth/login")
    .set("Content-Type", "application/json")
    .send(`{"payload": "${btoa(encryptedTest)}"}`)
    .expect(200)
    .set("Accept", "application/json")
    .then(async (response1) => {
      const reply = atob(JSON.parse(response1.text)['result'])

      const token = JSON.parse(await CryptOpenPGP.decryptPGP(QuasiSalt.hash("test"), reply, 'test'))

      expect(token).toHaveProperty("access_token");
      expect(token).toHaveProperty("refresh_token");
    })
});
Deno.test("POST /auth/login -- bad", async () => {
  const request = await superoak(letheanServer.app);
  await LetheanAccount.create("test", "test");
  const auth = await CryptOpenPGP.sign(
    `{"id":"${QuasiSalt.hash("testwewew")}"}`,
    QuasiSalt.hash("test"),
    "test",
  );

  const encryptedTest = await CryptOpenPGP.encryptPGP(
    "server",
    auth,
  );

  assertEquals(
    await LetheanAccount.login(encryptedTest),
    false,
  );
  await request.post("/auth/login")
    .set("Content-Type", "application/json")
    .send(`{"payload": "${btoa(encryptedTest)}"}`)
    .expect(200)
    .set("Accept", "application/json")
    .expect(`{"result":false}`);
});

await letheanServer.stopServer();
