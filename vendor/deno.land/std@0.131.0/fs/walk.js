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
function wrapErrorWithRootPath(err, root) {
    if (err instanceof Error && "root" in err)
        return err;
    var e = new Error();
    e.root = root;
    e.message = err instanceof Error
        ? "".concat(err.message, " for path \"").concat(root, "\"")
        : "[non-error thrown] for path \"".concat(root, "\"");
    e.stack = err instanceof Error ? err.stack : undefined;
    e.cause = err instanceof Error ? err.cause : undefined;
    return e;
}
function walk(root, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.maxDepth, maxDepth = _c === void 0 ? Infinity : _c, _d = _b.includeFiles, includeFiles = _d === void 0 ? true : _d, _e = _b.includeDirs, includeDirs = _e === void 0 ? true : _e, _f = _b.followSymlinks, followSymlinks = _f === void 0 ? false : _f, _g = _b.exts, exts = _g === void 0 ? undefined : _g, _h = _b.match, match = _h === void 0 ? undefined : _h, _j = _b.skip, skip = _j === void 0 ? undefined : _j;
    return __asyncGenerator(this, arguments, function walk_1() {
        var _k, _l, entry, path, isSymlink, isDirectory, e_1_1, err_1;
        var _m;
        var e_1, _o;
        return __generator(this, function (_p) {
            switch (_p.label) {
                case 0:
                    if (!(maxDepth < 0)) return [3, 2];
                    return [4, __await(void 0)];
                case 1: return [2, _p.sent()];
                case 2:
                    if (!(includeDirs && include(root, exts, match, skip))) return [3, 6];
                    return [4, __await(_createWalkEntry(root))];
                case 3: return [4, __await.apply(void 0, [_p.sent()])];
                case 4: return [4, _p.sent()];
                case 5:
                    _p.sent();
                    _p.label = 6;
                case 6:
                    if (!(maxDepth < 1 || !include(root, undefined, undefined, skip))) return [3, 8];
                    return [4, __await(void 0)];
                case 7: return [2, _p.sent()];
                case 8:
                    _p.trys.push([8, 29, , 30]);
                    _p.label = 9;
                case 9:
                    _p.trys.push([9, 22, 23, 28]);
                    _k = __asyncValues(Deno.readDir(root));
                    _p.label = 10;
                case 10: return [4, __await(_k.next())];
                case 11:
                    if (!(_l = _p.sent(), !_l.done)) return [3, 21];
                    entry = _l.value;
                    (0, assert_ts_1.assert)(entry.name != null);
                    path = (0, mod_ts_1.join)(root, entry.name);
                    isSymlink = entry.isSymlink, isDirectory = entry.isDirectory;
                    if (!isSymlink) return [3, 14];
                    if (!followSymlinks)
                        return [3, 20];
                    return [4, __await(Deno.realPath(path))];
                case 12:
                    path = _p.sent();
                    return [4, __await(Deno.lstat(path))];
                case 13:
                    (_m = _p.sent(), isSymlink = _m.isSymlink, isDirectory = _m.isDirectory);
                    _p.label = 14;
                case 14:
                    if (!(isSymlink || isDirectory)) return [3, 17];
                    return [5, __values(__asyncDelegator(__asyncValues(walk(path, {
                            maxDepth: maxDepth - 1,
                            includeFiles: includeFiles,
                            includeDirs: includeDirs,
                            followSymlinks: followSymlinks,
                            exts: exts,
                            match: match,
                            skip: skip
                        }))))];
                case 15: return [4, __await.apply(void 0, [_p.sent()])];
                case 16:
                    _p.sent();
                    return [3, 20];
                case 17:
                    if (!(includeFiles && include(path, exts, match, skip))) return [3, 20];
                    return [4, __await(__assign({ path: path }, entry))];
                case 18: return [4, _p.sent()];
                case 19:
                    _p.sent();
                    _p.label = 20;
                case 20: return [3, 10];
                case 21: return [3, 28];
                case 22:
                    e_1_1 = _p.sent();
                    e_1 = { error: e_1_1 };
                    return [3, 28];
                case 23:
                    _p.trys.push([23, , 26, 27]);
                    if (!(_l && !_l.done && (_o = _k["return"]))) return [3, 25];
                    return [4, __await(_o.call(_k))];
                case 24:
                    _p.sent();
                    _p.label = 25;
                case 25: return [3, 27];
                case 26:
                    if (e_1) throw e_1.error;
                    return [7];
                case 27: return [7];
                case 28: return [3, 30];
                case 29:
                    err_1 = _p.sent();
                    throw wrapErrorWithRootPath(err_1, (0, mod_ts_1.normalize)(root));
                case 30: return [2];
            }
        });
    });
}
exports.walk = walk;
function walkSync(root, _a) {
    var entries, _i, entries_1, entry, path, isSymlink, isDirectory;
    var _b;
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
                try {
                    entries = Deno.readDirSync(root);
                }
                catch (err) {
                    throw wrapErrorWithRootPath(err, (0, mod_ts_1.normalize)(root));
                }
                _i = 0, entries_1 = entries;
                _l.label = 3;
            case 3:
                if (!(_i < entries_1.length)) return [3, 8];
                entry = entries_1[_i];
                (0, assert_ts_1.assert)(entry.name != null);
                path = (0, mod_ts_1.join)(root, entry.name);
                isSymlink = entry.isSymlink, isDirectory = entry.isDirectory;
                if (isSymlink) {
                    if (!followSymlinks)
                        return [3, 7];
                    path = Deno.realPathSync(path);
                    (_b = Deno.lstatSync(path), isSymlink = _b.isSymlink, isDirectory = _b.isDirectory);
                }
                if (!(isSymlink || isDirectory)) return [3, 5];
                return [5, __values(walkSync(path, {
                        maxDepth: maxDepth - 1,
                        includeFiles: includeFiles,
                        includeDirs: includeDirs,
                        followSymlinks: followSymlinks,
                        exts: exts,
                        match: match,
                        skip: skip
                    }))];
            case 4:
                _l.sent();
                return [3, 7];
            case 5:
                if (!(includeFiles && include(path, exts, match, skip))) return [3, 7];
                return [4, __assign({ path: path }, entry)];
            case 6:
                _l.sent();
                _l.label = 7;
            case 7:
                _i++;
                return [3, 3];
            case 8: return [2];
        }
    });
}
exports.walkSync = walkSync;
