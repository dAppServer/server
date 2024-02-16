import { OpenPGPService } from "src/modules/cryptography/openpgp/openpgp.ts";
import { FileSystemService } from "src/modules/io/storage/client.service.ts";
import { assertEquals, assertStringIncludes } from "../../deps-test.ts";


Deno.test("CryptOpenPGP.createKeyPair", async () => {
  const key: any = await OpenPGPService.createKeyPair(
    "09f3b17c6fab2d948fb29a5ab9aaf9755fd24c3c146ed19795a85c446241ad89",
    "test",
  );

  assertStringIncludes(
    key.privateKey,
    "-----BEGIN PGP PRIVATE KEY BLOCK-----",
    "Private key is not valid",
  );
  assertStringIncludes(
    key.publicKey,
    "-----BEGIN PGP PUBLIC KEY BLOCK-----",
    "Public key is not valid",
  );
  assertStringIncludes(
    key.revocationCertificate,
    "-----BEGIN PGP PUBLIC KEY BLOCK-----",
    "Revocation certificate is not valid",
  );

  FileSystemService.write(
    "users/09f3b17c6fab2d948fb29a5ab9aaf9755fd24c3c146ed19795a85c446241ad89.lthn.key",
    key.privateKey,
  );
  FileSystemService.write(
    "users/09f3b17c6fab2d948fb29a5ab9aaf9755fd24c3c146ed19795a85c446241ad89.lthn.pub",
    key.publicKey,
  );
  FileSystemService.write(
    "users/09f3b17c6fab2d948fb29a5ab9aaf9755fd24c3c146ed19795a85c446241ad89.lthn.rev",
    key.revocationCertificate,
  );
});

Deno.test("CryptOpenPGP.getPublicKey", async () => {
  const publicKey = await OpenPGPService.getPublicKey(
    "09f3b17c6fab2d948fb29a5ab9aaf9755fd24c3c146ed19795a85c446241ad89",
  );

  assertEquals(
    await publicKey.getPrimaryUser().then((data) => data.user.userID.userID),
    "09f3b17c6fab2d948fb29a5ab9aaf9755fd24c3c146ed19795a85c446241ad89",
    "OpenPGP Key is not for the test user",
  );
});

Deno.test("CryptOpenPGP.getPrivateKey", async () => {
  const privateKey = await OpenPGPService.getPrivateKey(
    "09f3b17c6fab2d948fb29a5ab9aaf9755fd24c3c146ed19795a85c446241ad89",
    "test",
  );

  assertEquals(
    await privateKey.getPrimaryUser().then((data) => data.user.userID.userID),
    "09f3b17c6fab2d948fb29a5ab9aaf9755fd24c3c146ed19795a85c446241ad89",
    "OpenPGP Key is not for the test user",
  );
});

Deno.test("CryptOpenPGP.createServerKeyPair", async () => {
  const key: any = await OpenPGPService.createServerKeyPair();
  assertEquals(
    FileSystemService.isFile("users/server.lthn.pub"),
    true,
  );
  assertEquals(
    FileSystemService.isFile("users/server.lthn.key"),
    true,
  );
  assertEquals(
    FileSystemService.isFile("users/server.lthn.rev"),
    true,
  );
});
