import { zmq } from "/deps.ts";
import { Logger } from "danet/mod.ts";

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
  private static pubEndpoint = "ws://127.0.0.1:36910/pub";

  /**
   * Request/Response Endpoint
   *
   * @type {string}
   * @private
   */
  private static repEndpoint = "ws://127.0.0.1:36910/rep";

  /**
   * Push/Pull Endpoint
   *
   * @type {string}
   * @private
   */
  private static pushEndpoint = "ws://127.0.0.1:36910/push";

  /**
   * ZeroMQ Websocket Server
   *
   * @type {DenoHttpServer<any>}
   */
  public static socketServer: zmq.DenoHttpServer<any>;

  /**
   * Keeps a reference of all the sock's we can use
   *
   * @type {{[p: string]: any}}
   */
  static sockets: { [name: string]: any } = {};
  private static logger: Logger = new Logger('ZeroMQServer');
  /**
   * Loads sockets for Pub(), Push(), Rep()
   * Then starts a WebSocket server: ws://localhost:36910
   */
  public static startServer(): void {

    ZeroMQServer.logger.log("Starting ZeroMQ WebSocket: ws://127.0.0.1:36910")
    try {
      ZeroMQServer.socketServer = new zmq.DenoHttpServer(
        "ws://127.0.0.1:36910",
      );
    } catch (e) {
      ZeroMQServer.logger.warn("ZeroMQ Websocket already running")
      console.info("ZeroMQ Websocket already running");
      return;
    }

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
    if (ZeroMQServer.sockets["pubsub"]) {
      ZeroMQServer.sockets.pubsub.send([channel, message]);
    }
  }

  /**
   * Subscribes to the Pub/Sub Publish endpoint
   *
   * @param {string} channel
   * @param cb
   */
  public static subscribeSubMessage(channel: string, cb: any) {
    const sock = new zmq.Sub();
    sock.connect(ZeroMQServer.pubEndpoint);
    sock.subscribe(channel);
    console.info("Subscriber connected to port 36910");
    //sock.on("message", console.log);
  }

  /**
   * Sends message to reqrep channel
   *
   * @param {string} channel
   * @param {string} message
   */
  public static sendRepMessage(channel: string, message: string) {
    if (ZeroMQServer.sockets["reqrep"]) {
      ZeroMQServer.sockets.reqrep.send([channel, message]);
    }
  }

  /**
   * Sends message to pushpull channel
   *
   * @param {string} channel
   * @param {string} message
   */
  public static sendPushMessage(channel: string, message: string) {
    if (ZeroMQServer.sockets["pushpull"]) {
      ZeroMQServer.sockets.pushpull.send(message);
    }
  }

  /**
   * @private
   */
  private static loadRep() {
    ZeroMQServer.sockets.reqrep = new zmq.Rep();
    ZeroMQServer.sockets.reqrep.bind(
      ZeroMQServer.socketServer,
      ZeroMQServer.repEndpoint,
    );
  }

  /**
   * @private
   */
  private static loadPub() {
    ZeroMQServer.sockets.pubsub = new zmq.Pub();
    ZeroMQServer.sockets.pubsub.bind(
      ZeroMQServer.socketServer,
      ZeroMQServer.pubEndpoint,
    );
  }

  /**
   * @private
   */
  private static loadPush() {
    ZeroMQServer.sockets.pushpull = new zmq.Push();
    ZeroMQServer.sockets.pushpull.bind(
      ZeroMQServer.socketServer,
      ZeroMQServer.pushEndpoint,
    );
  }
}
