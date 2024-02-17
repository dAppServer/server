import { assertStrictEquals,assertEquals, assertArrayIncludes, path } from "../../deps.ts";
import { AppManager } from "../../src/mod/apps/manager.service.ts";


try{
    Deno.removeSync(path.join(Deno.cwd(),'data', 'objects', 'apps', 'installed.json'))
}catch (e) {

}
const manager = new AppManager();

//Deno.test("App Manager - install", async () => {
//
//    assertEquals( manager.apps, {  });
//    await manager.installApp("server", "https://raw.githubusercontent.com/dAppServer/server/main/.itw3.json")
//    assertEquals( manager.apps['server'] !== undefined, true);
//
//
//});


//Deno.test("App Manager - install", async () => {
//
//    assertEquals( manager.apps, {  });
//    await manager.installApp("server", "https://raw.githubusercontent.com/dAppServer/server/main/.itw3.json")
//    assertEquals( manager.apps['server'] !== undefined, true);
//
//
//});
//Deno.test("App Manager - remove", async () => {
//
//    assertEquals(manager.apps['server'] !== undefined, true);
//     manager.removeApp('server')
//    assertEquals( manager.apps, {  });
//
//});
//Deno.test("App Marketplace - List", async () => {
//    //console.log()
//    const market = await manager.getMarketPlaceApps()
//    assertEquals(market['version'], 1)
//    assertEquals(market['apps'][0]['name'], 'Application Server')
//    assertEquals(market['apps'][0]['type'], 'core')
//    assertEquals(market['apps'][0]['pkg'], 'https://raw.githubusercontent.com/dAppServer/server/main/.itw3.json')
//    assertArrayIncludes(market['dirs'], ['blockchain'])
//
//});
//Deno.test("App Marketplace - Category Blockchain", async () => {
//    //console.log()
//    const market = await manager.getMarketPlaceApps({dir: "blockchain"})
//
//    assertEquals(market['version'], 1)
//    assertEquals(market['apps'][0]['name'], 'Lethean Blockchain')
//    assertEquals(market['apps'][0]['pkg'], 'https://raw.githubusercontent.com/letheanVPN/blockchain-iz/main/.itw3.json')
//    assertArrayIncludes(market['dirs'], [])
//
//});
