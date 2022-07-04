"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.equals = exports.copy = exports.includesNeedle = exports.concat = exports.repeat = exports.endsWith = exports.startsWith = exports.lastIndexOfNeedle = exports.indexOfNeedle = void 0;
function indexOfNeedle(source, needle, start) {
    if (start === void 0) { start = 0; }
    if (start >= source.length) {
        return -1;
    }
    if (start < 0) {
        start = Math.max(0, source.length + start);
    }
    var s = needle[0];
    for (var i = start; i < source.length; i++) {
        if (source[i] !== s)
            continue;
        var pin = i;
        var matched = 1;
        var j = i;
        while (matched < needle.length) {
            j++;
            if (source[j] !== needle[j - pin]) {
                break;
            }
            matched++;
        }
        if (matched === needle.length) {
            return pin;
        }
    }
    return -1;
}
exports.indexOfNeedle = indexOfNeedle;
function lastIndexOfNeedle(source, needle, start) {
    if (start === void 0) { start = source.length - 1; }
    if (start < 0) {
        return -1;
    }
    if (start >= source.length) {
        start = source.length - 1;
    }
    var e = needle[needle.length - 1];
    for (var i = start; i >= 0; i--) {
        if (source[i] !== e)
            continue;
        var pin = i;
        var matched = 1;
        var j = i;
        while (matched < needle.length) {
            j--;
            if (source[j] !== needle[needle.length - 1 - (pin - j)]) {
                break;
            }
            matched++;
        }
        if (matched === needle.length) {
            return pin - needle.length + 1;
        }
    }
    return -1;
}
exports.lastIndexOfNeedle = lastIndexOfNeedle;
function startsWith(source, prefix) {
    for (var i = 0, max = prefix.length; i < max; i++) {
        if (source[i] !== prefix[i])
            return false;
    }
    return true;
}
exports.startsWith = startsWith;
function endsWith(source, suffix) {
    for (var srci = source.length - 1, sfxi = suffix.length - 1; sfxi >= 0; srci--, sfxi--) {
        if (source[srci] !== suffix[sfxi])
            return false;
    }
    return true;
}
exports.endsWith = endsWith;
function repeat(source, count) {
    if (count === 0) {
        return new Uint8Array();
    }
    if (count < 0) {
        throw new RangeError("bytes: negative repeat count");
    }
    else if ((source.length * count) / count !== source.length) {
        throw new Error("bytes: repeat count causes overflow");
    }
    var int = Math.floor(count);
    if (int !== count) {
        throw new Error("bytes: repeat count must be an integer");
    }
    var nb = new Uint8Array(source.length * count);
    var bp = copy(source, nb);
    for (; bp < nb.length; bp *= 2) {
        copy(nb.slice(0, bp), nb, bp);
    }
    return nb;
}
exports.repeat = repeat;
function concat() {
    var buf = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        buf[_i] = arguments[_i];
    }
    var length = 0;
    for (var _a = 0, buf_1 = buf; _a < buf_1.length; _a++) {
        var b = buf_1[_a];
        length += b.length;
    }
    var output = new Uint8Array(length);
    var index = 0;
    for (var _b = 0, buf_2 = buf; _b < buf_2.length; _b++) {
        var b = buf_2[_b];
        output.set(b, index);
        index += b.length;
    }
    return output;
}
exports.concat = concat;
function includesNeedle(source, needle, start) {
    if (start === void 0) { start = 0; }
    return indexOfNeedle(source, needle, start) !== -1;
}
exports.includesNeedle = includesNeedle;
function copy(src, dst, off) {
    if (off === void 0) { off = 0; }
    off = Math.max(0, Math.min(off, dst.byteLength));
    var dstBytesAvailable = dst.byteLength - off;
    if (src.byteLength > dstBytesAvailable) {
        src = src.subarray(0, dstBytesAvailable);
    }
    dst.set(src, off);
    return src.byteLength;
}
exports.copy = copy;
var equals_ts_1 = require("./equals.ts");
__createBinding(exports, equals_ts_1, "equals");
