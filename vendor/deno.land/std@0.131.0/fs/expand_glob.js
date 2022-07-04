"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
};
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
exports.expandGlobSync = exports.expandGlob = void 0;
var mod_ts_1 = require("../path/mod.ts");
var walk_ts_1 = require("./walk.ts");
var assert_ts_1 = require("../_util/assert.ts");
var os_ts_1 = require("../_util/os.ts");
function split(path) {
    var s = mod_ts_1.SEP_PATTERN.source;
    var segments = path
        .replace(new RegExp("^".concat(s, "|").concat(s, "$"), "g"), "")
        .split(mod_ts_1.SEP_PATTERN);
    var isAbsolute_ = (0, mod_ts_1.isAbsolute)(path);
    return {
        segments: segments,
        isAbsolute: isAbsolute_,
        hasTrailingSep: !!path.match(new RegExp("".concat(s, "$"))),
        winRoot: os_ts_1.isWindows && isAbsolute_ ? segments.shift() : undefined
    };
}
function throwUnlessNotFound(error) {
    if (!(error instanceof Deno.errors.NotFound)) {
        throw error;
    }
}
function comparePath(a, b) {
    if (a.path < b.path)
        return -1;
    if (a.path > b.path)
        return 1;
    return 0;
}
function expandGlob(glob, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.root, root = _c === void 0 ? Deno.cwd() : _c, _d = _b.exclude, exclude = _d === void 0 ? [] : _d, _e = _b.includeDirs, includeDirs = _e === void 0 ? true : _e, _f = _b.extended, extended = _f === void 0 ? true : _f, _g = _b.globstar, globstar = _g === void 0 ? false : _g, caseInsensitive = _b.caseInsensitive;
    return __asyncGenerator(this, arguments, function expandGlob_1() {
        function advanceMatch(walkInfo, globSegment) {
            return __asyncGenerator(this, arguments, function advanceMatch_1() {
                var parentPath, error_2, globPattern, _a, _b, walkEntry, e_1_1;
                var e_1, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            if (!!walkInfo.isDirectory) return [3, 2];
                            return [4, __await(void 0)];
                        case 1: return [2, _d.sent()];
                        case 2:
                            if (!(globSegment == "..")) return [3, 12];
                            parentPath = (0, mod_ts_1.joinGlobs)([walkInfo.path, ".."], globOptions);
                            _d.label = 3;
                        case 3:
                            _d.trys.push([3, 9, , 10]);
                            if (!shouldInclude(parentPath)) return [3, 8];
                            return [4, __await((0, walk_ts_1._createWalkEntry)(parentPath))];
                        case 4: return [4, __await.apply(void 0, [_d.sent()])];
                        case 5: return [4, _d.sent()];
                        case 6: return [4, __await.apply(void 0, [_d.sent()])];
                        case 7: return [2, _d.sent()];
                        case 8: return [3, 10];
                        case 9:
                            error_2 = _d.sent();
                            throwUnlessNotFound(error_2);
                            return [3, 10];
                        case 10: return [4, __await(void 0)];
                        case 11: return [2, _d.sent()];
                        case 12:
                            if (!(globSegment == "**")) return [3, 16];
                            return [5, __values(__asyncDelegator(__asyncValues((0, walk_ts_1.walk)(walkInfo.path, { skip: excludePatterns }))))];
                        case 13: return [4, __await.apply(void 0, [_d.sent()])];
                        case 14: return [4, __await.apply(void 0, [_d.sent()])];
                        case 15: return [2, _d.sent()];
                        case 16:
                            globPattern = (0, mod_ts_1.globToRegExp)(globSegment, globOptions);
                            _d.label = 17;
                        case 17:
                            _d.trys.push([17, 24, 25, 30]);
                            _a = __asyncValues((0, walk_ts_1.walk)(walkInfo.path, {
                                maxDepth: 1,
                                skip: excludePatterns
                            }));
                            _d.label = 18;
                        case 18: return [4, __await(_a.next())];
                        case 19:
                            if (!(_b = _d.sent(), !_b.done)) return [3, 23];
                            walkEntry = _b.value;
                            if (!(walkEntry.path != walkInfo.path && walkEntry.name.match(globPattern))) return [3, 22];
                            return [4, __await(walkEntry)];
                        case 20: return [4, _d.sent()];
                        case 21:
                            _d.sent();
                            _d.label = 22;
                        case 22: return [3, 18];
                        case 23: return [3, 30];
                        case 24:
                            e_1_1 = _d.sent();
                            e_1 = { error: e_1_1 };
                            return [3, 30];
                        case 25:
                            _d.trys.push([25, , 28, 29]);
                            if (!(_b && !_b.done && (_c = _a["return"]))) return [3, 27];
                            return [4, __await(_c.call(_a))];
                        case 26:
                            _d.sent();
                            _d.label = 27;
                        case 27: return [3, 29];
                        case 28:
                            if (e_1) throw e_1.error;
                            return [7];
                        case 29: return [7];
                        case 30: return [2];
                    }
                });
            });
        }
        var globOptions, absRoot, resolveFromRoot, excludePatterns, shouldInclude, _h, segments, isGlobAbsolute, hasTrailingSep, winRoot, fixedRoot, seg, fixedRootInfo, error_1, currentMatches, _loop_1, _i, segments_1, segment;
        var _this = this;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    globOptions = { extended: extended, globstar: globstar, caseInsensitive: caseInsensitive };
                    absRoot = (0, mod_ts_1.resolve)(root);
                    resolveFromRoot = function (path) { return (0, mod_ts_1.resolve)(absRoot, path); };
                    excludePatterns = exclude
                        .map(resolveFromRoot)
                        .map(function (s) { return (0, mod_ts_1.globToRegExp)(s, globOptions); });
                    shouldInclude = function (path) {
                        return !excludePatterns.some(function (p) { return !!path.match(p); });
                    };
                    _h = split(glob), segments = _h.segments, isGlobAbsolute = _h.isAbsolute, hasTrailingSep = _h.hasTrailingSep, winRoot = _h.winRoot;
                    fixedRoot = isGlobAbsolute
                        ? (winRoot != undefined ? winRoot : "/")
                        : absRoot;
                    while (segments.length > 0 && !(0, mod_ts_1.isGlob)(segments[0])) {
                        seg = segments.shift();
                        (0, assert_ts_1.assert)(seg != null);
                        fixedRoot = (0, mod_ts_1.joinGlobs)([fixedRoot, seg], globOptions);
                    }
                    _j.label = 1;
                case 1:
                    _j.trys.push([1, 3, , 5]);
                    return [4, __await((0, walk_ts_1._createWalkEntry)(fixedRoot))];
                case 2:
                    fixedRootInfo = _j.sent();
                    return [3, 5];
                case 3:
                    error_1 = _j.sent();
                    return [4, __await(throwUnlessNotFound(error_1))];
                case 4: return [2, _j.sent()];
                case 5:
                    currentMatches = [fixedRootInfo];
                    _loop_1 = function (segment) {
                        var nextMatchMap;
                        return __generator(this, function (_k) {
                            switch (_k.label) {
                                case 0:
                                    nextMatchMap = new Map();
                                    return [4, __await(Promise.all(currentMatches.map(function (currentMatch) { return __awaiter(_this, void 0, void 0, function () {
                                            var _a, _b, nextMatch, e_2_1;
                                            var e_2, _c;
                                            return __generator(this, function (_d) {
                                                switch (_d.label) {
                                                    case 0:
                                                        _d.trys.push([0, 5, 6, 11]);
                                                        _a = __asyncValues(advanceMatch(currentMatch, segment));
                                                        _d.label = 1;
                                                    case 1: return [4, _a.next()];
                                                    case 2:
                                                        if (!(_b = _d.sent(), !_b.done)) return [3, 4];
                                                        nextMatch = _b.value;
                                                        nextMatchMap.set(nextMatch.path, nextMatch);
                                                        _d.label = 3;
                                                    case 3: return [3, 1];
                                                    case 4: return [3, 11];
                                                    case 5:
                                                        e_2_1 = _d.sent();
                                                        e_2 = { error: e_2_1 };
                                                        return [3, 11];
                                                    case 6:
                                                        _d.trys.push([6, , 9, 10]);
                                                        if (!(_b && !_b.done && (_c = _a["return"]))) return [3, 8];
                                                        return [4, _c.call(_a)];
                                                    case 7:
                                                        _d.sent();
                                                        _d.label = 8;
                                                    case 8: return [3, 10];
                                                    case 9:
                                                        if (e_2) throw e_2.error;
                                                        return [7];
                                                    case 10: return [7];
                                                    case 11: return [2];
                                                }
                                            });
                                        }); })))];
                                case 1:
                                    _k.sent();
                                    currentMatches = __spreadArray([], nextMatchMap.values(), true).sort(comparePath);
                                    return [2];
                            }
                        });
                    };
                    _i = 0, segments_1 = segments;
                    _j.label = 6;
                case 6:
                    if (!(_i < segments_1.length)) return [3, 9];
                    segment = segments_1[_i];
                    return [5, _loop_1(segment)];
                case 7:
                    _j.sent();
                    _j.label = 8;
                case 8:
                    _i++;
                    return [3, 6];
                case 9:
                    if (hasTrailingSep) {
                        currentMatches = currentMatches.filter(function (entry) { return entry.isDirectory; });
                    }
                    if (!includeDirs) {
                        currentMatches = currentMatches.filter(function (entry) { return !entry.isDirectory; });
                    }
                    return [5, __values(__asyncDelegator(__asyncValues(currentMatches)))];
                case 10: return [4, __await.apply(void 0, [_j.sent()])];
                case 11:
                    _j.sent();
                    return [2];
            }
        });
    });
}
exports.expandGlob = expandGlob;
function expandGlobSync(glob, _a) {
    function advanceMatch(walkInfo, globSegment) {
        var parentPath, error_3, globPattern, _i, _a, walkEntry;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!!walkInfo.isDirectory) return [3, 1];
                    return [2];
                case 1:
                    if (!(globSegment == "..")) return [3, 7];
                    parentPath = (0, mod_ts_1.joinGlobs)([walkInfo.path, ".."], globOptions);
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 5, , 6]);
                    if (!shouldInclude(parentPath)) return [3, 4];
                    return [4, (0, walk_ts_1._createWalkEntrySync)(parentPath)];
                case 3: return [2, _b.sent()];
                case 4: return [3, 6];
                case 5:
                    error_3 = _b.sent();
                    throwUnlessNotFound(error_3);
                    return [3, 6];
                case 6: return [2];
                case 7:
                    if (!(globSegment == "**")) return [3, 9];
                    return [5, __values((0, walk_ts_1.walkSync)(walkInfo.path, { skip: excludePatterns }))];
                case 8: return [2, _b.sent()];
                case 9:
                    globPattern = (0, mod_ts_1.globToRegExp)(globSegment, globOptions);
                    _i = 0, _a = (0, walk_ts_1.walkSync)(walkInfo.path, {
                        maxDepth: 1,
                        skip: excludePatterns
                    });
                    _b.label = 10;
                case 10:
                    if (!(_i < _a.length)) return [3, 13];
                    walkEntry = _a[_i];
                    if (!(walkEntry.path != walkInfo.path && walkEntry.name.match(globPattern))) return [3, 12];
                    return [4, walkEntry];
                case 11:
                    _b.sent();
                    _b.label = 12;
                case 12:
                    _i++;
                    return [3, 10];
                case 13: return [2];
            }
        });
    }
    var globOptions, absRoot, resolveFromRoot, excludePatterns, shouldInclude, _b, segments, isGlobAbsolute, hasTrailingSep, winRoot, fixedRoot, seg, fixedRootInfo, currentMatches, _i, segments_2, segment, nextMatchMap, _c, currentMatches_1, currentMatch, _d, _e, nextMatch;
    var _f = _a === void 0 ? {} : _a, _g = _f.root, root = _g === void 0 ? Deno.cwd() : _g, _h = _f.exclude, exclude = _h === void 0 ? [] : _h, _j = _f.includeDirs, includeDirs = _j === void 0 ? true : _j, _k = _f.extended, extended = _k === void 0 ? true : _k, _l = _f.globstar, globstar = _l === void 0 ? false : _l, caseInsensitive = _f.caseInsensitive;
    return __generator(this, function (_m) {
        switch (_m.label) {
            case 0:
                globOptions = { extended: extended, globstar: globstar, caseInsensitive: caseInsensitive };
                absRoot = (0, mod_ts_1.resolve)(root);
                resolveFromRoot = function (path) { return (0, mod_ts_1.resolve)(absRoot, path); };
                excludePatterns = exclude
                    .map(resolveFromRoot)
                    .map(function (s) { return (0, mod_ts_1.globToRegExp)(s, globOptions); });
                shouldInclude = function (path) {
                    return !excludePatterns.some(function (p) { return !!path.match(p); });
                };
                _b = split(glob), segments = _b.segments, isGlobAbsolute = _b.isAbsolute, hasTrailingSep = _b.hasTrailingSep, winRoot = _b.winRoot;
                fixedRoot = isGlobAbsolute
                    ? (winRoot != undefined ? winRoot : "/")
                    : absRoot;
                while (segments.length > 0 && !(0, mod_ts_1.isGlob)(segments[0])) {
                    seg = segments.shift();
                    (0, assert_ts_1.assert)(seg != null);
                    fixedRoot = (0, mod_ts_1.joinGlobs)([fixedRoot, seg], globOptions);
                }
                try {
                    fixedRootInfo = (0, walk_ts_1._createWalkEntrySync)(fixedRoot);
                }
                catch (error) {
                    return [2, throwUnlessNotFound(error)];
                }
                currentMatches = [fixedRootInfo];
                for (_i = 0, segments_2 = segments; _i < segments_2.length; _i++) {
                    segment = segments_2[_i];
                    nextMatchMap = new Map();
                    for (_c = 0, currentMatches_1 = currentMatches; _c < currentMatches_1.length; _c++) {
                        currentMatch = currentMatches_1[_c];
                        for (_d = 0, _e = advanceMatch(currentMatch, segment); _d < _e.length; _d++) {
                            nextMatch = _e[_d];
                            nextMatchMap.set(nextMatch.path, nextMatch);
                        }
                    }
                    currentMatches = __spreadArray([], nextMatchMap.values(), true).sort(comparePath);
                }
                if (hasTrailingSep) {
                    currentMatches = currentMatches.filter(function (entry) { return entry.isDirectory; });
                }
                if (!includeDirs) {
                    currentMatches = currentMatches.filter(function (entry) { return !entry.isDirectory; });
                }
                return [5, __values(currentMatches)];
            case 1:
                _m.sent();
                return [2];
        }
    });
}
exports.expandGlobSync = expandGlobSync;
