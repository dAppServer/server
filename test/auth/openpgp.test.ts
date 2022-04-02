import {assertEquals,  assertStringIncludes } from "https://deno.land/std@0.129.0/testing/asserts.ts";

import { CryptOpenPGP } from "../../src/services/crypt/openpgp.ts";
import { LetheanAccount } from "../../src/accounts/user.ts";

Deno.test("Create OpenPGP keys, check if looks like a key", async () => {

  const key: any = await CryptOpenPGP.createKeyPair("test", "test")

  assertStringIncludes(key.privateKey, '-----BEGIN PGP PRIVATE KEY BLOCK-----', "Private key is not valid")
  assertStringIncludes(key.publicKey, '-----BEGIN PGP PUBLIC KEY BLOCK-----', "Public key is not valid")
  assertStringIncludes(key.revocationCertificate, '-----BEGIN PGP PUBLIC KEY BLOCK-----', "Revocation certificate is not valid")
});

Deno.test('getPublicKeyById', async () => {
  const key: any = await LetheanAccount.create("test2", "test")
  const publicKey = await CryptOpenPGP.getPublicKey('09f3b17c6fab2d948fb29a5ab9aaf9755fd24c3c146ed19795a85c446241ad89')

  assertEquals( await publicKey.getPrimaryUser().then(data => data.user.userID.userID), '09f3b17c6fab2d948fb29a5ab9aaf9755fd24c3c146ed19795a85c446241ad89', "OpenPGP Key is not for the test user")
});
