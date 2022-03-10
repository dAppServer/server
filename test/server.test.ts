import { assertEquals } from "https://deno.land/std@0.129.0/testing/asserts.ts";
import { LetheanCli } from "../src/lethean-cli.ts";
// Compact form: name and function
Deno.test("hello world #1", async () => {
  const x = 1 + 2;
  await LetheanCli.init();
  assertEquals(x, 3);
});
