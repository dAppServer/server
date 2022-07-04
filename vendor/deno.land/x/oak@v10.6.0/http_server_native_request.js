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
var _a;
var _NativeRequest_conn, _NativeRequest_reject, _NativeRequest_request, _NativeRequest_requestPromise, _NativeRequest_resolve, _NativeRequest_resolved, _NativeRequest_upgradeWebSocket;
exports.__esModule = true;
exports.NativeRequest = exports.DomResponse = void 0;
exports.DomResponse = (_a = globalThis.Response) !== null && _a !== void 0 ? _a : (function () {
    function MockResponse() {
    }
    return MockResponse;
}());
var maybeUpgradeWebSocket = "upgradeWebSocket" in Deno
    ?
        Deno.upgradeWebSocket.bind(Deno)
    : undefined;
var NativeRequest = (function () {
    function NativeRequest(requestEvent, options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        _NativeRequest_conn.set(this, void 0);
        _NativeRequest_reject.set(this, void 0);
        _NativeRequest_request.set(this, void 0);
        _NativeRequest_requestPromise.set(this, void 0);
        _NativeRequest_resolve.set(this, void 0);
        _NativeRequest_resolved.set(this, false);
        _NativeRequest_upgradeWebSocket.set(this, void 0);
        var conn = options.conn;
        __classPrivateFieldSet(this, _NativeRequest_conn, conn, "f");
        __classPrivateFieldSet(this, _NativeRequest_upgradeWebSocket, "upgradeWebSocket" in options
            ? options["upgradeWebSocket"]
            : maybeUpgradeWebSocket, "f");
        __classPrivateFieldSet(this, _NativeRequest_request, requestEvent.request, "f");
        var p = new Promise(function (resolve, reject) {
            __classPrivateFieldSet(_this, _NativeRequest_resolve, resolve, "f");
            __classPrivateFieldSet(_this, _NativeRequest_reject, reject, "f");
        });
        __classPrivateFieldSet(this, _NativeRequest_requestPromise, requestEvent.respondWith(p), "f");
    }
    Object.defineProperty(NativeRequest.prototype, "body", {
        get: function () {
            return __classPrivateFieldGet(this, _NativeRequest_request, "f").body;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NativeRequest.prototype, "donePromise", {
        get: function () {
            return __classPrivateFieldGet(this, _NativeRequest_requestPromise, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NativeRequest.prototype, "headers", {
        get: function () {
            return __classPrivateFieldGet(this, _NativeRequest_request, "f").headers;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NativeRequest.prototype, "method", {
        get: function () {
            return __classPrivateFieldGet(this, _NativeRequest_request, "f").method;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NativeRequest.prototype, "remoteAddr", {
        get: function () {
            var _a, _b;
            return (_b = (_a = __classPrivateFieldGet(this, _NativeRequest_conn, "f")) === null || _a === void 0 ? void 0 : _a.remoteAddr) === null || _b === void 0 ? void 0 : _b.hostname;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NativeRequest.prototype, "request", {
        get: function () {
            return __classPrivateFieldGet(this, _NativeRequest_request, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NativeRequest.prototype, "url", {
        get: function () {
            try {
                var url = new URL(__classPrivateFieldGet(this, _NativeRequest_request, "f").url);
                return __classPrivateFieldGet(this, _NativeRequest_request, "f").url.replace(url.origin, "");
            }
            catch (_a) {
            }
            return __classPrivateFieldGet(this, _NativeRequest_request, "f").url;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NativeRequest.prototype, "rawUrl", {
        get: function () {
            return __classPrivateFieldGet(this, _NativeRequest_request, "f").url;
        },
        enumerable: false,
        configurable: true
    });
    NativeRequest.prototype.error = function (reason) {
        if (__classPrivateFieldGet(this, _NativeRequest_resolved, "f")) {
            throw new Error("Request already responded to.");
        }
        __classPrivateFieldGet(this, _NativeRequest_reject, "f").call(this, reason);
        __classPrivateFieldSet(this, _NativeRequest_resolved, true, "f");
    };
    NativeRequest.prototype.getBody = function () {
        var _this = this;
        return {
            body: __classPrivateFieldGet(this, _NativeRequest_request, "f").body,
            readBody: function () { return __awaiter(_this, void 0, void 0, function () {
                var ab;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, __classPrivateFieldGet(this, _NativeRequest_request, "f").arrayBuffer()];
                        case 1:
                            ab = _a.sent();
                            return [2, new Uint8Array(ab)];
                    }
                });
            }); }
        };
    };
    NativeRequest.prototype.respond = function (response) {
        if (__classPrivateFieldGet(this, _NativeRequest_resolved, "f")) {
            throw new Error("Request already responded to.");
        }
        __classPrivateFieldGet(this, _NativeRequest_resolve, "f").call(this, response);
        __classPrivateFieldSet(this, _NativeRequest_resolved, true, "f");
        return __classPrivateFieldGet(this, _NativeRequest_requestPromise, "f");
    };
    NativeRequest.prototype.upgrade = function (options) {
        if (__classPrivateFieldGet(this, _NativeRequest_resolved, "f")) {
            throw new Error("Request already responded to.");
        }
        if (!__classPrivateFieldGet(this, _NativeRequest_upgradeWebSocket, "f")) {
            throw new TypeError("Upgrading web sockets not supported.");
        }
        var _a = __classPrivateFieldGet(this, _NativeRequest_upgradeWebSocket, "f").call(this, __classPrivateFieldGet(this, _NativeRequest_request, "f"), options), response = _a.response, socket = _a.socket;
        __classPrivateFieldGet(this, _NativeRequest_resolve, "f").call(this, response);
        __classPrivateFieldSet(this, _NativeRequest_resolved, true, "f");
        return socket;
    };
    return NativeRequest;
}());
exports.NativeRequest = NativeRequest;
_NativeRequest_conn = new WeakMap(), _NativeRequest_reject = new WeakMap(), _NativeRequest_request = new WeakMap(), _NativeRequest_requestPromise = new WeakMap(), _NativeRequest_resolve = new WeakMap(), _NativeRequest_resolved = new WeakMap(), _NativeRequest_upgradeWebSocket = new WeakMap();
