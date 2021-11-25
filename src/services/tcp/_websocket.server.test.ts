import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import {WebsocketServer} from './websocket.server.ts';
import { Sub } from "https://deno.land/x/jszmq/mod.ts";
import { delay } from "https://deno.land/std@0.116.0/async/delay.ts";

console.log("ZeroMQ Websocket: ws://localhost:36910")

	const sock = new Sub();

	sock.connect("ws://localhost:36910");
	sock.subscribe("letheand");
	console.log("Subscriber connected to port 36910");

	sock.on("message", function (endpoint, topic, message) {
		console.log(
			"received a message related to:",
			topic.toString(),
			"containing message:",
			message.toString(),
		);
	});

	await delay(1000000)


