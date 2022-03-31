import { convertUint8ArrayToBase64url } from "./base64/base64url.ts"
import { decodeString as convertHexToUint8Array } from "https://deno.land/std/encoding/hex.ts"
import { hmac } from "https://denopkg.com/chiefbiiko/hmac/mod.ts"

type Algorithm = "none" | "HS256" | "HS512"
type JsonPrimitive = string | number | boolean | null
type JsonObject = { [member: string]: JsonValue }
type JsonArray = JsonValue[]
type JsonValue = JsonPrimitive | JsonObject | JsonArray

interface JwtInput {
  key: string
  header: Jose
  payload?: Payload
}

interface Payload {
  iss?: string
  sub?: string
  aud?: string[] | string
  exp?: number
  nbf?: number
  iat?: number
  jti?: string
  [key: string]: JsonValue | undefined
}

interface Jose {
  alg: Algorithm
  crit?: string[]
  [key: string]: JsonValue | undefined
}

/*
 * Helper function: setExpiration()
 * returns the number of milliseconds since January 1, 1970, 00:00:00 UTC
 */
function setExpiration(exp: number | Date): number {
  return (exp instanceof Date ? exp : new Date(exp)).getTime()
}

function convertHexToBase64url(input: string): string {
  return convertUint8ArrayToBase64url(convertHexToUint8Array(input))
}

function convertStringToBase64url(input: string): string {
  return convertUint8ArrayToBase64url(new TextEncoder().encode(input))
}

function makeSigningInput(header: Jose, payload?: Payload): string {
  return `${convertStringToBase64url(
    JSON.stringify(header)
  )}.${convertStringToBase64url(JSON.stringify(payload || ""))}`
}

function encrypt(alg: Algorithm, key: string, msg: string): string | null {
  function assertNever(alg: never): never {
    throw new RangeError("no matching crypto algorithm in the header: " + alg)
  }
  switch (alg) {
    case "none":
      return null
    case "HS256":
      return hmac("sha256", key, msg, "utf8", "hex") as string
    case "HS512":
      return hmac("sha512", key, msg, "utf8", "hex") as string
    default:
      assertNever(alg)
  }
}

function makeSignature(alg: Algorithm, key: string, input: string): string {
  const encryptionInHex = encrypt(alg, key, input)
  return encryptionInHex ? convertHexToBase64url(encryptionInHex) : ""
}

function makeJwt({ key, header, payload }: JwtInput): string {
  try {
    const signingInput = makeSigningInput(header, payload)
    return `${signingInput}.${makeSignature(header.alg, key, signingInput)}`
  } catch (err) {
    err.message = `Failed to create a JWT: ${err.message}`
    throw err
  }
}

export {
  makeJwt,
  setExpiration,
  makeSignature,
  convertHexToBase64url,
  convertStringToBase64url,
  Payload,
  Jose,
  JwtInput,
  JsonValue,
}
