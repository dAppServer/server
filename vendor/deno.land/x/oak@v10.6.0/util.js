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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
exports.sign = exports.importKey = exports.isNode = exports.encodeBase64Safe = exports.Uint8ArrayTransformStream = exports.resolvePath = exports.stripEol = exports.skipLWSPChar = exports.isHtml = exports.isRedirectStatus = exports.isErrorStatus = exports.readableStreamFromReader = exports.readableStreamFromAsyncIterable = exports.isListenTlsOptions = exports.isConn = exports.isReader = exports.isRouterContext = exports.isAsyncIterable = exports.getBoundary = exports.getRandomFilename = exports.encodeUrl = exports.decodeComponent = exports.assert = exports.BODY_TYPES = exports.DEFAULT_CHUNK_SIZE = void 0;
var deps_ts_1 = require("./deps.ts");
var httpError_ts_1 = require("./httpError.ts");
var ENCODE_CHARS_REGEXP = /(?:[^\x21\x25\x26-\x3B\x3D\x3F-\x5B\x5D\x5F\x61-\x7A\x7E]|%(?:[^0-9A-Fa-f]|[0-9A-Fa-f][^0-9A-Fa-f]|$))+/g;
var HTAB = "\t".charCodeAt(0);
var SPACE = " ".charCodeAt(0);
var CR = "\r".charCodeAt(0);
var LF = "\n".charCodeAt(0);
var UNMATCHED_SURROGATE_PAIR_REGEXP = /(^|[^\uD800-\uDBFF])[\uDC00-\uDFFF]|[\uD800-\uDBFF]([^\uDC00-\uDFFF]|$)/g;
var UNMATCHED_SURROGATE_PAIR_REPLACE = "$1\uFFFD$2";
exports.DEFAULT_CHUNK_SIZE = 16640;
exports.BODY_TYPES = ["string", "number", "bigint", "boolean", "symbol"];
function assert(cond, msg) {
    if (msg === void 0) { msg = "Assertion failed"; }
    if (!cond) {
        throw new Error(msg);
    }
}
exports.assert = assert;
function decodeComponent(text) {
    try {
        return decodeURIComponent(text);
    }
    catch (_a) {
        return text;
    }
}
exports.decodeComponent = decodeComponent;
function encodeUrl(url) {
    return String(url)
        .replace(UNMATCHED_SURROGATE_PAIR_REGEXP, UNMATCHED_SURROGATE_PAIR_REPLACE)
        .replace(ENCODE_CHARS_REGEXP, encodeURI);
}
exports.encodeUrl = encodeUrl;
function bufferToHex(buffer) {
    var arr = Array.from(new Uint8Array(buffer));
    return arr.map(function (b) { return b.toString(16).padStart(2, "0"); }).join("");
}
function getRandomFilename(prefix, extension) {
    if (prefix === void 0) { prefix = ""; }
    if (extension === void 0) { extension = ""; }
    return __awaiter(this, void 0, void 0, function () {
        var buffer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, crypto.subtle.digest("SHA-1", crypto.getRandomValues(new Uint8Array(256)))];
                case 1:
                    buffer = _a.sent();
                    return [2, "".concat(prefix).concat(bufferToHex(buffer)).concat(extension ? ".".concat(extension) : "")];
            }
        });
    });
}
exports.getRandomFilename = getRandomFilename;
function getBoundary() {
    return __awaiter(this, void 0, void 0, function () {
        var buffer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, crypto.subtle.digest("SHA-1", crypto.getRandomValues(new Uint8Array(256)))];
                case 1:
                    buffer = _a.sent();
                    return [2, "oak_".concat(bufferToHex(buffer))];
            }
        });
    });
}
exports.getBoundary = getBoundary;
function isAsyncIterable(value) {
    return typeof value === "object" && value !== null &&
        Symbol.asyncIterator in value &&
        typeof value[Symbol.asyncIterator] === "function";
}
exports.isAsyncIterable = isAsyncIterable;
function isRouterContext(value) {
    return "params" in value;
}
exports.isRouterContext = isRouterContext;
function isReader(value) {
    return typeof value === "object" && value !== null && "read" in value &&
        typeof value.read === "function";
}
exports.isReader = isReader;
function isCloser(value) {
    return typeof value === "object" && value != null && "close" in value &&
        typeof value["close"] === "function";
}
function isConn(value) {
    return typeof value === "object" && value != null && "rid" in value &&
        typeof value.rid === "number" && "localAddr" in value &&
        "remoteAddr" in value;
}
exports.isConn = isConn;
function isListenTlsOptions(value) {
    return typeof value === "object" && value !== null &&
        ("cert" in value || "certFile" in value) &&
        ("key" in value || "keyFile" in value) && "port" in value;
}
exports.isListenTlsOptions = isListenTlsOptions;
function readableStreamFromAsyncIterable(source) {
    return new ReadableStream({
        start: function (controller) {
            var e_1, _a;
            return __awaiter(this, void 0, void 0, function () {
                var source_1, source_1_1, chunk, e_1_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 5, 6, 11]);
                            source_1 = __asyncValues(source);
                            _b.label = 1;
                        case 1: return [4, source_1.next()];
                        case 2:
                            if (!(source_1_1 = _b.sent(), !source_1_1.done)) return [3, 4];
                            chunk = source_1_1.value;
                            if (exports.BODY_TYPES.includes(typeof chunk)) {
                                controller.enqueue(encoder.encode(String(chunk)));
                            }
                            else if (chunk instanceof Uint8Array) {
                                controller.enqueue(chunk);
                            }
                            else if (ArrayBuffer.isView(chunk)) {
                                controller.enqueue(new Uint8Array(chunk.buffer));
                            }
                            else if (chunk instanceof ArrayBuffer) {
                                controller.enqueue(new Uint8Array(chunk));
                            }
                            else {
                                try {
                                    controller.enqueue(encoder.encode(JSON.stringify(chunk)));
                                }
                                catch (_c) {
                                }
                            }
                            _b.label = 3;
                        case 3: return [3, 1];
                        case 4: return [3, 11];
                        case 5:
                            e_1_1 = _b.sent();
                            e_1 = { error: e_1_1 };
                            return [3, 11];
                        case 6:
                            _b.trys.push([6, , 9, 10]);
                            if (!(source_1_1 && !source_1_1.done && (_a = source_1["return"]))) return [3, 8];
                            return [4, _a.call(source_1)];
                        case 7:
                            _b.sent();
                            _b.label = 8;
                        case 8: return [3, 10];
                        case 9:
                            if (e_1) throw e_1.error;
                            return [7];
                        case 10: return [7];
                        case 11:
                            controller.close();
                            return [2];
                    }
                });
            });
        }
    });
}
exports.readableStreamFromAsyncIterable = readableStreamFromAsyncIterable;
function readableStreamFromReader(reader, options) {
    if (options === void 0) { options = {}; }
    var _a = options.autoClose, autoClose = _a === void 0 ? true : _a, _b = options.chunkSize, chunkSize = _b === void 0 ? exports.DEFAULT_CHUNK_SIZE : _b, strategy = options.strategy;
    return new ReadableStream({
        pull: function (controller) {
            return __awaiter(this, void 0, void 0, function () {
                var chunk, read, e_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            chunk = new Uint8Array(chunkSize);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4, reader.read(chunk)];
                        case 2:
                            read = _a.sent();
                            if (read === null) {
                                if (isCloser(reader) && autoClose) {
                                    reader.close();
                                }
                                controller.close();
                                return [2];
                            }
                            controller.enqueue(chunk.subarray(0, read));
                            return [3, 4];
                        case 3:
                            e_2 = _a.sent();
                            controller.error(e_2);
                            if (isCloser(reader)) {
                                reader.close();
                            }
                            return [3, 4];
                        case 4: return [2];
                    }
                });
            });
        },
        cancel: function () {
            if (isCloser(reader) && autoClose) {
                reader.close();
            }
        }
    }, strategy);
}
exports.readableStreamFromReader = readableStreamFromReader;
function isErrorStatus(value) {
    return [
        deps_ts_1.Status.BadRequest,
        deps_ts_1.Status.Unauthorized,
        deps_ts_1.Status.PaymentRequired,
        deps_ts_1.Status.Forbidden,
        deps_ts_1.Status.NotFound,
        deps_ts_1.Status.MethodNotAllowed,
        deps_ts_1.Status.NotAcceptable,
        deps_ts_1.Status.ProxyAuthRequired,
        deps_ts_1.Status.RequestTimeout,
        deps_ts_1.Status.Conflict,
        deps_ts_1.Status.Gone,
        deps_ts_1.Status.LengthRequired,
        deps_ts_1.Status.PreconditionFailed,
        deps_ts_1.Status.RequestEntityTooLarge,
        deps_ts_1.Status.RequestURITooLong,
        deps_ts_1.Status.UnsupportedMediaType,
        deps_ts_1.Status.RequestedRangeNotSatisfiable,
        deps_ts_1.Status.ExpectationFailed,
        deps_ts_1.Status.Teapot,
        deps_ts_1.Status.MisdirectedRequest,
        deps_ts_1.Status.UnprocessableEntity,
        deps_ts_1.Status.Locked,
        deps_ts_1.Status.FailedDependency,
        deps_ts_1.Status.UpgradeRequired,
        deps_ts_1.Status.PreconditionRequired,
        deps_ts_1.Status.TooManyRequests,
        deps_ts_1.Status.RequestHeaderFieldsTooLarge,
        deps_ts_1.Status.UnavailableForLegalReasons,
        deps_ts_1.Status.InternalServerError,
        deps_ts_1.Status.NotImplemented,
        deps_ts_1.Status.BadGateway,
        deps_ts_1.Status.ServiceUnavailable,
        deps_ts_1.Status.GatewayTimeout,
        deps_ts_1.Status.HTTPVersionNotSupported,
        deps_ts_1.Status.VariantAlsoNegotiates,
        deps_ts_1.Status.InsufficientStorage,
        deps_ts_1.Status.LoopDetected,
        deps_ts_1.Status.NotExtended,
        deps_ts_1.Status.NetworkAuthenticationRequired,
    ].includes(value);
}
exports.isErrorStatus = isErrorStatus;
function isRedirectStatus(value) {
    return [
        deps_ts_1.Status.MultipleChoices,
        deps_ts_1.Status.MovedPermanently,
        deps_ts_1.Status.Found,
        deps_ts_1.Status.SeeOther,
        deps_ts_1.Status.UseProxy,
        deps_ts_1.Status.TemporaryRedirect,
        deps_ts_1.Status.PermanentRedirect,
    ].includes(value);
}
exports.isRedirectStatus = isRedirectStatus;
function isHtml(value) {
    return /^\s*<(?:!DOCTYPE|html|body)/i.test(value);
}
exports.isHtml = isHtml;
function skipLWSPChar(u8) {
    var result = new Uint8Array(u8.length);
    var j = 0;
    for (var i = 0; i < u8.length; i++) {
        if (u8[i] === SPACE || u8[i] === HTAB)
            continue;
        result[j++] = u8[i];
    }
    return result.slice(0, j);
}
exports.skipLWSPChar = skipLWSPChar;
function stripEol(value) {
    if (value[value.byteLength - 1] == LF) {
        var drop = 1;
        if (value.byteLength > 1 && value[value.byteLength - 2] === CR) {
            drop = 2;
        }
        return value.subarray(0, value.byteLength - drop);
    }
    return value;
}
exports.stripEol = stripEol;
var UP_PATH_REGEXP = /(?:^|[\\/])\.\.(?:[\\/]|$)/;
function resolvePath(rootPath, relativePath) {
    var path = relativePath;
    var root = rootPath;
    if (relativePath === undefined) {
        path = rootPath;
        root = ".";
    }
    if (path == null) {
        throw new TypeError("Argument relativePath is required.");
    }
    if (path.includes("\0")) {
        throw (0, httpError_ts_1.createHttpError)(400, "Malicious Path");
    }
    if ((0, deps_ts_1.isAbsolute)(path)) {
        throw (0, httpError_ts_1.createHttpError)(400, "Malicious Path");
    }
    if (UP_PATH_REGEXP.test((0, deps_ts_1.normalize)("." + deps_ts_1.sep + path))) {
        throw (0, httpError_ts_1.createHttpError)(403);
    }
    return (0, deps_ts_1.normalize)((0, deps_ts_1.join)(root, path));
}
exports.resolvePath = resolvePath;
var Uint8ArrayTransformStream = (function (_super) {
    __extends(Uint8ArrayTransformStream, _super);
    function Uint8ArrayTransformStream() {
        var init = {
            transform: function (chunk, controller) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, chunk];
                            case 1:
                                chunk = _a.sent();
                                switch (typeof chunk) {
                                    case "object":
                                        if (chunk === null) {
                                            controller.terminate();
                                        }
                                        else if (ArrayBuffer.isView(chunk)) {
                                            controller.enqueue(new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength));
                                        }
                                        else if (Array.isArray(chunk) &&
                                            chunk.every(function (value) { return typeof value === "number"; })) {
                                            controller.enqueue(new Uint8Array(chunk));
                                        }
                                        else if (typeof chunk.valueOf === "function" && chunk.valueOf() !== chunk) {
                                            this.transform(chunk.valueOf(), controller);
                                        }
                                        else if ("toJSON" in chunk) {
                                            this.transform(JSON.stringify(chunk), controller);
                                        }
                                        break;
                                    case "symbol":
                                        controller.error(new TypeError("Cannot transform a symbol to a Uint8Array"));
                                        break;
                                    case "undefined":
                                        controller.error(new TypeError("Cannot transform undefined to a Uint8Array"));
                                        break;
                                    default:
                                        controller.enqueue(this.encoder.encode(String(chunk)));
                                }
                                return [2];
                        }
                    });
                });
            },
            encoder: new TextEncoder()
        };
        return _super.call(this, init) || this;
    }
    return Uint8ArrayTransformStream;
}(TransformStream));
exports.Uint8ArrayTransformStream = Uint8ArrayTransformStream;
var replacements = {
    "/": "_",
    "+": "-",
    "=": ""
};
var encoder = new TextEncoder();
function encodeBase64Safe(data) {
    return deps_ts_1.base64.encode(data).replace(/\/|\+|=/g, function (c) { return replacements[c]; });
}
exports.encodeBase64Safe = encodeBase64Safe;
function isNode() {
    return "process" in globalThis && "global" in globalThis;
}
exports.isNode = isNode;
function importKey(key) {
    if (typeof key === "string") {
        key = encoder.encode(key);
    }
    else if (Array.isArray(key)) {
        key = new Uint8Array(key);
    }
    return crypto.subtle.importKey("raw", key, {
        name: "HMAC",
        hash: { name: "SHA-256" }
    }, true, ["sign", "verify"]);
}
exports.importKey = importKey;
function sign(data, key) {
    if (typeof data === "string") {
        data = encoder.encode(data);
    }
    else if (Array.isArray(data)) {
        data = Uint8Array.from(data);
    }
    return crypto.subtle.sign("HMAC", key, data);
}
exports.sign = sign;
