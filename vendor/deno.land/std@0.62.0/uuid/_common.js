"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.createBuffer = exports.stringToBytes = exports.uuidToBytes = exports.bytesToUuid = void 0;
function bytesToUuid(bytes) {
    var bits = __spreadArray([], bytes, true).map(function (bit) {
        var s = bit.toString(16);
        return bit < 0x10 ? "0" + s : s;
    });
    return __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], bits.slice(0, 4), true), [
        "-"
    ], false), bits.slice(4, 6), true), [
        "-"
    ], false), bits.slice(6, 8), true), [
        "-"
    ], false), bits.slice(8, 10), true), [
        "-"
    ], false), bits.slice(10, 16), true).join("");
}
exports.bytesToUuid = bytesToUuid;
function uuidToBytes(uuid) {
    var bytes = [];
    uuid.replace(/[a-fA-F0-9]{2}/g, function (hex) {
        bytes.push(parseInt(hex, 16));
        return "";
    });
    return bytes;
}
exports.uuidToBytes = uuidToBytes;
function stringToBytes(str) {
    str = unescape(encodeURIComponent(str));
    var bytes = new Array(str.length);
    for (var i = 0; i < str.length; i++) {
        bytes[i] = str.charCodeAt(i);
    }
    return bytes;
}
exports.stringToBytes = stringToBytes;
function createBuffer(content) {
    var arrayBuffer = new ArrayBuffer(content.length);
    var uint8Array = new Uint8Array(arrayBuffer);
    for (var i = 0; i < content.length; i++) {
        uint8Array[i] = content[i];
    }
    return arrayBuffer;
}
exports.createBuffer = createBuffer;
