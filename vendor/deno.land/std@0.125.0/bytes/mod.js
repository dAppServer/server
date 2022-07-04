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
exports.equals = exports.contains = exports.copy = exports.includes = exports.concat = exports.repeat = exports.endsWith = exports.startsWith = exports.lastIndexOf = exports.indexOf = void 0;
function indexOf(source, pattern, fromIndex) {
    if (fromIndex === void 0) { fromIndex = 0; }
    if (fromIndex >= source.length) {
        return -1;
    }
    if (fromIndex < 0) {
        fromIndex = Math.max(0, source.length + fromIndex);
    }
    var s = pattern[0];
    for (var i = fromIndex; i < source.length; i++) {
        if (source[i] !== s)
            continue;
        var pin = i;
        var matched = 1;
        var j = i;
        while (matched < pattern.length) {
            j++;
            if (source[j] !== pattern[j - pin]) {
                break;
            }
            matched++;
        }
        if (matched === pattern.length) {
            return pin;
        }
    }
    return -1;
}
exports.indexOf = indexOf;
function lastIndexOf(source, pat, start) {
    if (start === void 0) { start = source.length - 1; }
    if (start < 0) {
        return -1;
    }
    if (start >= source.length) {
        start = source.length - 1;
    }
    var e = pat[pat.length - 1];
    for (var i = start; i >= 0; i--) {
        if (source[i] !== e)
            continue;
        var pin = i;
        var matched = 1;
        var j = i;
        while (matched < pat.length) {
            j--;
            if (source[j] !== pat[pat.length - 1 - (pin - j)]) {
                break;
            }
            matched++;
        }
        if (matched === pat.length) {
            return pin - pat.length + 1;
        }
    }
    return -1;
}
exports.lastIndexOf = lastIndexOf;
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
function repeat(origin, count) {
    if (count === 0) {
        return new Uint8Array();
    }
    if (count < 0) {
        throw new RangeError("bytes: negative repeat count");
    }
    else if ((origin.length * count) / count !== origin.length) {
        throw new Error("bytes: repeat count causes overflow");
    }
    var int = Math.floor(count);
    if (int !== count) {
        throw new Error("bytes: repeat count must be an integer");
    }
    var nb = new Uint8Array(origin.length * count);
    var bp = copy(origin, nb);
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
function includes(source, pattern, fromIndex) {
    if (fromIndex === void 0) { fromIndex = 0; }
    return indexOf(source, pattern, fromIndex) !== -1;
}
exports.includes = includes;
exports.contains = includes;
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
