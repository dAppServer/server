import { assertStrictEquals,assertEquals, assertArrayIncludes, path } from "../../deps.ts";
import { AppManager } from "../../src/modules/apps/manager.service.ts";
const manager = new AppManager();

try{
    Deno.removeSync(path.join(Deno.cwd(),'data', 'objects', 'apps', 'installed.json'))
}catch (e) {

}

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

Deno.test("App Marketplace - List", async () => {
    //console.log()
    const market = await manager.getMarketPlaceApps()
    assertEquals(market['version'], 1)
    assertEquals(market['apps'][0]['name'], 'server')
    assertEquals(market['apps'][0]['types'][0], 'core')
    assertEquals(market['apps'][0]['pkg'], 'https://raw.githubusercontent.com/dAppServer/server/main/.itw3.json')
    assertArrayIncludes(market['dirs'], ['blockchain'])

});
