
import { assertEquals, assertExists, superoak } from "../../deps-test.ts";
import { AppController } from "../../src/app.controller.ts";

const AppControl = new AppController()
const app = AppControl.app
//
//Deno.test("GET /chain/xmr/download", async () => {
//  const request = await superoak(app);
//  await request.post("/chain/xmr/download").expect(200);
//});
