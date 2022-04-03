import {
  assertEquals,
  assertStringIncludes,
} from "https://deno.land/std@0.129.0/testing/asserts.ts";

import { LetheanAccount } from "../../src/accounts/user.ts";
import { FileSystemService } from "../../src/services/fileSystemService.ts";
import { QuasiSalt } from "../../src/services/crypt/quasi-salt.ts";
import { CryptOpenPGP } from "../../src/services/crypt/openpgp.ts";
import { path } from "../../deps.ts";

Deno.test("LetheanAccount.create", async () => {
  const key: any = await LetheanAccount.create("test", "test");

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

Deno.test("LetheanAccount.login", async () => {
  if (!FileSystemService.isFile("users/server.lthn.pub")) {
    await CryptOpenPGP.createServerKeyPair();
  }

  const encryptedTest = await CryptOpenPGP.encryptPGP(
    "server",
    '{"id":"test"}',
  );

  const user: any = await LetheanAccount.login(encryptedTest);

  assertEquals(user["id"], "test");
});

Deno.test("LetheanAccount.delete", async () => {
  await LetheanAccount.delete("test");

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
