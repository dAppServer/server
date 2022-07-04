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
exports.diffstr = exports.diff = exports.DiffType = void 0;
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
function diffstr(A, B) {
    var _a;
    function tokenize(string, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.wordDiff, wordDiff = _c === void 0 ? false : _c;
        if (wordDiff) {
            var tokens = string.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/);
            var words = /^[a-zA-Z\u{C0}-\u{FF}\u{D8}-\u{F6}\u{F8}-\u{2C6}\u{2C8}-\u{2D7}\u{2DE}-\u{2FF}\u{1E00}-\u{1EFF}]+$/u;
            for (var i = 0; i < tokens.length - 1; i++) {
                if (!tokens[i + 1] && tokens[i + 2] && words.test(tokens[i]) &&
                    words.test(tokens[i + 2])) {
                    tokens[i] += tokens[i + 2];
                    tokens.splice(i + 1, 2);
                    i--;
                }
            }
            return tokens.filter(function (token) { return token; });
        }
        else {
            var tokens = [], lines = string.split(/(\n|\r\n)/);
            if (!lines[lines.length - 1]) {
                lines.pop();
            }
            for (var i = 0; i < lines.length; i++) {
                if (i % 2) {
                    tokens[tokens.length - 1] += lines[i];
                }
                else {
                    tokens.push(lines[i]);
                }
            }
            return tokens;
        }
    }
    function createDetails(line, tokens) {
        return tokens.filter(function (_a) {
            var type = _a.type;
            return type === line.type || type === DiffType.common;
        }).map(function (result, i, t) {
            var _a, _b;
            if ((result.type === DiffType.common) && (t[i - 1]) &&
                (((_a = t[i - 1]) === null || _a === void 0 ? void 0 : _a.type) === ((_b = t[i + 1]) === null || _b === void 0 ? void 0 : _b.type)) && /\s+/.test(result.value)) {
                result.type = t[i - 1].type;
            }
            return result;
        });
    }
    var diffResult = diff(tokenize("".concat(A, "\n")), tokenize("".concat(B, "\n")));
    var added = [], removed = [];
    for (var _i = 0, diffResult_1 = diffResult; _i < diffResult_1.length; _i++) {
        var result = diffResult_1[_i];
        if (result.type === DiffType.added) {
            added.push(result);
        }
        if (result.type === DiffType.removed) {
            removed.push(result);
        }
    }
    var aLines = added.length < removed.length ? added : removed;
    var bLines = aLines === removed ? added : removed;
    for (var _b = 0, aLines_1 = aLines; _b < aLines_1.length; _b++) {
        var a = aLines_1[_b];
        var tokens = [], b = void 0;
        while (bLines.length) {
            b = bLines.shift();
            tokens = diff(tokenize(a.value, { wordDiff: true }), tokenize((_a = b === null || b === void 0 ? void 0 : b.value) !== null && _a !== void 0 ? _a : "", { wordDiff: true }));
            if (tokens.some(function (_a) {
                var type = _a.type, value = _a.value;
                return type === DiffType.common && value.trim().length;
            })) {
                break;
            }
        }
        a.details = createDetails(a, tokens);
        if (b) {
            b.details = createDetails(b, tokens);
        }
    }
    return diffResult;
}
exports.diffstr = diffstr;
