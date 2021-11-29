import os from 'https://deno.land/x/dos@v0.11.0/mod.ts';
import * as path from 'https://deno.land/std/path/mod.ts';
import {Command} from 'https://deno.land/x/cliffy/command/mod.ts';
import {StringResponse} from '../../interfaces/string-response.ts';


export class VPNClient {

	public static config() {
		const home = os.homeDir();

		return new Command()
			.description('VPN Client')
			.command('start', 'Start chain daemon')
			.option('--authid <string>', 'Authentication ID. Use "random" to generate.')
			.option('--uniqueid <string>', 'Unique ID of proxy. Use "random" to generate.')
			.option('--stunnel-port <string>', 'Use this stunnel local port for connections over proxy.')
			.option('--outbound-proxy-host <string>', 'Use this https proxy host.')
			.option('--outbound-proxy-port <number>', 'Use this https proxy port.', {default: 3128})
			.option('--proxy-port <number>', 'Use this port as local bind port for proxy.', {default: 8180})
			.option('--proxy-bind <string>', 'Use this host as local bind for proxy.', {default: '127.0.0.1'})
			.option('--connect-timeout <number>', 'Timeout for connect to service.', {default: 30})
			.option('--payment-timeout <number>', 'Timeout for payment to service.', {default: 1200})
			.option('--exit-on-no-payment <boolean>', 'Exit after payment is gone.')
			.option('--fork-on-connect <boolean>', 'Fork after successful paid connection. Client will fork into background.')
			.option('--vpnc-tun <string>', 'Use specific tun device for client', {default: 'tun1'})
			.option('--vpnc-mgmt-port <number>', 'Use specific port for local Openvpn mgmt', {default: 11193})
			.option('--proxyc-mgmt-port <number>', 'Use specific port for local Haproxy mgmt', {default: 11194})
			.option('--proxyc-ssl-noverify <boolean>', 'Do not verify SSL certificate of remote proxy. Dangerous, use only if you know what you are doing!')
			.option('--vpnc-block-route <boolean>', 'Filter router changes from server')
			.option('--vpnc-block-dns <boolean>', 'Filter router DNS server from server')
			.option('--data-dir <string>', 'Specify data directory', {default: path.join(home ? home : '/', 'Lethean', 'data')})

			.action((args) => {


				if (Deno.env.get('REST')) {
					throw new StringResponse('Started');
				}
			})
			;
	}
}
