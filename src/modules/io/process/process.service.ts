import { ProcessManagerRequest } from "/modules/io/process/process.interface.ts";
import { ProcessManagerProcess } from "/modules/io/process/processManagerProcess.ts";
import { Injectable } from "danet/mod.ts";

/**
 * Lethean ProcessManager handles all aspects of running external binaries
 * you need to provide the correct binary for the OS, all other host differences are handled for you
 * @example
 * ProcessManager.run(path.join(homeDir, 'Lethean', 'cli', exeFile),args,
 * {
 * 		key: exeFile,
 * 		stdErr: (stdErr: unknown) => console.log(stdErr),
 * 		stdIn: (stdIn: unknown) => console.log(stdIn),
 * 		stdOut: (stdOut: unknown) => console.log(stdOut)
 * 	} as ProcessInterface
 * 	);
 */
@Injectable()
export class ProcessManager {
  /**
   * Turns on console.log with 1 or 0
   *
   * @type {number}
   * @private
   */
  private static debug = 0;

  /**
   * Keeps record of processes managed by the class
   *
   * @type {{[p: string]: ProcessManagerProcess}}
   * @private
   */
  private static process: { [name: string]: ProcessManagerProcess } = {};

  /**
   * Creates a process record and then starts it...
   * to be expanded as you can do ProcessManager.startProcess('letheand.exe')
   * so starting right away is optional
   *
   * @param {string} command
   * @param args
   * @param {ProcessManagerRequest} options
   * @returns {Promise<void>}
   */
  run(command: string, args: any, options: ProcessManagerRequest) {
    if (!args) {
      console.log("No arguments passed to ProcessManager");
      return;
    }

    if (options.key && ProcessManager.process[options.key]) {
      return this.getProcess(options.key);
    }

    if (ProcessManager.debug) {
      console.log("Arguments passed to ProcessManager:", args);
    }

    const cmdArgs = [command];

    for (const arg in args) {
      if (arg === "igd") {
        continue;
      }
      cmdArgs.push(
        "--" + arg.replace(/([A-Z])/g, (x) => "-" + x.toLowerCase()) +
          (args[arg].length > 1 ? `=${args[arg]}` : ""),
      );
    }

    if (ProcessManager.debug) {
      console.log(
        "ProcessManager processed arguments to these:",
        cmdArgs,
      );
    }

    return this.addProcess({
      key: options.key,
      command: cmdArgs,
      stdIn: options.stdIn,
      stdOut: options.stdOut,
      stdErr: options.stdErr,
    } as ProcessManagerRequest).run();
  }

  /**
   * Adds an external binary to the system so that it can be interacted with
   *
   * @param {ProcessManagerRequest} process
   * @returns {ProcessManagerProcess}
   * @private
   */
  public addProcess(process: ProcessManagerRequest) {
    if (ProcessManager.process && ProcessManager.process[process.key]) {
      return ProcessManager.process[process.key];
    }
    return ProcessManager.process[process.key] = new ProcessManagerProcess(process);
  }

  /**
   * Returns the process for the key, if we know about it
   *
   * @example ProcessManager.getProcess('letheand.exe')
   * @param {string} key
   * @returns {ProcessManagerProcess}
   */
  public getProcess(key: string) {
    if (!ProcessManager.process[key]) {
      throw new Error(`Can't find process ${key}`);
    }
    return ProcessManager.process[key];
  }

  /**
   * Start a process from its key, e.g executable file name
   *
   * @example ProcessManager.startProcess('letheand.exe')
   * @param {string} key
   */
  public startProcess(key: string) {
    if (!ProcessManager.process[key]) {
      throw new Error(`Can't find process ${key}`);
    }
    //@todo ad a feeder to centralised io handling, eg websocket srv
    ProcessManager.process[key].run().catch(console.error);
  }

  /**
   * Stops a process managed by the ProcessManager
   *
   * @example ProcessManager.stopProcess('letheand.exe')
   * @param {string} key
   */
  public stopProcess(key: string) {
    if (!ProcessManager.process[key]) {
      throw new Error(`Can't find process ${key}`);
    }

    ProcessManager.process[key].process.stop();
  }

  /**
   * Sends a force quit to the process
   *
   * @example ProcessManager.killProcess('letheand.exe')
   * @param {string} key
   */
  public killProcess(key: string) {
    if (!ProcessManager.process[key]) {
      throw new Error(`Can't find process ${key}`);
    }

    ProcessManager.process[key].process.kill();
  }
}
