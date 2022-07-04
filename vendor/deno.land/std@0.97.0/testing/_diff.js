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
exports.diff = exports.DiffType = void 0;
var DiffType;
(function (DiffType) {
    DiffType["removed"] = "removed";
    DiffType["common"] = "common";
    DiffType["added"] = "added";
})(DiffType = exports.DiffType || (exports.DiffType = {}));
var REMOVED = 1;
var COMMON = 2;
var ADDED = 3;
function createCommon(A, B, reverse) {
    var common = [];
    if (A.length === 0 || B.length === 0)
        return [];
    for (var i = 0; i < Math.min(A.length, B.length); i += 1) {
        if (A[reverse ? A.length - i - 1 : i] === B[reverse ? B.length - i - 1 : i]) {
            common.push(A[reverse ? A.length - i - 1 : i]);
        }
        else {
            return common;
        }
    }
    return common;
}
function diff(A, B) {
    var _a;
    var prefixCommon = createCommon(A, B);
    var suffixCommon = createCommon(A.slice(prefixCommon.length), B.slice(prefixCommon.length), true).reverse();
    A = suffixCommon.length
        ? A.slice(prefixCommon.length, -suffixCommon.length)
        : A.slice(prefixCommon.length);
    B = suffixCommon.length
        ? B.slice(prefixCommon.length, -suffixCommon.length)
        : B.slice(prefixCommon.length);
    var swapped = B.length > A.length;
    _a = swapped ? [B, A] : [A, B], A = _a[0], B = _a[1];
    var M = A.length;
    var N = B.length;
    if (!M && !N && !suffixCommon.length && !prefixCommon.length)
        return [];
    if (!N) {
        return __spreadArray(__spreadArray(__spreadArray([], prefixCommon.map(function (c) { return ({ type: DiffType.common, value: c }); }), true), A.map(function (a) { return ({
            type: swapped ? DiffType.added : DiffType.removed,
            value: a
        }); }), true), suffixCommon.map(function (c) { return ({ type: DiffType.common, value: c }); }), true);
    }
    var offset = N;
    var delta = M - N;
    var size = M + N + 1;
    var fp = new Array(size).fill({ y: -1 });
    var routes = new Uint32Array((M * N + size + 1) * 2);
    var diffTypesPtrOffset = routes.length / 2;
    var ptr = 0;
    var p = -1;
    function backTrace(A, B, current, swapped) {
        var M = A.length;
        var N = B.length;
        var result = [];
        var a = M - 1;
        var b = N - 1;
        var j = routes[current.id];
        var type = routes[current.id + diffTypesPtrOffset];
        while (true) {
            if (!j && !type)
                break;
            var prev = j;
            if (type === REMOVED) {
                result.unshift({
                    type: swapped ? DiffType.removed : DiffType.added,
                    value: B[b]
                });
                b -= 1;
            }
            else if (type === ADDED) {
                result.unshift({
                    type: swapped ? DiffType.added : DiffType.removed,
                    value: A[a]
                });
                a -= 1;
            }
            else {
                result.unshift({ type: DiffType.common, value: A[a] });
                a -= 1;
                b -= 1;
            }
            j = routes[prev];
            type = routes[prev + diffTypesPtrOffset];
        }
        return result;
    }
    function createFP(slide, down, k, M) {
        if (slide && slide.y === -1 && down && down.y === -1) {
            return { y: 0, id: 0 };
        }
        if ((down && down.y === -1) ||
            k === M ||
            (slide && slide.y) > (down && down.y) + 1) {
            var prev = slide.id;
            ptr++;
            routes[ptr] = prev;
            routes[ptr + diffTypesPtrOffset] = ADDED;
            return { y: slide.y, id: ptr };
        }
        else {
            var prev = down.id;
            ptr++;
            routes[ptr] = prev;
            routes[ptr + diffTypesPtrOffset] = REMOVED;
            return { y: down.y + 1, id: ptr };
        }
    }
    function snake(k, slide, down, _offset, A, B) {
        var M = A.length;
        var N = B.length;
        if (k < -N || M < k)
            return { y: -1, id: -1 };
        var fp = createFP(slide, down, k, M);
        while (fp.y + k < M && fp.y < N && A[fp.y + k] === B[fp.y]) {
            var prev = fp.id;
            ptr++;
            fp.id = ptr;
            fp.y += 1;
            routes[ptr] = prev;
            routes[ptr + diffTypesPtrOffset] = COMMON;
        }
        return fp;
    }
    while (fp[delta + offset].y < N) {
        p = p + 1;
        for (var k = -p; k < delta; ++k) {
            fp[k + offset] = snake(k, fp[k - 1 + offset], fp[k + 1 + offset], offset, A, B);
        }
        for (var k = delta + p; k > delta; --k) {
            fp[k + offset] = snake(k, fp[k - 1 + offset], fp[k + 1 + offset], offset, A, B);
        }
        fp[delta + offset] = snake(delta, fp[delta - 1 + offset], fp[delta + 1 + offset], offset, A, B);
    }
    return __spreadArray(__spreadArray(__spreadArray([], prefixCommon.map(function (c) { return ({ type: DiffType.common, value: c }); }), true), backTrace(A, B, fp[delta + offset], swapped), true), suffixCommon.map(function (c) { return ({ type: DiffType.common, value: c }); }), true);
}
exports.diff = diff;
