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
var _Response_instances, _Response_body, _Response_bodySet, _Response_domResponse, _Response_headers, _Response_request, _Response_resources, _Response_status, _Response_type, _Response_writable, _Response_getBodyInit, _Response_setContentType;
exports.__esModule = true;
exports.Response = exports.convertBodyToBodyInit = exports.REDIRECT_BACK = void 0;
var deps_ts_1 = require("./deps.ts");
var http_server_native_request_ts_1 = require("./http_server_native_request.ts");
var util_ts_1 = require("./util.ts");
exports.REDIRECT_BACK = Symbol("redirect backwards");
function convertBodyToBodyInit(body, type) {
    return __awaiter(this, void 0, void 0, function () {
        var result, result_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!util_ts_1.BODY_TYPES.includes(typeof body)) return [3, 1];
                    result = String(body);
                    type = type !== null && type !== void 0 ? type : ((0, util_ts_1.isHtml)(result) ? "html" : "text/plain");
                    return [3, 10];
                case 1:
                    if (!(0, util_ts_1.isReader)(body)) return [3, 2];
                    result = (0, util_ts_1.readableStreamFromReader)(body);
                    return [3, 10];
                case 2:
                    if (!(ArrayBuffer.isView(body) || body instanceof ArrayBuffer ||
                        body instanceof Blob || body instanceof URLSearchParams)) return [3, 3];
                    result = body;
                    return [3, 10];
                case 3:
                    if (!(body instanceof ReadableStream)) return [3, 4];
                    result = body.pipeThrough(new util_ts_1.Uint8ArrayTransformStream());
                    return [3, 10];
                case 4:
                    if (!(body instanceof FormData)) return [3, 5];
                    result = body;
                    type = "multipart/form-data";
                    return [3, 10];
                case 5:
                    if (!(0, util_ts_1.isAsyncIterable)(body)) return [3, 6];
                    result = (0, util_ts_1.readableStreamFromAsyncIterable)(body);
                    return [3, 10];
                case 6:
                    if (!(body && typeof body === "object")) return [3, 7];
                    result = JSON.stringify(body);
                    type = type !== null && type !== void 0 ? type : "json";
                    return [3, 10];
                case 7:
                    if (!(typeof body === "function")) return [3, 9];
                    result_1 = body.call(null);
                    _a = convertBodyToBodyInit;
                    return [4, result_1];
                case 8: return [2, _a.apply(void 0, [_b.sent(), type])];
                case 9:
                    if (body) {
                        throw new TypeError("Response body was set but could not be converted.");
                    }
                    _b.label = 10;
                case 10: return [2, [result, type]];
            }
        });
    });
}
exports.convertBodyToBodyInit = convertBodyToBodyInit;
var Response = (function () {
    function Response(request) {
        _Response_instances.add(this);
        _Response_body.set(this, void 0);
        _Response_bodySet.set(this, false);
        _Response_domResponse.set(this, void 0);
        _Response_headers.set(this, new Headers());
        _Response_request.set(this, void 0);
        _Response_resources.set(this, []);
        _Response_status.set(this, void 0);
        _Response_type.set(this, void 0);
        _Response_writable.set(this, true);
        __classPrivateFieldSet(this, _Response_request, request, "f");
    }
    Object.defineProperty(Response.prototype, "body", {
        get: function () {
            return __classPrivateFieldGet(this, _Response_body, "f");
        },
        set: function (value) {
            if (!__classPrivateFieldGet(this, _Response_writable, "f")) {
                throw new Error("The response is not writable.");
            }
            __classPrivateFieldSet(this, _Response_bodySet, true, "f");
            __classPrivateFieldSet(this, _Response_body, value, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Response.prototype, "headers", {
        get: function () {
            return __classPrivateFieldGet(this, _Response_headers, "f");
        },
        set: function (value) {
            if (!__classPrivateFieldGet(this, _Response_writable, "f")) {
                throw new Error("The response is not writable.");
            }
            __classPrivateFieldSet(this, _Response_headers, value, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Response.prototype, "status", {
        get: function () {
            if (__classPrivateFieldGet(this, _Response_status, "f")) {
                return __classPrivateFieldGet(this, _Response_status, "f");
            }
            return this.body != null
                ? deps_ts_1.Status.OK
                : __classPrivateFieldGet(this, _Response_bodySet, "f")
                    ? deps_ts_1.Status.NoContent
                    : deps_ts_1.Status.NotFound;
        },
        set: function (value) {
            if (!__classPrivateFieldGet(this, _Response_writable, "f")) {
                throw new Error("The response is not writable.");
            }
            __classPrivateFieldSet(this, _Response_status, value, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Response.prototype, "type", {
        get: function () {
            return __classPrivateFieldGet(this, _Response_type, "f");
        },
        set: function (value) {
            if (!__classPrivateFieldGet(this, _Response_writable, "f")) {
                throw new Error("The response is not writable.");
            }
            __classPrivateFieldSet(this, _Response_type, value, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Response.prototype, "writable", {
        get: function () {
            return __classPrivateFieldGet(this, _Response_writable, "f");
        },
        enumerable: false,
        configurable: true
    });
    Response.prototype.addResource = function (rid) {
        __classPrivateFieldGet(this, _Response_resources, "f").push(rid);
    };
    Response.prototype.destroy = function (closeResources) {
        if (closeResources === void 0) { closeResources = true; }
        __classPrivateFieldSet(this, _Response_writable, false, "f");
        __classPrivateFieldSet(this, _Response_body, undefined, "f");
        __classPrivateFieldSet(this, _Response_domResponse, undefined, "f");
        if (closeResources) {
            for (var _i = 0, _a = __classPrivateFieldGet(this, _Response_resources, "f"); _i < _a.length; _i++) {
                var rid = _a[_i];
                try {
                    Deno.close(rid);
                }
                catch (_b) {
                }
            }
        }
    };
    Response.prototype.redirect = function (url, alt) {
        var _a;
        if (alt === void 0) { alt = "/"; }
        if (url === exports.REDIRECT_BACK) {
            url = (_a = __classPrivateFieldGet(this, _Response_request, "f").headers.get("Referer")) !== null && _a !== void 0 ? _a : String(alt);
        }
        else if (typeof url === "object") {
            url = String(url);
        }
        this.headers.set("Location", (0, util_ts_1.encodeUrl)(url));
        if (!this.status || !(0, util_ts_1.isRedirectStatus)(this.status)) {
            this.status = deps_ts_1.Status.Found;
        }
        if (__classPrivateFieldGet(this, _Response_request, "f").accepts("html")) {
            url = encodeURI(url);
            this.type = "text/html; charset=utf-8";
            this.body = "Redirecting to <a href=\"".concat(url, "\">").concat(url, "</a>.");
            return;
        }
        this.type = "text/plain; charset=utf-8";
        this.body = "Redirecting to ".concat(url, ".");
    };
    Response.prototype.toDomResponse = function () {
        return __awaiter(this, void 0, void 0, function () {
            var bodyInit, headers, status, responseInit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (__classPrivateFieldGet(this, _Response_domResponse, "f")) {
                            return [2, __classPrivateFieldGet(this, _Response_domResponse, "f")];
                        }
                        return [4, __classPrivateFieldGet(this, _Response_instances, "m", _Response_getBodyInit).call(this)];
                    case 1:
                        bodyInit = _a.sent();
                        __classPrivateFieldGet(this, _Response_instances, "m", _Response_setContentType).call(this);
                        headers = this.headers;
                        if (!(bodyInit ||
                            headers.has("Content-Type") ||
                            headers.has("Content-Length"))) {
                            headers.append("Content-Length", "0");
                        }
                        __classPrivateFieldSet(this, _Response_writable, false, "f");
                        status = this.status;
                        responseInit = {
                            headers: headers,
                            status: status,
                            statusText: deps_ts_1.STATUS_TEXT.get(status)
                        };
                        return [2, __classPrivateFieldSet(this, _Response_domResponse, new http_server_native_request_ts_1.DomResponse(bodyInit, responseInit), "f")];
                }
            });
        });
    };
    Response.prototype[(_Response_body = new WeakMap(), _Response_bodySet = new WeakMap(), _Response_domResponse = new WeakMap(), _Response_headers = new WeakMap(), _Response_request = new WeakMap(), _Response_resources = new WeakMap(), _Response_status = new WeakMap(), _Response_type = new WeakMap(), _Response_writable = new WeakMap(), _Response_instances = new WeakSet(), _Response_getBodyInit = function _Response_getBodyInit() {
        var _a = await convertBodyToBodyInit(this.body, this.type), body = _a[0], type = _a[1];
        this.type = type;
        return body;
    }, _Response_setContentType = function _Response_setContentType() {
        if (this.type) {
            var contentTypeString = (0, deps_ts_1.contentType)(this.type);
            if (contentTypeString && !this.headers.has("Content-Type")) {
                this.headers.append("Content-Type", contentTypeString);
            }
        }
    }, Symbol["for"]("Deno.customInspect"))] = function (inspect) {
        var _a = this, body = _a.body, headers = _a.headers, status = _a.status, type = _a.type, writable = _a.writable;
        return "".concat(this.constructor.name, " ").concat(inspect({ body: body, headers: headers, status: status, type: type, writable: writable }));
    };
    Response.prototype[Symbol["for"]("nodejs.util.inspect.custom")] = function (depth, options, inspect) {
        if (depth < 0) {
            return options.stylize("[".concat(this.constructor.name, "]"), "special");
        }
        var newOptions = Object.assign({}, options, {
            depth: options.depth === null ? null : options.depth - 1
        });
        var _a = this, body = _a.body, headers = _a.headers, status = _a.status, type = _a.type, writable = _a.writable;
        return "".concat(options.stylize(this.constructor.name, "special"), " ").concat(inspect({ body: body, headers: headers, status: status, type: type, writable: writable }, newOptions));
    };
    return Response;
}());
exports.Response = Response;
