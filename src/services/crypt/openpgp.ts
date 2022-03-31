import { openpgp } from '../../../deps.ts'
import { FilesystemService } from "../filesystem.service.ts";

/**
 * OpenPGP Service
 *
 * @export
 * @class OpenPGPService
 */
export class CryptOpenpgp {

  /**
   *
   * @param {string} id
   * @param {string} data
   * @param {string} passphrase
   * @returns {Promise<string>}
   */
  async encryptPGP(id: string, data: string, passphrase?: string): Promise<string> {
    const key = await this.getPublicKey(id)
    let signingKey = undefined
    if(passphrase){
      signingKey = await this.getPrivateKey(id, passphrase)
    }
    return await openpgp.encrypt({
      message: await openpgp.createMessage({
        text: data
      }),
      encryptionKeys: key, signingKeys: signingKey
    });

  }

  /**
   *
   * @param {string} id
   * @param {string} message
   * @param {string} passphrase
   * @returns {Promise<string>}
   */
  async decryptPGP(id: string, message: string, passphrase?: string): Promise<string> {
    const privateKey = passphrase ? await this.getPrivateKey(id, passphrase) : undefined
    const publicKey = await this.getPublicKey(id)
    const data: any = await openpgp.decrypt({
      message: await this.readMessage(message),
      verificationKeys: publicKey,
      decryptionKeys: privateKey
    })
    try {
      await data['signatures'][0].verified; // throws on invalid signature
      console.log('Signature is valid');
    } catch (e) {
      throw new Error('Signature could not be verified: ' + e.message);
    }
    return data['decrypted']
  }

  /**
   *
   * @param {string} id
   * @param {string} passphrase
   * @returns {Promise<string>}
   */
  async getPrivateKey(id: string, passphrase: string) {

    if (!id) {
      throw new Error('No id provided');
    }

    if (!passphrase) {
      throw new Error('No passphrase provided');
    }

    const privateKey = FilesystemService.read({
      path: `users/${id}.lthn.private.asc`
    });

    if (!privateKey || privateKey.length === 0) {
      throw new Error(`Failed to load private key id: ${id}`);
    }

    return await openpgp.decryptKey({
      privateKey: await openpgp.readPrivateKey({ armoredKey: privateKey }),
      passphrase
    }) as openpgp.PrivateKey;
  }

  /**
   *
   * @param {string} id
   * @returns {Promise<openpgp.PublicKey>}
   */
  async getPublicKey(id: string) {
    if (!id) {
      throw new Error('No id provided');
    }
    const publicKey = FilesystemService.read({
      path: `users/${id}.lthn.public.asc`
    });

    if (!publicKey || publicKey.length === 0) {
      throw new Error(`Failed to load public key id: ${id}`);
    }

    return await openpgp.readKey({ armoredKey: publicKey }) as openpgp.PublicKey;
  }

  /**
   *
   * @param {string} data
   * @returns {Promise<any>}
   */
  async readMessage(data: string) {
    return await openpgp.readMessage({
      armoredMessage: data
    }) as openpgp.Message;
  }


}
