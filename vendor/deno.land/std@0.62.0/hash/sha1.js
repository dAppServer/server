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
var _Sha1_blocks, _Sha1_block, _Sha1_start, _Sha1_bytes, _Sha1_hBytes, _Sha1_finalized, _Sha1_hashed, _Sha1_h0, _Sha1_h1, _Sha1_h2, _Sha1_h3, _Sha1_h4, _Sha1_lastByteIndex;
exports.__esModule = true;
exports.Sha1 = void 0;
var HEX_CHARS = "0123456789abcdef".split("");
var EXTRA = [-2147483648, 8388608, 32768, 128];
var SHIFT = [24, 16, 8, 0];
var blocks = [];
var Sha1 = (function () {
    function Sha1(sharedMemory) {
        if (sharedMemory === void 0) { sharedMemory = false; }
        _Sha1_blocks.set(this, void 0);
        _Sha1_block.set(this, void 0);
        _Sha1_start.set(this, void 0);
        _Sha1_bytes.set(this, void 0);
        _Sha1_hBytes.set(this, void 0);
        _Sha1_finalized.set(this, void 0);
        _Sha1_hashed.set(this, void 0);
        _Sha1_h0.set(this, 0x67452301);
        _Sha1_h1.set(this, 0xefcdab89);
        _Sha1_h2.set(this, 0x98badcfe);
        _Sha1_h3.set(this, 0x10325476);
        _Sha1_h4.set(this, 0xc3d2e1f0);
        _Sha1_lastByteIndex.set(this, 0);
        if (sharedMemory) {
            blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
            __classPrivateFieldSet(this, _Sha1_blocks, blocks, "f");
        }
        else {
            __classPrivateFieldSet(this, _Sha1_blocks, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "f");
        }
        __classPrivateFieldSet(this, _Sha1_h0, 0x67452301, "f");
        __classPrivateFieldSet(this, _Sha1_h1, 0xefcdab89, "f");
        __classPrivateFieldSet(this, _Sha1_h2, 0x98badcfe, "f");
        __classPrivateFieldSet(this, _Sha1_h3, 0x10325476, "f");
        __classPrivateFieldSet(this, _Sha1_h4, 0xc3d2e1f0, "f");
        __classPrivateFieldSet(this, _Sha1_block, __classPrivateFieldSet(this, _Sha1_start, __classPrivateFieldSet(this, _Sha1_bytes, __classPrivateFieldSet(this, _Sha1_hBytes, 0, "f"), "f"), "f"), "f");
        __classPrivateFieldSet(this, _Sha1_finalized, __classPrivateFieldSet(this, _Sha1_hashed, false, "f"), "f");
    }
    Sha1.prototype.update = function (message) {
        if (__classPrivateFieldGet(this, _Sha1_finalized, "f")) {
            return this;
        }
        var msg;
        if (message instanceof ArrayBuffer) {
            msg = new Uint8Array(message);
        }
        else {
            msg = message;
        }
        var index = 0;
        var length = msg.length;
        var blocks = __classPrivateFieldGet(this, _Sha1_blocks, "f");
        while (index < length) {
            var i = void 0;
            if (__classPrivateFieldGet(this, _Sha1_hashed, "f")) {
                __classPrivateFieldSet(this, _Sha1_hashed, false, "f");
                blocks[0] = __classPrivateFieldGet(this, _Sha1_block, "f");
                blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
            }
            if (typeof msg !== "string") {
                for (i = __classPrivateFieldGet(this, _Sha1_start, "f"); index < length && i < 64; ++index) {
                    blocks[i >> 2] |= msg[index] << SHIFT[i++ & 3];
                }
            }
            else {
                for (i = __classPrivateFieldGet(this, _Sha1_start, "f"); index < length && i < 64; ++index) {
                    var code = msg.charCodeAt(index);
                    if (code < 0x80) {
                        blocks[i >> 2] |= code << SHIFT[i++ & 3];
                    }
                    else if (code < 0x800) {
                        blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
                        blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
                    }
                    else if (code < 0xd800 || code >= 0xe000) {
                        blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
                        blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
                        blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
                    }
                    else {
                        code = 0x10000 +
                            (((code & 0x3ff) << 10) | (msg.charCodeAt(++index) & 0x3ff));
                        blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
                        blocks[i >> 2] |= (0x80 | ((code >> 12) & 0x3f)) << SHIFT[i++ & 3];
                        blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
                        blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
                    }
                }
            }
            __classPrivateFieldSet(this, _Sha1_lastByteIndex, i, "f");
            __classPrivateFieldSet(this, _Sha1_bytes, __classPrivateFieldGet(this, _Sha1_bytes, "f") + (i - __classPrivateFieldGet(this, _Sha1_start, "f")), "f");
            if (i >= 64) {
                __classPrivateFieldSet(this, _Sha1_block, blocks[16], "f");
                __classPrivateFieldSet(this, _Sha1_start, i - 64, "f");
                this.hash();
                __classPrivateFieldSet(this, _Sha1_hashed, true, "f");
            }
            else {
                __classPrivateFieldSet(this, _Sha1_start, i, "f");
            }
        }
        if (__classPrivateFieldGet(this, _Sha1_bytes, "f") > 4294967295) {
            __classPrivateFieldSet(this, _Sha1_hBytes, __classPrivateFieldGet(this, _Sha1_hBytes, "f") + ((__classPrivateFieldGet(this, _Sha1_bytes, "f") / 4294967296) >>> 0), "f");
            __classPrivateFieldSet(this, _Sha1_bytes, __classPrivateFieldGet(this, _Sha1_bytes, "f") >>> 0, "f");
        }
        return this;
    };
    Sha1.prototype.finalize = function () {
        if (__classPrivateFieldGet(this, _Sha1_finalized, "f")) {
            return;
        }
        __classPrivateFieldSet(this, _Sha1_finalized, true, "f");
        var blocks = __classPrivateFieldGet(this, _Sha1_blocks, "f");
        var i = __classPrivateFieldGet(this, _Sha1_lastByteIndex, "f");
        blocks[16] = __classPrivateFieldGet(this, _Sha1_block, "f");
        blocks[i >> 2] |= EXTRA[i & 3];
        __classPrivateFieldSet(this, _Sha1_block, blocks[16], "f");
        if (i >= 56) {
            if (!__classPrivateFieldGet(this, _Sha1_hashed, "f")) {
                this.hash();
            }
            blocks[0] = __classPrivateFieldGet(this, _Sha1_block, "f");
            blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
        }
        blocks[14] = (__classPrivateFieldGet(this, _Sha1_hBytes, "f") << 3) | (__classPrivateFieldGet(this, _Sha1_bytes, "f") >>> 29);
        blocks[15] = __classPrivateFieldGet(this, _Sha1_bytes, "f") << 3;
        this.hash();
    };
    Sha1.prototype.hash = function () {
        var a = __classPrivateFieldGet(this, _Sha1_h0, "f");
        var b = __classPrivateFieldGet(this, _Sha1_h1, "f");
        var c = __classPrivateFieldGet(this, _Sha1_h2, "f");
        var d = __classPrivateFieldGet(this, _Sha1_h3, "f");
        var e = __classPrivateFieldGet(this, _Sha1_h4, "f");
        var f;
        var j;
        var t;
        var blocks = __classPrivateFieldGet(this, _Sha1_blocks, "f");
        for (j = 16; j < 80; ++j) {
            t = blocks[j - 3] ^ blocks[j - 8] ^ blocks[j - 14] ^ blocks[j - 16];
            blocks[j] = (t << 1) | (t >>> 31);
        }
        for (j = 0; j < 20; j += 5) {
            f = (b & c) | (~b & d);
            t = (a << 5) | (a >>> 27);
            e = (t + f + e + 1518500249 + blocks[j]) >>> 0;
            b = (b << 30) | (b >>> 2);
            f = (a & b) | (~a & c);
            t = (e << 5) | (e >>> 27);
            d = (t + f + d + 1518500249 + blocks[j + 1]) >>> 0;
            a = (a << 30) | (a >>> 2);
            f = (e & a) | (~e & b);
            t = (d << 5) | (d >>> 27);
            c = (t + f + c + 1518500249 + blocks[j + 2]) >>> 0;
            e = (e << 30) | (e >>> 2);
            f = (d & e) | (~d & a);
            t = (c << 5) | (c >>> 27);
            b = (t + f + b + 1518500249 + blocks[j + 3]) >>> 0;
            d = (d << 30) | (d >>> 2);
            f = (c & d) | (~c & e);
            t = (b << 5) | (b >>> 27);
            a = (t + f + a + 1518500249 + blocks[j + 4]) >>> 0;
            c = (c << 30) | (c >>> 2);
        }
        for (; j < 40; j += 5) {
            f = b ^ c ^ d;
            t = (a << 5) | (a >>> 27);
            e = (t + f + e + 1859775393 + blocks[j]) >>> 0;
            b = (b << 30) | (b >>> 2);
            f = a ^ b ^ c;
            t = (e << 5) | (e >>> 27);
            d = (t + f + d + 1859775393 + blocks[j + 1]) >>> 0;
            a = (a << 30) | (a >>> 2);
            f = e ^ a ^ b;
            t = (d << 5) | (d >>> 27);
            c = (t + f + c + 1859775393 + blocks[j + 2]) >>> 0;
            e = (e << 30) | (e >>> 2);
            f = d ^ e ^ a;
            t = (c << 5) | (c >>> 27);
            b = (t + f + b + 1859775393 + blocks[j + 3]) >>> 0;
            d = (d << 30) | (d >>> 2);
            f = c ^ d ^ e;
            t = (b << 5) | (b >>> 27);
            a = (t + f + a + 1859775393 + blocks[j + 4]) >>> 0;
            c = (c << 30) | (c >>> 2);
        }
        for (; j < 60; j += 5) {
            f = (b & c) | (b & d) | (c & d);
            t = (a << 5) | (a >>> 27);
            e = (t + f + e - 1894007588 + blocks[j]) >>> 0;
            b = (b << 30) | (b >>> 2);
            f = (a & b) | (a & c) | (b & c);
            t = (e << 5) | (e >>> 27);
            d = (t + f + d - 1894007588 + blocks[j + 1]) >>> 0;
            a = (a << 30) | (a >>> 2);
            f = (e & a) | (e & b) | (a & b);
            t = (d << 5) | (d >>> 27);
            c = (t + f + c - 1894007588 + blocks[j + 2]) >>> 0;
            e = (e << 30) | (e >>> 2);
            f = (d & e) | (d & a) | (e & a);
            t = (c << 5) | (c >>> 27);
            b = (t + f + b - 1894007588 + blocks[j + 3]) >>> 0;
            d = (d << 30) | (d >>> 2);
            f = (c & d) | (c & e) | (d & e);
            t = (b << 5) | (b >>> 27);
            a = (t + f + a - 1894007588 + blocks[j + 4]) >>> 0;
            c = (c << 30) | (c >>> 2);
        }
        for (; j < 80; j += 5) {
            f = b ^ c ^ d;
            t = (a << 5) | (a >>> 27);
            e = (t + f + e - 899497514 + blocks[j]) >>> 0;
            b = (b << 30) | (b >>> 2);
            f = a ^ b ^ c;
            t = (e << 5) | (e >>> 27);
            d = (t + f + d - 899497514 + blocks[j + 1]) >>> 0;
            a = (a << 30) | (a >>> 2);
            f = e ^ a ^ b;
            t = (d << 5) | (d >>> 27);
            c = (t + f + c - 899497514 + blocks[j + 2]) >>> 0;
            e = (e << 30) | (e >>> 2);
            f = d ^ e ^ a;
            t = (c << 5) | (c >>> 27);
            b = (t + f + b - 899497514 + blocks[j + 3]) >>> 0;
            d = (d << 30) | (d >>> 2);
            f = c ^ d ^ e;
            t = (b << 5) | (b >>> 27);
            a = (t + f + a - 899497514 + blocks[j + 4]) >>> 0;
            c = (c << 30) | (c >>> 2);
        }
        __classPrivateFieldSet(this, _Sha1_h0, (__classPrivateFieldGet(this, _Sha1_h0, "f") + a) >>> 0, "f");
        __classPrivateFieldSet(this, _Sha1_h1, (__classPrivateFieldGet(this, _Sha1_h1, "f") + b) >>> 0, "f");
        __classPrivateFieldSet(this, _Sha1_h2, (__classPrivateFieldGet(this, _Sha1_h2, "f") + c) >>> 0, "f");
        __classPrivateFieldSet(this, _Sha1_h3, (__classPrivateFieldGet(this, _Sha1_h3, "f") + d) >>> 0, "f");
        __classPrivateFieldSet(this, _Sha1_h4, (__classPrivateFieldGet(this, _Sha1_h4, "f") + e) >>> 0, "f");
    };
    Sha1.prototype.hex = function () {
        this.finalize();
        var h0 = __classPrivateFieldGet(this, _Sha1_h0, "f");
        var h1 = __classPrivateFieldGet(this, _Sha1_h1, "f");
        var h2 = __classPrivateFieldGet(this, _Sha1_h2, "f");
        var h3 = __classPrivateFieldGet(this, _Sha1_h3, "f");
        var h4 = __classPrivateFieldGet(this, _Sha1_h4, "f");
        return (HEX_CHARS[(h0 >> 28) & 0x0f] +
            HEX_CHARS[(h0 >> 24) & 0x0f] +
            HEX_CHARS[(h0 >> 20) & 0x0f] +
            HEX_CHARS[(h0 >> 16) & 0x0f] +
            HEX_CHARS[(h0 >> 12) & 0x0f] +
            HEX_CHARS[(h0 >> 8) & 0x0f] +
            HEX_CHARS[(h0 >> 4) & 0x0f] +
            HEX_CHARS[h0 & 0x0f] +
            HEX_CHARS[(h1 >> 28) & 0x0f] +
            HEX_CHARS[(h1 >> 24) & 0x0f] +
            HEX_CHARS[(h1 >> 20) & 0x0f] +
            HEX_CHARS[(h1 >> 16) & 0x0f] +
            HEX_CHARS[(h1 >> 12) & 0x0f] +
            HEX_CHARS[(h1 >> 8) & 0x0f] +
            HEX_CHARS[(h1 >> 4) & 0x0f] +
            HEX_CHARS[h1 & 0x0f] +
            HEX_CHARS[(h2 >> 28) & 0x0f] +
            HEX_CHARS[(h2 >> 24) & 0x0f] +
            HEX_CHARS[(h2 >> 20) & 0x0f] +
            HEX_CHARS[(h2 >> 16) & 0x0f] +
            HEX_CHARS[(h2 >> 12) & 0x0f] +
            HEX_CHARS[(h2 >> 8) & 0x0f] +
            HEX_CHARS[(h2 >> 4) & 0x0f] +
            HEX_CHARS[h2 & 0x0f] +
            HEX_CHARS[(h3 >> 28) & 0x0f] +
            HEX_CHARS[(h3 >> 24) & 0x0f] +
            HEX_CHARS[(h3 >> 20) & 0x0f] +
            HEX_CHARS[(h3 >> 16) & 0x0f] +
            HEX_CHARS[(h3 >> 12) & 0x0f] +
            HEX_CHARS[(h3 >> 8) & 0x0f] +
            HEX_CHARS[(h3 >> 4) & 0x0f] +
            HEX_CHARS[h3 & 0x0f] +
            HEX_CHARS[(h4 >> 28) & 0x0f] +
            HEX_CHARS[(h4 >> 24) & 0x0f] +
            HEX_CHARS[(h4 >> 20) & 0x0f] +
            HEX_CHARS[(h4 >> 16) & 0x0f] +
            HEX_CHARS[(h4 >> 12) & 0x0f] +
            HEX_CHARS[(h4 >> 8) & 0x0f] +
            HEX_CHARS[(h4 >> 4) & 0x0f] +
            HEX_CHARS[h4 & 0x0f]);
    };
    Sha1.prototype.toString = function () {
        return this.hex();
    };
    Sha1.prototype.digest = function () {
        this.finalize();
        var h0 = __classPrivateFieldGet(this, _Sha1_h0, "f");
        var h1 = __classPrivateFieldGet(this, _Sha1_h1, "f");
        var h2 = __classPrivateFieldGet(this, _Sha1_h2, "f");
        var h3 = __classPrivateFieldGet(this, _Sha1_h3, "f");
        var h4 = __classPrivateFieldGet(this, _Sha1_h4, "f");
        return [
            (h0 >> 24) & 0xff,
            (h0 >> 16) & 0xff,
            (h0 >> 8) & 0xff,
            h0 & 0xff,
            (h1 >> 24) & 0xff,
            (h1 >> 16) & 0xff,
            (h1 >> 8) & 0xff,
            h1 & 0xff,
            (h2 >> 24) & 0xff,
            (h2 >> 16) & 0xff,
            (h2 >> 8) & 0xff,
            h2 & 0xff,
            (h3 >> 24) & 0xff,
            (h3 >> 16) & 0xff,
            (h3 >> 8) & 0xff,
            h3 & 0xff,
            (h4 >> 24) & 0xff,
            (h4 >> 16) & 0xff,
            (h4 >> 8) & 0xff,
            h4 & 0xff,
        ];
    };
    Sha1.prototype.array = function () {
        return this.digest();
    };
    Sha1.prototype.arrayBuffer = function () {
        this.finalize();
        var buffer = new ArrayBuffer(20);
        var dataView = new DataView(buffer);
        dataView.setUint32(0, __classPrivateFieldGet(this, _Sha1_h0, "f"));
        dataView.setUint32(4, __classPrivateFieldGet(this, _Sha1_h1, "f"));
        dataView.setUint32(8, __classPrivateFieldGet(this, _Sha1_h2, "f"));
        dataView.setUint32(12, __classPrivateFieldGet(this, _Sha1_h3, "f"));
        dataView.setUint32(16, __classPrivateFieldGet(this, _Sha1_h4, "f"));
        return buffer;
    };
    return Sha1;
}());
exports.Sha1 = Sha1;
_Sha1_blocks = new WeakMap(), _Sha1_block = new WeakMap(), _Sha1_start = new WeakMap(), _Sha1_bytes = new WeakMap(), _Sha1_hBytes = new WeakMap(), _Sha1_finalized = new WeakMap(), _Sha1_hashed = new WeakMap(), _Sha1_h0 = new WeakMap(), _Sha1_h1 = new WeakMap(), _Sha1_h2 = new WeakMap(), _Sha1_h3 = new WeakMap(), _Sha1_h4 = new WeakMap(), _Sha1_lastByteIndex = new WeakMap();
