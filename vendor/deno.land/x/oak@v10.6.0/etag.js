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
exports.__esModule = true;
exports.ifNoneMatch = exports.ifMatch = exports.factory = exports.calculate = exports.getEntity = void 0;
var deps_ts_1 = require("./deps.ts");
var util_ts_1 = require("./util.ts");
function isFileInfo(value) {
    return Boolean(value && typeof value === "object" && "mtime" in value && "size" in value);
}
function calcStatTag(entity) {
    var _a, _b;
    var mtime = (_b = (_a = entity.mtime) === null || _a === void 0 ? void 0 : _a.getTime().toString(16)) !== null && _b !== void 0 ? _b : "0";
    var size = entity.size.toString(16);
    return "\"".concat(size, "-").concat(mtime, "\"");
}
var encoder = new TextEncoder();
function calcEntityTag(entity) {
    return __awaiter(this, void 0, void 0, function () {
        var hash, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (entity.length === 0) {
                        return [2, "\"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk=\""];
                    }
                    if (typeof entity === "string") {
                        entity = encoder.encode(entity);
                    }
                    _b = (_a = deps_ts_1.base64).encode;
                    return [4, crypto.subtle.digest("SHA-1", entity)];
                case 1:
                    hash = _b.apply(_a, [_c.sent()])
                        .substring(0, 27);
                    return [2, "\"".concat(entity.length.toString(16), "-").concat(hash, "\"")];
            }
        });
    });
}
function fstat(file) {
    if ("fstat" in Deno) {
        return Deno.fstat(file.rid);
    }
    return Promise.resolve(undefined);
}
function getEntity(context) {
    var body = context.response.body;
    if (body instanceof Deno.FsFile) {
        return fstat(body);
    }
    if (body instanceof Uint8Array) {
        return Promise.resolve(body);
    }
    if (util_ts_1.BODY_TYPES.includes(typeof body)) {
        return Promise.resolve(String(body));
    }
    if ((0, util_ts_1.isAsyncIterable)(body) || (0, util_ts_1.isReader)(body)) {
        return Promise.resolve(undefined);
    }
    if (typeof body === "object" && body !== null) {
        try {
            var bodyText = JSON.stringify(body);
            return Promise.resolve(bodyText);
        }
        catch (_a) {
        }
    }
    return Promise.resolve(undefined);
}
exports.getEntity = getEntity;
function calculate(entity, options) {
    var _a;
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var weak, tag, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    weak = (_a = options.weak) !== null && _a !== void 0 ? _a : isFileInfo(entity);
                    if (!isFileInfo(entity)) return [3, 1];
                    _b = calcStatTag(entity);
                    return [3, 3];
                case 1: return [4, calcEntityTag(entity)];
                case 2:
                    _b = _c.sent();
                    _c.label = 3;
                case 3:
                    tag = _b;
                    return [2, weak ? "W/".concat(tag) : tag];
            }
        });
    });
}
exports.calculate = calculate;
function factory(options) {
    return function etag(context, next) {
        return __awaiter(this, void 0, void 0, function () {
            var entity, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4, next()];
                    case 1:
                        _d.sent();
                        if (!!context.response.headers.has("ETag")) return [3, 4];
                        return [4, getEntity(context)];
                    case 2:
                        entity = _d.sent();
                        if (!entity) return [3, 4];
                        _b = (_a = context.response.headers).set;
                        _c = ["ETag"];
                        return [4, calculate(entity, options)];
                    case 3:
                        _b.apply(_a, _c.concat([_d.sent()]));
                        _d.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
}
exports.factory = factory;
function ifMatch(value, entity, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var etag, tags;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, calculate(entity, options)];
                case 1:
                    etag = _a.sent();
                    if (etag.startsWith("W/")) {
                        return [2, false];
                    }
                    if (value.trim() === "*") {
                        return [2, true];
                    }
                    tags = value.split(/\s*,\s*/);
                    return [2, tags.includes(etag)];
            }
        });
    });
}
exports.ifMatch = ifMatch;
function ifNoneMatch(value, entity, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var etag, tags;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (value.trim() === "*") {
                        return [2, false];
                    }
                    return [4, calculate(entity, options)];
                case 1:
                    etag = _a.sent();
                    tags = value.split(/\s*,\s*/);
                    return [2, !tags.includes(etag)];
            }
        });
    });
}
exports.ifNoneMatch = ifNoneMatch;
