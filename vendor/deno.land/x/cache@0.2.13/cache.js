"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Wrapper_namespace;
exports.__esModule = true;
exports.options = exports.purge = exports.remove = exports.exists = exports.cache = exports.directory = exports.configure = exports.global = exports.namespace = exports.CacheError = exports.Wrapper = exports.RELOAD_POLICY = exports.Origin = void 0;
var deps_ts_1 = require("./deps.ts");
var directories_ts_1 = require("./directories.ts");
var file_ts_1 = require("./file.ts");
exports.Origin = file_ts_1.Origin;
exports.RELOAD_POLICY = file_ts_1.RELOAD_POLICY;
var helpers_ts_1 = require("./helpers.ts");
var Wrapper = (function () {
    function Wrapper(ns) {
        _Wrapper_namespace.set(this, void 0);
        __classPrivateFieldSet(this, _Wrapper_namespace, ns, "f");
    }
    Wrapper.prototype.cache = function (url, policy) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, cache(url, policy, __classPrivateFieldGet(this, _Wrapper_namespace, "f"))];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Wrapper.prototype.remove = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, remove(url, __classPrivateFieldGet(this, _Wrapper_namespace, "f"))];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Wrapper.prototype.exists = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, exists(url, __classPrivateFieldGet(this, _Wrapper_namespace, "f"))];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Wrapper.prototype.purge = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, purge(__classPrivateFieldGet(this, _Wrapper_namespace, "f"))];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    return Wrapper;
}());
exports.Wrapper = Wrapper;
_Wrapper_namespace = new WeakMap();
var CacheError = (function (_super) {
    __extends(CacheError, _super);
    function CacheError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "CacheError";
        return _this;
    }
    return CacheError;
}(Error));
exports.CacheError = CacheError;
function namespace(ns) {
    return new Wrapper(ns);
}
exports.namespace = namespace;
function global() {
    return new Wrapper();
}
exports.global = global;
function configure(opts) {
    exports.options = opts;
}
exports.configure = configure;
function directory() {
    var _a;
    return (_a = exports.options.directory) !== null && _a !== void 0 ? _a : (0, directories_ts_1.cachedir)();
}
exports.directory = directory;
function cache(url, policy, ns) {
    return __awaiter(this, void 0, void 0, function () {
        var wrapper;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wrapper = new file_ts_1.FileWrapper((0, helpers_ts_1.toURL)(url), policy, ns);
                    return [4, wrapper.get()];
                case 1: return [2, _a.sent()];
            }
        });
    });
}
exports.cache = cache;
function exists(url, ns) {
    return __awaiter(this, void 0, void 0, function () {
        var wrapper;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wrapper = new file_ts_1.FileWrapper((0, helpers_ts_1.toURL)(url), undefined, ns);
                    return [4, wrapper.exists()];
                case 1: return [2, _a.sent()];
            }
        });
    });
}
exports.exists = exists;
function remove(url, ns) {
    return __awaiter(this, void 0, void 0, function () {
        var wrapper;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wrapper = new file_ts_1.FileWrapper((0, helpers_ts_1.toURL)(url), undefined, ns);
                    return [4, wrapper.exists()];
                case 1:
                    if (!(_a.sent()))
                        return [2, false];
                    return [4, wrapper.remove()];
                case 2:
                    _a.sent();
                    return [2, true];
            }
        });
    });
}
exports.remove = remove;
function purge(ns) {
    return __awaiter(this, void 0, void 0, function () {
        var dir, path;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dir = [directory()];
                    if (ns)
                        dir.push(ns);
                    path = deps_ts_1.join.apply(void 0, dir);
                    return [4, (0, deps_ts_1.exists)(path)];
                case 1:
                    if (!(_a.sent()))
                        return [2, false];
                    return [4, Deno.remove(path, { recursive: true })];
                case 2:
                    _a.sent();
                    return [2, true];
            }
        });
    });
}
exports.purge = purge;
exports.options = {
    directory: undefined
};
