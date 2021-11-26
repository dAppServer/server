import { WebSocketClient, WebSocketServer } from "https://deno.land/x/websocket@v0.1.3/mod.ts";
import * as zmq from "https://deno.land/x/jszmq/mod.ts";
import { Sub } from "https://deno.land/x/jszmq/mod.ts";
export class WebsocketServer {

	public static init(){

		const wss = new WebSocketServer(36909);
		wss.on("connection", function (ws: WebSocketClient) {

			ws.on("message", function(daemon: string) {
				const subDaemon = daemon.replace(/"/g, '')
				console.log(`Subscribing to ${subDaemon}`)
				const sock = new Sub();

				sock.connect("ws://localhost:36910/pub");
				sock.subscribe(subDaemon);
				console.log("Subscriber connected to port 36909");
				const wsClient = ws
				sock.on("message", function (endpoint, topic, message) {
					wsClient.send(JSON.stringify([subDaemon,message.toString()]));
				});
			});


		});
	}


	public static startServer() {
		console.log("Starting stdOut WebSocket: ws://localhost:36909")
		WebsocketServer.init();
	}
	public static sendPubSubMessage(channel: string, message: string){
		console.log(`ZeroMQ PubSub ${channel} message length: ${message.length}`)
		//WebsocketServer.pubsub.send([channel, message])
	}
}
