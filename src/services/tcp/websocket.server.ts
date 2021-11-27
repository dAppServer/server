import {WebSocketClient, WebSocketServer} from 'https://deno.land/x/websocket@v0.1.3/mod.ts';
import {Sub} from 'https://deno.land/x/jszmq/mod.ts';
import {ZeroMQServer} from '../ipc/zeromq.ts';

export interface WebSocketMessageRequest{
	daemon:string
}

export class WebsocketServer {

	static init() {

		const wss = new WebSocketServer(36909);
		wss.on('connection', function (ws: WebSocketClient) {
			ws.on('message', function (daemon: string) {
				daemon = daemon.replace(/"/g, '');
				console.log(daemon)
				if(daemon.substr(0,6) === 'daemon'){
					const req = daemon.split(':');
					console.log(`Subscribing to ${req[1]}`);
					const sock = new Sub();

					sock.connect('ws://localhost:36910/pub');
					sock.subscribe(req[1]);
					console.log('Subscriber connected to port 36910/pub');
					const wsClient = ws;
					sock.on('message', function (endpoint, topic, message) {
						wsClient.send(JSON.stringify([req[1], message.toString()]));
					});
				}else if (daemon.substr(0,3) === 'cmd'){
					const req = daemon.split(':');
					ZeroMQServer.sendPubMessage(req[1]+"-stdIn", `${req[2]}\n`)
					//console.log(daemon)
				}
			});
		});
	}


	public static startServer() {
		console.log('Starting stdOut WebSocket: ws://localhost:36909');
		WebsocketServer.init();
	}
}

