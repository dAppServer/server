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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _MultiPartStream_contentLength, _MultiPartStream_postscript, _MultiPartStream_preamble;
exports.__esModule = true;
exports.MultiPartStream = exports.parseRange = exports.ifRange = void 0;
var deps_ts_1 = require("./deps.ts");
var httpError_ts_1 = require("./httpError.ts");
var etag_ts_1 = require("./etag.ts");
var util_ts_1 = require("./util.ts");
var ETAG_RE = /(?:W\/)?"[ !#-\x7E\x80-\xFF]+"/;
function ifRange(value, mtime, entity) {
    return __awaiter(this, void 0, void 0, function () {
        var matches, match;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!value) return [3, 3];
                    matches = value.match(ETAG_RE);
                    if (!matches) return [3, 2];
                    match = matches[0];
                    return [4, (0, etag_ts_1.calculate)(entity)];
                case 1:
                    if ((_a.sent()) === match) {
                        return [2, true];
                    }
                    return [3, 3];
                case 2: return [2, new Date(value).getTime() >= mtime];
                case 3: return [2, false];
            }
        });
    });
}
exports.ifRange = ifRange;
function parseRange(value, size) {
    var ranges = [];
    var _a = value.split("="), unit = _a[0], rangesStr = _a[1];
    if (unit !== "bytes") {
        throw (0, httpError_ts_1.createHttpError)(deps_ts_1.Status.RequestedRangeNotSatisfiable);
    }
    for (var _i = 0, _b = rangesStr.split(/\s*,\s+/); _i < _b.length; _i++) {
        var range = _b[_i];
        var item = range.split("-");
        if (item.length !== 2) {
            throw (0, httpError_ts_1.createHttpError)(deps_ts_1.Status.RequestedRangeNotSatisfiable);
        }
        var startStr = item[0], endStr = item[1];
        var start = void 0;
        var end = void 0;
        try {
            if (startStr === "") {
                start = size - parseInt(endStr, 10) - 1;
                end = size - 1;
            }
            else if (endStr === "") {
                start = parseInt(startStr, 10);
                end = size - 1;
            }
            else {
                start = parseInt(startStr, 10);
                end = parseInt(endStr, 10);
            }
        }
        catch (_c) {
            throw (0, httpError_ts_1.createHttpError)();
        }
        if (start < 0 || start >= size || end < 0 || end >= size || start > end) {
            throw (0, httpError_ts_1.createHttpError)(deps_ts_1.Status.RequestedRangeNotSatisfiable);
        }
        ranges.push({ start: start, end: end });
    }
    return ranges;
}
exports.parseRange = parseRange;
function readRange(file, range) {
    return __awaiter(this, void 0, void 0, function () {
        var length, result, off, p, nread;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    length = range.end - range.start + 1;
                    (0, util_ts_1.assert)(length);
                    return [4, file.seek(range.start, Deno.SeekMode.Start)];
                case 1:
                    _a.sent();
                    result = new Uint8Array(length);
                    off = 0;
                    _a.label = 2;
                case 2:
                    if (!length) return [3, 4];
                    p = new Uint8Array(Math.min(length, util_ts_1.DEFAULT_CHUNK_SIZE));
                    return [4, file.read(p)];
                case 3:
                    nread = _a.sent();
                    (0, util_ts_1.assert)(nread !== null, "Unexpected EOF encountered when reading a range.");
                    (0, util_ts_1.assert)(nread > 0, "Unexpected read of 0 bytes while reading a range.");
                    (0, deps_ts_1.copyBytes)(p, result, off);
                    off += nread;
                    length -= nread;
                    (0, util_ts_1.assert)(length >= 0, "Unexpected length remaining.");
                    return [3, 2];
                case 4: return [2, result];
            }
        });
    });
}
var encoder = new TextEncoder();
var MultiPartStream = (function (_super) {
    __extends(MultiPartStream, _super);
    function MultiPartStream(file, type, ranges, size, boundary) {
        var _this = _super.call(this, {
            pull: function (controller) { return __awaiter(_this, void 0, void 0, function () {
                var range, bytes, rangeHeader;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            range = ranges.shift();
                            if (!range) {
                                controller.enqueue(__classPrivateFieldGet(this, _MultiPartStream_postscript, "f"));
                                controller.close();
                                if (!(file instanceof Uint8Array)) {
                                    file.close();
                                }
                                return [2];
                            }
                            if (!(file instanceof Uint8Array)) return [3, 1];
                            bytes = file.subarray(range.start, range.end + 1);
                            return [3, 3];
                        case 1: return [4, readRange(file, range)];
                        case 2:
                            bytes = _a.sent();
                            _a.label = 3;
                        case 3:
                            rangeHeader = encoder.encode("Content-Range: ".concat(range.start, "-").concat(range.end, "/").concat(size, "\n\n"));
                            controller.enqueue((0, deps_ts_1.concat)(__classPrivateFieldGet(this, _MultiPartStream_preamble, "f"), rangeHeader, bytes));
                            return [2];
                    }
                });
            }); }
        }) || this;
        _MultiPartStream_contentLength.set(_this, void 0);
        _MultiPartStream_postscript.set(_this, void 0);
        _MultiPartStream_preamble.set(_this, void 0);
        var resolvedType = (0, deps_ts_1.contentType)(type);
        if (!resolvedType) {
            throw new TypeError("Could not resolve media type for \"".concat(type, "\""));
        }
        __classPrivateFieldSet(_this, _MultiPartStream_preamble, encoder.encode("\n--".concat(boundary, "\nContent-Type: ").concat(resolvedType, "\n")), "f");
        __classPrivateFieldSet(_this, _MultiPartStream_postscript, encoder.encode("\n--".concat(boundary, "--\n")), "f");
        __classPrivateFieldSet(_this, _MultiPartStream_contentLength, ranges.reduce(function (prev, _a) {
            var start = _a.start, end = _a.end;
            return prev + __classPrivateFieldGet(_this, _MultiPartStream_preamble, "f").length + String(start).length +
                String(end).length + String(size).length + 20 + (end - start);
        }, __classPrivateFieldGet(_this, _MultiPartStream_postscript, "f").length), "f");
        return _this;
    }
    MultiPartStream.prototype.contentLength = function () {
        return __classPrivateFieldGet(this, _MultiPartStream_contentLength, "f");
    };
    return MultiPartStream;
}(ReadableStream));
exports.MultiPartStream = MultiPartStream;
_MultiPartStream_contentLength = new WeakMap(), _MultiPartStream_postscript = new WeakMap(), _MultiPartStream_preamble = new WeakMap();
