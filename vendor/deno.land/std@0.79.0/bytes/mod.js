"use strict";
exports.__esModule = true;
exports.copyBytes = exports.contains = exports.concat = exports.repeat = exports.hasSuffix = exports.hasPrefix = exports.equal = exports.findLastIndex = exports.findIndex = void 0;
function findIndex(source, pat) {
    var s = pat[0];
    for (var i = 0; i < source.length; i++) {
        if (source[i] !== s)
            continue;
        var pin = i;
        var matched = 1;
        var j = i;
        while (matched < pat.length) {
            j++;
            if (source[j] !== pat[j - pin]) {
                break;
            }
            matched++;
        }
        if (matched === pat.length) {
            return pin;
        }
    }
    return -1;
}
exports.findIndex = findIndex;
function findLastIndex(source, pat) {
    var e = pat[pat.length - 1];
    for (var i = source.length - 1; i >= 0; i--) {
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
exports.findLastIndex = findLastIndex;
function equal(source, match) {
    if (source.length !== match.length)
        return false;
    for (var i = 0; i < match.length; i++) {
        if (source[i] !== match[i])
            return false;
    }
    return true;
}
exports.equal = equal;
function hasPrefix(source, prefix) {
    for (var i = 0, max = prefix.length; i < max; i++) {
        if (source[i] !== prefix[i])
            return false;
    }
    return true;
}
exports.hasPrefix = hasPrefix;
function hasSuffix(source, suffix) {
    for (var srci = source.length - 1, sfxi = suffix.length - 1; sfxi >= 0; srci--, sfxi--) {
        if (source[srci] !== suffix[sfxi])
            return false;
    }
    return true;
}
exports.hasSuffix = hasSuffix;
function repeat(origin, count) {
    if (count === 0) {
        return new Uint8Array();
    }
    if (count < 0) {
        throw new Error("bytes: negative repeat count");
    }
    else if ((origin.length * count) / count !== origin.length) {
        throw new Error("bytes: repeat count causes overflow");
    }
    var int = Math.floor(count);
    if (int !== count) {
        throw new Error("bytes: repeat count must be an integer");
    }
    var nb = new Uint8Array(origin.length * count);
    var bp = copyBytes(origin, nb);
    for (; bp < nb.length; bp *= 2) {
        copyBytes(nb.slice(0, bp), nb, bp);
    }
    return nb;
}
exports.repeat = repeat;
function concat(origin, b) {
    var output = new Uint8Array(origin.length + b.length);
    output.set(origin, 0);
    output.set(b, origin.length);
    return output;
}
exports.concat = concat;
function contains(source, pat) {
    return findIndex(source, pat) != -1;
}
exports.contains = contains;
function copyBytes(src, dst, off) {
    if (off === void 0) { off = 0; }
    off = Math.max(0, Math.min(off, dst.byteLength));
    var dstBytesAvailable = dst.byteLength - off;
    if (src.byteLength > dstBytesAvailable) {
        src = src.subarray(0, dstBytesAvailable);
    }
    dst.set(src, off);
    return src.byteLength;
}
exports.copyBytes = copyBytes;
