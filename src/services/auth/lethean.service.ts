import { Injectable, path } from "../../../deps.ts";
import { QuasiSalt } from "../crypt/quasi-salt.ts";
import { OpenPGPService } from "../crypt/openpgp.ts";
import { FileSystemService } from "../fileSystemService.ts";

@Injectable()
export class AuthLetheanService {

  constructor(private fileService: FileSystemService, private openpgp: OpenPGPService) {}
  async login(payload: string) {
    try {
      const decrypted = await this.openpgp.decryptPGP(
        "server",
        payload,
        QuasiSalt.hash(path.join(Deno.cwd(), "users", "server.lthn.pub")),
      );

      return await this.openpgp.readSignedMessage(decrypted).then(
        async (data) => {
          const userAuth = JSON.parse(data.text);
          const user = await this.openpgp.verify(data, userAuth["id"]);

          if (
            user && user == await data.getSigningKeyIDs()[0].toHex() &&
            this.fileService.isFile(`users/${userAuth["id"]}.lthn.key`)
          ) {
            return userAuth["id"];
          }
          return false;
        },
      );
    } catch (error) {
      return false;
    }
  }

  /**
   * creates a Lethean user account
   */
  async create(username: string, password: string) {
    try {
      const usernameHash: string = QuasiSalt.hash(username);

      const { privateKey, publicKey, revocationCertificate }: any =
        await this.openpgp.createKeyPair(usernameHash, password);

      this.fileService.write(`users/${usernameHash}.lthn.pub`, publicKey);

      this.fileService.write(
        `users/${usernameHash}.lthn.rev`,
        revocationCertificate,
      );

      this.fileService.write(`users/${usernameHash}.lthn.key`, privateKey);

      this.fileService.write(
        `users/${usernameHash}.lthn`,
        await this.openpgp.encryptPGP(
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
  delete(username: string) {
    try {
      // because someone will do this, we all know it, and it will suck for them
      // if you delete the server .key, all joining data will be lost forever.
      // user data is stored with their key, so if this happens, you will have to
      // re-create the server from scratch and re-join the network, you'll have a bad day.
      if (username == "server") {
        return false;
      }
      const usernameHash: string = QuasiSalt.hash(username);

      this.fileService.delete(`users/${usernameHash}.lthn.pub`);

      this.fileService.delete(`users/${usernameHash}.lthn.rev`);

      this.fileService.delete(`users/${usernameHash}.lthn.key`);

      this.fileService.delete(`users/${usernameHash}.lthn`);
    } catch (error) {
      return false;
    }
    return true;
  }
}
