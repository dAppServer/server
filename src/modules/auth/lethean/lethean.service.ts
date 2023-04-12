import { path } from "/deps.ts";
import { Injectable } from "danet/mod.ts";
import { OpenPGPService } from "/modules/cryptography/openpgp/openpgp.service.ts";
import { FileSystemService } from "/modules/io/filesystem/fileSystemService.ts";
import { QuasiSaltService } from "/modules/cryptography/hash/quasi-salt.service.ts";

@Injectable()
export class AuthLetheanService {

  constructor(private fileService: FileSystemService,
              private openpgp: OpenPGPService,
              private quasi: QuasiSaltService) {}
  async login(payload: string) {
    try {
      const decrypted = await this.openpgp.decryptPGP(
        "server",
        payload,
        this.quasi.hash(path.join(Deno.cwd(), "users", "server.lthn.pub")),
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
      const usernameHash: string = this.quasi.hash(username);

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
      const usernameHash: string = this.quasi.hash(username);

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
