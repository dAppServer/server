import { QuasiSalt } from "src/modules/cryptography/hash/quasi-salt.ts";

import { assertEquals } from "../../deps-test.ts";


Deno.test("QuasiSalt.hash(test)", async () => {
  assertEquals(
    QuasiSalt.hash("test"),
    "b1ff8c846af5cdc8e71e096073591dfc1ea2d786558a3fce18f3c2c24a9692cd"
  );
  assertEquals(
    QuasiSalt.hash("tset"),
    "005fd2c180ccc313e1d9011371b6662d483ead55082f64d7356494e8f7535488"
  );
  assertEquals(
    QuasiSalt.hash("Test"),
    "3a45e9fa83739d38e018902d9c0d4280ed339d9dcdf875704e2f982f85497f30"
  );
  assertEquals(
    QuasiSalt.hash("tseT"),
    "ebcbb135e71f5ca5e0bb1a659968300d3bbe536964e59d3d8fc5114b8c8189dc"
  );

});

Deno.test("QuasiSalt.createSaltV2(12345)", async () => {
  assertEquals(
    QuasiSalt.createSaltV2("12345"),
    "5ae2l"
  );
});

/**
 * This is testing custom mapping for the salt function; this allows the code to run multiple projects
 * each mapping gives a different set of hashes.
 *
 * you can also use to walk through a string looking for a sequence.
 */
Deno.test("QuasiSalt.createSaltV2(12345) - blank map", async () => {

  assertEquals(
    QuasiSalt.createSaltV2("12345"),
    "5ae2l"
  );

  const oldMap = QuasiSalt.keyMap
  QuasiSalt.keyMap = {}
  assertEquals(
    QuasiSalt.createSaltV2("12345"),
    "54321"
  );

  QuasiSalt.keyMap = oldMap;
  assertEquals(
    QuasiSalt.createSaltV2("12345"),
    "5ae2l"
  );
});

/**
 * version two, same basic idea, better implementation, gives optimal quasi entropy.
 */
Deno.test("QuasiSalt.createSaltV2(test)", async () => {

  assertEquals(
    QuasiSalt.createSaltV2("test"),
    "7z37"
  );

});
Deno.test("QuasiSalt.hashV2(test)", async () => {

  assertEquals(
    QuasiSalt.hashV2("test"),
    "0b4a8c1c92f26ed200b41dfb25525df7516cdae6a958943875345a3a444343a9"
  );
  assertEquals(
    QuasiSalt.hashV2("tset"),
    "14ca86fcb4aaee36483dea51cfd88244bf56cebf6028a646c3d36190c3a55ad0"
  );
  assertEquals(
    QuasiSalt.hashV2("Test"),
    "122d88f5b8c0834430cc6e78b016ebeb6ade3428ff32ae4c0a1ccdcb9d424fb5"
  );
  assertEquals(
    QuasiSalt.hashV2("tseT"),
    "5c8a24d723d1ee7c4bd2f6e55f1897bb1fb35e277ad275b09ea671368f2c1e52"
  );

});
