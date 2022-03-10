import { ProcessManagerRequest } from "./processManagerRequest.ts";
import { ProcessManagerProcess } from "./processManagerProcess.ts";

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
 * 	} as ProcessManagerRequest
 * 	);
 */
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
  static run(command: string, args: any, options: ProcessManagerRequest) {
    if (!args) {
      console.log("No arguments passed to ProcessManager");
      return;
    }

    if (options.key && this.process[options.key]) {
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

    return ProcessManager.addProcess({
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
  private static addProcess(process: ProcessManagerRequest) {
    if (this.process && this.process[process.key]) {
      return this.process[process.key];
    }
    return this.process[process.key] = new ProcessManagerProcess(process);
  }

  /**
   * Returns the process for the key, if we know about it
   *
   * @example ProcessManager.getProcess('letheand.exe')
   * @param {string} key
   * @returns {ProcessManagerProcess}
   */
  public static getProcess(key: string) {
    if (!this.process[key]) {
      throw new Error(`Can't find process ${key}`);
    }
    return this.process[key];
  }

  /**
   * Start a process from its key, e.g executable file name
   *
   * @example ProcessManager.startProcess('letheand.exe')
   * @param {string} key
   */
  public static startProcess(key: string) {
    if (!this.process[key]) {
      throw new Error(`Can't find process ${key}`);
    }
    //@todo ad a feeder to centralised io handling, eg websocket srv
    this.process[key].run();
  }

  /**
   * Stops a process managed by the ProcessManager
   *
   * @example ProcessManager.stopProcess('letheand.exe')
   * @param {string} key
   */
  public static stopProcess(key: string) {
    if (!this.process[key]) {
      throw new Error(`Can't find process ${key}`);
    }

    this.process[key].process.stop();
  }

  /**
   * Sends a force quit to the process
   *
   * @example ProcessManager.killProcess('letheand.exe')
   * @param {string} key
   */
  public static killProcess(key: string) {
    if (!this.process[key]) {
      throw new Error(`Can't find process ${key}`);
    }

    this.process[key].process.kill();
  }
}
