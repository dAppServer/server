import { assertEquals } from "../../deps-test.ts";
import {QuasiSaltService} from "@mod/cryptography/hash/quasi-salt.service.ts";

const QuasiSalt = new QuasiSaltService();
Deno.test("QuasiSalt.hash(test)", async () => {
  assertEquals(
    QuasiSalt.hash("test"),
    "0b4a8c1c92f26ed200b41dfb25525df7516cdae6a958943875345a3a444343a9"
  );
  assertEquals(
    QuasiSalt.hash("tset"),
    "14ca86fcb4aaee36483dea51cfd88244bf56cebf6028a646c3d36190c3a55ad0"
  );
  assertEquals(
    QuasiSalt.hash("Test"),
    "122d88f5b8c0834430cc6e78b016ebeb6ade3428ff32ae4c0a1ccdcb9d424fb5"
  );
  assertEquals(
    QuasiSalt.hash("tseT"),
    "5c8a24d723d1ee7c4bd2f6e55f1897bb1fb35e277ad275b09ea671368f2c1e52"
  );

});

Deno.test("QuasiSalt.createSalt(12345)", async () => {
  assertEquals(
    QuasiSalt.createSalt("12345"),
    "5ae2l"
  );
});

/**
 * This is testing custom mapping for the salt function; this allows the code to run multiple projects
 * each mapping gives a different set of hashes.
 *
 * you can also use to walk through a string looking for a sequence.
 */
Deno.test("QuasiSalt.createSalt(12345) - blank map", async () => {

  assertEquals(
    QuasiSalt.createSalt("12345"),
    "5ae2l"
  );

  const oldMap = QuasiSalt.getKeyMap()
  QuasiSalt.setKeyMap({})
  assertEquals(
    QuasiSalt.createSalt("12345"),
    "54321"
  );

  QuasiSalt.setKeyMap(oldMap) ;
  assertEquals(
    QuasiSalt.createSalt("12345"),
    "5ae2l"
  );
});

/**
 * version two, same basic idea, better implementation, gives optimal quasi entropy.
 */
Deno.test("QuasiSalt.createSalt(test)", async () => {

  assertEquals(
    QuasiSalt.createSalt("test"),
    "7z37"
  );

});
Deno.test("QuasiSalt.hash(test)", async () => {

  assertEquals(
    QuasiSalt.hash("test"),
    "0b4a8c1c92f26ed200b41dfb25525df7516cdae6a958943875345a3a444343a9"
  );
  assertEquals(
    QuasiSalt.hash("tset"),
    "14ca86fcb4aaee36483dea51cfd88244bf56cebf6028a646c3d36190c3a55ad0"
  );
  assertEquals(
    QuasiSalt.hash("Test"),
    "122d88f5b8c0834430cc6e78b016ebeb6ade3428ff32ae4c0a1ccdcb9d424fb5"
  );
  assertEquals(
    QuasiSalt.hash("tseT"),
    "5c8a24d723d1ee7c4bd2f6e55f1897bb1fb35e277ad275b09ea671368f2c1e52"
  );

});
