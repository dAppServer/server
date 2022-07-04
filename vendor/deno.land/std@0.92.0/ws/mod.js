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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.createWebSocket = exports.handshake = exports.createSecKey = exports.acceptWebSocket = exports.createSecAccept = exports.acceptable = exports.readFrame = exports.writeFrame = exports.unmask = exports.isWebSocketPongEvent = exports.isWebSocketPingEvent = exports.isWebSocketCloseEvent = exports.OpCode = void 0;
var has_own_property_ts_1 = require("../_util/has_own_property.ts");
var bufio_ts_1 = require("../io/bufio.ts");
var ioutil_ts_1 = require("../io/ioutil.ts");
var sha1_ts_1 = require("../hash/sha1.ts");
var _io_ts_1 = require("../http/_io.ts");
var mod_ts_1 = require("../textproto/mod.ts");
var deferred_ts_1 = require("../async/deferred.ts");
var assert_ts_1 = require("../_util/assert.ts");
var mod_ts_2 = require("../bytes/mod.ts");
var OpCode;
(function (OpCode) {
    OpCode[OpCode["Continue"] = 0] = "Continue";
    OpCode[OpCode["TextFrame"] = 1] = "TextFrame";
    OpCode[OpCode["BinaryFrame"] = 2] = "BinaryFrame";
    OpCode[OpCode["Close"] = 8] = "Close";
    OpCode[OpCode["Ping"] = 9] = "Ping";
    OpCode[OpCode["Pong"] = 10] = "Pong";
})(OpCode = exports.OpCode || (exports.OpCode = {}));
function isWebSocketCloseEvent(a) {
    return (0, has_own_property_ts_1.hasOwnProperty)(a, "code");
}
exports.isWebSocketCloseEvent = isWebSocketCloseEvent;
function isWebSocketPingEvent(a) {
    return Array.isArray(a) && a[0] === "ping" && a[1] instanceof Uint8Array;
}
exports.isWebSocketPingEvent = isWebSocketPingEvent;
function isWebSocketPongEvent(a) {
    return Array.isArray(a) && a[0] === "pong" && a[1] instanceof Uint8Array;
}
exports.isWebSocketPongEvent = isWebSocketPongEvent;
function unmask(payload, mask) {
    if (mask) {
        for (var i = 0, len = payload.length; i < len; i++) {
            payload[i] ^= mask[i & 3];
        }
    }
}
exports.unmask = unmask;
function writeFrame(frame, writer) {
    return __awaiter(this, void 0, void 0, function () {
        var payloadLength, header, hasMask, w;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    payloadLength = frame.payload.byteLength;
                    hasMask = frame.mask ? 0x80 : 0;
                    if (frame.mask && frame.mask.byteLength !== 4) {
                        throw new Error("invalid mask. mask must be 4 bytes: length=" + frame.mask.byteLength);
                    }
                    if (payloadLength < 126) {
                        header = new Uint8Array([0x80 | frame.opcode, hasMask | payloadLength]);
                    }
                    else if (payloadLength < 0xffff) {
                        header = new Uint8Array([
                            0x80 | frame.opcode,
                            hasMask | 126,
                            payloadLength >>> 8,
                            payloadLength & 0x00ff,
                        ]);
                    }
                    else {
                        header = new Uint8Array(__spreadArray([
                            0x80 | frame.opcode,
                            hasMask | 127
                        ], (0, ioutil_ts_1.sliceLongToBytes)(payloadLength), true));
                    }
                    if (frame.mask) {
                        header = (0, mod_ts_2.concat)(header, frame.mask);
                    }
                    unmask(frame.payload, frame.mask);
                    header = (0, mod_ts_2.concat)(header, frame.payload);
                    w = bufio_ts_1.BufWriter.create(writer);
                    return [4, w.write(header)];
                case 1:
                    _a.sent();
                    return [4, w.flush()];
                case 2:
                    _a.sent();
                    return [2];
            }
        });
    });
}
exports.writeFrame = writeFrame;
function readFrame(buf) {
    return __awaiter(this, void 0, void 0, function () {
        var b, isLastFrame, opcode, hasMask, payloadLength, l, l, mask, _a, payload, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4, buf.readByte()];
                case 1:
                    b = _c.sent();
                    (0, assert_ts_1.assert)(b !== null);
                    isLastFrame = false;
                    switch (b >>> 4) {
                        case 8:
                            isLastFrame = true;
                            break;
                        case 0:
                            isLastFrame = false;
                            break;
                        default:
                            throw new Error("invalid signature");
                    }
                    opcode = b & 0x0f;
                    return [4, buf.readByte()];
                case 2:
                    b = _c.sent();
                    (0, assert_ts_1.assert)(b !== null);
                    hasMask = b >>> 7;
                    payloadLength = b & 127;
                    if (!(payloadLength === 126)) return [3, 4];
                    return [4, (0, ioutil_ts_1.readShort)(buf)];
                case 3:
                    l = _c.sent();
                    (0, assert_ts_1.assert)(l !== null);
                    payloadLength = l;
                    return [3, 6];
                case 4:
                    if (!(payloadLength === 127)) return [3, 6];
                    return [4, (0, ioutil_ts_1.readLong)(buf)];
                case 5:
                    l = _c.sent();
                    (0, assert_ts_1.assert)(l !== null);
                    payloadLength = Number(l);
                    _c.label = 6;
                case 6:
                    if (!hasMask) return [3, 8];
                    mask = new Uint8Array(4);
                    _a = assert_ts_1.assert;
                    return [4, buf.readFull(mask)];
                case 7:
                    _a.apply(void 0, [(_c.sent()) !== null]);
                    _c.label = 8;
                case 8:
                    payload = new Uint8Array(payloadLength);
                    _b = assert_ts_1.assert;
                    return [4, buf.readFull(payload)];
                case 9:
                    _b.apply(void 0, [(_c.sent()) !== null]);
                    return [2, {
                            isLastFrame: isLastFrame,
                            opcode: opcode,
                            mask: mask,
                            payload: payload
                        }];
            }
        });
    });
}
exports.readFrame = readFrame;
var WebSocketImpl = (function () {
    function WebSocketImpl(_a) {
        var conn = _a.conn, bufReader = _a.bufReader, bufWriter = _a.bufWriter, mask = _a.mask;
        this.sendQueue = [];
        this._isClosed = false;
        this.conn = conn;
        this.mask = mask;
        this.bufReader = bufReader || new bufio_ts_1.BufReader(conn);
        this.bufWriter = bufWriter || new bufio_ts_1.BufWriter(conn);
    }
    WebSocketImpl.prototype[Symbol.asyncIterator] = function () {
        return __asyncGenerator(this, arguments, function _a() {
            var decoder, frames, payloadsLength, frame, _b, _c, concat_1, offs, _i, frames_1, frame_1, code, reason;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        decoder = new TextDecoder();
                        frames = [];
                        payloadsLength = 0;
                        _d.label = 1;
                    case 1:
                        if (!!this._isClosed) return [3, 27];
                        frame = void 0;
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 4, , 5]);
                        return [4, __await(readFrame(this.bufReader))];
                    case 3:
                        frame = _d.sent();
                        return [3, 5];
                    case 4:
                        _b = _d.sent();
                        this.ensureSocketClosed();
                        return [3, 27];
                    case 5:
                        unmask(frame.payload, frame.mask);
                        _c = frame.opcode;
                        switch (_c) {
                            case OpCode.TextFrame: return [3, 6];
                            case OpCode.BinaryFrame: return [3, 6];
                            case OpCode.Continue: return [3, 6];
                            case OpCode.Close: return [3, 14];
                            case OpCode.Ping: return [3, 19];
                            case OpCode.Pong: return [3, 23];
                        }
                        return [3, 26];
                    case 6:
                        frames.push(frame);
                        payloadsLength += frame.payload.length;
                        if (!frame.isLastFrame) return [3, 13];
                        concat_1 = new Uint8Array(payloadsLength);
                        offs = 0;
                        for (_i = 0, frames_1 = frames; _i < frames_1.length; _i++) {
                            frame_1 = frames_1[_i];
                            concat_1.set(frame_1.payload, offs);
                            offs += frame_1.payload.length;
                        }
                        if (!(frames[0].opcode === OpCode.TextFrame)) return [3, 9];
                        return [4, __await(decoder.decode(concat_1))];
                    case 7: return [4, _d.sent()];
                    case 8:
                        _d.sent();
                        return [3, 12];
                    case 9: return [4, __await(concat_1)];
                    case 10: return [4, _d.sent()];
                    case 11:
                        _d.sent();
                        _d.label = 12;
                    case 12:
                        frames = [];
                        payloadsLength = 0;
                        _d.label = 13;
                    case 13: return [3, 26];
                    case 14:
                        code = (frame.payload[0] << 8) | frame.payload[1];
                        reason = decoder.decode(frame.payload.subarray(2, frame.payload.length));
                        return [4, __await(this.close(code, reason))];
                    case 15:
                        _d.sent();
                        return [4, __await({ code: code, reason: reason })];
                    case 16: return [4, _d.sent()];
                    case 17:
                        _d.sent();
                        return [4, __await(void 0)];
                    case 18: return [2, _d.sent()];
                    case 19: return [4, __await(this.enqueue({
                            opcode: OpCode.Pong,
                            payload: frame.payload,
                            isLastFrame: true
                        }))];
                    case 20:
                        _d.sent();
                        return [4, __await(["ping", frame.payload])];
                    case 21: return [4, _d.sent()];
                    case 22:
                        _d.sent();
                        return [3, 26];
                    case 23: return [4, __await(["pong", frame.payload])];
                    case 24: return [4, _d.sent()];
                    case 25:
                        _d.sent();
                        return [3, 26];
                    case 26: return [3, 1];
                    case 27: return [2];
                }
            });
        });
    };
    WebSocketImpl.prototype.dequeue = function () {
        var _this = this;
        var entry = this.sendQueue[0];
        if (!entry)
            return;
        if (this._isClosed)
            return;
        var d = entry.d, frame = entry.frame;
        writeFrame(frame, this.bufWriter)
            .then(function () { return d.resolve(); })["catch"](function (e) { return d.reject(e); })["finally"](function () {
            _this.sendQueue.shift();
            _this.dequeue();
        });
    };
    WebSocketImpl.prototype.enqueue = function (frame) {
        if (this._isClosed) {
            throw new Deno.errors.ConnectionReset("Socket has already been closed");
        }
        var d = (0, deferred_ts_1.deferred)();
        this.sendQueue.push({ d: d, frame: frame });
        if (this.sendQueue.length === 1) {
            this.dequeue();
        }
        return d;
    };
    WebSocketImpl.prototype.send = function (data) {
        var opcode = typeof data === "string"
            ? OpCode.TextFrame
            : OpCode.BinaryFrame;
        var payload = typeof data === "string"
            ? new TextEncoder().encode(data)
            : data;
        var isLastFrame = true;
        var frame = {
            isLastFrame: isLastFrame,
            opcode: opcode,
            payload: payload,
            mask: this.mask
        };
        return this.enqueue(frame);
    };
    WebSocketImpl.prototype.ping = function (data) {
        if (data === void 0) { data = ""; }
        var payload = typeof data === "string"
            ? new TextEncoder().encode(data)
            : data;
        var frame = {
            isLastFrame: true,
            opcode: OpCode.Ping,
            mask: this.mask,
            payload: payload
        };
        return this.enqueue(frame);
    };
    Object.defineProperty(WebSocketImpl.prototype, "isClosed", {
        get: function () {
            return this._isClosed;
        },
        enumerable: false,
        configurable: true
    });
    WebSocketImpl.prototype.close = function (code, reason) {
        if (code === void 0) { code = 1000; }
        return __awaiter(this, void 0, void 0, function () {
            var header, payload, reasonBytes, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        header = [code >>> 8, code & 0x00ff];
                        payload = void 0;
                        if (reason) {
                            reasonBytes = new TextEncoder().encode(reason);
                            payload = new Uint8Array(2 + reasonBytes.byteLength);
                            payload.set(header);
                            payload.set(reasonBytes, 2);
                        }
                        else {
                            payload = new Uint8Array(header);
                        }
                        return [4, this.enqueue({
                                isLastFrame: true,
                                opcode: OpCode.Close,
                                mask: this.mask,
                                payload: payload
                            })];
                    case 1:
                        _a.sent();
                        return [3, 4];
                    case 2:
                        e_1 = _a.sent();
                        throw e_1;
                    case 3:
                        this.ensureSocketClosed();
                        return [7];
                    case 4: return [2];
                }
            });
        });
    };
    WebSocketImpl.prototype.closeForce = function () {
        this.ensureSocketClosed();
    };
    WebSocketImpl.prototype.ensureSocketClosed = function () {
        if (this.isClosed)
            return;
        try {
            this.conn.close();
        }
        catch (e) {
            console.error(e);
        }
        finally {
            this._isClosed = true;
            var rest = this.sendQueue;
            this.sendQueue = [];
            rest.forEach(function (e) {
                return e.d.reject(new Deno.errors.ConnectionReset("Socket has already been closed"));
            });
        }
    };
    return WebSocketImpl;
}());
function acceptable(req) {
    var upgrade = req.headers.get("upgrade");
    if (!upgrade || upgrade.toLowerCase() !== "websocket") {
        return false;
    }
    var secKey = req.headers.get("sec-websocket-key");
    return (req.headers.has("sec-websocket-key") &&
        typeof secKey === "string" &&
        secKey.length > 0);
}
exports.acceptable = acceptable;
var kGUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
function createSecAccept(nonce) {
    var sha1 = new sha1_ts_1.Sha1();
    sha1.update(nonce + kGUID);
    var bytes = sha1.digest();
    return btoa(String.fromCharCode.apply(String, bytes));
}
exports.createSecAccept = createSecAccept;
function acceptWebSocket(req) {
    return __awaiter(this, void 0, void 0, function () {
        var conn, headers, bufReader, bufWriter, sock, secKey, secAccept, newHeaders, secProtocol, secVersion;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    conn = req.conn, headers = req.headers, bufReader = req.bufReader, bufWriter = req.bufWriter;
                    if (!acceptable(req)) return [3, 2];
                    sock = new WebSocketImpl({ conn: conn, bufReader: bufReader, bufWriter: bufWriter });
                    secKey = headers.get("sec-websocket-key");
                    if (typeof secKey !== "string") {
                        throw new Error("sec-websocket-key is not provided");
                    }
                    secAccept = createSecAccept(secKey);
                    newHeaders = new Headers({
                        Upgrade: "websocket",
                        Connection: "Upgrade",
                        "Sec-WebSocket-Accept": secAccept
                    });
                    secProtocol = headers.get("sec-websocket-protocol");
                    if (typeof secProtocol === "string") {
                        newHeaders.set("Sec-WebSocket-Protocol", secProtocol);
                    }
                    secVersion = headers.get("sec-websocket-version");
                    if (typeof secVersion === "string") {
                        newHeaders.set("Sec-WebSocket-Version", secVersion);
                    }
                    return [4, (0, _io_ts_1.writeResponse)(bufWriter, {
                            status: 101,
                            headers: newHeaders
                        })];
                case 1:
                    _a.sent();
                    return [2, sock];
                case 2: throw new Error("request is not acceptable");
            }
        });
    });
}
exports.acceptWebSocket = acceptWebSocket;
var kSecChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-.~_";
function createSecKey() {
    var key = "";
    for (var i = 0; i < 16; i++) {
        var j = Math.floor(Math.random() * kSecChars.length);
        key += kSecChars[j];
    }
    return btoa(key);
}
exports.createSecKey = createSecKey;
function handshake(url, headers, bufReader, bufWriter) {
    return __awaiter(this, void 0, void 0, function () {
        var hostname, pathname, search, key, headerStr, _i, headers_1, _a, key_1, value, tpReader, statusLine, m, _b, version, statusCode, responseHeaders, expectedSecAccept, secAccept;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    hostname = url.hostname, pathname = url.pathname, search = url.search;
                    key = createSecKey();
                    if (!headers.has("host")) {
                        headers.set("host", hostname);
                    }
                    headers.set("upgrade", "websocket");
                    headers.set("connection", "upgrade");
                    headers.set("sec-websocket-key", key);
                    headers.set("sec-websocket-version", "13");
                    headerStr = "GET ".concat(pathname).concat(search, " HTTP/1.1\r\n");
                    for (_i = 0, headers_1 = headers; _i < headers_1.length; _i++) {
                        _a = headers_1[_i], key_1 = _a[0], value = _a[1];
                        headerStr += "".concat(key_1, ": ").concat(value, "\r\n");
                    }
                    headerStr += "\r\n";
                    return [4, bufWriter.write(new TextEncoder().encode(headerStr))];
                case 1:
                    _c.sent();
                    return [4, bufWriter.flush()];
                case 2:
                    _c.sent();
                    tpReader = new mod_ts_1.TextProtoReader(bufReader);
                    return [4, tpReader.readLine()];
                case 3:
                    statusLine = _c.sent();
                    if (statusLine === null) {
                        throw new Deno.errors.UnexpectedEof();
                    }
                    m = statusLine.match(/^(?<version>\S+) (?<statusCode>\S+) /);
                    if (!m) {
                        throw new Error("ws: invalid status line: " + statusLine);
                    }
                    (0, assert_ts_1.assert)(m.groups);
                    _b = m.groups, version = _b.version, statusCode = _b.statusCode;
                    if (version !== "HTTP/1.1" || statusCode !== "101") {
                        throw new Error("ws: server didn't accept handshake: " +
                            "version=".concat(version, ", statusCode=").concat(statusCode));
                    }
                    return [4, tpReader.readMIMEHeader()];
                case 4:
                    responseHeaders = _c.sent();
                    if (responseHeaders === null) {
                        throw new Deno.errors.UnexpectedEof();
                    }
                    expectedSecAccept = createSecAccept(key);
                    secAccept = responseHeaders.get("sec-websocket-accept");
                    if (secAccept !== expectedSecAccept) {
                        throw new Error("ws: unexpected sec-websocket-accept header: " +
                            "expected=".concat(expectedSecAccept, ", actual=").concat(secAccept));
                    }
                    return [2];
            }
        });
    });
}
exports.handshake = handshake;
function createWebSocket(params) {
    return new WebSocketImpl(params);
}
exports.createWebSocket = createWebSocket;
