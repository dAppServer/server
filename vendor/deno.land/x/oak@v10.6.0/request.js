"use strict";
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
var _Request_instances, _Request_body, _Request_proxy, _Request_secure, _Request_serverRequest, _Request_url, _Request_getRemoteAddr;
exports.__esModule = true;
exports.Request = void 0;
var body_ts_1 = require("./body.ts");
var charset_ts_1 = require("./negotiation/charset.ts");
var encoding_ts_1 = require("./negotiation/encoding.ts");
var language_ts_1 = require("./negotiation/language.ts");
var mediaType_ts_1 = require("./negotiation/mediaType.ts");
var Request = (function () {
    function Request(serverRequest, proxy, secure) {
        if (proxy === void 0) { proxy = false; }
        if (secure === void 0) { secure = false; }
        _Request_instances.add(this);
        _Request_body.set(this, void 0);
        _Request_proxy.set(this, void 0);
        _Request_secure.set(this, void 0);
        _Request_serverRequest.set(this, void 0);
        _Request_url.set(this, void 0);
        __classPrivateFieldSet(this, _Request_proxy, proxy, "f");
        __classPrivateFieldSet(this, _Request_secure, secure, "f");
        __classPrivateFieldSet(this, _Request_serverRequest, serverRequest, "f");
        __classPrivateFieldSet(this, _Request_body, new body_ts_1.RequestBody(serverRequest.getBody(), serverRequest.headers), "f");
    }
    Object.defineProperty(Request.prototype, "hasBody", {
        get: function () {
            return __classPrivateFieldGet(this, _Request_body, "f").has();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "headers", {
        get: function () {
            return __classPrivateFieldGet(this, _Request_serverRequest, "f").headers;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "ip", {
        get: function () {
            var _a;
            return (_a = (__classPrivateFieldGet(this, _Request_proxy, "f") ? this.ips[0] : __classPrivateFieldGet(this, _Request_instances, "m", _Request_getRemoteAddr).call(this))) !== null && _a !== void 0 ? _a : "";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "ips", {
        get: function () {
            var _a;
            return __classPrivateFieldGet(this, _Request_proxy, "f")
                ? ((_a = __classPrivateFieldGet(this, _Request_serverRequest, "f").headers.get("x-forwarded-for")) !== null && _a !== void 0 ? _a : __classPrivateFieldGet(this, _Request_instances, "m", _Request_getRemoteAddr).call(this)).split(/\s*,\s*/)
                : [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "method", {
        get: function () {
            return __classPrivateFieldGet(this, _Request_serverRequest, "f").method;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "secure", {
        get: function () {
            return __classPrivateFieldGet(this, _Request_secure, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "originalRequest", {
        get: function () {
            return __classPrivateFieldGet(this, _Request_serverRequest, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "url", {
        get: function () {
            var _a, _b, _c, _d, _e;
            if (!__classPrivateFieldGet(this, _Request_url, "f")) {
                var serverRequest = __classPrivateFieldGet(this, _Request_serverRequest, "f");
                if (!__classPrivateFieldGet(this, _Request_proxy, "f")) {
                    try {
                        if (serverRequest.rawUrl) {
                            __classPrivateFieldSet(this, _Request_url, new URL(serverRequest.rawUrl), "f");
                            return __classPrivateFieldGet(this, _Request_url, "f");
                        }
                    }
                    catch (_f) {
                    }
                }
                var proto = void 0;
                var host = void 0;
                if (__classPrivateFieldGet(this, _Request_proxy, "f")) {
                    proto = (_b = (_a = serverRequest
                        .headers.get("x-forwarded-proto")) === null || _a === void 0 ? void 0 : _a.split(/\s*,\s*/, 1)[0]) !== null && _b !== void 0 ? _b : "http";
                    host = (_d = (_c = serverRequest.headers.get("x-forwarded-host")) !== null && _c !== void 0 ? _c : serverRequest.headers.get("host")) !== null && _d !== void 0 ? _d : "";
                }
                else {
                    proto = __classPrivateFieldGet(this, _Request_secure, "f") ? "https" : "http";
                    host = (_e = serverRequest.headers.get("host")) !== null && _e !== void 0 ? _e : "";
                }
                try {
                    __classPrivateFieldSet(this, _Request_url, new URL("".concat(proto, "://").concat(host).concat(serverRequest.url)), "f");
                }
                catch (_g) {
                    throw new TypeError("The server request URL of \"".concat(proto, "://").concat(host).concat(serverRequest.url, "\" is invalid."));
                }
            }
            return __classPrivateFieldGet(this, _Request_url, "f");
        },
        enumerable: false,
        configurable: true
    });
    Request.prototype.accepts = function () {
        var types = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            types[_i] = arguments[_i];
        }
        var acceptValue = __classPrivateFieldGet(this, _Request_serverRequest, "f").headers.get("Accept");
        if (!acceptValue) {
            return types.length ? types[0] : ["*/*"];
        }
        if (types.length) {
            return (0, mediaType_ts_1.preferredMediaTypes)(acceptValue, types)[0];
        }
        return (0, mediaType_ts_1.preferredMediaTypes)(acceptValue);
    };
    Request.prototype.acceptsCharsets = function () {
        var charsets = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            charsets[_i] = arguments[_i];
        }
        var acceptCharsetValue = __classPrivateFieldGet(this, _Request_serverRequest, "f").headers.get("Accept-Charset");
        if (!acceptCharsetValue) {
            return charsets.length ? charsets[0] : ["*"];
        }
        if (charsets.length) {
            return (0, charset_ts_1.preferredCharsets)(acceptCharsetValue, charsets)[0];
        }
        return (0, charset_ts_1.preferredCharsets)(acceptCharsetValue);
    };
    Request.prototype.acceptsEncodings = function () {
        var encodings = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            encodings[_i] = arguments[_i];
        }
        var acceptEncodingValue = __classPrivateFieldGet(this, _Request_serverRequest, "f").headers.get("Accept-Encoding");
        if (!acceptEncodingValue) {
            return encodings.length ? encodings[0] : ["*"];
        }
        if (encodings.length) {
            return (0, encoding_ts_1.preferredEncodings)(acceptEncodingValue, encodings)[0];
        }
        return (0, encoding_ts_1.preferredEncodings)(acceptEncodingValue);
    };
    Request.prototype.acceptsLanguages = function () {
        var langs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            langs[_i] = arguments[_i];
        }
        var acceptLanguageValue = __classPrivateFieldGet(this, _Request_serverRequest, "f").headers.get("Accept-Language");
        if (!acceptLanguageValue) {
            return langs.length ? langs[0] : ["*"];
        }
        if (langs.length) {
            return (0, language_ts_1.preferredLanguages)(acceptLanguageValue, langs)[0];
        }
        return (0, language_ts_1.preferredLanguages)(acceptLanguageValue);
    };
    Request.prototype.body = function (options) {
        if (options === void 0) { options = {}; }
        return __classPrivateFieldGet(this, _Request_body, "f").get(options);
    };
    Request.prototype[(_Request_body = new WeakMap(), _Request_proxy = new WeakMap(), _Request_secure = new WeakMap(), _Request_serverRequest = new WeakMap(), _Request_url = new WeakMap(), _Request_instances = new WeakSet(), _Request_getRemoteAddr = function _Request_getRemoteAddr() {
        var _a;
        return (_a = __classPrivateFieldGet(this, _Request_serverRequest, "f").remoteAddr) !== null && _a !== void 0 ? _a : "";
    }, Symbol["for"]("Deno.customInspect"))] = function (inspect) {
        var _a = this, hasBody = _a.hasBody, headers = _a.headers, ip = _a.ip, ips = _a.ips, method = _a.method, secure = _a.secure, url = _a.url;
        return "".concat(this.constructor.name, " ").concat(inspect({
            hasBody: hasBody,
            headers: headers,
            ip: ip,
            ips: ips,
            method: method,
            secure: secure,
            url: url.toString()
        }));
    };
    Request.prototype[Symbol["for"]("nodejs.util.inspect.custom")] = function (depth, options, inspect) {
        if (depth < 0) {
            return options.stylize("[".concat(this.constructor.name, "]"), "special");
        }
        var newOptions = Object.assign({}, options, {
            depth: options.depth === null ? null : options.depth - 1
        });
        var _a = this, hasBody = _a.hasBody, headers = _a.headers, ip = _a.ip, ips = _a.ips, method = _a.method, secure = _a.secure, url = _a.url;
        return "".concat(options.stylize(this.constructor.name, "special"), " ").concat(inspect({ hasBody: hasBody, headers: headers, ip: ip, ips: ips, method: method, secure: secure, url: url }, newOptions));
    };
    return Request;
}());
exports.Request = Request;
