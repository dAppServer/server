import {readLines} from 'https://deno.land/std@0.79.0/io/bufio.ts';
import EventEmitter from 'https://deno.land/std@0.79.0/node/events.ts';

export interface ProcessManagerRequest {
	key: string;
	command: [];
	stdOut: any;
	stdIn: any;
	stdErr: any;
}

export class ProcessManagerProcess extends EventEmitter {
	private request;

	public process: any;

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
		console.log(processArgs)


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

/**
 * @example
 * ProcessManager.run(path.join(homeDir, 'Lethean', 'cli', exeFile),args,
 * {
 * 		key: exeFile,
 * 		stdErr: (stdErr: unknown) => console.log(stdErr),
 * 		stdIn: (stdIn: unknown) => console.log(stdIn),
 * 		stdOut: (stdOut: unknown) => console.log(stdOut)
 * 	} as ProcessManagerRequest
 * 	);
 */
export class ProcessManager {
	private static debug = 1;
	private static process: { [name: string]: ProcessManagerProcess } = {};

	static run(command: string, args: any, options: ProcessManagerRequest) {
		if (!args) {
			console.log('No arguments passed to ProcessManager');
			return;
		}

		if (ProcessManager.debug) {
			console.log('Arguments passed to ProcessManager:', args);
		}

		const cmdArgs = [command];

		for (const arg in args) {
			if (arg === 'igd') {
				continue;
			}
			cmdArgs.push(
				'--' + arg.replace(/([A-Z])/g, (x) => '-' + x.toLowerCase()) + (args[arg].length > 1 ? `=${args[arg]}` : '')
			);
		}

		if (ProcessManager.debug) {
			console.log('ProcessManager processed arguments to these:', cmdArgs);
		}

		return ProcessManager.addProcess({
			key: options.key,
			command: cmdArgs,
			stdIn: options.stdIn,
			stdOut: options.stdOut,
			stdErr: options.stdErr
		} as ProcessManagerRequest).run();
	}

	private static addProcess(process: ProcessManagerRequest) {
		if (this.process && this.process[process.key]) {
			return this.process[process.key];
		}
		return this.process[process.key] = new ProcessManagerProcess(process);
	}

	public static getProcess(key: string) {
		if (!this.process[key]) {
			throw new Error(`Can't find process ${key}`);
		}
		return this.process[key]
	}


	public static startProcess(key: string) {
		if (!this.process[key]) {
			throw new Error(`Can't find process ${key}`);
		}
//@todo ad a feeder to centralised io handling, eg websocket srv
		this.process[key].run()
	}

	public static stopProcess(key: string) {
		if (!this.process[key]) {
			throw new Error(`Can't find process ${key}`);
		}

		this.process[key].process.stop()
	}

	public static killProcess(key: string) {
		if (!this.process[key]) {
			throw new Error(`Can't find process ${key}`);
		}

		this.process[key].process.kill()
	}
}
