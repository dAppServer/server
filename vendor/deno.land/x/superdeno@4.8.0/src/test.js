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
var _Test_asserts, _Test_redirects, _Test_redirectList, _Test_server, _Test_serverAddress, _Test_redirect, _Test_assert, _Test_assertBody, _Test_assertHeader, _Test_assertStatus, _Test_assertFunction;
exports.__esModule = true;
exports.Test = void 0;
var deps_ts_1 = require("../deps.ts");
var superagent_ts_1 = require("./superagent.ts");
var close_ts_1 = require("./close.ts");
var utils_ts_1 = require("./utils.ts");
var xhrSham_js_1 = require("./xhrSham.js");
var SHAM_SYMBOL = Symbol("SHAM_SYMBOL");
(0, xhrSham_js_1.exposeSham)(SHAM_SYMBOL);
function completeXhrPromises() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, _a, promise, _1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _i = 0, _a = Object.values(window[SHAM_SYMBOL].promises);
                    _b.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3, 6];
                    promise = _a[_i];
                    if (!promise) return [3, 5];
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4, promise];
                case 3:
                    _b.sent();
                    return [3, 5];
                case 4:
                    _1 = _b.sent();
                    return [3, 5];
                case 5:
                    _i++;
                    return [3, 1];
                case 6: return [2];
            }
        });
    });
}
var SuperRequest = superagent_ts_1.superagent.Request;
var Test = (function (_super) {
    __extends(Test, _super);
    function Test(app, method, path, host, secure) {
        if (secure === void 0) { secure = false; }
        var _this = _super.call(this, method.toUpperCase(), path) || this;
        _Test_asserts.set(_this, void 0);
        _Test_redirects.set(_this, void 0);
        _Test_redirectList.set(_this, void 0);
        _Test_server.set(_this, void 0);
        _Test_serverAddress.set(_this, function (path, host, secure) {
            var address = ("addrs" in __classPrivateFieldGet(_this, _Test_server, "f")
                ? __classPrivateFieldGet(_this, _Test_server, "f").addrs[0]
                : __classPrivateFieldGet(_this, _Test_server, "f").listener.addr);
            var port = address.port;
            var protocol = secure ? "https" : "http";
            return "".concat(protocol, "://").concat((host || "127.0.0.1"), ":").concat(port).concat(path);
        });
        _Test_redirect.set(_this, function (res, callback) {
            var url = res.headers.location;
            if (!url) {
                (0, close_ts_1.close)(__classPrivateFieldGet(_this, _Test_server, "f"), _this.app, undefined, function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, completeXhrPromises()];
                            case 1:
                                _a.sent();
                                callback === null || callback === void 0 ? void 0 : callback(new Error("No location header for redirect"), res);
                                return [2];
                        }
                    });
                }); });
                return _this;
            }
            var parsedUrl = new URL(url, _this.url);
            var changesOrigin = parsedUrl.host !== new URL(_this.url).host;
            var headers = _this._header;
            if (res.statusCode === 301 || res.statusCode === 302) {
                headers = cleanHeader(headers, changesOrigin);
                _this.method = _this.method === "HEAD" ? "HEAD" : "GET";
                _this._data = null;
            }
            if (res.statusCode === 303) {
                headers = cleanHeader(headers, changesOrigin);
                _this.method = "GET";
                _this._data = null;
            }
            delete headers.host;
            delete _this._formData;
            initHeaders(_this);
            _this._endCalled = false;
            _this.url = parsedUrl.href;
            _this.qs = {};
            _this._query = [];
            _this.set(headers);
            _this.emit("redirect", res);
            __classPrivateFieldGet(_this, _Test_redirectList, "f").push(_this.url);
            _this.end(callback);
            return _this;
        });
        _Test_assert.set(_this, function (resError, res, fn) {
            var error;
            if (!res && resError) {
                error = resError;
            }
            for (var i = 0; i < __classPrivateFieldGet(_this, _Test_asserts, "f").length && !error; i += 1) {
                error = __classPrivateFieldGet(_this, _Test_assertFunction, "f").call(_this, __classPrivateFieldGet(_this, _Test_asserts, "f")[i], res);
            }
            if (!error && resError instanceof Error &&
                (!res || resError.status !== res.status)) {
                error = resError;
            }
            if (fn)
                fn.call(_this, error || null, res);
        });
        _Test_assertBody.set(_this, function (body, res) {
            var isRegExp = body instanceof RegExp;
            if (typeof body === "object" && !isRegExp) {
                try {
                    (0, deps_ts_1.assertEquals)(body, res.body);
                }
                catch (_) {
                    var a = Deno.inspect(body);
                    var b = Deno.inspect(res.body);
                    return error("expected ".concat(a, " response body, got ").concat(b), body, res.body);
                }
            }
            else if (body !== res.text) {
                var a = Deno.inspect(body);
                var b = Deno.inspect(res.text);
                if (isRegExp) {
                    if (!body.test(res.text)) {
                        return error("expected body ".concat(b, " to match ").concat(body), body, res.body);
                    }
                }
                else {
                    return error("expected ".concat(a, " response body, got ").concat(b), body, res.body);
                }
            }
        });
        _Test_assertHeader.set(_this, function (header, res) {
            var field = header.name;
            var actual = res.headers[field.toLowerCase()];
            var fieldExpected = header.value;
            if (typeof actual === "undefined") {
                return new Error("expected \"".concat(field, "\" header field"));
            }
            if ((Array.isArray(actual) && actual.toString() === fieldExpected) ||
                fieldExpected === actual) {
                return;
            }
            if (fieldExpected instanceof RegExp) {
                if (!fieldExpected.test(actual)) {
                    return new Error("expected \"".concat(field, "\" matching ").concat(fieldExpected, ", got \"").concat(actual, "\""));
                }
            }
            else {
                return new Error("expected \"".concat(field, "\" of \"").concat(fieldExpected, "\", got \"").concat(actual, "\""));
            }
        });
        _Test_assertStatus.set(_this, function (status, res) {
            if (res.status !== status) {
                var a = deps_ts_1.STATUS_TEXT.get(status);
                var b = deps_ts_1.STATUS_TEXT.get(res.status);
                return new Error("expected ".concat(status, " \"").concat(a, "\", got ").concat(res.status, " \"").concat(b, "\""));
            }
        });
        _Test_assertFunction.set(_this, function (fn, res) {
            var err;
            try {
                err = fn(res);
            }
            catch (e) {
                err = e;
            }
            if (err instanceof Error)
                return err;
        });
        _this.redirects(0);
        __classPrivateFieldSet(_this, _Test_redirects, 0, "f");
        __classPrivateFieldSet(_this, _Test_redirectList, [], "f");
        _this.app = app;
        __classPrivateFieldSet(_this, _Test_asserts, [], "f");
        if ((0, utils_ts_1.isString)(app)) {
            _this.url = "".concat(app).concat(path);
        }
        else {
            if ((0, utils_ts_1.isStdNativeServer)(app)) {
                var listenAndServePromise_1 = app.listenAndServe()["catch"](function (err) {
                    return (0, close_ts_1.close)(app, app, err);
                });
                __classPrivateFieldSet(_this, _Test_server, {
                    close: function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _b.trys.push([0, 2, , 3]);
                                        app.close();
                                        return [4, listenAndServePromise_1];
                                    case 1:
                                        _b.sent();
                                        return [3, 3];
                                    case 2:
                                        _a = _b.sent();
                                        return [3, 3];
                                    case 3: return [2];
                                }
                            });
                        });
                    },
                    addrs: app.addrs,
                    listenAndServe: function () {
                        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2];
                        }); });
                    }
                }, "f");
            }
            else if ((0, utils_ts_1.isServer)(app)) {
                __classPrivateFieldSet(_this, _Test_server, app, "f");
            }
            else if ((0, utils_ts_1.isListener)(app)) {
                secure = false;
                __classPrivateFieldSet(_this, _Test_server, app.listen(":0"), "f");
            }
            else {
                throw new Error("superdeno is unable to identify or create a valid test server");
            }
            _this.url = __classPrivateFieldGet(_this, _Test_serverAddress, "f").call(_this, path, host, secure);
        }
        return _this;
    }
    Test.prototype.expect = function (a, b, c) {
        if (typeof a === "function") {
            __classPrivateFieldGet(this, _Test_asserts, "f").push(a);
            return this;
        }
        if (typeof b === "function")
            this.end(b);
        if (typeof c === "function")
            this.end(c);
        if (typeof a === "number") {
            __classPrivateFieldGet(this, _Test_asserts, "f").push(__classPrivateFieldGet(this, _Test_assertStatus, "f").bind(this, a));
            if (typeof b !== "function" && arguments.length > 1) {
                __classPrivateFieldGet(this, _Test_asserts, "f").push(__classPrivateFieldGet(this, _Test_assertBody, "f").bind(this, b));
            }
            return this;
        }
        if (typeof b === "string" || typeof b === "number" || b instanceof RegExp) {
            __classPrivateFieldGet(this, _Test_asserts, "f").push(__classPrivateFieldGet(this, _Test_assertHeader, "f").bind(this, { name: "" + a, value: b }));
            return this;
        }
        __classPrivateFieldGet(this, _Test_asserts, "f").push(__classPrivateFieldGet(this, _Test_assertBody, "f").bind(this, a));
        return this;
    };
    Test.prototype.end = function (callback) {
        var self = this;
        var end = SuperRequest.prototype.end;
        end.call(self, function (err, res) {
            var _this = this;
            var _a, _b, _c;
            var redirect = isRedirect(res === null || res === void 0 ? void 0 : res.statusCode);
            var max = self._maxRedirects;
            if (redirect && (__classPrivateFieldSet(_a = self, _Test_redirects, (_c = __classPrivateFieldGet(_a, _Test_redirects, "f"), _b = _c++, _c), "f"), _b) !== max) {
                return __classPrivateFieldGet(self, _Test_redirect, "f").call(self, res, callback);
            }
            return (0, close_ts_1.close)(__classPrivateFieldGet(self, _Test_server, "f"), self.app, undefined, function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, completeXhrPromises()];
                        case 1:
                            _a.sent();
                            return [4, new Promise(function (resolve) { return setTimeout(resolve, 20); })];
                        case 2:
                            _a.sent();
                            __classPrivateFieldGet(self, _Test_assert, "f").call(self, err, res, callback);
                            return [2];
                    }
                });
            }); });
        });
        return this;
    };
    return Test;
}(SuperRequest));
exports.Test = Test;
_Test_asserts = new WeakMap(), _Test_redirects = new WeakMap(), _Test_redirectList = new WeakMap(), _Test_server = new WeakMap(), _Test_serverAddress = new WeakMap(), _Test_redirect = new WeakMap(), _Test_assert = new WeakMap(), _Test_assertBody = new WeakMap(), _Test_assertHeader = new WeakMap(), _Test_assertStatus = new WeakMap(), _Test_assertFunction = new WeakMap();
function error(msg, expected, actual) {
    var err = new Error(msg);
    err.expected = expected;
    err.actual = actual;
    err.showDiff = true;
    return err;
}
function isRedirect(code) {
    if (code === void 0) { code = 0; }
    return [301, 302, 303, 305, 307, 308].includes(code);
}
function cleanHeader(header, changesOrigin) {
    delete header["content-type"];
    delete header["content-length"];
    delete header["transfer-encoding"];
    delete header.host;
    if (changesOrigin) {
        delete header.authorization;
        delete header.cookie;
    }
    return header;
}
function initHeaders(req) {
    req._header = {};
    req.header = {};
}
