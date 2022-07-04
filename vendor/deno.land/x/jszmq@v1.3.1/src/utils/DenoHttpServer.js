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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var _DenoHttpServer_listener, _DenoHttpServer_socketListeners;
exports.__esModule = true;
exports.DenoHttpServer = void 0;
var DenoHttpServer = (function () {
    function DenoHttpServer(address) {
        _DenoHttpServer_listener.set(this, void 0);
        _DenoHttpServer_socketListeners.set(this, new Map());
        if (address.startsWith("ws://") || address.startsWith("wss://")) {
            this.address = address;
            var url = new URL(address);
            var port = void 0;
            if (url.port) {
                port = parseInt(url.port);
            }
            else if (url.protocol === "wss") {
                port = 443;
            }
            else {
                port = 80;
            }
            __classPrivateFieldSet(this, _DenoHttpServer_listener, Deno.listen({ port: port }), "f");
        }
        else {
            throw new Error("unsupported transport");
        }
    }
    DenoHttpServer.prototype.registerPath = function (path, listener) {
        if (__classPrivateFieldGet(this, _DenoHttpServer_socketListeners, "f").has(path)) {
            throw Error("Path already registered for an Websocket listener.");
        }
        __classPrivateFieldGet(this, _DenoHttpServer_socketListeners, "f").set(path, listener);
    };
    DenoHttpServer.prototype.removePath = function (path) {
        __classPrivateFieldGet(this, _DenoHttpServer_socketListeners, "f")["delete"](path);
    };
    DenoHttpServer.prototype.listen = function () {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, _c, conn, e_1_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, 6, 11]);
                        _b = __asyncValues(__classPrivateFieldGet(this, _DenoHttpServer_listener, "f"));
                        _d.label = 1;
                    case 1: return [4, _b.next()];
                    case 2:
                        if (!(_c = _d.sent(), !_c.done)) return [3, 4];
                        conn = _c.value;
                        this.handle(conn);
                        _d.label = 3;
                    case 3: return [3, 1];
                    case 4: return [3, 11];
                    case 5:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3, 11];
                    case 6:
                        _d.trys.push([6, , 9, 10]);
                        if (!(_c && !_c.done && (_a = _b["return"]))) return [3, 8];
                        return [4, _a.call(_b)];
                    case 7:
                        _d.sent();
                        _d.label = 8;
                    case 8: return [3, 10];
                    case 9:
                        if (e_1) throw e_1.error;
                        return [7];
                    case 10: return [7];
                    case 11: return [2];
                }
            });
        });
    };
    DenoHttpServer.prototype.close = function () {
        __classPrivateFieldGet(this, _DenoHttpServer_listener, "f").close();
    };
    DenoHttpServer.prototype.handle = function (conn) {
        var e_2, _a;
        return __awaiter(this, void 0, void 0, function () {
            var httpConn, httpConn_1, httpConn_1_1, requestEvent, e_2_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        httpConn = Deno.serveHttp(conn);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 7, 8, 13]);
                        httpConn_1 = __asyncValues(httpConn);
                        _b.label = 2;
                    case 2: return [4, httpConn_1.next()];
                    case 3:
                        if (!(httpConn_1_1 = _b.sent(), !httpConn_1_1.done)) return [3, 6];
                        requestEvent = httpConn_1_1.value;
                        return [4, requestEvent.respondWith(this.handleReq(requestEvent.request))];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5: return [3, 2];
                    case 6: return [3, 13];
                    case 7:
                        e_2_1 = _b.sent();
                        e_2 = { error: e_2_1 };
                        return [3, 13];
                    case 8:
                        _b.trys.push([8, , 11, 12]);
                        if (!(httpConn_1_1 && !httpConn_1_1.done && (_a = httpConn_1["return"]))) return [3, 10];
                        return [4, _a.call(httpConn_1)];
                    case 9:
                        _b.sent();
                        _b.label = 10;
                    case 10: return [3, 12];
                    case 11:
                        if (e_2) throw e_2.error;
                        return [7];
                    case 12: return [7];
                    case 13: return [2];
                }
            });
        });
    };
    DenoHttpServer.prototype.handleReq = function (req) {
        var _a, _b;
        if (((_a = req.headers.get("upgrade")) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== "websocket") {
            return new Response("Missing upgrade to websocket header.", {
                status: 400
            });
        }
        if (!((_b = req.headers.get("sec-websocket-protocol")) === null || _b === void 0 ? void 0 : _b.toUpperCase().includes("ZWS2.0"))) {
            return new Response("Invalid websocket protocol specified.", {
                status: 400
            });
        }
        var path = new URL(req.url).pathname;
        var handler = __classPrivateFieldGet(this, _DenoHttpServer_socketListeners, "f").get(path);
        if (!handler) {
            return new Response("Invalid path.", { status: 404 });
        }
        var _c = Deno.upgradeWebSocket(req, {
            protocol: "ZWS2.0"
        }), socket = _c.socket, response = _c.response;
        var headers = {};
        req.headers.forEach(function (val, key) {
            headers[key] = val;
        });
        socket.onopen = function () { return handler.onConnection(socket, headers); };
        return response;
    };
    return DenoHttpServer;
}());
exports.DenoHttpServer = DenoHttpServer;
_DenoHttpServer_listener = new WeakMap(), _DenoHttpServer_socketListeners = new WeakMap();
