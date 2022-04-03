import { openpgp, path } from "../../../deps.ts";
import { FileSystemService } from "../fileSystemService.ts";
import { QuasiSalt } from "../crypt/quasi-salt.ts";

/**
 * OpenPGP Service
 *
 * @export
 * @class OpenPGPService
 */
export class CryptOpenPGP {
  /**
   * @param {string} id
   * @param {string} data
   * @param {string} passphrase
   * @returns {Promise<string>}
   */
  static async encryptPGP(
    id: string,
    data: string,
    passphrase?: string,
  ): Promise<string> {
    const key = await this.getPublicKey(id);
    let signingKey = undefined;
    if (passphrase) {
      signingKey = await this.getPrivateKey(id, passphrase);
    }
    return await openpgp.encrypt({
      message: await openpgp.createMessage({
        text: data,
      }),
      encryptionKeys: key,
    });
  }

  /**
   * @param {string} id
   * @param {string} message
   * @param {string} passphrase
   * @param signedBy
   * @returns {Promise<string>}
   */
  static async decryptPGP(
    id: string,
    message: string,
    passphrase: string,
    signedBy?: string,
  ): Promise<string> {
    if (!id) {
      throw new Error("No id provided");
    }
    if (!message) {
      throw new Error("No message to decrypt");
    }

    if (!passphrase) {
      throw new Error("No passphrase provided");
    }
    const privateKey = await this.getPrivateKey(id, passphrase);

    let options: any = {
      message: await this.readMessage(message),
      decryptionKeys: privateKey,
    };
    if (signedBy) {
      options["verificationKeys"] = await this.getPublicKey(id);
    }

    const data: any = await openpgp.decrypt(options);

    try {
      if (
        signedBy && data["signatures"].length > 0 &&
        data["signatures"][0].verified
      ) {
        await data["signatures"][0].verified;
      }
    } catch (e) {
      throw new Error("Signature could not be verified: " + e.message);
    }

    return data["data"];
  }

  /**
   * @param {string} id
   * @param {string} passphrase
   * @returns {Promise<string>}
   */
  static async getPrivateKey(id: string, passphrase: string) {
    if (!id) {
      throw new Error("No id provided");
    }

    if (!passphrase) {
      throw new Error("No passphrase provided");
    }

    const privateKey = FileSystemService.read(`users/${id}.lthn.key`);

    if (!privateKey || privateKey.length === 0) {
      throw new Error(`Failed to load private key id: ${id}`);
    }

    return await openpgp.decryptKey({
      privateKey: await openpgp.readPrivateKey({ armoredKey: privateKey }),
      passphrase,
    }) as openpgp.PrivateKey;
  }

  /**
   * @param {string} id
   * @returns {Promise<openpgp.PublicKey>}
   */
  static async getPublicKey(id: string) {
    if (!id) {
      throw new Error("No id provided");
    }
    const publicKey = FileSystemService.read( `users/${id}.lthn.pub`);

    if (!publicKey || publicKey.length === 0) {
      throw new Error(`Failed to load public key id: ${id}`);
    }

    return await openpgp.readKey({
      armoredKey: publicKey,
    }) as openpgp.PublicKey;
  }

  /**
   * @param {string} data
   * @returns {Promise<any>}
   */
  static async readMessage(data: string) {
    return await openpgp.readMessage({
      armoredMessage: data,
    }) as openpgp.Message;
  }

  /**
   * Creates an Armoured OpenPGP key for the username protected with the password supplied
   *
   * @param username
   * @param password
   * @returns {Promise<any>}
   */
  public static async createKeyPair(username: string, password: string) {
    return await openpgp.generateKey({
      type: "rsa", // Type of the key, defaults to ECC
      rsaBits: 4096,
      userIDs: [{ name: username }], // you can pass multiple user IDs
      passphrase: password, // protects the private key
      format: "armored", // output key format, defaults to 'armored' (other options: 'binary' or 'object')
    });
  }

  /**
   * @param {string} id
   * @param {string} passphrase
   * @returns {Promise<string>}
   */
  public static async createServerKeyPair() {
    const { privateKey, publicKey, revocationCertificate }: any =
      await CryptOpenPGP.createKeyPair(
        "server",
        QuasiSalt.hash(path.join(Deno.cwd(), "users", "server.lthn.pub")),
      );

    FileSystemService.write(`users/server.lthn.pub`, publicKey);

    FileSystemService.write(`users/server.lthn.rev`, revocationCertificate);

    FileSystemService.write(`users/server.lthn.key`, privateKey);
  }
}
