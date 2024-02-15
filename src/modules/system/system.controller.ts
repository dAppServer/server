import { Get, Controller, Logger } from "danet/mod.ts";
import { Tag } from "danetSwagger/decorators.ts";
import { ClientService } from "@module/io/file/local/client.service.ts";
import { OpenPGPService } from "@module/cryptography/openpgp/openpgp.service.ts";
import { QuasiSaltService } from "@module/cryptography/hash/quasi-salt.service.ts";

@Tag("System")
@Controller("system")
export class SystemController {

  constructor(private fileService: ClientService,
              private openpgp: OpenPGPService,
              private quasi: QuasiSaltService) {}
  private logger: Logger = new Logger('LetheanServer');
  @Get("check")
  async checkServer(): Promise<string> {
    try {

      this.logger.log(`[SERVER] Dir: ${Deno.cwd()}`)
      // check the base folders exsists, can be done better later
      if (!this.fileService.isDir('wallets')) {
        this.fileService.ensureDir('wallets')
      }
      if (!this.fileService.isDir('apps')) {
        this.fileService.ensureDir('apps')
      }
      if (!this.fileService.isDir('conf')) {
        this.fileService.ensureDir('conf')
      }
      if (!this.fileService.isDir('cli')) {
        this.fileService.ensureDir('cli')
      }
      if (!this.fileService.isDir('data')) {
        this.fileService.ensureDir('data')
      }

      if (Deno.env.get("LETHEAN_SECURITY_CHECK") === "false") {
        this.logger.log("[SERVER] Security check disabled");
      }
      // create OpenPGP keypair if non found for the installed path
      if (!this.fileService.isFile("users/server.lthn.pub")) {
        this.logger.log("[SECURITY] Missing Server keypair, Generating...");
        await this.openpgp.createServerKeyPair();
      }

      if (!this.fileService.isFile("users/server.lthn.key")) {
        this.logger.error("Missing Server private key, Exiting...");
        Deno.exit(1);
      }

      if (!this.fileService.isFile("users/server.lthn.pub")) {
        this.logger.error("Missing Server public key, Exiting...");
        Deno.exit(1);
      }
      // check to see if we are able to unlock the private key for the paths OpenPGP key
      if (
        this.fileService.isFile("users/server.lthn.pub")
      ) {
        this.logger.log("[SERVER] Server.pub found, checking password");
        const password = this.quasi.hash(
          this.fileService.path("users/server.lthn.pub")
        );

        if (await this.openpgp.getPrivateKey("server", password)) {
          this.logger.log("[SERVER] Keypair unlocked OK");
        } else {
          this.logger.error("[SERVER] Server.pub not found");
          Deno.exit(1);
        }
      } else {
        this.logger.error("[SERVER] Server.pub not found");
        Deno.exit(1);
      }


    } catch (error) {
      this.logger.error(error.toString());
      this.logger.error("[SECURITY] Failed to ensure safe environment, shutting down...");
      Deno.exit(1);
    }

    return "System OK";

  }

  @Get('cert')
  getServerCertificate() {
    return this.fileService.read("users/server.lthn.pub");
  }
}
