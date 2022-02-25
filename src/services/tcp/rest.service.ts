import {createApp} from 'https://deno.land/x/servest@v1.3.1/mod.ts';
import {cors} from 'https://deno.land/x/servest@v1.3.1/middleware/cors.ts';
import {Command} from 'https://deno.land/x/cliffy/command/mod.ts';
import * as path from 'https://deno.land/std/path/mod.ts';
import os from 'https://deno.land/x/dos@v0.11.0/mod.ts';
import {LetheanCli} from '../../lethean-cli.ts';
import {Filter} from '../console-to-html.service.ts';
import {WebsocketServer} from './websocket.server.ts';
import {ZeroMQServer} from '../ipc/zeromq.ts';

import {existsSync, ensureDirSync} from "https://deno.land/std/fs/mod.ts";

export class RestService {
	static app = createApp();

	static home: string = (os.homeDir() ? os.homeDir() : '') as string;

	static pathPerms: any = {
		backend: false,
		filesystem: true,
		daemon: true,
		update: true,
		help: false,
		completions: false
	};

	/**
	 * Recursive tree scan of known commands adding addRoute() to each one found
	 *
	 * @param {string} base
	 * @param routes
	 */
	static discoverRoute(base: string, routes: any) {
		for (const dat of routes) {
			const key = dat[0], value = dat[1];
			if (
				RestService.pathPerms[key] === undefined ||
				RestService.pathPerms[key] !== false
			) {
				console.log(`Adding route: ${[base, key].join('/')}`);
				this.addRoute([base, key].join('/'), value);
				if (value.commands) {
					this.discoverRoute([base, key].join('/'), value.commands);
				}
			}
		}
	}

	/**
	 * Creates the cors enabled HTTPS Endpoint for the path and attaches the run() function
	 *
	 * GET - Will trigger the --help docs for the path and display a HTML page
	 * POST - Will trigger the run() function and convert the POST data to commands
	 *
	 * @param {string} path url path
	 * @param handle
	 */
	static addRoute(path: string, handle: any) {
		/**
		 * setup the help documentation
		 */
		this.app.get(path, async (req) => {
			await req.respond({
				status: 200,
				headers: new Headers({
					'content-type': 'text/html',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,HEAD',
					'Access-Control-Max-Age': '240'
				}),
				body: RestService.templateOutput(handle.getHelp())
			});
		});

		/**
		 * Setup the action runner
		 */
		this.app.post(path, async (req) => {
			const cmdArgs = req.url.replace('/', '').split('/');

			const payload = await req.json();

			if(payload['jsonpath']){
				cmdArgs.push(`--jsonpath="${payload['jsonpath']}"`)
				cmdArgs.push(`--request="${JSON.stringify(payload['request'])}"`)
			}else if(payload['jsonrpc']){
				cmdArgs.push(`--request="${JSON.stringify(payload)}"`)
			}else{
				for (const key in payload) {
					const value = payload[key].length > 1 ? `=${payload[key]}` : '';
					cmdArgs.push(
						'--' + key.replace(/([A-Z])/g, (x: string) => '-' + x.toLowerCase()) +
						value
					);
				}
			}

			try {
				await LetheanCli.run(cmdArgs);
				// to send a response throw new StringResponse()
			} catch (error) {
				return await req.respond({
					status: 200,
					headers: new Headers({
						'content-type': 'application/x-www-form-urlencoded, text/plain, application/json',
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,HEAD',
						'Access-Control-Max-Age': '240'
					}),
					body: error.message
				});
			}
		});

		this.app.options(path, async (req) => {
			console.log('OPTIONS')
			return await req.respond({
				status: 204,
				headers: new Headers({
					'Content-Type': 'application/x-www-form-urlencoded, text/plain, application/json',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,HEAD',
					'Access-Control-Max-Age': '240'
				})
			});
		});
	}

	/**
	 * Bootstraps the REST Router
	 */
	static loadRoutes() {
		Deno.env.set('REST', '1');
		this.discoverRoute('', LetheanCli.options.commands);

		this.app.handle('/', async (req) => {
			await req.respond({
				status: 200,
				headers: new Headers({
					'content-type': 'text/html',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,HEAD',
					'Access-Control-Max-Age': '240'
				}),
				body: RestService.templateOutput(LetheanCli.options.getHelp())
			});
		});

	}

	/**
	 * Start TLS HTTP Rest Server & ZeroMQ Websocket
	 */
	public static run() {

		this.loadRoutes();

		this.app.use(cors({
			origin: '*',
			methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"],
			allowedHeaders: ["content-type"],
			maxAge: 1,
		}));

// 'content-type': 'application/x-www-form-urlencoded, text/plain, application/json',
//						'Access-Control-Allow-Origin': 'https://localhost'

		if (existsSync(path.join(RestService.home, 'Lethean', 'conf', 'private.pem'))) {
			console.log(`Localhost SSL Found: ${path.join(RestService.home, 'Lethean', 'conf', 'private.pem')}`);
		} else {
			console.log('No localhost ssl cert found, injecting a pre made one so we can start a tls server and fix this');
			RestService.injectPem();
		}

		this.app.listen({
			'hostname': 'localhost',
			'port': 36911
		});

		ZeroMQServer.startServer();
		WebsocketServer.startServer();
	}

	static templateOutput(input: string) {
		return new Filter().toHtml(
			`<html><head></head><body  style="background: radial-gradient(circle,#08f2b5 0%,#158297 100%); "><pre style=" margin-left: 2vw; width: 96vw; background: rgb(33, 33, 33);">${input}</pre></body></html>`
		);
	}

	public static config() {
		return new Command()
			.description('Backend Services for Application GUI')
			.command('start', 'Start Application Helper Daemon')
			.action(() => RestService.run())
			.command('ipc')
			.description('Start ZeroMQ server')
			.action(() => ZeroMQServer.startServer());
	}

	private static injectPem() {
		const home = os.homeDir();
		ensureDirSync(path.join(home ? home : '~', 'Lethean', 'conf'));
		ensureDirSync(path.join(home ? home : '~', 'Lethean', 'users'));
		ensureDirSync(path.join(home ? home : '~', 'Lethean', 'wallets'));

		Deno.writeTextFileSync(path.join(home ? home : '~', 'Lethean', 'conf', 'private.pem'), `-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEAqX/7sHcFXtk5fvfeAMU+m+zuiF6IegEef0NrwaaYvxlpC0I6
vcksaHNFzAu0KArDwow8n+xtRg+07UXSdphO+D0tnHHpfamESPysz4Ik3q8cVnQM
AqHXy5yaJBFK/hm521MvmwHubTVnyhJcUSR1/1OIbyPZ23P32P7bc/Tg+ELOSIWR
K+c9ODLWMuqXwWKdxJgHI1j2zE8E4K0UDmxwrENPWW2JxM9E5TJDujlHjsiSIo43
NJFU9g4pSM0xKOUCIlTN97lEKbh0pzMahvFUN/mppQxS7Z5CJ91tw5kY3OoJ8BaT
XgXZwUyD/UrMduZ+JnKZI9I27R4Nilwx50oE/wIDAQABAoIBAFfXh+yQAiyBjxaK
BneHwUa1p3js5PW1lsSFgFa/q/F9jb7T9/VbSLRo6QcyGY+W5JTycIjA0nC4ux8s
TEJB9MsZiYXGUydYrsHUkQqJe+ob/iefxImorllLM2b1v1OoqXVMyyMeAR5/yuYi
Vc2Hg89qzw4qGkFs/Els6vZRNjXyMSUvOPKKH4dZmG2n4SY0aBmmrx+OPRoshX+S
ok4/rOofSk98lsJ/oHb20i1Hehzs2DToEmT9pumBqSf0vBeacaAt6/xggL9YF3cU
AnEndO/PV6wv2guGYRwAw+Xl7bno944t5hF8n7fzoGVuarwsjiG1dct9bstq2Hjg
XsQyA+ECgYEA2om7yJtu5MI/AHyB8ALRQ2BGpMb6zncEnsCKt0nSpMYofA1MqHD7
8MljL08CeYhX8bXXLUvxm0YqIB+q39KGCMgpNYcpnFjpXvzgmTngFJphOzDdrsZd
ydC/BH7Ryvm5kBm+CWi/SjJMqkPHzaRuhIEOU2PUaMJ4oNwc4BOvLGMCgYEAxo5G
WGy/9yB4UE5rreETyvwpCctttbOOW8iUMWf/Gve16ViO8Hgq+y2Sh+QSPOmIzE8q
k76YVuStp/I/Ya0IKgYlmC5hEONYNr7jZHgjBV9GL/UTP6OtCK2xuQY8C9S6N+Bf
7HYdVlSTEXaWrothnfG0DU2E8toqJM5hZC7zwbUCgYAk/mfRX653/wHXPTxpurBd
7XBH+H8AcFlR3lodCNwllH3J8h5l7SpY6l5l5cQPeqsYeaXBPzfZBxmecn3kgai6
19dR/l1m4A4xTDFg/tEV68RF1tHQAjhiL3oGcslkyL1GzXTD9v1avAUKVYr/HrSu
rYIVT7LnQPRWlqw0qmBe7QKBgBXTZeAqdB+SLieFt0hxyV8ywMAW4IRsrGVicwfL
SruIJzLzTSMZ0n+xzr2pUGfps+Phf+ilttE2afBgLJ9sCc20x0UnM/xLQVMjQJO2
sQLSKkDzS55fO5IMpdCU4tzaEW4699BiW2819MSiqIWfRKe7/fLIZqjbWm6ZURNW
Je1RAoGAZV96nHg4PNJWMHeJs8yYFCpeE6dC3J4gK2aR3P9dNbXkIDBhc/6dnR0O
/rqKx/VXYqpnOeJBHDc8ImMsPAOBigc8pAHfR4GsXKw3frQqFQkz5XuAZZHWl1Bw
YOFbSYitBYVg9X650Vx9UP358H3SpLjmaTW4ZgdQnJgZAw3Eoqk=
-----END RSA PRIVATE KEY-----`);
		Deno.writeTextFileSync(path.join(home ? home : '~', 'Lethean', 'conf', 'public.pem'), `-----BEGIN CERTIFICATE-----
MIICpDCCAYwCCQDkJzAtbfDzOTANBgkqhkiG9w0BAQsFADAUMRIwEAYDVQQDDAls
b2NhbGhvc3QwHhcNMjExMTEzMTcwMjI2WhcNMzAwMTMwMTcwMjI2WjAUMRIwEAYD
VQQDDAlsb2NhbGhvc3QwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCp
f/uwdwVe2Tl+994AxT6b7O6IXoh6AR5/Q2vBppi/GWkLQjq9ySxoc0XMC7QoCsPC
jDyf7G1GD7TtRdJ2mE74PS2ccel9qYRI/KzPgiTerxxWdAwCodfLnJokEUr+Gbnb
Uy+bAe5tNWfKElxRJHX/U4hvI9nbc/fY/ttz9OD4Qs5IhZEr5z04MtYy6pfBYp3E
mAcjWPbMTwTgrRQObHCsQ09ZbYnEz0TlMkO6OUeOyJIijjc0kVT2DilIzTEo5QIi
VM33uUQpuHSnMxqG8VQ3+amlDFLtnkIn3W3DmRjc6gnwFpNeBdnBTIP9Ssx25n4m
cpkj0jbtHg2KXDHnSgT/AgMBAAEwDQYJKoZIhvcNAQELBQADggEBAEgsWKanAi7p
3XevbTqIuv0DXYZ+ciJJD2eyYTPkzXJABb3Ll+G0pbD5zIOpAlf8XBGm0plO5sSs
XxSHY7uQaRXQgVZ3l2rR+qhUon09Z5oeHzmqi3MS/LxmHMcv1+3J3Bsk4SQapJbz
yDvtXx3KovjiRSGlMOeFHuX8MnAfFlndTsWKyAbyVQlYvD5PohRPSjq/Z0ddNhEa
PQOi3rjDiPeUN08Js49OZo0mGDekPmYA9fxtg4hIwjB2GuX9pF49RE2zZxR3c7zx
ItWiOjl5IlU4F4E/VenI/HViuZb22svPeZQPFU0K/3NZthEc9q8fpqH2cK/U2rbk
iN0Y4jlcEAI=
-----END CERTIFICATE-----`);

	}
}
