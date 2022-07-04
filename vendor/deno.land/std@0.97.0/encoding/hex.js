"use strict";
exports.__esModule = true;
exports.decodeString = exports.decodedLen = exports.decode = exports.encodeToString = exports.encode = exports.encodedLen = exports.errLength = exports.errInvalidByte = void 0;
var hexTable = new TextEncoder().encode("0123456789abcdef");
function errInvalidByte(byte) {
    return new Error("encoding/hex: invalid byte: " +
        new TextDecoder().decode(new Uint8Array([byte])));
}
exports.errInvalidByte = errInvalidByte;
function errLength() {
    return new Error("encoding/hex: odd length hex string");
}
exports.errLength = errLength;
function fromHexChar(byte) {
    if (48 <= byte && byte <= 57)
        return byte - 48;
    if (97 <= byte && byte <= 102)
        return byte - 97 + 10;
    if (65 <= byte && byte <= 70)
        return byte - 65 + 10;
    throw errInvalidByte(byte);
}
function encodedLen(n) {
    return n * 2;
}
exports.encodedLen = encodedLen;
function encode(src) {
    var dst = new Uint8Array(encodedLen(src.length));
    for (var i = 0; i < dst.length; i++) {
        var v = src[i];
        dst[i * 2] = hexTable[v >> 4];
        dst[i * 2 + 1] = hexTable[v & 0x0f];
    }
    return dst;
}
exports.encode = encode;
function encodeToString(src) {
    return new TextDecoder().decode(encode(src));
}
exports.encodeToString = encodeToString;
function decode(src) {
    var dst = new Uint8Array(decodedLen(src.length));
    for (var i = 0; i < dst.length; i++) {
        var a = fromHexChar(src[i * 2]);
        var b = fromHexChar(src[i * 2 + 1]);
        dst[i] = (a << 4) | b;
    }
    if (src.length % 2 == 1) {
        fromHexChar(src[dst.length * 2]);
        throw errLength();
    }
    return dst;
}
exports.decode = decode;
function decodedLen(x) {
    return x >>> 1;
}
exports.decodedLen = decodedLen;
function decodeString(s) {
    return decode(new TextEncoder().encode(s));
}
exports.decodeString = decodeString;
