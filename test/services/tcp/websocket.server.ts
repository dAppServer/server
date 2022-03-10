import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { WebsocketServer } from "../src/services/tcp/websocket.server.ts";
import { Sub } from "https://deno.land/x/jszmq/mod.ts";
import { delay } from "https://deno.land/std@0.116.0/async/delay.ts";
import { ZeroMQServer } from "../src/services/ipc/zeromq.ts";

console.log("ZeroMQ Websocket: ws://localhost:36910/pub");

ZeroMQServer.subscribeSubMessage(
  "letheand",
  function (endpoint: string, topic: string, message: string) {
    console.log(
      "received a message related to:",
      topic.toString(),
      "containing message:",
      message.toString(),
    );
  },
);

await delay(1000000);
