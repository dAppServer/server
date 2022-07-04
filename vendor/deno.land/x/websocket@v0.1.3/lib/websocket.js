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
exports.StandardWebSocketClient = exports.WebSocketAcceptedClient = exports.WebSocketServer = exports.WebSocketState = void 0;
var deps_ts_1 = require("./../deps.ts");
var deps_ts_2 = require("./../deps.ts");
var deps_ts_3 = require("./../deps.ts");
var errors_ts_1 = require("./errors.ts");
var WebSocketState;
(function (WebSocketState) {
    WebSocketState[WebSocketState["CONNECTING"] = 0] = "CONNECTING";
    WebSocketState[WebSocketState["OPEN"] = 1] = "OPEN";
    WebSocketState[WebSocketState["CLOSING"] = 2] = "CLOSING";
    WebSocketState[WebSocketState["CLOSED"] = 3] = "CLOSED";
})(WebSocketState = exports.WebSocketState || (exports.WebSocketState = {}));
var WebSocketServer = (function (_super) {
    __extends(WebSocketServer, _super);
    function WebSocketServer(port, realIpHeader) {
        if (port === void 0) { port = 8080; }
        if (realIpHeader === void 0) { realIpHeader = null; }
        var _this = _super.call(this) || this;
        _this.port = port;
        _this.realIpHeader = realIpHeader;
        _this.clients = new Set();
        _this.server = undefined;
        _this.connect();
        return _this;
    }
    WebSocketServer.prototype.connect = function () {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, _c, req, conn, bufReader, bufWriter, headers, sock, ws, err_1, e_1_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.server = (0, deps_ts_2.serve)(":".concat(this.port));
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 10, 11, 16]);
                        _b = __asyncValues(this.server);
                        _d.label = 2;
                    case 2: return [4, _b.next()];
                    case 3:
                        if (!(_c = _d.sent(), !_c.done)) return [3, 9];
                        req = _c.value;
                        conn = req.conn, bufReader = req.r, bufWriter = req.w, headers = req.headers;
                        _d.label = 4;
                    case 4:
                        _d.trys.push([4, 6, , 8]);
                        return [4, (0, deps_ts_3.acceptWebSocket)({
                                conn: conn,
                                bufReader: bufReader,
                                bufWriter: bufWriter,
                                headers: headers
                            })];
                    case 5:
                        sock = _d.sent();
                        if (this.realIpHeader && "hostname" in sock.conn.remoteAddr) {
                            if (!req.headers.has(this.realIpHeader)) {
                                this.emit("error", new Error("specified real ip header does not exist"));
                            }
                            else {
                                sock.conn.remoteAddr.hostname =
                                    req.headers.get(this.realIpHeader) ||
                                        sock.conn.remoteAddr.hostname;
                            }
                        }
                        ws = new WebSocketAcceptedClient(sock);
                        this.clients.add(ws);
                        this.emit("connection", ws, req.url);
                        return [3, 8];
                    case 6:
                        err_1 = _d.sent();
                        this.emit("error", err_1);
                        return [4, req.respond({ status: 400 })];
                    case 7:
                        _d.sent();
                        return [3, 8];
                    case 8: return [3, 2];
                    case 9: return [3, 16];
                    case 10:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3, 16];
                    case 11:
                        _d.trys.push([11, , 14, 15]);
                        if (!(_c && !_c.done && (_a = _b["return"]))) return [3, 13];
                        return [4, _a.call(_b)];
                    case 12:
                        _d.sent();
                        _d.label = 13;
                    case 13: return [3, 15];
                    case 14:
                        if (e_1) throw e_1.error;
                        return [7];
                    case 15: return [7];
                    case 16: return [2];
                }
            });
        });
    };
    WebSocketServer.prototype.close = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                (_a = this.server) === null || _a === void 0 ? void 0 : _a.close();
                this.clients.clear();
                return [2];
            });
        });
    };
    return WebSocketServer;
}(deps_ts_1.EventEmitter));
exports.WebSocketServer = WebSocketServer;
var WebSocketAcceptedClient = (function (_super) {
    __extends(WebSocketAcceptedClient, _super);
    function WebSocketAcceptedClient(sock) {
        var _this = _super.call(this) || this;
        _this.state = WebSocketState.CONNECTING;
        _this.webSocket = sock;
        _this.open();
        return _this;
    }
    WebSocketAcceptedClient.prototype.open = function () {
        var e_2, _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, _c, ev, body, body, code, reason, e_2_1, err_2;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.state = WebSocketState.OPEN;
                        this.emit("open");
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 14, , 17]);
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 7, 8, 13]);
                        _b = __asyncValues(this.webSocket);
                        _d.label = 3;
                    case 3: return [4, _b.next()];
                    case 4:
                        if (!(_c = _d.sent(), !_c.done)) return [3, 6];
                        ev = _c.value;
                        if (typeof ev === "string") {
                            this.emit("message", ev);
                        }
                        else if (ev instanceof Uint8Array) {
                            this.emit("message", ev);
                        }
                        else if ((0, deps_ts_3.isWebSocketPingEvent)(ev)) {
                            body = ev[1];
                            this.emit("ping", body);
                        }
                        else if ((0, deps_ts_3.isWebSocketPongEvent)(ev)) {
                            body = ev[1];
                            this.emit("pong", body);
                        }
                        else if ((0, deps_ts_3.isWebSocketCloseEvent)(ev)) {
                            code = ev.code, reason = ev.reason;
                            this.state = WebSocketState.CLOSED;
                            this.emit("close", code);
                        }
                        _d.label = 5;
                    case 5: return [3, 3];
                    case 6: return [3, 13];
                    case 7:
                        e_2_1 = _d.sent();
                        e_2 = { error: e_2_1 };
                        return [3, 13];
                    case 8:
                        _d.trys.push([8, , 11, 12]);
                        if (!(_c && !_c.done && (_a = _b["return"]))) return [3, 10];
                        return [4, _a.call(_b)];
                    case 9:
                        _d.sent();
                        _d.label = 10;
                    case 10: return [3, 12];
                    case 11:
                        if (e_2) throw e_2.error;
                        return [7];
                    case 12: return [7];
                    case 13: return [3, 17];
                    case 14:
                        err_2 = _d.sent();
                        this.emit("close", err_2);
                        if (!!this.webSocket.isClosed) return [3, 16];
                        return [4, this.webSocket.close(1000)["catch"](function (e) {
                                if (_this.state === WebSocketState.CLOSING && _this.webSocket.isClosed) {
                                    _this.state = WebSocketState.CLOSED;
                                    return;
                                }
                                throw new errors_ts_1.WebSocketError(e);
                            })];
                    case 15:
                        _d.sent();
                        _d.label = 16;
                    case 16: return [3, 17];
                    case 17: return [2];
                }
            });
        });
    };
    WebSocketAcceptedClient.prototype.ping = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.state === WebSocketState.CONNECTING) {
                    throw new errors_ts_1.WebSocketError("WebSocket is not open: state 0 (CONNECTING)");
                }
                return [2, this.webSocket.ping(message)];
            });
        });
    };
    WebSocketAcceptedClient.prototype.send = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    if (this.state === WebSocketState.CONNECTING) {
                        throw new errors_ts_1.WebSocketError("WebSocket is not open: state 0 (CONNECTING)");
                    }
                    return [2, this.webSocket.send(message)];
                }
                catch (error) {
                    this.state = WebSocketState.CLOSED;
                    this.emit("close", error.message);
                }
                return [2];
            });
        });
    };
    WebSocketAcceptedClient.prototype.close = function (code, reason) {
        if (code === void 0) { code = 1000; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.state === WebSocketState.CLOSING ||
                    this.state === WebSocketState.CLOSED) {
                    return [2];
                }
                this.state = WebSocketState.CLOSING;
                return [2, this.webSocket.close(code, reason)];
            });
        });
    };
    WebSocketAcceptedClient.prototype.closeForce = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.state === WebSocketState.CLOSING ||
                    this.state === WebSocketState.CLOSED) {
                    return [2];
                }
                this.state = WebSocketState.CLOSING;
                return [2, this.webSocket.closeForce()];
            });
        });
    };
    Object.defineProperty(WebSocketAcceptedClient.prototype, "isClosed", {
        get: function () {
            return this.webSocket.isClosed;
        },
        enumerable: false,
        configurable: true
    });
    return WebSocketAcceptedClient;
}(deps_ts_1.EventEmitter));
exports.WebSocketAcceptedClient = WebSocketAcceptedClient;
var StandardWebSocketClient = (function (_super) {
    __extends(StandardWebSocketClient, _super);
    function StandardWebSocketClient(endpoint) {
        var _this = _super.call(this) || this;
        _this.endpoint = endpoint;
        if (_this.endpoint !== undefined) {
            _this.webSocket = new WebSocket(endpoint);
            _this.webSocket.onopen = function () { return _this.emit("open"); };
            _this.webSocket.onmessage = function (message) { return _this.emit("message", message); };
            _this.webSocket.onclose = function () { return _this.emit("close"); };
            _this.webSocket.onerror = function () { return _this.emit("error"); };
        }
        return _this;
    }
    StandardWebSocketClient.prototype.ping = function (message) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                if (((_a = this.webSocket) === null || _a === void 0 ? void 0 : _a.readyState) === WebSocketState.CONNECTING) {
                    throw new errors_ts_1.WebSocketError("WebSocket is not open: state 0 (CONNECTING)");
                }
                return [2, this.webSocket.send("ping")];
            });
        });
    };
    StandardWebSocketClient.prototype.send = function (message) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                if (((_a = this.webSocket) === null || _a === void 0 ? void 0 : _a.readyState) === WebSocketState.CONNECTING) {
                    throw new errors_ts_1.WebSocketError("WebSocket is not open: state 0 (CONNECTING)");
                }
                return [2, this.webSocket.send(message)];
            });
        });
    };
    StandardWebSocketClient.prototype.close = function (code, reason) {
        if (code === void 0) { code = 1000; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.webSocket.readyState === WebSocketState.CLOSING ||
                    this.webSocket.readyState === WebSocketState.CLOSED) {
                    return [2];
                }
                return [2, this.webSocket.close(code, reason)];
            });
        });
    };
    StandardWebSocketClient.prototype.closeForce = function () {
        throw new Error("Method not implemented.");
    };
    Object.defineProperty(StandardWebSocketClient.prototype, "isClosed", {
        get: function () {
            return this.webSocket.readyState === WebSocketState.CLOSING ||
                this.webSocket.readyState === WebSocketState.CLOSED;
        },
        enumerable: false,
        configurable: true
    });
    return StandardWebSocketClient;
}(deps_ts_1.EventEmitter));
exports.StandardWebSocketClient = StandardWebSocketClient;
