import { Command, he, path } from "../../deps.ts";
import { QuasiSalt } from "../services/crypt/quasi-salt.ts";
import { CryptOpenPGP } from "../services/crypt/openpgp.ts";
import { FilesystemService } from "../services/filesystem.service.ts";
const td = (d: Uint8Array) => new TextDecoder().decode(d);

export class LetheanAccount {
  static async login(payload: string) {
    const decrypted = await CryptOpenPGP.decryptPGP(
      "server",
      payload,
      QuasiSalt.hash(path.join(Deno.cwd(), "users", "server.lthn.pub")),
    );
    // console.log(decrypted);
    return JSON.parse(decrypted);
  }

  /**
   * creates a Lethean user account
   */
  static async create(username: string, password: string) {
    try {
      const usernameHash: string = QuasiSalt.hash(username);

      const { privateKey, publicKey, revocationCertificate }: any =
        await CryptOpenPGP.createKeyPair(usernameHash, password);

      FilesystemService.write(`users/${usernameHash}.lthn.pub`, publicKey);

      FilesystemService.write(
        `users/${usernameHash}.lthn.rev`,
        revocationCertificate,
      );

      FilesystemService.write(`users/${usernameHash}.lthn.key`, privateKey);

      FilesystemService.write(
        `users/${usernameHash}.lthn`,
        await CryptOpenPGP.encryptPGP(
          usernameHash,
          JSON.stringify({
            username: username,
            id: usernameHash,
            created: Date.now(),
          }),
        ),
      );
    } catch (error) {
      return false;
    }
    return true;
  }

  /**
   * deletes a Lethean user account
   */
  static delete(username: string) {
    try {
      // because someone will do this, we all know it, and it will suck for them
      // if you delete the server .key, all joining data will be lost forever.
      // user data is stored with their key, so if this happens, you will have to
      // re-create the server from scratch and re-join the network, you'll have a bad day.
      if (username == "server") {
        return false;
      }
      const usernameHash: string = QuasiSalt.hash(username);

      FilesystemService.delete(`users/${usernameHash}.lthn.pub`);

      FilesystemService.delete(`users/${usernameHash}.lthn.rev`);

      FilesystemService.delete(`users/${usernameHash}.lthn.key`);

      FilesystemService.delete(`users/${usernameHash}.lthn`);
    } catch (error) {
      return false;
    }
    return true;
  }

  public static config() {
    return new Command().description("Lethean Account Management")
      .command("create", "Create an keypair")
      .action((args) =>
        console.log(
          JSON.stringify(LetheanAccount.create(args.username, args.password)),
        )
      );
  }
}
