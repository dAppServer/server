"use strict";
exports.__esModule = true;
exports.copy = exports.contains = exports.concat = exports.repeat = exports.endsWith = exports.startsWith = exports.equals = exports.lastIndexOf = exports.indexOf = void 0;
function indexOf(source, pat, start) {
    if (start === void 0) { start = 0; }
    if (start >= source.length) {
        return -1;
    }
    if (start < 0) {
        start = 0;
    }
    var s = pat[0];
    for (var i = start; i < source.length; i++) {
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
function equals(a, b) {
    if (a.length !== b.length)
        return false;
    for (var i = 0; i < b.length; i++) {
        if (a[i] !== b[i])
            return false;
    }
    return true;
}
exports.equals = equals;
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
function contains(source, pat) {
    return indexOf(source, pat) != -1;
}
exports.contains = contains;
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