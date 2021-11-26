import * as zmq from "https://deno.land/x/jszmq/mod.ts";

export class ZeroMQServer {


	public static socketServer = new zmq.DenoHttpServer("wss://localhost:36910");

	static sockets: { [name: string]: any } = {};

	public static startServer() : void{
		console.log("Starting ZeroMQ WebSocket: ws://localhost:36910")
		ZeroMQServer.loadPub()
		ZeroMQServer.loadPush()
		ZeroMQServer.loadRep()
		ZeroMQServer.socketServer.listen()
	}
	public static sendPubMessage(channel: string, message: string){
		//console.log(`ZeroMQ PubSub ${channel} message length: ${message.length}`)
		ZeroMQServer.sockets.pubsub.send([channel, message])
	}

	public static sendRepMessage(channel: string, message: string){
		console.log(`ZeroMQ PubSub ${channel} message length: ${message.length}`)
		ZeroMQServer.sockets.pushpull.send([channel, message])
	}

	public static sendPushMessage(channel: string, message: string){
		console.log(`ZeroMQ PubSub ${channel} message length: ${message.length}`)
		ZeroMQServer.sockets.pushpull.send([channel, message])
	}

	private static loadRep() {
		ZeroMQServer.sockets.reqrep = new zmq.Rep()
		ZeroMQServer.sockets.reqrep.bind(ZeroMQServer.socketServer,"ws://localhost:36910/rep");
	}

	private static loadPub(){
		ZeroMQServer.sockets.pubsub = new zmq.Pub()
		ZeroMQServer.sockets.pubsub.bind(ZeroMQServer.socketServer, "ws://localhost:36910/pub");
	}

	private static loadPush(){
		ZeroMQServer.sockets.pushpull = new zmq.Push()
		ZeroMQServer.sockets.pushpull.bind(ZeroMQServer.socketServer, "ws://localhost:36910/push" );
	}


}
