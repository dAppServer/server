"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var _Server_instances, _Server_port, _Server_host, _Server_handler, _Server_closed, _Server_listeners, _Server_httpConnections, _Server_onError, _Server_respond, _Server_serveHttp, _Server_accept, _Server_closeHttpConn, _Server_trackListener, _Server_untrackListener, _Server_trackHttpConnection, _Server_untrackHttpConnection;
exports.__esModule = true;
exports.listenAndServeTls = exports.listenAndServe = exports.serveTls = exports.serve = exports.serveListener = exports.Server = void 0;
var mod_ts_1 = require("../async/mod.ts");
var ERROR_SERVER_CLOSED = "Server closed";
var HTTP_PORT = 80;
var HTTPS_PORT = 443;
var INITIAL_ACCEPT_BACKOFF_DELAY = 5;
var MAX_ACCEPT_BACKOFF_DELAY = 1000;
var Server = (function () {
    function Server(serverInit) {
        var _a;
        _Server_instances.add(this);
        _Server_port.set(this, void 0);
        _Server_host.set(this, void 0);
        _Server_handler.set(this, void 0);
        _Server_closed.set(this, false);
        _Server_listeners.set(this, new Set());
        _Server_httpConnections.set(this, new Set());
        _Server_onError.set(this, void 0);
        __classPrivateFieldSet(this, _Server_port, serverInit.port, "f");
        __classPrivateFieldSet(this, _Server_host, serverInit.hostname, "f");
        __classPrivateFieldSet(this, _Server_handler, serverInit.handler, "f");
        __classPrivateFieldSet(this, _Server_onError, (_a = serverInit.onError) !== null && _a !== void 0 ? _a : function (error) {
            console.error(error);
            return new Response("Internal Server Error", { status: 500 });
        }, "f");
    }
    Server.prototype.serve = function (listener) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (__classPrivateFieldGet(this, _Server_closed, "f")) {
                            throw new Deno.errors.Http(ERROR_SERVER_CLOSED);
                        }
                        __classPrivateFieldGet(this, _Server_instances, "m", _Server_trackListener).call(this, listener);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4, __classPrivateFieldGet(this, _Server_instances, "m", _Server_accept).call(this, listener)];
                    case 2: return [2, _a.sent()];
                    case 3:
                        __classPrivateFieldGet(this, _Server_instances, "m", _Server_untrackListener).call(this, listener);
                        try {
                            listener.close();
                        }
                        catch (_b) {
                        }
                        return [7];
                    case 4: return [2];
                }
            });
        });
    };
    Server.prototype.listenAndServe = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var listener;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (__classPrivateFieldGet(this, _Server_closed, "f")) {
                            throw new Deno.errors.Http(ERROR_SERVER_CLOSED);
                        }
                        listener = Deno.listen({
                            port: (_a = __classPrivateFieldGet(this, _Server_port, "f")) !== null && _a !== void 0 ? _a : HTTP_PORT,
                            hostname: (_b = __classPrivateFieldGet(this, _Server_host, "f")) !== null && _b !== void 0 ? _b : "0.0.0.0",
                            transport: "tcp"
                        });
                        return [4, this.serve(listener)];
                    case 1: return [2, _c.sent()];
                }
            });
        });
    };
    Server.prototype.listenAndServeTls = function (certFile, keyFile) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var listener;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (__classPrivateFieldGet(this, _Server_closed, "f")) {
                            throw new Deno.errors.Http(ERROR_SERVER_CLOSED);
                        }
                        listener = Deno.listenTls({
                            port: (_a = __classPrivateFieldGet(this, _Server_port, "f")) !== null && _a !== void 0 ? _a : HTTPS_PORT,
                            hostname: (_b = __classPrivateFieldGet(this, _Server_host, "f")) !== null && _b !== void 0 ? _b : "0.0.0.0",
                            certFile: certFile,
                            keyFile: keyFile,
                            transport: "tcp"
                        });
                        return [4, this.serve(listener)];
                    case 1: return [2, _c.sent()];
                }
            });
        });
    };
    Server.prototype.close = function () {
        if (__classPrivateFieldGet(this, _Server_closed, "f")) {
            throw new Deno.errors.Http(ERROR_SERVER_CLOSED);
        }
        __classPrivateFieldSet(this, _Server_closed, true, "f");
        for (var _i = 0, _a = __classPrivateFieldGet(this, _Server_listeners, "f"); _i < _a.length; _i++) {
            var listener = _a[_i];
            try {
                listener.close();
            }
            catch (_b) {
            }
        }
        __classPrivateFieldGet(this, _Server_listeners, "f").clear();
        for (var _c = 0, _d = __classPrivateFieldGet(this, _Server_httpConnections, "f"); _c < _d.length; _c++) {
            var httpConn = _d[_c];
            __classPrivateFieldGet(this, _Server_instances, "m", _Server_closeHttpConn).call(this, httpConn);
        }
        __classPrivateFieldGet(this, _Server_httpConnections, "f").clear();
    };
    Object.defineProperty(Server.prototype, "closed", {
        get: function () {
            return __classPrivateFieldGet(this, _Server_closed, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Server.prototype, "addrs", {
        get: function () {
            return Array.from(__classPrivateFieldGet(this, _Server_listeners, "f")).map(function (listener) { return listener.addr; });
        },
        enumerable: false,
        configurable: true
    });
    return Server;
}());
exports.Server = Server;
_Server_port = new WeakMap(), _Server_host = new WeakMap(), _Server_handler = new WeakMap(), _Server_closed = new WeakMap(), _Server_listeners = new WeakMap(), _Server_httpConnections = new WeakMap(), _Server_onError = new WeakMap(), _Server_instances = new WeakSet(), _Server_respond = function _Server_respond(requestEvent, httpConn, connInfo) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 4]);
                    return [4, __classPrivateFieldGet(this, _Server_handler, "f").call(this, requestEvent.request, connInfo)];
                case 1:
                    response = _b.sent();
                    return [3, 4];
                case 2:
                    error_1 = _b.sent();
                    return [4, __classPrivateFieldGet(this, _Server_onError, "f").call(this, error_1)];
                case 3:
                    response = _b.sent();
                    return [3, 4];
                case 4:
                    _b.trys.push([4, 6, , 7]);
                    return [4, requestEvent.respondWith(response)];
                case 5:
                    _b.sent();
                    return [3, 7];
                case 6:
                    _a = _b.sent();
                    return [2, __classPrivateFieldGet(this, _Server_instances, "m", _Server_closeHttpConn).call(this, httpConn)];
                case 7: return [2];
            }
        });
    });
}, _Server_serveHttp = function _Server_serveHttp(httpConn, connInfo) {
    return __awaiter(this, void 0, void 0, function () {
        var requestEvent, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!!__classPrivateFieldGet(this, _Server_closed, "f")) return [3, 5];
                    requestEvent = void 0;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4, httpConn.nextRequest()];
                case 2:
                    requestEvent = _b.sent();
                    return [3, 4];
                case 3:
                    _a = _b.sent();
                    return [3, 5];
                case 4:
                    if (requestEvent === null) {
                        return [3, 5];
                    }
                    __classPrivateFieldGet(this, _Server_instances, "m", _Server_respond).call(this, requestEvent, httpConn, connInfo);
                    return [3, 0];
                case 5:
                    __classPrivateFieldGet(this, _Server_instances, "m", _Server_closeHttpConn).call(this, httpConn);
                    return [2];
            }
        });
    });
}, _Server_accept = function _Server_accept(listener) {
    return __awaiter(this, void 0, void 0, function () {
        var acceptBackoffDelay, conn, error_2, httpConn, connInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!__classPrivateFieldGet(this, _Server_closed, "f")) return [3, 7];
                    conn = void 0;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 6]);
                    return [4, listener.accept()];
                case 2:
                    conn = _a.sent();
                    return [3, 6];
                case 3:
                    error_2 = _a.sent();
                    if (!(error_2 instanceof Deno.errors.BadResource ||
                        error_2 instanceof Deno.errors.InvalidData ||
                        error_2 instanceof Deno.errors.UnexpectedEof ||
                        error_2 instanceof Deno.errors.ConnectionReset ||
                        error_2 instanceof Deno.errors.NotConnected)) return [3, 5];
                    if (!acceptBackoffDelay) {
                        acceptBackoffDelay = INITIAL_ACCEPT_BACKOFF_DELAY;
                    }
                    else {
                        acceptBackoffDelay *= 2;
                    }
                    if (acceptBackoffDelay >= MAX_ACCEPT_BACKOFF_DELAY) {
                        acceptBackoffDelay = MAX_ACCEPT_BACKOFF_DELAY;
                    }
                    return [4, (0, mod_ts_1.delay)(acceptBackoffDelay)];
                case 4:
                    _a.sent();
                    return [3, 0];
                case 5: throw error_2;
                case 6:
                    acceptBackoffDelay = undefined;
                    httpConn = void 0;
                    try {
                        httpConn = Deno.serveHttp(conn);
                    }
                    catch (_b) {
                        return [3, 0];
                    }
                    __classPrivateFieldGet(this, _Server_instances, "m", _Server_trackHttpConnection).call(this, httpConn);
                    connInfo = {
                        localAddr: conn.localAddr,
                        remoteAddr: conn.remoteAddr
                    };
                    __classPrivateFieldGet(this, _Server_instances, "m", _Server_serveHttp).call(this, httpConn, connInfo);
                    return [3, 0];
                case 7: return [2];
            }
        });
    });
}, _Server_closeHttpConn = function _Server_closeHttpConn(httpConn) {
    __classPrivateFieldGet(this, _Server_instances, "m", _Server_untrackHttpConnection).call(this, httpConn);
    try {
        httpConn.close();
    }
    catch (_a) {
    }
}, _Server_trackListener = function _Server_trackListener(listener) {
    __classPrivateFieldGet(this, _Server_listeners, "f").add(listener);
}, _Server_untrackListener = function _Server_untrackListener(listener) {
    __classPrivateFieldGet(this, _Server_listeners, "f")["delete"](listener);
}, _Server_trackHttpConnection = function _Server_trackHttpConnection(httpConn) {
    __classPrivateFieldGet(this, _Server_httpConnections, "f").add(httpConn);
}, _Server_untrackHttpConnection = function _Server_untrackHttpConnection(httpConn) {
    __classPrivateFieldGet(this, _Server_httpConnections, "f")["delete"](httpConn);
};
function serveListener(listener, handler, options) {
    return __awaiter(this, void 0, void 0, function () {
        var server;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    server = new Server({ handler: handler, onError: options === null || options === void 0 ? void 0 : options.onError });
                    if (options === null || options === void 0 ? void 0 : options.signal) {
                        options.signal.onabort = function () { return server.close(); };
                    }
                    return [4, server.serve(listener)];
                case 1: return [2, _a.sent()];
            }
        });
    });
}
exports.serveListener = serveListener;
function serve(handler, options) {
    var _a, _b;
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var server;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    server = new Server({
                        port: (_a = options.port) !== null && _a !== void 0 ? _a : 8000,
                        hostname: (_b = options.hostname) !== null && _b !== void 0 ? _b : "0.0.0.0",
                        handler: handler,
                        onError: options.onError
                    });
                    if (options === null || options === void 0 ? void 0 : options.signal) {
                        options.signal.onabort = function () { return server.close(); };
                    }
                    return [4, server.listenAndServe()];
                case 1: return [2, _c.sent()];
            }
        });
    });
}
exports.serve = serve;
function serveTls(handler, options) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var server;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!options.keyFile) {
                        throw new Error("TLS config is given, but 'keyFile' is missing.");
                    }
                    if (!options.certFile) {
                        throw new Error("TLS config is given, but 'certFile' is missing.");
                    }
                    server = new Server({
                        port: (_a = options.port) !== null && _a !== void 0 ? _a : 8443,
                        hostname: (_b = options.hostname) !== null && _b !== void 0 ? _b : "0.0.0.0",
                        handler: handler,
                        onError: options.onError
                    });
                    if (options === null || options === void 0 ? void 0 : options.signal) {
                        options.signal.onabort = function () { return server.close(); };
                    }
                    return [4, server.listenAndServeTls(options.certFile, options.keyFile)];
                case 1: return [2, _c.sent()];
            }
        });
    });
}
exports.serveTls = serveTls;
function listenAndServe(config, handler, options) {
    return __awaiter(this, void 0, void 0, function () {
        var server;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    server = new Server(__assign(__assign({}, config), { handler: handler }));
                    if (options === null || options === void 0 ? void 0 : options.signal) {
                        options.signal.onabort = function () { return server.close(); };
                    }
                    return [4, server.listenAndServe()];
                case 1: return [2, _a.sent()];
            }
        });
    });
}
exports.listenAndServe = listenAndServe;
function listenAndServeTls(config, certFile, keyFile, handler, options) {
    return __awaiter(this, void 0, void 0, function () {
        var server;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    server = new Server(__assign(__assign({}, config), { handler: handler }));
                    if (options === null || options === void 0 ? void 0 : options.signal) {
                        options.signal.onabort = function () { return server.close(); };
                    }
                    return [4, server.listenAndServeTls(certFile, keyFile)];
                case 1: return [2, _a.sent()];
            }
        });
    });
}
exports.listenAndServeTls = listenAndServeTls;
