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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var _ServerRequest_done, _ServerRequest_contentLength, _ServerRequest_body, _ServerRequest_finalized, _Server_closing, _Server_connections;
exports.__esModule = true;
exports.listenAndServeTLS = exports.serveTLS = exports.listenAndServe = exports.serve = exports._parseAddrFromStr = exports.Server = exports.ServerRequest = void 0;
var bufio_ts_1 = require("../io/bufio.ts");
var assert_ts_1 = require("../_util/assert.ts");
var mod_ts_1 = require("../async/mod.ts");
var _io_ts_1 = require("./_io.ts");
var ServerRequest = (function () {
    function ServerRequest() {
        _ServerRequest_done.set(this, (0, mod_ts_1.deferred)());
        _ServerRequest_contentLength.set(this, undefined);
        _ServerRequest_body.set(this, undefined);
        _ServerRequest_finalized.set(this, false);
    }
    Object.defineProperty(ServerRequest.prototype, "done", {
        get: function () {
            return __classPrivateFieldGet(this, _ServerRequest_done, "f").then(function (e) { return e; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ServerRequest.prototype, "contentLength", {
        get: function () {
            if (__classPrivateFieldGet(this, _ServerRequest_contentLength, "f") === undefined) {
                var cl = this.headers.get("content-length");
                if (cl) {
                    __classPrivateFieldSet(this, _ServerRequest_contentLength, parseInt(cl), "f");
                    if (Number.isNaN(__classPrivateFieldGet(this, _ServerRequest_contentLength, "f"))) {
                        __classPrivateFieldSet(this, _ServerRequest_contentLength, null, "f");
                    }
                }
                else {
                    __classPrivateFieldSet(this, _ServerRequest_contentLength, null, "f");
                }
            }
            return __classPrivateFieldGet(this, _ServerRequest_contentLength, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ServerRequest.prototype, "body", {
        get: function () {
            if (!__classPrivateFieldGet(this, _ServerRequest_body, "f")) {
                if (this.contentLength != null) {
                    __classPrivateFieldSet(this, _ServerRequest_body, (0, _io_ts_1.bodyReader)(this.contentLength, this.r), "f");
                }
                else {
                    var transferEncoding = this.headers.get("transfer-encoding");
                    if (transferEncoding != null) {
                        var parts = transferEncoding
                            .split(",")
                            .map(function (e) { return e.trim().toLowerCase(); });
                        (0, assert_ts_1.assert)(parts.includes("chunked"), 'transfer-encoding must include "chunked" if content-length is not set');
                        __classPrivateFieldSet(this, _ServerRequest_body, (0, _io_ts_1.chunkedBodyReader)(this.headers, this.r), "f");
                    }
                    else {
                        __classPrivateFieldSet(this, _ServerRequest_body, (0, _io_ts_1.emptyReader)(), "f");
                    }
                }
            }
            return __classPrivateFieldGet(this, _ServerRequest_body, "f");
        },
        enumerable: false,
        configurable: true
    });
    ServerRequest.prototype.respond = function (r) {
        return __awaiter(this, void 0, void 0, function () {
            var err, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, (0, _io_ts_1.writeResponse)(this.w, r)];
                    case 1:
                        _a.sent();
                        return [3, 3];
                    case 2:
                        e_1 = _a.sent();
                        try {
                            this.conn.close();
                        }
                        catch (_b) {
                        }
                        err = e_1;
                        return [3, 3];
                    case 3:
                        __classPrivateFieldGet(this, _ServerRequest_done, "f").resolve(err);
                        if (err) {
                            throw err;
                        }
                        return [2];
                }
            });
        });
    };
    ServerRequest.prototype.finalize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var body, buf;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (__classPrivateFieldGet(this, _ServerRequest_finalized, "f"))
                            return [2];
                        body = this.body;
                        buf = new Uint8Array(1024);
                        _a.label = 1;
                    case 1: return [4, body.read(buf)];
                    case 2:
                        if (!((_a.sent()) !== null)) return [3, 3];
                        return [3, 1];
                    case 3:
                        __classPrivateFieldSet(this, _ServerRequest_finalized, true, "f");
                        return [2];
                }
            });
        });
    };
    return ServerRequest;
}());
exports.ServerRequest = ServerRequest;
_ServerRequest_done = new WeakMap(), _ServerRequest_contentLength = new WeakMap(), _ServerRequest_body = new WeakMap(), _ServerRequest_finalized = new WeakMap();
var Server = (function () {
    function Server(listener) {
        this.listener = listener;
        _Server_closing.set(this, false);
        _Server_connections.set(this, []);
    }
    Server.prototype.close = function () {
        __classPrivateFieldSet(this, _Server_closing, true, "f");
        this.listener.close();
        for (var _i = 0, _a = __classPrivateFieldGet(this, _Server_connections, "f"); _i < _a.length; _i++) {
            var conn = _a[_i];
            try {
                conn.close();
            }
            catch (e) {
                if (!(e instanceof Deno.errors.BadResource)) {
                    throw e;
                }
            }
        }
    };
    Server.prototype.iterateHttpRequests = function (conn) {
        return __asyncGenerator(this, arguments, function iterateHttpRequests_1() {
            var reader, writer, request, error_1, _a, responseError, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        reader = new bufio_ts_1.BufReader(conn);
                        writer = new bufio_ts_1.BufWriter(conn);
                        _c.label = 1;
                    case 1:
                        if (!!__classPrivateFieldGet(this, _Server_closing, "f")) return [3, 18];
                        request = void 0;
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 9]);
                        return [4, __await((0, _io_ts_1.readRequest)(conn, reader))];
                    case 3:
                        request = _c.sent();
                        return [3, 9];
                    case 4:
                        error_1 = _c.sent();
                        if (!(error_1 instanceof Deno.errors.InvalidData ||
                            error_1 instanceof Deno.errors.UnexpectedEof)) return [3, 8];
                        _c.label = 5;
                    case 5:
                        _c.trys.push([5, 7, , 8]);
                        return [4, __await((0, _io_ts_1.writeResponse)(writer, {
                                status: 400,
                                body: new TextEncoder().encode("".concat(error_1.message, "\r\n\r\n"))
                            }))];
                    case 6:
                        _c.sent();
                        return [3, 8];
                    case 7:
                        _a = _c.sent();
                        return [3, 8];
                    case 8: return [3, 18];
                    case 9:
                        if (request === null) {
                            return [3, 18];
                        }
                        request.w = writer;
                        return [4, __await(request)];
                    case 10: return [4, _c.sent()];
                    case 11:
                        _c.sent();
                        return [4, __await(request.done)];
                    case 12:
                        responseError = _c.sent();
                        if (!responseError) return [3, 14];
                        this.untrackConnection(request.conn);
                        return [4, __await(void 0)];
                    case 13: return [2, _c.sent()];
                    case 14:
                        _c.trys.push([14, 16, , 17]);
                        return [4, __await(request.finalize())];
                    case 15:
                        _c.sent();
                        return [3, 17];
                    case 16:
                        _b = _c.sent();
                        return [3, 18];
                    case 17: return [3, 1];
                    case 18:
                        this.untrackConnection(conn);
                        try {
                            conn.close();
                        }
                        catch (_d) {
                        }
                        return [2];
                }
            });
        });
    };
    Server.prototype.trackConnection = function (conn) {
        __classPrivateFieldGet(this, _Server_connections, "f").push(conn);
    };
    Server.prototype.untrackConnection = function (conn) {
        var index = __classPrivateFieldGet(this, _Server_connections, "f").indexOf(conn);
        if (index !== -1) {
            __classPrivateFieldGet(this, _Server_connections, "f").splice(index, 1);
        }
    };
    Server.prototype.acceptConnAndIterateHttpRequests = function (mux) {
        return __asyncGenerator(this, arguments, function acceptConnAndIterateHttpRequests_1() {
            var conn, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!__classPrivateFieldGet(this, _Server_closing, "f")) return [3, 2];
                        return [4, __await(void 0)];
                    case 1: return [2, _a.sent()];
                    case 2:
                        _a.trys.push([2, 4, , 7]);
                        return [4, __await(this.listener.accept())];
                    case 3:
                        conn = _a.sent();
                        return [3, 7];
                    case 4:
                        error_2 = _a.sent();
                        if (!(error_2 instanceof Deno.errors.BadResource ||
                            error_2 instanceof Deno.errors.InvalidData ||
                            error_2 instanceof Deno.errors.UnexpectedEof ||
                            error_2 instanceof Deno.errors.ConnectionReset)) return [3, 6];
                        return [4, __await(mux.add(this.acceptConnAndIterateHttpRequests(mux)))];
                    case 5: return [2, _a.sent()];
                    case 6: throw error_2;
                    case 7:
                        this.trackConnection(conn);
                        mux.add(this.acceptConnAndIterateHttpRequests(mux));
                        return [5, __values(__asyncDelegator(__asyncValues(this.iterateHttpRequests(conn))))];
                    case 8: return [4, __await.apply(void 0, [_a.sent()])];
                    case 9:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Server.prototype[(_Server_closing = new WeakMap(), _Server_connections = new WeakMap(), Symbol.asyncIterator)] = function () {
        var mux = new mod_ts_1.MuxAsyncIterator();
        mux.add(this.acceptConnAndIterateHttpRequests(mux));
        return mux.iterate();
    };
    return Server;
}());
exports.Server = Server;
function _parseAddrFromStr(addr) {
    var url;
    try {
        var host = addr.startsWith(":") ? "0.0.0.0".concat(addr) : addr;
        url = new URL("http://".concat(host));
    }
    catch (_a) {
        throw new TypeError("Invalid address.");
    }
    if (url.username ||
        url.password ||
        url.pathname != "/" ||
        url.search ||
        url.hash) {
        throw new TypeError("Invalid address.");
    }
    return {
        hostname: url.hostname,
        port: url.port === "" ? 80 : Number(url.port)
    };
}
exports._parseAddrFromStr = _parseAddrFromStr;
function serve(addr) {
    if (typeof addr === "string") {
        addr = _parseAddrFromStr(addr);
    }
    var listener = Deno.listen(addr);
    return new Server(listener);
}
exports.serve = serve;
function listenAndServe(addr, handler) {
    var e_2, _a;
    return __awaiter(this, void 0, void 0, function () {
        var server, server_1, server_1_1, request, e_2_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    server = serve(addr);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 12]);
                    server_1 = __asyncValues(server);
                    _b.label = 2;
                case 2: return [4, server_1.next()];
                case 3:
                    if (!(server_1_1 = _b.sent(), !server_1_1.done)) return [3, 5];
                    request = server_1_1.value;
                    handler(request);
                    _b.label = 4;
                case 4: return [3, 2];
                case 5: return [3, 12];
                case 6:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
                    return [3, 12];
                case 7:
                    _b.trys.push([7, , 10, 11]);
                    if (!(server_1_1 && !server_1_1.done && (_a = server_1["return"]))) return [3, 9];
                    return [4, _a.call(server_1)];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9: return [3, 11];
                case 10:
                    if (e_2) throw e_2.error;
                    return [7];
                case 11: return [7];
                case 12: return [2];
            }
        });
    });
}
exports.listenAndServe = listenAndServe;
function serveTLS(options) {
    var tlsOptions = __assign(__assign({}, options), { transport: "tcp" });
    var listener = Deno.listenTls(tlsOptions);
    return new Server(listener);
}
exports.serveTLS = serveTLS;
function listenAndServeTLS(options, handler) {
    var e_3, _a;
    return __awaiter(this, void 0, void 0, function () {
        var server, server_2, server_2_1, request, e_3_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    server = serveTLS(options);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 12]);
                    server_2 = __asyncValues(server);
                    _b.label = 2;
                case 2: return [4, server_2.next()];
                case 3:
                    if (!(server_2_1 = _b.sent(), !server_2_1.done)) return [3, 5];
                    request = server_2_1.value;
                    handler(request);
                    _b.label = 4;
                case 4: return [3, 2];
                case 5: return [3, 12];
                case 6:
                    e_3_1 = _b.sent();
                    e_3 = { error: e_3_1 };
                    return [3, 12];
                case 7:
                    _b.trys.push([7, , 10, 11]);
                    if (!(server_2_1 && !server_2_1.done && (_a = server_2["return"]))) return [3, 9];
                    return [4, _a.call(server_2)];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9: return [3, 11];
                case 10:
                    if (e_3) throw e_3.error;
                    return [7];
                case 11: return [7];
                case 12: return [2];
            }
        });
    });
}
exports.listenAndServeTLS = listenAndServeTLS;
