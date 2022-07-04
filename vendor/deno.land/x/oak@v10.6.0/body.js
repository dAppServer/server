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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _RequestBody_instances, _RequestBody_body, _RequestBody_formDataReader, _RequestBody_headers, _RequestBody_stream, _RequestBody_readAllBody, _RequestBody_readBody, _RequestBody_type, _RequestBody_exceedsLimit, _RequestBody_parse, _RequestBody_validateGetArgs, _RequestBody_valuePromise;
exports.__esModule = true;
exports.RequestBody = void 0;
var deps_ts_1 = require("./deps.ts");
var httpError_ts_1 = require("./httpError.ts");
var isMediaType_ts_1 = require("./isMediaType.ts");
var multipart_ts_1 = require("./multipart.ts");
var util_ts_1 = require("./util.ts");
var DEFAULT_LIMIT = 10485760;
var defaultBodyContentTypes = {
    json: ["json", "application/*+json", "application/csp-report"],
    form: ["urlencoded"],
    formData: ["multipart"],
    text: ["text"]
};
function resolveType(contentType, contentTypes) {
    var _a, _b, _c, _d;
    var contentTypesJson = __spreadArray(__spreadArray([], defaultBodyContentTypes.json, true), ((_a = contentTypes.json) !== null && _a !== void 0 ? _a : []), true);
    var contentTypesForm = __spreadArray(__spreadArray([], defaultBodyContentTypes.form, true), ((_b = contentTypes.form) !== null && _b !== void 0 ? _b : []), true);
    var contentTypesFormData = __spreadArray(__spreadArray([], defaultBodyContentTypes.formData, true), ((_c = contentTypes.formData) !== null && _c !== void 0 ? _c : []), true);
    var contentTypesText = __spreadArray(__spreadArray([], defaultBodyContentTypes.text, true), ((_d = contentTypes.text) !== null && _d !== void 0 ? _d : []), true);
    if (contentTypes.bytes && (0, isMediaType_ts_1.isMediaType)(contentType, contentTypes.bytes)) {
        return "bytes";
    }
    else if ((0, isMediaType_ts_1.isMediaType)(contentType, contentTypesJson)) {
        return "json";
    }
    else if ((0, isMediaType_ts_1.isMediaType)(contentType, contentTypesForm)) {
        return "form";
    }
    else if ((0, isMediaType_ts_1.isMediaType)(contentType, contentTypesFormData)) {
        return "form-data";
    }
    else if ((0, isMediaType_ts_1.isMediaType)(contentType, contentTypesText)) {
        return "text";
    }
    return "bytes";
}
var decoder = new TextDecoder();
var RequestBody = (function () {
    function RequestBody(_a, headers) {
        var body = _a.body, readBody = _a.readBody;
        _RequestBody_instances.add(this);
        _RequestBody_body.set(this, void 0);
        _RequestBody_formDataReader.set(this, void 0);
        _RequestBody_headers.set(this, void 0);
        _RequestBody_stream.set(this, void 0);
        _RequestBody_readAllBody.set(this, void 0);
        _RequestBody_readBody.set(this, void 0);
        _RequestBody_type.set(this, void 0);
        __classPrivateFieldSet(this, _RequestBody_body, body, "f");
        __classPrivateFieldSet(this, _RequestBody_headers, headers, "f");
        __classPrivateFieldSet(this, _RequestBody_readBody, readBody, "f");
    }
    RequestBody.prototype.get = function (_a) {
        var _b, _c;
        var _d = _a === void 0 ? {} : _a, _e = _d.limit, limit = _e === void 0 ? DEFAULT_LIMIT : _e, type = _d.type, _f = _d.contentTypes, contentTypes = _f === void 0 ? {} : _f;
        __classPrivateFieldGet(this, _RequestBody_instances, "m", _RequestBody_validateGetArgs).call(this, type, contentTypes);
        if (type === "reader") {
            if (!__classPrivateFieldGet(this, _RequestBody_body, "f")) {
                __classPrivateFieldSet(this, _RequestBody_type, "undefined", "f");
                throw new TypeError("Body is undefined and cannot be returned as \"reader\".");
            }
            __classPrivateFieldSet(this, _RequestBody_type, "reader", "f");
            return {
                type: type,
                value: (0, deps_ts_1.readerFromStreamReader)(__classPrivateFieldGet(this, _RequestBody_body, "f").getReader())
            };
        }
        if (type === "stream") {
            if (!__classPrivateFieldGet(this, _RequestBody_body, "f")) {
                __classPrivateFieldSet(this, _RequestBody_type, "undefined", "f");
                throw new TypeError("Body is undefined and cannot be returned as \"stream\".");
            }
            __classPrivateFieldSet(this, _RequestBody_type, "stream", "f");
            var streams = ((_b = __classPrivateFieldGet(this, _RequestBody_stream, "f")) !== null && _b !== void 0 ? _b : __classPrivateFieldGet(this, _RequestBody_body, "f"))
                .tee();
            __classPrivateFieldSet(this, _RequestBody_stream, streams[1], "f");
            return { type: type, value: streams[0] };
        }
        if (!this.has()) {
            __classPrivateFieldSet(this, _RequestBody_type, "undefined", "f");
        }
        else if (!__classPrivateFieldGet(this, _RequestBody_type, "f")) {
            var encoding = (_c = __classPrivateFieldGet(this, _RequestBody_headers, "f").get("content-encoding")) !== null && _c !== void 0 ? _c : "identity";
            if (encoding !== "identity") {
                throw new httpError_ts_1.httpErrors.UnsupportedMediaType("Unsupported content-encoding: ".concat(encoding));
            }
        }
        if (__classPrivateFieldGet(this, _RequestBody_type, "f") === "undefined" && (!type || type === "undefined")) {
            return { type: "undefined", value: undefined };
        }
        if (!type) {
            var contentType = __classPrivateFieldGet(this, _RequestBody_headers, "f").get("content-type");
            (0, util_ts_1.assert)(contentType, "The Content-Type header is missing from the request");
            type = resolveType(contentType, contentTypes);
        }
        (0, util_ts_1.assert)(type);
        var body = Object.create(null);
        Object.defineProperties(body, {
            type: {
                value: type,
                configurable: true,
                enumerable: true
            },
            value: {
                get: __classPrivateFieldGet(this, _RequestBody_instances, "m", _RequestBody_parse).call(this, type, limit),
                configurable: true,
                enumerable: true
            }
        });
        return body;
    };
    RequestBody.prototype.has = function () {
        return __classPrivateFieldGet(this, _RequestBody_body, "f") != null;
    };
    return RequestBody;
}());
exports.RequestBody = RequestBody;
_RequestBody_body = new WeakMap(), _RequestBody_formDataReader = new WeakMap(), _RequestBody_headers = new WeakMap(), _RequestBody_stream = new WeakMap(), _RequestBody_readAllBody = new WeakMap(), _RequestBody_readBody = new WeakMap(), _RequestBody_type = new WeakMap(), _RequestBody_instances = new WeakSet(), _RequestBody_exceedsLimit = function _RequestBody_exceedsLimit(limit) {
    if (!limit || limit === Infinity) {
        return false;
    }
    if (!__classPrivateFieldGet(this, _RequestBody_body, "f")) {
        return false;
    }
    var contentLength = __classPrivateFieldGet(this, _RequestBody_headers, "f").get("content-length");
    if (!contentLength) {
        return true;
    }
    var parsed = parseInt(contentLength, 10);
    if (isNaN(parsed)) {
        return true;
    }
    return parsed > limit;
}, _RequestBody_parse = function _RequestBody_parse(type, limit) {
    var _this = this;
    switch (type) {
        case "form":
            __classPrivateFieldSet(this, _RequestBody_type, "bytes", "f");
            if (__classPrivateFieldGet(this, _RequestBody_instances, "m", _RequestBody_exceedsLimit).call(this, limit)) {
                return function () {
                    return Promise.reject(new RangeError("Body exceeds a limit of ".concat(limit, ".")));
                };
            }
            return function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = URLSearchParams.bind;
                            _c = (_b = decoder).decode;
                            return [4, __classPrivateFieldGet(this, _RequestBody_instances, "m", _RequestBody_valuePromise).call(this)];
                        case 1: return [2, new (_a.apply(URLSearchParams, [void 0, _c.apply(_b, [_d.sent()]).replace(/\+/g, " ")]))()];
                    }
                });
            }); };
        case "form-data":
            __classPrivateFieldSet(this, _RequestBody_type, "form-data", "f");
            return function () {
                var _a, _b;
                var contentType = __classPrivateFieldGet(_this, _RequestBody_headers, "f").get("content-type");
                (0, util_ts_1.assert)(contentType);
                var readableStream = (_a = __classPrivateFieldGet(_this, _RequestBody_body, "f")) !== null && _a !== void 0 ? _a : new ReadableStream();
                return (_b = __classPrivateFieldGet(_this, _RequestBody_formDataReader, "f")) !== null && _b !== void 0 ? _b : (__classPrivateFieldSet(_this, _RequestBody_formDataReader, new multipart_ts_1.FormDataReader(contentType, (0, deps_ts_1.readerFromStreamReader)(readableStream.getReader())), "f"));
            };
        case "json":
            __classPrivateFieldSet(this, _RequestBody_type, "bytes", "f");
            if (__classPrivateFieldGet(this, _RequestBody_instances, "m", _RequestBody_exceedsLimit).call(this, limit)) {
                return function () {
                    return Promise.reject(new RangeError("Body exceeds a limit of ".concat(limit, ".")));
                };
            }
            return function () { return __awaiter(_this, void 0, void 0, function () { var _a, _b, _c, _d; return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = (_a = JSON).parse;
                        _d = (_c = decoder).decode;
                        return [4, __classPrivateFieldGet(this, _RequestBody_instances, "m", _RequestBody_valuePromise).call(this)];
                    case 1: return [2, _b.apply(_a, [_d.apply(_c, [_e.sent()])])];
                }
            }); }); };
        case "bytes":
            __classPrivateFieldSet(this, _RequestBody_type, "bytes", "f");
            if (__classPrivateFieldGet(this, _RequestBody_instances, "m", _RequestBody_exceedsLimit).call(this, limit)) {
                return function () {
                    return Promise.reject(new RangeError("Body exceeds a limit of ".concat(limit, ".")));
                };
            }
            return function () { return __classPrivateFieldGet(_this, _RequestBody_instances, "m", _RequestBody_valuePromise).call(_this); };
        case "text":
            __classPrivateFieldSet(this, _RequestBody_type, "bytes", "f");
            if (__classPrivateFieldGet(this, _RequestBody_instances, "m", _RequestBody_exceedsLimit).call(this, limit)) {
                return function () {
                    return Promise.reject(new RangeError("Body exceeds a limit of ".concat(limit, ".")));
                };
            }
            return function () { return __awaiter(_this, void 0, void 0, function () { var _a, _b; return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = decoder).decode;
                        return [4, __classPrivateFieldGet(this, _RequestBody_instances, "m", _RequestBody_valuePromise).call(this)];
                    case 1: return [2, _b.apply(_a, [_c.sent()])];
                }
            }); }); };
        default:
            throw new TypeError("Invalid body type: \"".concat(type, "\""));
    }
}, _RequestBody_validateGetArgs = function _RequestBody_validateGetArgs(type, contentTypes) {
    if (type === "reader" && __classPrivateFieldGet(this, _RequestBody_type, "f") && __classPrivateFieldGet(this, _RequestBody_type, "f") !== "reader") {
        throw new TypeError("Body already consumed as \"".concat(__classPrivateFieldGet(this, _RequestBody_type, "f"), "\" and cannot be returned as a reader."));
    }
    if (type === "stream" && __classPrivateFieldGet(this, _RequestBody_type, "f") && __classPrivateFieldGet(this, _RequestBody_type, "f") !== "stream") {
        throw new TypeError("Body already consumed as \"".concat(__classPrivateFieldGet(this, _RequestBody_type, "f"), "\" and cannot be returned as a stream."));
    }
    if (type === "form-data" && __classPrivateFieldGet(this, _RequestBody_type, "f") && __classPrivateFieldGet(this, _RequestBody_type, "f") !== "form-data") {
        throw new TypeError("Body already consumed as \"".concat(__classPrivateFieldGet(this, _RequestBody_type, "f"), "\" and cannot be returned as a stream."));
    }
    if (__classPrivateFieldGet(this, _RequestBody_type, "f") === "reader" && type !== "reader") {
        throw new TypeError("Body already consumed as a reader and can only be returned as a reader.");
    }
    if (__classPrivateFieldGet(this, _RequestBody_type, "f") === "stream" && type !== "stream") {
        throw new TypeError("Body already consumed as a stream and can only be returned as a stream.");
    }
    if (__classPrivateFieldGet(this, _RequestBody_type, "f") === "form-data" && type !== "form-data") {
        throw new TypeError("Body already consumed as form data and can only be returned as form data.");
    }
    if (type && Object.keys(contentTypes).length) {
        throw new TypeError("\"type\" and \"contentTypes\" cannot be specified at the same time");
    }
}, _RequestBody_valuePromise = function _RequestBody_valuePromise() {
    var _a;
    return (_a = __classPrivateFieldGet(this, _RequestBody_readAllBody, "f")) !== null && _a !== void 0 ? _a : (__classPrivateFieldSet(this, _RequestBody_readAllBody, __classPrivateFieldGet(this, _RequestBody_readBody, "f").call(this), "f"));
};
