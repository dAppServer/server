import { assertEquals, expect, superoak } from "../../deps-test.ts";
import { NestFactory } from "../../deps.ts";
import { CryptOpenPGP } from "../../src/services/crypt/openpgp.ts";
import { QuasiSalt } from "../../src/services/crypt/quasi-salt.ts";
import { LetheanAccount } from "../../src/accounts/user.ts";
import { AppModule } from "../../src/app.module.ts";
import { FileSystemService } from "../../src/services/fileSystemService.ts";

const app = await NestFactory.create(AppModule);
app.setGlobalPrefix("api");
app.use(app.routes())

if (!FileSystemService.isFile("users/server.lthn.pub")) {
  await CryptOpenPGP.createServerKeyPair();
}

Deno.test("POST /api/auth/login -- good", async () => {
  const request = await superoak(app);

  // make user OpenPGP keys for user test with password test
  await LetheanAccount.create("test", "test");
  // create signed message to send to the server
  const auth = await CryptOpenPGP.sign(
    `{"id":"${QuasiSalt.hash("test")}"}`,
    QuasiSalt.hash("test"),
    "test",
  );

  // use the server public key to encrypt the message
  const encryptedTest = await CryptOpenPGP.encryptPGP(
    "server",
    auth,
  );

  // test auth works without a REST interface
  assertEquals(
    await LetheanAccount.login(encryptedTest),
    QuasiSalt.hash("test"),
  );

  // test auth works with a REST interface
  await request.post("/api/auth/login")
    .set("Content-Type", "application/json")
    .send(`{"payload": "${btoa(encryptedTest)}"}`)
    .expect(200)
    .set("Accept", "application/json")
    .then(async (response1: any) => {
      // decompress the response
      const reply = atob(JSON.parse(response1.text)['result'])
      // decrypt the reply with the initial user private key
      const token = JSON.parse(await CryptOpenPGP.decryptPGP(QuasiSalt.hash("test"), reply, 'test'))
      // test the access_token is returned
      expect(token).toHaveProperty("access_token");
      // test the refresh_token is returned
      expect(token).toHaveProperty("refresh_token");
    })
});


Deno.test("POST /api/auth/login -- bad", async () => {
  const request = await superoak(app);
  await LetheanAccount.create("test", "test");

  // create signed message using the wrong private key for the requested user
  const auth = await CryptOpenPGP.sign(
    `{"id":"${QuasiSalt.hash("testwewew")}"}`,
    QuasiSalt.hash("test"),
    "test",
  );

  // use the server public key to encrypt the message
  const encryptedTest = await CryptOpenPGP.encryptPGP(
    "server",
    auth,
  );

  // test auth fails without a REST interface
  assertEquals(
    await LetheanAccount.login(encryptedTest),
    false,
  );

  // test auth fails with a REST interface
  await request.post("/api/auth/login")
    .set("Content-Type", "application/json")
    .send(`{"payload": "${btoa(encryptedTest)}"}`)
    .expect(401)
    .set("Accept", "application/json")
    .expect(`{"result":false}`);
});

