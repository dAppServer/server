"use strict";
exports.__esModule = true;
exports.decode = exports.encode = void 0;
var hexTable = new TextEncoder().encode("0123456789abcdef");
function errInvalidByte(byte) {
    return new TypeError("Invalid byte '".concat(String.fromCharCode(byte), "'"));
}
function errLength() {
    return new RangeError("Odd length hex string");
}
function fromHexChar(byte) {
    if (48 <= byte && byte <= 57)
        return byte - 48;
    if (97 <= byte && byte <= 102)
        return byte - 97 + 10;
    if (65 <= byte && byte <= 70)
        return byte - 65 + 10;
    throw errInvalidByte(byte);
}
function encode(src) {
    var dst = new Uint8Array(src.length * 2);
    for (var i = 0; i < dst.length; i++) {
        var v = src[i];
        dst[i * 2] = hexTable[v >> 4];
        dst[i * 2 + 1] = hexTable[v & 0x0f];
    }
    return dst;
}
exports.encode = encode;
function decode(src) {
    var dst = new Uint8Array(src.length / 2);
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
