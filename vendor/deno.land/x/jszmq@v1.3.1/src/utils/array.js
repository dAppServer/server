"use strict";
exports.__esModule = true;
exports.resize = exports.copy = void 0;
function copy(src, srcOffset, dest, destOffset, length) {
    for (var i = 0; i < length; i++) {
        dest[i + destOffset] = src[i + srcOffset];
    }
}
exports.copy = copy;
function resize(src, size, ended) {
    if (size > src.length) {
        var dest = new Array(size).fill(null);
        if (ended) {
            copy(src, 0, dest, 0, src.length);
        }
        else {
            copy(src, 0, dest, size - src.length, src.length);
        }
        return dest;
    }
    else if (size < src.length) {
        var dest = new Array(size).fill(null);
        if (ended) {
            copy(src, 0, dest, 0, size);
        }
        else {
            copy(src, src.length - size, dest, 0, size);
        }
        return dest;
    }
    return src;
}
exports.resize = resize;
