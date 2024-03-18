import * as zmq from "https://deno.land/x/jszmq/mod.ts";
import { Logger } from "https://deno.land/x/danet/mod.ts";

/**
 * ZeroMQ Websocket server
 *
 * {@link https://zguide.zeromq.org/docs/preface/ ZeroMQ Documentation}.
 */
export class ZeroMQServerService {
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

    ZeroMQServerService.logger.log("Starting ZeroMQ WebSocket: ws://127.0.0.1:36910")
    try {
      ZeroMQServerService.socketServer = new zmq.DenoHttpServer(
        "ws://127.0.0.1:36910",
      );
    } catch (e) {
      ZeroMQServerService.logger.warn("ZeroMQ Websocket already running")
      console.info("ZeroMQ Websocket already running");
      return;
    }

    ZeroMQServerService.loadPub();
    ZeroMQServerService.loadPush();
    ZeroMQServerService.loadRep();
    ZeroMQServerService.socketServer.listen();
  }

  /**
   * Sends a framed message to the Pub() socket
   *
   * @param {string} channel
   * @param {string} message
   */
  public static sendPubMessage(channel: string, message: string) {
    if (ZeroMQServerService.sockets["pubsub"]) {
      ZeroMQServerService.sockets.pubsub.send([channel, message]);
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
    sock.connect(ZeroMQServerService.pubEndpoint);
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
    if (ZeroMQServerService.sockets["reqrep"]) {
      ZeroMQServerService.sockets.reqrep.send([channel, message]);
    }
  }

  /**
   * Sends message to pushpull channel
   *
   * @param {string} channel
   * @param {string} message
   */
  public static sendPushMessage(channel: string, message: string) {
    if (ZeroMQServerService.sockets["pushpull"]) {
      ZeroMQServerService.sockets.pushpull.send(message);
    }
  }

  /**
   * @private
   */
  private static loadRep() {
    ZeroMQServerService.sockets.reqrep = new zmq.Rep();
    ZeroMQServerService.sockets.reqrep.bind(
      ZeroMQServerService.socketServer,
      ZeroMQServerService.repEndpoint,
    );
  }

  /**
   * @private
   */
  private static loadPub() {
    ZeroMQServerService.sockets.pubsub = new zmq.Pub();
    ZeroMQServerService.sockets.pubsub.bind(
      ZeroMQServerService.socketServer,
      ZeroMQServerService.pubEndpoint,
    );
  }

  /**
   * @private
   */
  private static loadPush() {
    ZeroMQServerService.sockets.pushpull = new zmq.Push();
    ZeroMQServerService.sockets.pushpull.bind(
      ZeroMQServerService.socketServer,
      ZeroMQServerService.pushEndpoint,
    );
  }
}
