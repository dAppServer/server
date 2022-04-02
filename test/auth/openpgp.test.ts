import {assertEquals,  assertStringIncludes } from "https://deno.land/std@0.129.0/testing/asserts.ts";

import { CryptOpenPGP } from "../../src/services/crypt/openpgp.ts";
import { FilesystemService } from "../../src/services/filesystem.service.ts";

Deno.test("CryptOpenPGP.createKeyPair", async () => {

  const key: any = await CryptOpenPGP.createKeyPair("09f3b17c6fab2d948fb29a5ab9aaf9755fd24c3c146ed19795a85c446241ad89", "test")

  assertStringIncludes(key.privateKey, '-----BEGIN PGP PRIVATE KEY BLOCK-----', "Private key is not valid")
  assertStringIncludes(key.publicKey, '-----BEGIN PGP PUBLIC KEY BLOCK-----', "Public key is not valid")
  assertStringIncludes(key.revocationCertificate, '-----BEGIN PGP PUBLIC KEY BLOCK-----', "Revocation certificate is not valid")

  FilesystemService.write("users/09f3b17c6fab2d948fb29a5ab9aaf9755fd24c3c146ed19795a85c446241ad89.lthn.key", key.privateKey)
  FilesystemService.write("users/09f3b17c6fab2d948fb29a5ab9aaf9755fd24c3c146ed19795a85c446241ad89.lthn.pub", key.publicKey)
  FilesystemService.write("users/09f3b17c6fab2d948fb29a5ab9aaf9755fd24c3c146ed19795a85c446241ad89.lthn.rev", key.revocationCertificate)
});

Deno.test('CryptOpenPGP.getPublicKey', async () => {
  const publicKey = await CryptOpenPGP.getPublicKey('09f3b17c6fab2d948fb29a5ab9aaf9755fd24c3c146ed19795a85c446241ad89')

  assertEquals( await publicKey.getPrimaryUser().then(data => data.user.userID.userID), '09f3b17c6fab2d948fb29a5ab9aaf9755fd24c3c146ed19795a85c446241ad89', "OpenPGP Key is not for the test user")
});

Deno.test('CryptOpenPGP.getPrivateKey'  , async () => {

  const privateKey = await CryptOpenPGP.getPrivateKey('09f3b17c6fab2d948fb29a5ab9aaf9755fd24c3c146ed19795a85c446241ad89', 'test')

  assertEquals( await privateKey.getPrimaryUser().then(data => data.user.userID.userID), '09f3b17c6fab2d948fb29a5ab9aaf9755fd24c3c146ed19795a85c446241ad89', "OpenPGP Key is not for the test user")
});

Deno.test('CryptOpenPGP.createServerKeyPair', async () => {
  const key: any = await CryptOpenPGP.createServerKeyPair()
  assertEquals(FilesystemService.existsFile({ path: `users/server.lthn.pub` }), true);
  assertEquals(FilesystemService.existsFile({ path: `users/server.lthn.key` }), true);
  assertEquals(FilesystemService.existsFile({ path: `users/server.lthn.rev` }), true);

});
