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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
exports.copySync = exports.copy = void 0;
var path = require("../path/mod.ts");
var ensure_dir_ts_1 = require("./ensure_dir.ts");
var _util_ts_1 = require("./_util.ts");
var assert_ts_1 = require("../_util/assert.ts");
var isWindows = Deno.build.os === "windows";
function ensureValidCopy(src, dest, options, isCopyFolder) {
    if (isCopyFolder === void 0) { isCopyFolder = false; }
    return __awaiter(this, void 0, void 0, function () {
        var destStat, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4, Deno.lstat(dest)];
                case 1:
                    destStat = _a.sent();
                    return [3, 3];
                case 2:
                    err_1 = _a.sent();
                    if (err_1 instanceof Deno.errors.NotFound) {
                        return [2];
                    }
                    throw err_1;
                case 3:
                    if (isCopyFolder && !destStat.isDirectory) {
                        throw new Error("Cannot overwrite non-directory '".concat(dest, "' with directory '").concat(src, "'."));
                    }
                    if (!options.overwrite) {
                        throw new Error("'".concat(dest, "' already exists."));
                    }
                    return [2, destStat];
            }
        });
    });
}
function ensureValidCopySync(src, dest, options, isCopyFolder) {
    if (isCopyFolder === void 0) { isCopyFolder = false; }
    var destStat;
    try {
        destStat = Deno.lstatSync(dest);
    }
    catch (err) {
        if (err instanceof Deno.errors.NotFound) {
            return;
        }
        throw err;
    }
    if (isCopyFolder && !destStat.isDirectory) {
        throw new Error("Cannot overwrite non-directory '".concat(dest, "' with directory '").concat(src, "'."));
    }
    if (!options.overwrite) {
        throw new Error("'".concat(dest, "' already exists."));
    }
    return destStat;
}
function copyFile(src, dest, options) {
    return __awaiter(this, void 0, void 0, function () {
        var statInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, ensureValidCopy(src, dest, options)];
                case 1:
                    _a.sent();
                    return [4, Deno.copyFile(src, dest)];
                case 2:
                    _a.sent();
                    if (!options.preserveTimestamps) return [3, 5];
                    return [4, Deno.stat(src)];
                case 3:
                    statInfo = _a.sent();
                    (0, assert_ts_1.assert)(statInfo.atime instanceof Date, "statInfo.atime is unavailable");
                    (0, assert_ts_1.assert)(statInfo.mtime instanceof Date, "statInfo.mtime is unavailable");
                    return [4, Deno.utime(dest, statInfo.atime, statInfo.mtime)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [2];
            }
        });
    });
}
function copyFileSync(src, dest, options) {
    ensureValidCopySync(src, dest, options);
    Deno.copyFileSync(src, dest);
    if (options.preserveTimestamps) {
        var statInfo = Deno.statSync(src);
        (0, assert_ts_1.assert)(statInfo.atime instanceof Date, "statInfo.atime is unavailable");
        (0, assert_ts_1.assert)(statInfo.mtime instanceof Date, "statInfo.mtime is unavailable");
        Deno.utimeSync(dest, statInfo.atime, statInfo.mtime);
    }
}
function copySymLink(src, dest, options) {
    return __awaiter(this, void 0, void 0, function () {
        var originSrcFilePath, type, _a, statInfo;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4, ensureValidCopy(src, dest, options)];
                case 1:
                    _b.sent();
                    return [4, Deno.readLink(src)];
                case 2:
                    originSrcFilePath = _b.sent();
                    _a = _util_ts_1.getFileInfoType;
                    return [4, Deno.lstat(src)];
                case 3:
                    type = _a.apply(void 0, [_b.sent()]);
                    if (!isWindows) return [3, 5];
                    return [4, Deno.symlink(originSrcFilePath, dest, {
                            type: type === "dir" ? "dir" : "file"
                        })];
                case 4:
                    _b.sent();
                    return [3, 7];
                case 5: return [4, Deno.symlink(originSrcFilePath, dest)];
                case 6:
                    _b.sent();
                    _b.label = 7;
                case 7:
                    if (!options.preserveTimestamps) return [3, 10];
                    return [4, Deno.lstat(src)];
                case 8:
                    statInfo = _b.sent();
                    (0, assert_ts_1.assert)(statInfo.atime instanceof Date, "statInfo.atime is unavailable");
                    (0, assert_ts_1.assert)(statInfo.mtime instanceof Date, "statInfo.mtime is unavailable");
                    return [4, Deno.utime(dest, statInfo.atime, statInfo.mtime)];
                case 9:
                    _b.sent();
                    _b.label = 10;
                case 10: return [2];
            }
        });
    });
}
function copySymlinkSync(src, dest, options) {
    ensureValidCopySync(src, dest, options);
    var originSrcFilePath = Deno.readLinkSync(src);
    var type = (0, _util_ts_1.getFileInfoType)(Deno.lstatSync(src));
    if (isWindows) {
        Deno.symlinkSync(originSrcFilePath, dest, {
            type: type === "dir" ? "dir" : "file"
        });
    }
    else {
        Deno.symlinkSync(originSrcFilePath, dest);
    }
    if (options.preserveTimestamps) {
        var statInfo = Deno.lstatSync(src);
        (0, assert_ts_1.assert)(statInfo.atime instanceof Date, "statInfo.atime is unavailable");
        (0, assert_ts_1.assert)(statInfo.mtime instanceof Date, "statInfo.mtime is unavailable");
        Deno.utimeSync(dest, statInfo.atime, statInfo.mtime);
    }
}
function copyDir(src, dest, options) {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function () {
        var destStat, srcStatInfo, _b, _c, entry, srcPath, destPath, e_1_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4, ensureValidCopy(src, dest, options, true)];
                case 1:
                    destStat = _d.sent();
                    if (!!destStat) return [3, 3];
                    return [4, (0, ensure_dir_ts_1.ensureDir)(dest)];
                case 2:
                    _d.sent();
                    _d.label = 3;
                case 3:
                    if (!options.preserveTimestamps) return [3, 6];
                    return [4, Deno.stat(src)];
                case 4:
                    srcStatInfo = _d.sent();
                    (0, assert_ts_1.assert)(srcStatInfo.atime instanceof Date, "statInfo.atime is unavailable");
                    (0, assert_ts_1.assert)(srcStatInfo.mtime instanceof Date, "statInfo.mtime is unavailable");
                    return [4, Deno.utime(dest, srcStatInfo.atime, srcStatInfo.mtime)];
                case 5:
                    _d.sent();
                    _d.label = 6;
                case 6:
                    _d.trys.push([6, 16, 17, 22]);
                    _b = __asyncValues(Deno.readDir(src));
                    _d.label = 7;
                case 7: return [4, _b.next()];
                case 8:
                    if (!(_c = _d.sent(), !_c.done)) return [3, 15];
                    entry = _c.value;
                    srcPath = path.join(src, entry.name);
                    destPath = path.join(dest, path.basename(srcPath));
                    if (!entry.isSymlink) return [3, 10];
                    return [4, copySymLink(srcPath, destPath, options)];
                case 9:
                    _d.sent();
                    return [3, 14];
                case 10:
                    if (!entry.isDirectory) return [3, 12];
                    return [4, copyDir(srcPath, destPath, options)];
                case 11:
                    _d.sent();
                    return [3, 14];
                case 12:
                    if (!entry.isFile) return [3, 14];
                    return [4, copyFile(srcPath, destPath, options)];
                case 13:
                    _d.sent();
                    _d.label = 14;
                case 14: return [3, 7];
                case 15: return [3, 22];
                case 16:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3, 22];
                case 17:
                    _d.trys.push([17, , 20, 21]);
                    if (!(_c && !_c.done && (_a = _b["return"]))) return [3, 19];
                    return [4, _a.call(_b)];
                case 18:
                    _d.sent();
                    _d.label = 19;
                case 19: return [3, 21];
                case 20:
                    if (e_1) throw e_1.error;
                    return [7];
                case 21: return [7];
                case 22: return [2];
            }
        });
    });
}
function copyDirSync(src, dest, options) {
    var destStat = ensureValidCopySync(src, dest, options, true);
    if (!destStat) {
        (0, ensure_dir_ts_1.ensureDirSync)(dest);
    }
    if (options.preserveTimestamps) {
        var srcStatInfo = Deno.statSync(src);
        (0, assert_ts_1.assert)(srcStatInfo.atime instanceof Date, "statInfo.atime is unavailable");
        (0, assert_ts_1.assert)(srcStatInfo.mtime instanceof Date, "statInfo.mtime is unavailable");
        Deno.utimeSync(dest, srcStatInfo.atime, srcStatInfo.mtime);
    }
    for (var _i = 0, _a = Deno.readDirSync(src); _i < _a.length; _i++) {
        var entry = _a[_i];
        (0, assert_ts_1.assert)(entry.name != null, "file.name must be set");
        var srcPath = path.join(src, entry.name);
        var destPath = path.join(dest, path.basename(srcPath));
        if (entry.isSymlink) {
            copySymlinkSync(srcPath, destPath, options);
        }
        else if (entry.isDirectory) {
            copyDirSync(srcPath, destPath, options);
        }
        else if (entry.isFile) {
            copyFileSync(srcPath, destPath, options);
        }
    }
}
function copy(src, dest, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var srcStat;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    src = path.resolve(src);
                    dest = path.resolve(dest);
                    if (src === dest) {
                        throw new Error("Source and destination cannot be the same.");
                    }
                    return [4, Deno.lstat(src)];
                case 1:
                    srcStat = _a.sent();
                    if (srcStat.isDirectory && (0, _util_ts_1.isSubdir)(src, dest)) {
                        throw new Error("Cannot copy '".concat(src, "' to a subdirectory of itself, '").concat(dest, "'."));
                    }
                    if (!srcStat.isSymlink) return [3, 3];
                    return [4, copySymLink(src, dest, options)];
                case 2:
                    _a.sent();
                    return [3, 7];
                case 3:
                    if (!srcStat.isDirectory) return [3, 5];
                    return [4, copyDir(src, dest, options)];
                case 4:
                    _a.sent();
                    return [3, 7];
                case 5:
                    if (!srcStat.isFile) return [3, 7];
                    return [4, copyFile(src, dest, options)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: return [2];
            }
        });
    });
}
exports.copy = copy;
function copySync(src, dest, options) {
    if (options === void 0) { options = {}; }
    src = path.resolve(src);
    dest = path.resolve(dest);
    if (src === dest) {
        throw new Error("Source and destination cannot be the same.");
    }
    var srcStat = Deno.lstatSync(src);
    if (srcStat.isDirectory && (0, _util_ts_1.isSubdir)(src, dest)) {
        throw new Error("Cannot copy '".concat(src, "' to a subdirectory of itself, '").concat(dest, "'."));
    }
    if (srcStat.isSymlink) {
        copySymlinkSync(src, dest, options);
    }
    else if (srcStat.isDirectory) {
        copyDirSync(src, dest, options);
    }
    else if (srcStat.isFile) {
        copyFileSync(src, dest, options);
    }
}
exports.copySync = copySync;
