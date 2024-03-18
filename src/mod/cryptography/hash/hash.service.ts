import { crypto, toHashString, DigestAlgorithm } from "https://deno.land/x/std/crypto/mod.ts";
import { Injectable } from "https://deno.land/x/danet/mod.ts";
@Injectable()
export class HashService {

  hash(input: string, algorithm: DigestAlgorithm = 'SHA-256'): string {
    const hash = crypto.subtle.digestSync(
      algorithm,
      new TextEncoder().encode(input),
    );
    return toHashString(hash);
  }
}
