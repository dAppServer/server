
import { ZeroMQServer } from "../ipc/zeromq.ts";
import { WebSocketServer, WebSocketClient, zmq } from "../../../deps.ts";
export interface WebSocketMessageRequest {
  daemon: string;
}

/**
 * this class enables realtime feedback
 */
export class LetheanWebsocketServer {

  private static server: WebSocketServer;

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
    LetheanWebsocketServer.server = new WebSocketServer(36909);
    LetheanWebsocketServer.server.on("connection", function (ws: WebSocketClient) {
      ws.on("message", function (daemon: string) {
        daemon = daemon.replace(/"/g, "");
        //console.log(daemon)
        if (daemon.substr(0, 6) === "daemon") {
          const req = daemon.split(":");
          console.log(`Subscribing to ${req[1]}`);
          const sock = new zmq.Sub();

          sock.connect("ws://127.0.0.1:36910/pub");
          sock.subscribe(req[1]);
          console.log("Subscriber connected to port 36910/pub");
          const wsClient = ws;
          sock.on("message", function (endpoint, topic, message) {
            const textEncoder = new TextEncoder();
            wsClient.send(
              JSON.stringify([
                req[1],
                atob(
                  LetheanWebsocketServer.strip(
                      message.toString(),
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

  /**
   *
   * @param daemon
   * @param message
   */
  public static startServer() {
    console.info("Starting stdOut WebSocket: ws://127.0.0.1:36909");
    LetheanWebsocketServer.init();
  }

  static async stopServer() {
    await LetheanWebsocketServer.server?.close();
  }
}
