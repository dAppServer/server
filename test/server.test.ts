import { assertEquals } from "https://deno.land/std@0.129.0/testing/asserts.ts";

// Compact form: name and function
Deno.test("hello world #1", () => {
  const x = 1 + 2;
  assertEquals(x, 3);
});
