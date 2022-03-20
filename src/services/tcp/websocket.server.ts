import {
  WebSocketClient,
  WebSocketServer,
} from "https://deno.land/x/websocket@v0.1.3/mod.ts";
import { Sub } from "https://deno.land/x/jszmq/mod.ts";
import { ZeroMQServer } from "../ipc/zeromq.ts";
import { encode as base64Encode } from "https://deno.land/std@0.82.0/encoding/base64.ts";

export interface WebSocketMessageRequest {
  daemon: string;
}

/**
 * this class enables realtime feedback
 */
export class WebsocketServer {
  static strip(s: string) {
    return s.split("").filter(function (x: string) {
      const n = x.charCodeAt(0);
      return 31 < n && 127 > n;
    }).join("");
  }

  /**
   * supported cmd's
   * daemon:* - Subscribe to a Daemons stdOut
   * cmd:${daemon}:${command string}
   */
  static init() {
    const wss = new WebSocketServer(36909);
    wss.on("connection", function (ws: WebSocketClient) {
      ws.on("message", function (daemon: string) {
        daemon = daemon.replace(/"/g, "");
        //console.log(daemon)
        if (daemon.substr(0, 6) === "daemon") {
          const req = daemon.split(":");
          console.log(`Subscribing to ${req[1]}`);
          const sock = new Sub();

          sock.connect("ws://127.0.0.1:36910/pub");
          sock.subscribe(req[1]);
          console.log("Subscriber connected to port 36910/pub");
          const wsClient = ws;
          sock.on("message", function (endpoint, topic, message) {
            const textEncoder = new TextEncoder();
            wsClient.send(
              JSON.stringify([
                req[1],
                base64Encode(
                  textEncoder.encode(
                    WebsocketServer.strip(
                      message.toString(),
                    ),
                  ),
                ),
              ]),
            );
          });
        } else if (daemon.substr(0, 3) === "cmd") {
          const req = daemon.split(":");
          ZeroMQServer.sendPubMessage(
            req[1] + "-stdIn",
            `${req[2]}\n`,
          );
        }
      });
    });
  }

  public static startServer() {
    console.info("Starting stdOut WebSocket: ws://127.0.0.1:36909");
    WebsocketServer.init();
  }
}
