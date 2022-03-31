import {  assertStringIncludes } from "https://deno.land/std@0.129.0/testing/asserts.ts";

import { CryptOpenPGP } from "../../src/services/crypt/openpgp.ts";

Deno.test("Create OpenPGP keys, check if looks like a key", async () => {

  const key: any = await CryptOpenPGP.createKeyPair("test", "test")

  assertStringIncludes(key.privateKey, '-----BEGIN PGP PRIVATE KEY BLOCK-----', "Private key is not valid")
  assertStringIncludes(key.publicKey, '-----BEGIN PGP PUBLIC KEY BLOCK-----', "Public key is not valid")
  assertStringIncludes(key.revocationCertificate, '-----BEGIN PGP PUBLIC KEY BLOCK-----', "Revocation certificate is not valid")
});
