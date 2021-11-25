import {ProcessManagerRequest} from './processManagerRequest.ts';
import EventEmitter from 'https://deno.land/std@0.79.0/node/events.ts';
import {readLines} from 'https://deno.land/std@0.79.0/io/bufio.ts';

/**
 * Interacts with the external binary directly handling its stdIn, stdOut, stdErr
 * its a async event emitter that mimicks NodeJs's event emitter
 *
 */
export class ProcessManagerProcess extends EventEmitter {
	private request;

	public process: any;

	/**
	 *
	 * @param {ProcessManagerRequest} request
	 */
	constructor(request: ProcessManagerRequest) {
		super();
		this.request = request;
	}

	public async run() {
		const processArgs: any = {
			cmd: this.request.command
		};

		// check if we have a stdOut
		if (this.request.stdOut) {
			processArgs['stdout'] = 'piped';
		}
		// check if we have a stdIn
		if (this.request.stdErr) {
			processArgs['stderr'] = 'piped';
		}
		console.log(processArgs);


		const process = Deno.run(processArgs);

		if (this.request.stdOut) {
			//@ts-ignore
			for await (const line of readLines(process.stdout)) {
				if (line.trim()) {
					this.request.stdOut(line);
					super.emit('stdout', line);
				}
			}
		}

		if (this.request.stdErr) {
			//@ts-ignore
			for await (const line of readLines(process.stderr)) {
				if (line.trim()) {
					this.request.stdErr(line);
					super.emit('stderr', line);
				}
			}
		}

		super.emit('end', await this.process.status());
		this.process.close();
		return;
	}
}
