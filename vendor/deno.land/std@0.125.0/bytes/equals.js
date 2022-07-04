"use strict";
exports.__esModule = true;
exports.equals = exports.equalsSimd = exports.equalsNaive = void 0;
function equalsNaive(a, b) {
    if (a.length !== b.length)
        return false;
    for (var i = 0; i < b.length; i++) {
        if (a[i] !== b[i])
            return false;
    }
    return true;
}
exports.equalsNaive = equalsNaive;
function equalsSimd(a, b) {
    if (a.length !== b.length)
        return false;
    var len = a.length;
    var compressable = Math.floor(len / 4);
    var compressedA = new Uint32Array(a.buffer, 0, compressable);
    var compressedB = new Uint32Array(b.buffer, 0, compressable);
    for (var i = compressable * 4; i < len; i++) {
        if (a[i] !== b[i])
            return false;
    }
    for (var i = 0; i < compressedA.length; i++) {
        if (compressedA[i] !== compressedB[i])
            return false;
    }
    return true;
}
exports.equalsSimd = equalsSimd;
function equals(a, b) {
    if (a.length < 1000)
        return equalsNaive(a, b);
    return equalsSimd(a, b);
}
exports.equals = equals;
