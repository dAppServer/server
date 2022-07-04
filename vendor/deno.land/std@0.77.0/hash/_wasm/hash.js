"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Hash_hash, _Hash_digested;
exports.__esModule = true;
exports.Hash = void 0;
var wasm_js_1 = require("./wasm.js");
var hex = require("../../encoding/hex.ts");
var base64 = require("../../encoding/base64.ts");
await (0, wasm_js_1["default"])(wasm_js_1.source);
var TYPE_ERROR_MSG = "hash: `data` is invalid type";
var Hash = (function () {
    function Hash(algorithm) {
        _Hash_hash.set(this, void 0);
        _Hash_digested.set(this, void 0);
        __classPrivateFieldSet(this, _Hash_hash, (0, wasm_js_1.create_hash)(algorithm), "f");
        __classPrivateFieldSet(this, _Hash_digested, false, "f");
    }
    Hash.prototype.update = function (data) {
        var msg;
        if (typeof data === "string") {
            msg = new TextEncoder().encode(data);
        }
        else if (typeof data === "object") {
            if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
                msg = new Uint8Array(data);
            }
            else {
                throw new Error(TYPE_ERROR_MSG);
            }
        }
        else {
            throw new Error(TYPE_ERROR_MSG);
        }
        (0, wasm_js_1.update_hash)(__classPrivateFieldGet(this, _Hash_hash, "f"), msg);
        return this;
    };
    Hash.prototype.digest = function () {
        if (__classPrivateFieldGet(this, _Hash_digested, "f"))
            throw new Error("hash: already digested");
        __classPrivateFieldSet(this, _Hash_digested, true, "f");
        return (0, wasm_js_1.digest_hash)(__classPrivateFieldGet(this, _Hash_hash, "f"));
    };
    Hash.prototype.toString = function (format) {
        if (format === void 0) { format = "hex"; }
        var finalized = new Uint8Array(this.digest());
        switch (format) {
            case "hex":
                return hex.encodeToString(finalized);
            case "base64":
                return base64.encode(finalized);
            default:
                throw new Error("hash: invalid format");
        }
    };
    return Hash;
}());
exports.Hash = Hash;
_Hash_hash = new WeakMap(), _Hash_digested = new WeakMap();
