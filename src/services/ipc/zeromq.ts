import * as zmq from "https://deno.land/x/jszmq/mod.ts";
import { DenoHttpServer, Sub } from "https://deno.land/x/jszmq/mod.ts";

/**
 * ZeroMQ Websocket server
 *
 * {@link https://zguide.zeromq.org/docs/preface/ ZeroMQ Documentation}.
 */
export class ZeroMQServer {
  /**
   * Pub/Sub Endpoint
   *
   * {@link https://zguide.zeromq.org/docs/chapter2/#Pub-Sub-Message-Envelopes ZeroMQ Pub/Sub}.
   * @type {string}
   * @private
   */
  private static pubEndpoint = "ws://localhost:36910/pub";

  /**
   * Request/Response Endpoint
   *
   * @type {string}
   * @private
   */
  private static repEndpoint = "ws://localhost:36910/rep";

  /**
   * Push/Pull Endpoint
   *
   * @type {string}
   * @private
   */
  private static pushEndpoint = "ws://localhost:36910/push";

  /**
   * ZeroMQ Websocket Server
   *
   * @type {DenoHttpServer<any>}
   */
  public static socketServer: DenoHttpServer<any>;

  /**
   * Keeps a reference of all the sock's we can use
   *
   * @type {{[p: string]: any}}
   */
  static sockets: { [name: string]: any } = {};

  /**
   * Loads sockets for Pub(), Push(), Rep()
   * Then starts a WebSocket server: ws://localhost:36910
   */
  public static startServer(): void {
    console.log("Starting ZeroMQ WebSocket: ws://localhost:36910");
    ZeroMQServer.socketServer = new DenoHttpServer("ws://localhost:36910");
    ZeroMQServer.loadPub();
    ZeroMQServer.loadPush();
    ZeroMQServer.loadRep();
    ZeroMQServer.socketServer.listen();
  }

  /**
   * Sends a framed message to the Pub() socket
   *
   * @param {string} channel
   * @param {string} message
   */
  public static sendPubMessage(channel: string, message: string) {
    console.log(
      `ZeroMQ PubSub ${channel} message length: ${message.length}`,
    );
    ZeroMQServer.sockets.pubsub.send([channel, message]);
  }

  public static subscribeSubMessage(channel: string, cb: any) {
    const sock = new Sub();
    sock.connect(ZeroMQServer.pubEndpoint);
    sock.subscribe(channel);
    console.log("Subscriber connected to port 36910");
    sock.on("message", console.log);
  }

  public static sendRepMessage(channel: string, message: string) {
    console.log(
      `ZeroMQ ReqRep ${channel} message length: ${message.length}`,
    );
    ZeroMQServer.sockets.reqrep.send([channel, message]);
  }

  public static sendPushMessage(channel: string, message: string) {
    console.log(
      `ZeroMQ PushPull ${channel} message length: ${message.length}`,
    );
    ZeroMQServer.sockets.pushpull.send(message);
  }

  private static loadRep() {
    ZeroMQServer.sockets.reqrep = new zmq.Rep();
    ZeroMQServer.sockets.reqrep.bind(
      ZeroMQServer.socketServer,
      ZeroMQServer.repEndpoint,
    );
  }

  private static loadPub() {
    ZeroMQServer.sockets.pubsub = new zmq.Pub();
    ZeroMQServer.sockets.pubsub.bind(
      ZeroMQServer.socketServer,
      ZeroMQServer.pubEndpoint,
    );
  }

  private static loadPush() {
    ZeroMQServer.sockets.pushpull = new zmq.Push();
    ZeroMQServer.sockets.pushpull.bind(
      ZeroMQServer.socketServer,
      ZeroMQServer.pushEndpoint,
    );
  }
}
