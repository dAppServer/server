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
exports.__esModule = true;
exports.FileWrapper = exports.Origin = exports.RELOAD_POLICY = void 0;
var deps_ts_1 = require("./deps.ts");
var file_fetcher_ts_1 = require("./file_fetcher.ts");
var cache_ts_1 = require("./cache.ts");
exports.RELOAD_POLICY = {
    maxAge: -1
};
function checkPolicy(file, policy) {
    if (!file.lstat.birthtime && !policy.strict)
        return true;
    if (!file.lstat.birthtime)
        return false;
    if (policy.maxAge < 0)
        return false;
    var now = new Date();
    var then = file.lstat.birthtime;
    var delta = (now.getTime() - then.getTime()) / 1000;
    var stale = delta > policy.maxAge;
    return stale;
}
var Origin;
(function (Origin) {
    Origin["CACHE"] = "cache";
    Origin["FETCH"] = "fetch";
})(Origin = exports.Origin || (exports.Origin = {}));
var FileWrapper = (function () {
    function FileWrapper(url, policy, ns) {
        this.url = url;
        this.policy = policy;
        this.ns = ns;
        this.hash = hash(url);
        this.path = path(url, ns);
        this.metapath = metapath(url, ns);
    }
    FileWrapper.prototype.exists = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, (0, deps_ts_1.exists)(this.path)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    FileWrapper.prototype.remove = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Deno.remove(this.path)];
                    case 1:
                        _a.sent();
                        return [4, Deno.remove(this.metapath)];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    FileWrapper.prototype.ensure = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, (0, deps_ts_1.ensureDir)((0, deps_ts_1.dirname)(this.path))];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    FileWrapper.prototype.read = function () {
        return __awaiter(this, void 0, void 0, function () {
            var meta, _a;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4, metaread(this.url, this.ns)];
                    case 1:
                        meta = _c.sent();
                        _a = [__assign({}, this)];
                        _b = {};
                        return [4, Deno.lstat(this.path)];
                    case 2: return [2, __assign.apply(void 0, _a.concat([(_b.lstat = _c.sent(), _b.meta = meta, _b.origin = Origin.CACHE, _b)]))];
                }
            });
        });
    };
    FileWrapper.prototype.fetch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var meta, _a;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4, (0, file_fetcher_ts_1.fetchFile)(this.url, this.path)];
                    case 1:
                        meta = _c.sent();
                        return [4, metasave(meta, this.url, this.ns)];
                    case 2:
                        _c.sent();
                        _a = [__assign({}, this)];
                        _b = {};
                        return [4, Deno.lstat(this.path)];
                    case 3: return [2, __assign.apply(void 0, _a.concat([(_b.lstat = _c.sent(), _b.meta = meta, _b.origin = Origin.FETCH, _b)]))];
                }
            });
        });
    };
    FileWrapper.prototype.get = function () {
        return __awaiter(this, void 0, void 0, function () {
            var file;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.ensure()];
                    case 1:
                        _a.sent();
                        return [4, this.exists()];
                    case 2:
                        if (!_a.sent()) return [3, 4];
                        return [4, this.read()];
                    case 3:
                        file = _a.sent();
                        if (!this.policy)
                            return [2, file];
                        if (checkPolicy(file, this.policy))
                            return [2, file];
                        _a.label = 4;
                    case 4: return [4, this.fetch()];
                    case 5: return [2, _a.sent()];
                }
            });
        });
    };
    return FileWrapper;
}());
exports.FileWrapper = FileWrapper;
function hash(url) {
    var formatted = "".concat(url.pathname).concat(url.search ? "?" + url.search : "");
    return (0, deps_ts_1.createHash)("sha256").update(formatted).toString();
}
function path(url, ns) {
    var path = [(0, cache_ts_1.directory)()];
    if (ns)
        path.push(ns);
    path = path.concat([url.protocol.slice(0, -1), url.hostname, hash(url)]);
    return (0, deps_ts_1.resolve)("".concat(deps_ts_1.join.apply(void 0, path)).concat((0, deps_ts_1.extname)(url.pathname)));
}
function metapath(url, ns) {
    return (0, deps_ts_1.resolve)("".concat(path(url, ns), ".metadata.json"));
}
function metasave(meta, url, ns) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, Deno.writeTextFile(metapath(url, ns), JSON.stringify(meta))];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    });
}
function metaread(url, ns) {
    return __awaiter(this, void 0, void 0, function () {
        var metadata;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, Deno.readTextFile(metapath(url, ns))];
                case 1:
                    metadata = _a.sent();
                    return [2, JSON.parse(metadata)];
            }
        });
    });
}
