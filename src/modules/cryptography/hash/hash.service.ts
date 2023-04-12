import { crypto, toHashString, } from "std/crypto/mod.ts";
import { Injectable } from "danet/mod.ts";
@Injectable()
export class HashService {

  hash(input: string, algorithm: string = 'SHA-256'): string {
    const hash = crypto.subtle.digestSync(
      algorithm,
      new TextEncoder().encode(input + this.createSalt(input)),
    );
    return toHashString(hash);
  }
}
