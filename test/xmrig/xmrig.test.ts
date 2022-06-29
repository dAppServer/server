
import { path } from "../../deps.ts";
import { assertEquals } from "../../deps-test.ts";
import { XmrigService } from "../../src/modules/mining/xmrig/xmrig.service.ts";

Deno.test("XmrigService:isInstalled", async () => {
  const xmrig = new XmrigService()

  assertEquals( xmrig.isInstalled(), false)
  //await xmrig.downloadXmrig("macos-arm64")
 // assertEquals( xmrig.isInstalled(), true)
});

Deno.test("XmrigService:getReleaseDownloads", async () => {
  const xmrig = new XmrigService()
  let result = await xmrig.getReleaseDownloads()

  assertEquals( result['url'] != undefined, true)
  assertEquals( result['version'] != undefined, true)
  assertEquals( result['ts'] != undefined, true)
  assertEquals( result['assets'].length > 1, true)
  assertEquals( result['assets'][0]['os'] != undefined, true)
  assertEquals( result['assets'][0]['id'] != undefined, true)
  assertEquals( result['assets'][0]['name'] != undefined, true)
  assertEquals( result['assets'][0]['url'] != undefined, true)
  assertEquals( result['assets'][0]['size'] != undefined, true)
  assertEquals( result['assets'][0]['ts'] != undefined, true)
  assertEquals( result['assets'][0]['hash'] != undefined, true)

});

