"use strict";
exports.__esModule = true;
exports.createHash = exports.supportedAlgorithms = void 0;
var hash_ts_1 = require("./_wasm/hash.ts");
exports.supportedAlgorithms = [
    "md2",
    "md4",
    "md5",
    "ripemd160",
    "ripemd320",
    "sha1",
    "sha224",
    "sha256",
    "sha384",
    "sha512",
    "sha3-224",
    "sha3-256",
    "sha3-384",
    "sha3-512",
    "keccak224",
    "keccak256",
    "keccak384",
    "keccak512",
];
function createHash(algorithm) {
    return new hash_ts_1.Hash(algorithm);
}
exports.createHash = createHash;
