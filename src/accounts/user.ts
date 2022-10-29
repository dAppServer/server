import {  path } from "../../deps.ts";
import { QuasiSalt } from "../services/crypt/quasi-salt.ts";
import { CryptOpenPGP } from "../services/crypt/openpgp.ts";
import { FileSystemService } from "../services/fileSystemService.ts";

export class LetheanAccount {
  static async login(payload: string) {
    try {
      const decrypted = await CryptOpenPGP.decryptPGP(
        "server",
        payload,
        QuasiSalt.hash(path.join(Deno.cwd(), "users", "server.lthn.pub")),
      );

      return await CryptOpenPGP.readSignedMessage(decrypted).then(
        async (data) => {
          const userAuth = JSON.parse(data.text);
          const user = await CryptOpenPGP.verify(data, userAuth["id"]);

          if (
            user && user == await data.getSigningKeyIDs()[0].toHex() &&
            FileSystemService.isFile(`users/${userAuth["id"]}.lthn.key`)
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
  static async create(username: string, password: string) {
    try {
      const usernameHash: string = QuasiSalt.hash(username);

      const { privateKey, publicKey, revocationCertificate }: any =
        await CryptOpenPGP.createKeyPair(usernameHash, password);

      FileSystemService.write(`users/${usernameHash}.lthn.pub`, publicKey);

      FileSystemService.write(
        `users/${usernameHash}.lthn.rev`,
        revocationCertificate,
      );

      FileSystemService.write(`users/${usernameHash}.lthn.key`, privateKey);

      FileSystemService.write(
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

      FileSystemService.delete(`users/${usernameHash}.lthn.pub`);

      FileSystemService.delete(`users/${usernameHash}.lthn.rev`);

      FileSystemService.delete(`users/${usernameHash}.lthn.key`);

      FileSystemService.delete(`users/${usernameHash}.lthn`);
    } catch (error) {
      return false;
    }
    return true;
  }
}
