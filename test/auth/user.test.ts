import { assertEquals, assertStringIncludes } from "https://deno.land/std@0.129.0/testing/asserts.ts";

import { LetheanAccount } from "../../src/accounts/user.ts";
import { FilesystemService } from "../../src/services/filesystem.service.ts";
import { QuasiSalt } from "../../src/services/crypt/quasi-salt.ts";
import { CryptOpenPGP } from "../../src/services/crypt/openpgp.ts";

Deno.test('Create a Lethean Account, check user files created, check user files deleted', async () => {

  const key: any = await LetheanAccount.create("test", "test")

  assertEquals(FilesystemService.existsFile({ path: `users/${QuasiSalt.hash('test')}.lthn.pub` }), true)
  assertEquals(FilesystemService.existsFile({ path: `users/${QuasiSalt.hash('test')}.lthn.key` }), true)
  assertEquals(FilesystemService.existsFile({ path: `users/${QuasiSalt.hash('test')}.lthn.rev` }), true)

});

Deno.test('Perform login, check user files created, check user files deleted', async () => {

  const encryptedTest = await CryptOpenPGP.encryptPGP('server', '{"id":"test"}')


  const user: any = await LetheanAccount.login(encryptedTest)

  assertEquals(user['id'], 'test')

});


Deno.test('Delete user files', async () => {

  await LetheanAccount.delete("test")

  assertEquals(FilesystemService.existsFile({ path: `users/${QuasiSalt.hash('test')}.lthn.pub` }), false)
  assertEquals(FilesystemService.existsFile({ path: `users/${QuasiSalt.hash('test')}.lthn.key` }), false)
  assertEquals(FilesystemService.existsFile({ path: `users/${QuasiSalt.hash('test')}.lthn.rev` }), false)

})
