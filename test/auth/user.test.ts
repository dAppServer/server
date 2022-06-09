import { LetheanAccount } from "../../src/accounts/user.ts";
import { FileSystemService } from "../../src/services/fileSystemService.ts";
import { QuasiSalt } from "../../src/services/crypt/quasi-salt.ts";
import { CryptOpenPGP } from "../../src/services/crypt/openpgp.ts";
import { assertEquals } from "../../deps-test.ts";

Deno.test("LetheanAccount.create", async () => {
  const key: any = await LetheanAccount.create("test", "test");
  await LetheanAccount.create("test2", "test");

  assertEquals(
    FileSystemService.isFile(`users/${QuasiSalt.hash("test")}.lthn.pub`),
    true,
  );
  assertEquals(
    FileSystemService.isFile(`users/${QuasiSalt.hash("test")}.lthn.key`),
    true,
  );
  assertEquals(
    FileSystemService.isFile(`users/${QuasiSalt.hash("test")}.lthn.rev`),
    true,
  );
});

Deno.test("LetheanAccount.login - Good", async () => {
  if (!FileSystemService.isFile("users/server.lthn.pub")) {
    await CryptOpenPGP.createServerKeyPair();
  }

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
});

Deno.test("LetheanAccount.login - Bad Not signed by req user", async () => {
  if (!FileSystemService.isFile("users/server.lthn.pub")) {
    await CryptOpenPGP.createServerKeyPair();
  }

  const auth2 = await CryptOpenPGP.sign(
    `{"id":"${QuasiSalt.hash("test")}"}`,
    QuasiSalt.hash("test2"),
    "test",
  );

  const encryptedTest2 = await CryptOpenPGP.encryptPGP(
    "server",
    auth2,
  );

  assertEquals(await LetheanAccount.login(encryptedTest2), false);
});

Deno.test("LetheanAccount.login - Bad Not known user", async () => {
  if (!FileSystemService.isFile("users/server.lthn.pub")) {
    await CryptOpenPGP.createServerKeyPair();
  }

  const auth2 = await CryptOpenPGP.sign(
    `{"id":"${QuasiSalt.hash("testwewew")}"}`,
    QuasiSalt.hash("test"),
    "test",
  );

  const encryptedTest2 = await CryptOpenPGP.encryptPGP(
    "server",
    auth2,
  );

  assertEquals(await LetheanAccount.login(encryptedTest2), false);
});

Deno.test("LetheanAccount.delete", async () => {
  await LetheanAccount.delete("test");
  await LetheanAccount.delete("test2");

  assertEquals(
    FileSystemService.isFile(`users/${QuasiSalt.hash("test")}.lthn.pub`),
    false,
  );
  assertEquals(
    FileSystemService.isFile(`users/${QuasiSalt.hash("test")}.lthn.key`),
    false,
  );
  assertEquals(
    FileSystemService.isFile(`users/${QuasiSalt.hash("test")}.lthn.rev`),
    false,
  );
});
