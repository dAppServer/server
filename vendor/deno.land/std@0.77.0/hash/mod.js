"use strict";
exports.__esModule = true;
exports.createHash = void 0;
var hash_ts_1 = require("./_wasm/hash.ts");
function createHash(algorithm) {
    return new hash_ts_1.Hash(algorithm);
}
exports.createHash = createHash;
