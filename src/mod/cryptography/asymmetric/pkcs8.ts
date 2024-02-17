import { he } from "../../../../deps.ts";
const td = (d: Uint8Array) => new TextDecoder().decode(d);

export class CryptPkcs8 {
  public static async create() {
    const keyPair = await crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-512",
      },
      true,
      ["encrypt", "decrypt"],
    );

    const exportedPrivateKeyBuffer = await crypto.subtle.exportKey(
      "pkcs8",
      keyPair.privateKey,
    );
    const exportedPublicKeyBuffer = await crypto.subtle.exportKey(
      "spki",
      keyPair.publicKey,
    );
    const privateKey = td(he(new Uint8Array(exportedPrivateKeyBuffer)));
    const pubKey = td(he(new Uint8Array(exportedPublicKeyBuffer)));
    return { "public": pubKey, "private": privateKey };
  }

  public static async sign(privateKey: string, message: string) {
    const key = await crypto.subtle.importKey(
      "pkcs8",
      new TextEncoder().encode(privateKey),
      { name: "RSA-OAEP", hash: "SHA-512" },
      false,
      ["decrypt"],
    );
    const signature = await crypto.subtle.sign(
      { name: "RSA-PSS", saltLength: 32 },
      key,
      new TextEncoder().encode(message),
    );
    return td(he(new Uint8Array(signature)));
  }

  public static async verify(
    publicKey: string,
    message: string,
    signature: string,
  ) {
    const key = await crypto.subtle.importKey(
      "spki",
      new TextEncoder().encode(publicKey),
      { name: "RSA-OAEP", hash: "SHA-512" },
      false,
      ["encrypt"],
    );
    const result = await crypto.subtle.verify(
      { name: "RSA-PSS", saltLength: 32 },
      key,
      new TextEncoder().encode(signature),
      new TextEncoder().encode(message),
    );
    return result;
  }

  public static async encrypt(publicKey: string, message: string) {
    const key = await crypto.subtle.importKey(
      "spki",
      new TextEncoder().encode(publicKey),
      { name: "RSA-OAEP", hash: "SHA-512" },
      false,
      ["encrypt"],
    );
    const encrypted = await crypto.subtle.encrypt(
      { name: "RSA-OAEP" },
      key,
      new TextEncoder().encode(message),
    );
    return td(he(new Uint8Array(encrypted)));
  }

  public static async decrypt(privateKey: string, message: string) {
    const key = await crypto.subtle.importKey(
      "pkcs8",
      new TextEncoder().encode(privateKey),
      { name: "RSA-OAEP", hash: "SHA-512" },
      false,
      ["decrypt"],
    );
    const decrypted = await crypto.subtle.decrypt(
      { name: "RSA-OAEP" },
      key,
      new TextEncoder().encode(message),
    );
    return td(he(new Uint8Array(decrypted)));
  }
}
