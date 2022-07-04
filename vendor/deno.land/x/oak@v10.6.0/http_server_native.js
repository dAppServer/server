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
var _HttpServer_instances, _HttpServer_app, _HttpServer_closed, _HttpServer_listener, _HttpServer_httpConnections, _HttpServer_options, _HttpServer_trackHttpConnection, _HttpServer_untrackHttpConnection;
exports.__esModule = true;
exports.HttpServer = void 0;
var http_server_native_request_ts_1 = require("./http_server_native_request.ts");
var util_ts_1 = require("./util.ts");
var serveHttp = "serveHttp" in Deno
    ?
        Deno.serveHttp.bind(Deno)
    : undefined;
var HttpServer = (function () {
    function HttpServer(app, options) {
        _HttpServer_instances.add(this);
        _HttpServer_app.set(this, void 0);
        _HttpServer_closed.set(this, false);
        _HttpServer_listener.set(this, void 0);
        _HttpServer_httpConnections.set(this, new Set());
        _HttpServer_options.set(this, void 0);
        if (!("serveHttp" in Deno)) {
            throw new Error("The native bindings for serving HTTP are not available.");
        }
        __classPrivateFieldSet(this, _HttpServer_app, app, "f");
        __classPrivateFieldSet(this, _HttpServer_options, options, "f");
    }
    Object.defineProperty(HttpServer.prototype, "app", {
        get: function () {
            return __classPrivateFieldGet(this, _HttpServer_app, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HttpServer.prototype, "closed", {
        get: function () {
            return __classPrivateFieldGet(this, _HttpServer_closed, "f");
        },
        enumerable: false,
        configurable: true
    });
    HttpServer.prototype.close = function () {
        __classPrivateFieldSet(this, _HttpServer_closed, true, "f");
        if (__classPrivateFieldGet(this, _HttpServer_listener, "f")) {
            __classPrivateFieldGet(this, _HttpServer_listener, "f").close();
            __classPrivateFieldSet(this, _HttpServer_listener, undefined, "f");
        }
        for (var _i = 0, _a = __classPrivateFieldGet(this, _HttpServer_httpConnections, "f"); _i < _a.length; _i++) {
            var httpConn = _a[_i];
            try {
                httpConn.close();
            }
            catch (error) {
                if (!(error instanceof Deno.errors.BadResource)) {
                    throw error;
                }
            }
        }
        __classPrivateFieldGet(this, _HttpServer_httpConnections, "f").clear();
    };
    HttpServer.prototype.listen = function () {
        return (__classPrivateFieldSet(this, _HttpServer_listener, (0, util_ts_1.isListenTlsOptions)(__classPrivateFieldGet(this, _HttpServer_options, "f"))
            ? Deno.listenTls(__classPrivateFieldGet(this, _HttpServer_options, "f"))
            : Deno.listen(__classPrivateFieldGet(this, _HttpServer_options, "f")), "f"));
    };
    HttpServer.prototype[(_HttpServer_app = new WeakMap(), _HttpServer_closed = new WeakMap(), _HttpServer_listener = new WeakMap(), _HttpServer_httpConnections = new WeakMap(), _HttpServer_options = new WeakMap(), _HttpServer_instances = new WeakSet(), _HttpServer_trackHttpConnection = function _HttpServer_trackHttpConnection(httpConn) {
        __classPrivateFieldGet(this, _HttpServer_httpConnections, "f").add(httpConn);
    }, _HttpServer_untrackHttpConnection = function _HttpServer_untrackHttpConnection(httpConn) {
        __classPrivateFieldGet(this, _HttpServer_httpConnections, "f")["delete"](httpConn);
    }, Symbol.asyncIterator)] = function () {
        var _this = this;
        var start = function (controller) {
            var server = _this;
            function serve(conn) {
                return __awaiter(this, void 0, void 0, function () {
                    var httpConn, requestEvent, nativeRequest, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                httpConn = serveHttp(conn);
                                __classPrivateFieldGet(server, _HttpServer_instances, "m", _HttpServer_trackHttpConnection).call(server, httpConn);
                                _a.label = 1;
                            case 1:
                                if (!true) return [3, 6];
                                _a.label = 2;
                            case 2:
                                _a.trys.push([2, 4, , 5]);
                                return [4, httpConn.nextRequest()];
                            case 3:
                                requestEvent = _a.sent();
                                if (requestEvent === null) {
                                    return [2];
                                }
                                nativeRequest = new http_server_native_request_ts_1.NativeRequest(requestEvent, { conn: conn });
                                controller.enqueue(nativeRequest);
                                nativeRequest.donePromise["catch"](function (error) {
                                    server.app.dispatchEvent(new ErrorEvent("error", { error: error }));
                                });
                                return [3, 5];
                            case 4:
                                error_1 = _a.sent();
                                server.app.dispatchEvent(new ErrorEvent("error", { error: error_1 }));
                                return [3, 5];
                            case 5:
                                if (server.closed) {
                                    __classPrivateFieldGet(server, _HttpServer_instances, "m", _HttpServer_untrackHttpConnection).call(server, httpConn);
                                    httpConn.close();
                                    controller.close();
                                }
                                return [3, 1];
                            case 6: return [2];
                        }
                    });
                });
            }
            var listener = __classPrivateFieldGet(_this, _HttpServer_listener, "f");
            (0, util_ts_1.assert)(listener);
            function accept() {
                return __awaiter(this, void 0, void 0, function () {
                    var conn, error_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!true) return [3, 5];
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4, listener.accept()];
                            case 2:
                                conn = _a.sent();
                                serve(conn);
                                return [3, 4];
                            case 3:
                                error_2 = _a.sent();
                                if (!server.closed) {
                                    server.app.dispatchEvent(new ErrorEvent("error", { error: error_2 }));
                                }
                                return [3, 4];
                            case 4:
                                if (server.closed) {
                                    controller.close();
                                    return [2];
                                }
                                return [3, 0];
                            case 5: return [2];
                        }
                    });
                });
            }
            accept();
        };
        var stream = new ReadableStream({ start: start });
        return stream[Symbol.asyncIterator]();
    };
    return HttpServer;
}());
exports.HttpServer = HttpServer;
