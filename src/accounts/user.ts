import { he, Command } from '../../deps.ts'
import { QuasiSalt } from "../services/crypt/quasi-salt.ts";
import { CryptOpenPGP } from "../services/crypt/openpgp.ts";
import { FilesystemService } from "../services/filesystem.service.ts";
const td = (d: Uint8Array) => new TextDecoder().decode(d);

export class LetheanAccount {


  /**
   * creates a Lethean user account
   */
  static async create(username: string, password: string) {
    try {

      const usernameHash: string = QuasiSalt.hash(username);

      const { privateKey, publicKey, revocationCertificate }: any = await CryptOpenPGP.createKeyPair(usernameHash, password)

      FilesystemService.write(`users/${usernameHash}.lthn.pub`, publicKey)

      FilesystemService.write(`users/${usernameHash}.lthn.rev`, revocationCertificate)

      FilesystemService.write(`users/${usernameHash}.lthn.key`, privateKey)

      FilesystemService.write(
        `users/${usernameHash}.lthn`,
        await CryptOpenPGP.encryptPGP(
          usernameHash,
          JSON.stringify({
            username: username,
            id: usernameHash,
            created: Date.now()
          })
        )
      );
    } catch (error) {
      return false
    }
    return true;

  }

  public static config() {
    return new Command().description("Lethean Account Management")
      .command("create", "Create an keypair")
      .action((args) => console.log(JSON.stringify(LetheanAccount.create(args.username, args.password))))
  }
}
