import { LetheanCli } from "../lethean-cli.ts";

export class ServerService {
  constructor() {}

  async warmUpServer() {
    await LetheanCli.init();
  }

  async processStartCommand() {
    try {
      let args = ["--help"];
      if (Deno.args.length) {
        args = Deno.args;
        console.log(`Command to run: ${args.join(" ")}`);
      } else {
        console.log("No arguments passed, showing help");
      }
      await LetheanCli.run(args);
    } catch (error) {
      console.error(error.message);
      Deno.exit(2);
    }
  }
}
