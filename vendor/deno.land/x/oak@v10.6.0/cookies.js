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
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
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
var _Cookies_instances, _Cookies_cookieKeys, _Cookies_keys, _Cookies_request, _Cookies_response, _Cookies_secure, _Cookies_requestKeys;
exports.__esModule = true;
exports.Cookies = void 0;
var matchCache = {};
var FIELD_CONTENT_REGEXP = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
var KEY_REGEXP = /(?:^|;) *([^=]*)=[^;]*/g;
var SAME_SITE_REGEXP = /^(?:lax|none|strict)$/i;
function getPattern(name) {
    if (name in matchCache) {
        return matchCache[name];
    }
    return matchCache[name] = new RegExp("(?:^|;) *".concat(name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "=([^;]*)"));
}
function pushCookie(headers, cookie) {
    if (cookie.overwrite) {
        for (var i = headers.length - 1; i >= 0; i--) {
            if (headers[i].indexOf("".concat(cookie.name, "=")) === 0) {
                headers.splice(i, 1);
            }
        }
    }
    headers.push(cookie.toHeader());
}
function validateCookieProperty(key, value) {
    if (value && !FIELD_CONTENT_REGEXP.test(value)) {
        throw new TypeError("The ".concat(key, " of the cookie (").concat(value, ") is invalid."));
    }
}
var Cookie = (function () {
    function Cookie(name, value, attributes) {
        this.httpOnly = true;
        this.overwrite = false;
        this.path = "/";
        this.sameSite = false;
        this.secure = false;
        validateCookieProperty("name", name);
        validateCookieProperty("value", value);
        this.name = name;
        this.value = value !== null && value !== void 0 ? value : "";
        Object.assign(this, attributes);
        if (!this.value) {
            this.expires = new Date(0);
            this.maxAge = undefined;
        }
        validateCookieProperty("path", this.path);
        validateCookieProperty("domain", this.domain);
        if (this.sameSite && typeof this.sameSite === "string" &&
            !SAME_SITE_REGEXP.test(this.sameSite)) {
            throw new TypeError("The sameSite of the cookie (\"".concat(this.sameSite, "\") is invalid."));
        }
    }
    Cookie.prototype.toHeader = function () {
        var header = this.toString();
        if (this.maxAge) {
            this.expires = new Date(Date.now() + (this.maxAge * 1000));
        }
        if (this.path) {
            header += "; path=".concat(this.path);
        }
        if (this.expires) {
            header += "; expires=".concat(this.expires.toUTCString());
        }
        if (this.domain) {
            header += "; domain=".concat(this.domain);
        }
        if (this.sameSite) {
            header += "; samesite=".concat(this.sameSite === true ? "strict" : this.sameSite.toLowerCase());
        }
        if (this.secure) {
            header += "; secure";
        }
        if (this.httpOnly) {
            header += "; httponly";
        }
        return header;
    };
    Cookie.prototype.toString = function () {
        return "".concat(this.name, "=").concat(this.value);
    };
    return Cookie;
}());
var Cookies = (function () {
    function Cookies(request, response, options) {
        if (options === void 0) { options = {}; }
        _Cookies_instances.add(this);
        _Cookies_cookieKeys.set(this, void 0);
        _Cookies_keys.set(this, void 0);
        _Cookies_request.set(this, void 0);
        _Cookies_response.set(this, void 0);
        _Cookies_secure.set(this, void 0);
        var keys = options.keys, secure = options.secure;
        __classPrivateFieldSet(this, _Cookies_keys, keys, "f");
        __classPrivateFieldSet(this, _Cookies_request, request, "f");
        __classPrivateFieldSet(this, _Cookies_response, response, "f");
        __classPrivateFieldSet(this, _Cookies_secure, secure, "f");
    }
    Cookies.prototype["delete"] = function (name, options) {
        if (options === void 0) { options = {}; }
        this.set(name, null, options);
        return true;
    };
    Cookies.prototype.entries = function () {
        return __asyncGenerator(this, arguments, function entries_1() {
            var keys, _i, keys_1, key, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keys = __classPrivateFieldGet(this, _Cookies_instances, "m", _Cookies_requestKeys).call(this);
                        _i = 0, keys_1 = keys;
                        _a.label = 1;
                    case 1:
                        if (!(_i < keys_1.length)) return [3, 6];
                        key = keys_1[_i];
                        return [4, __await(this.get(key))];
                    case 2:
                        value = _a.sent();
                        if (!value) return [3, 5];
                        return [4, __await([key, value])];
                    case 3: return [4, _a.sent()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3, 1];
                    case 6: return [2];
                }
            });
        });
    };
    Cookies.prototype.forEach = function (callback, thisArg) {
        if (thisArg === void 0) { thisArg = null; }
        return __awaiter(this, void 0, void 0, function () {
            var keys, _i, keys_2, key, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keys = __classPrivateFieldGet(this, _Cookies_instances, "m", _Cookies_requestKeys).call(this);
                        _i = 0, keys_2 = keys;
                        _a.label = 1;
                    case 1:
                        if (!(_i < keys_2.length)) return [3, 4];
                        key = keys_2[_i];
                        return [4, this.get(key)];
                    case 2:
                        value = _a.sent();
                        if (value) {
                            callback.call(thisArg, key, value, this);
                        }
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4: return [2];
                }
            });
        });
    };
    Cookies.prototype.get = function (name, options) {
        var _a;
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var signed, nameSig, header, match, value, digest, data, index, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        signed = (_a = options.signed) !== null && _a !== void 0 ? _a : !!__classPrivateFieldGet(this, _Cookies_keys, "f");
                        nameSig = "".concat(name, ".sig");
                        header = __classPrivateFieldGet(this, _Cookies_request, "f").headers.get("cookie");
                        if (!header) {
                            return [2];
                        }
                        match = header.match(getPattern(name));
                        if (!match) {
                            return [2];
                        }
                        value = match[1];
                        if (!signed) {
                            return [2, value];
                        }
                        return [4, this.get(nameSig, { signed: false })];
                    case 1:
                        digest = _d.sent();
                        if (!digest) {
                            return [2];
                        }
                        data = "".concat(name, "=").concat(value);
                        if (!__classPrivateFieldGet(this, _Cookies_keys, "f")) {
                            throw new TypeError("keys required for signed cookies");
                        }
                        return [4, __classPrivateFieldGet(this, _Cookies_keys, "f").indexOf(data, digest)];
                    case 2:
                        index = _d.sent();
                        if (!(index < 0)) return [3, 3];
                        this["delete"](nameSig, { path: "/", signed: false });
                        return [3, 6];
                    case 3:
                        if (!index) return [3, 5];
                        _b = this.set;
                        _c = [nameSig];
                        return [4, __classPrivateFieldGet(this, _Cookies_keys, "f").sign(data)];
                    case 4:
                        _b.apply(this, _c.concat([_d.sent(), { signed: false }]));
                        _d.label = 5;
                    case 5: return [2, value];
                    case 6: return [2];
                }
            });
        });
    };
    Cookies.prototype.keys = function () {
        return __asyncGenerator(this, arguments, function keys_3() {
            var keys, _i, keys_4, key, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keys = __classPrivateFieldGet(this, _Cookies_instances, "m", _Cookies_requestKeys).call(this);
                        _i = 0, keys_4 = keys;
                        _a.label = 1;
                    case 1:
                        if (!(_i < keys_4.length)) return [3, 6];
                        key = keys_4[_i];
                        return [4, __await(this.get(key))];
                    case 2:
                        value = _a.sent();
                        if (!value) return [3, 5];
                        return [4, __await(key)];
                    case 3: return [4, _a.sent()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3, 1];
                    case 6: return [2];
                }
            });
        });
    };
    Cookies.prototype.set = function (name, value, options) {
        var _a, _b;
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, response, headers, _i, _c, _d, key, value_1, secure, signed, cookie, _e, _f, headers_1, header;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        request = __classPrivateFieldGet(this, _Cookies_request, "f");
                        response = __classPrivateFieldGet(this, _Cookies_response, "f");
                        headers = [];
                        for (_i = 0, _c = response.headers.entries(); _i < _c.length; _i++) {
                            _d = _c[_i], key = _d[0], value_1 = _d[1];
                            if (key === "set-cookie") {
                                headers.push(value_1);
                            }
                        }
                        secure = __classPrivateFieldGet(this, _Cookies_secure, "f") !== undefined ? __classPrivateFieldGet(this, _Cookies_secure, "f") : request.secure;
                        signed = (_a = options.signed) !== null && _a !== void 0 ? _a : !!__classPrivateFieldGet(this, _Cookies_keys, "f");
                        if (!secure && options.secure && !options.ignoreInsecure) {
                            throw new TypeError("Cannot send secure cookie over unencrypted connection.");
                        }
                        cookie = new Cookie(name, value, options);
                        cookie.secure = (_b = options.secure) !== null && _b !== void 0 ? _b : secure;
                        pushCookie(headers, cookie);
                        if (!signed) return [3, 2];
                        if (!__classPrivateFieldGet(this, _Cookies_keys, "f")) {
                            throw new TypeError(".keys required for signed cookies.");
                        }
                        _e = cookie;
                        return [4, __classPrivateFieldGet(this, _Cookies_keys, "f").sign(cookie.toString())];
                    case 1:
                        _e.value = _g.sent();
                        cookie.name += ".sig";
                        pushCookie(headers, cookie);
                        _g.label = 2;
                    case 2:
                        response.headers["delete"]("Set-Cookie");
                        for (_f = 0, headers_1 = headers; _f < headers_1.length; _f++) {
                            header = headers_1[_f];
                            response.headers.append("Set-Cookie", header);
                        }
                        return [2, this];
                }
            });
        });
    };
    Cookies.prototype.values = function () {
        return __asyncGenerator(this, arguments, function values_1() {
            var keys, _i, keys_5, key, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        keys = __classPrivateFieldGet(this, _Cookies_instances, "m", _Cookies_requestKeys).call(this);
                        _i = 0, keys_5 = keys;
                        _a.label = 1;
                    case 1:
                        if (!(_i < keys_5.length)) return [3, 6];
                        key = keys_5[_i];
                        return [4, __await(this.get(key))];
                    case 2:
                        value = _a.sent();
                        if (!value) return [3, 5];
                        return [4, __await(value)];
                    case 3: return [4, _a.sent()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3, 1];
                    case 6: return [2];
                }
            });
        });
    };
    Cookies.prototype[(_Cookies_cookieKeys = new WeakMap(), _Cookies_keys = new WeakMap(), _Cookies_request = new WeakMap(), _Cookies_response = new WeakMap(), _Cookies_secure = new WeakMap(), _Cookies_instances = new WeakSet(), _Cookies_requestKeys = function _Cookies_requestKeys() {
        if (__classPrivateFieldGet(this, _Cookies_cookieKeys, "f")) {
            return __classPrivateFieldGet(this, _Cookies_cookieKeys, "f");
        }
        var result = __classPrivateFieldSet(this, _Cookies_cookieKeys, [], "f");
        var header = __classPrivateFieldGet(this, _Cookies_request, "f").headers.get("cookie");
        if (!header) {
            return result;
        }
        var matches;
        while ((matches = KEY_REGEXP.exec(header))) {
            var key = matches[1];
            result.push(key);
        }
        return result;
    }, Symbol.asyncIterator)] = function () {
        return __asyncGenerator(this, arguments, function _a() {
            var keys, _i, keys_6, key, value;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        keys = __classPrivateFieldGet(this, _Cookies_instances, "m", _Cookies_requestKeys).call(this);
                        _i = 0, keys_6 = keys;
                        _b.label = 1;
                    case 1:
                        if (!(_i < keys_6.length)) return [3, 6];
                        key = keys_6[_i];
                        return [4, __await(this.get(key))];
                    case 2:
                        value = _b.sent();
                        if (!value) return [3, 5];
                        return [4, __await([key, value])];
                    case 3: return [4, _b.sent()];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3, 1];
                    case 6: return [2];
                }
            });
        });
    };
    Cookies.prototype[Symbol["for"]("Deno.customInspect")] = function () {
        return "".concat(this.constructor.name, " []");
    };
    Cookies.prototype[Symbol["for"]("nodejs.util.inspect.custom")] = function (depth, options, inspect) {
        if (depth < 0) {
            return options.stylize("[".concat(this.constructor.name, "]"), "special");
        }
        var newOptions = Object.assign({}, options, {
            depth: options.depth === null ? null : options.depth - 1
        });
        return "".concat(options.stylize(this.constructor.name, "special"), " ").concat(inspect([], newOptions));
    };
    return Cookies;
}());
exports.Cookies = Cookies;
