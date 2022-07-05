import { assertStrictEquals, path } from "../../deps.ts";
import { assertEquals } from "../../deps-test.ts";
import { AppManager } from "../../src/modules/apps/manager.service.ts";
const manager = new AppManager();
Deno.test("App Manager - install", async () => {

    assertEquals( manager.apps, {  });
    manager.installApp('miner_xmrig')
    assertEquals( manager.apps, { "miner_xmrig": true });


});
Deno.test("App Manager - remove", async () => {

    assertEquals( manager.apps, { "miner_xmrig": true });
     manager.removeApp('miner_xmrig')
    assertEquals( manager.apps, {  });

});
