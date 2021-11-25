import * as zmq from "https://deno.land/x/jszmq/mod.ts";

export class WebsocketServer {

	public static socketServer:  zmq.DenoHttpServer<any>;

	private static reqrep: zmq.Rep;
	public static pubsub: zmq.Pub;

	public static init(){
//		WebsocketServer.reqrep = new zmq.Rep()
//		WebsocketServer.reqrep.bind(WebsocketServer.socketServer);
		WebsocketServer.socketServer = new zmq.DenoHttpServer("ws://localhost:36910")
		WebsocketServer.pubsub = new zmq.Pub()
		WebsocketServer.pubsub.bind(WebsocketServer.socketServer );
	}

	public static startServer() : void{
		console.log("Starting ZeroMQ WebSocket: ws://localhost:36910")
		WebsocketServer.socketServer.listen()
	}
	public static sendPubSubMessage(channel: string, message: string){
		console.log(`ZeroMQ PubSub ${channel} message length: ${message.length}`)
		WebsocketServer.pubsub.send([channel, message])
	}
}
