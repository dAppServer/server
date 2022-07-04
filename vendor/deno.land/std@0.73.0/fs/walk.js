"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.walkSync = exports.walk = exports._createWalkEntry = exports._createWalkEntrySync = void 0;
var assert_ts_1 = require("../_util/assert.ts");
var mod_ts_1 = require("../path/mod.ts");
function _createWalkEntrySync(path) {
    path = (0, mod_ts_1.normalize)(path);
    var name = (0, mod_ts_1.basename)(path);
    var info = Deno.statSync(path);
    return {
        path: path,
        name: name,
        isFile: info.isFile,
        isDirectory: info.isDirectory,
        isSymlink: info.isSymlink
    };
}
exports._createWalkEntrySync = _createWalkEntrySync;
function _createWalkEntry(path) {
    return __awaiter(this, void 0, void 0, function () {
        var name, info;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    path = (0, mod_ts_1.normalize)(path);
                    name = (0, mod_ts_1.basename)(path);
                    return [4, Deno.stat(path)];
                case 1:
                    info = _a.sent();
                    return [2, {
                            path: path,
                            name: name,
                            isFile: info.isFile,
                            isDirectory: info.isDirectory,
                            isSymlink: info.isSymlink
                        }];
            }
        });
    });
}
exports._createWalkEntry = _createWalkEntry;
function include(path, exts, match, skip) {
    if (exts && !exts.some(function (ext) { return path.endsWith(ext); })) {
        return false;
    }
    if (match && !match.some(function (pattern) { return !!path.match(pattern); })) {
        return false;
    }
    if (skip && skip.some(function (pattern) { return !!path.match(pattern); })) {
        return false;
    }
    return true;
}
function walk(root, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.maxDepth, maxDepth = _c === void 0 ? Infinity : _c, _d = _b.includeFiles, includeFiles = _d === void 0 ? true : _d, _e = _b.includeDirs, includeDirs = _e === void 0 ? true : _e, _f = _b.followSymlinks, followSymlinks = _f === void 0 ? false : _f, _g = _b.exts, exts = _g === void 0 ? undefined : _g, _h = _b.match, match = _h === void 0 ? undefined : _h, _j = _b.skip, skip = _j === void 0 ? undefined : _j;
    return __asyncGenerator(this, arguments, function walk_1() {
        var _k, _l, entry, path, e_1_1;
        var e_1, _m;
        return __generator(this, function (_o) {
            switch (_o.label) {
                case 0:
                    if (!(maxDepth < 0)) return [3, 2];
                    return [4, __await(void 0)];
                case 1: return [2, _o.sent()];
                case 2:
                    if (!(includeDirs && include(root, exts, match, skip))) return [3, 6];
                    return [4, __await(_createWalkEntry(root))];
                case 3: return [4, __await.apply(void 0, [_o.sent()])];
                case 4: return [4, _o.sent()];
                case 5:
                    _o.sent();
                    _o.label = 6;
                case 6:
                    if (!(maxDepth < 1 || !include(root, undefined, undefined, skip))) return [3, 8];
                    return [4, __await(void 0)];
                case 7: return [2, _o.sent()];
                case 8:
                    _o.trys.push([8, 19, 20, 25]);
                    _k = __asyncValues(Deno.readDir(root));
                    _o.label = 9;
                case 9: return [4, __await(_k.next())];
                case 10:
                    if (!(_l = _o.sent(), !_l.done)) return [3, 18];
                    entry = _l.value;
                    if (entry.isSymlink) {
                        if (followSymlinks) {
                            throw new Error("unimplemented");
                        }
                        else {
                            return [3, 17];
                        }
                    }
                    (0, assert_ts_1.assert)(entry.name != null);
                    path = (0, mod_ts_1.join)(root, entry.name);
                    if (!entry.isFile) return [3, 14];
                    if (!(includeFiles && include(path, exts, match, skip))) return [3, 13];
                    return [4, __await(__assign({ path: path }, entry))];
                case 11: return [4, _o.sent()];
                case 12:
                    _o.sent();
                    _o.label = 13;
                case 13: return [3, 17];
                case 14: return [5, __values(__asyncDelegator(__asyncValues(walk(path, {
                        maxDepth: maxDepth - 1,
                        includeFiles: includeFiles,
                        includeDirs: includeDirs,
                        followSymlinks: followSymlinks,
                        exts: exts,
                        match: match,
                        skip: skip
                    }))))];
                case 15: return [4, __await.apply(void 0, [_o.sent()])];
                case 16:
                    _o.sent();
                    _o.label = 17;
                case 17: return [3, 9];
                case 18: return [3, 25];
                case 19:
                    e_1_1 = _o.sent();
                    e_1 = { error: e_1_1 };
                    return [3, 25];
                case 20:
                    _o.trys.push([20, , 23, 24]);
                    if (!(_l && !_l.done && (_m = _k["return"]))) return [3, 22];
                    return [4, __await(_m.call(_k))];
                case 21:
                    _o.sent();
                    _o.label = 22;
                case 22: return [3, 24];
                case 23:
                    if (e_1) throw e_1.error;
                    return [7];
                case 24: return [7];
                case 25: return [2];
            }
        });
    });
}
exports.walk = walk;
function walkSync(root, _a) {
    var _i, _b, entry, path;
    var _c = _a === void 0 ? {} : _a, _d = _c.maxDepth, maxDepth = _d === void 0 ? Infinity : _d, _e = _c.includeFiles, includeFiles = _e === void 0 ? true : _e, _f = _c.includeDirs, includeDirs = _f === void 0 ? true : _f, _g = _c.followSymlinks, followSymlinks = _g === void 0 ? false : _g, _h = _c.exts, exts = _h === void 0 ? undefined : _h, _j = _c.match, match = _j === void 0 ? undefined : _j, _k = _c.skip, skip = _k === void 0 ? undefined : _k;
    return __generator(this, function (_l) {
        switch (_l.label) {
            case 0:
                if (maxDepth < 0) {
                    return [2];
                }
                if (!(includeDirs && include(root, exts, match, skip))) return [3, 2];
                return [4, _createWalkEntrySync(root)];
            case 1:
                _l.sent();
                _l.label = 2;
            case 2:
                if (maxDepth < 1 || !include(root, undefined, undefined, skip)) {
                    return [2];
                }
                _i = 0, _b = Deno.readDirSync(root);
                _l.label = 3;
            case 3:
                if (!(_i < _b.length)) return [3, 9];
                entry = _b[_i];
                if (entry.isSymlink) {
                    if (followSymlinks) {
                        throw new Error("unimplemented");
                    }
                    else {
                        return [3, 8];
                    }
                }
                (0, assert_ts_1.assert)(entry.name != null);
                path = (0, mod_ts_1.join)(root, entry.name);
                if (!entry.isFile) return [3, 6];
                if (!(includeFiles && include(path, exts, match, skip))) return [3, 5];
                return [4, __assign({ path: path }, entry)];
            case 4:
                _l.sent();
                _l.label = 5;
            case 5: return [3, 8];
            case 6: return [5, __values(walkSync(path, {
                    maxDepth: maxDepth - 1,
                    includeFiles: includeFiles,
                    includeDirs: includeDirs,
                    followSymlinks: followSymlinks,
                    exts: exts,
                    match: match,
                    skip: skip
                }))];
            case 7:
                _l.sent();
                _l.label = 8;
            case 8:
                _i++;
                return [3, 3];
            case 9: return [2];
        }
    });
}
exports.walkSync = walkSync;
