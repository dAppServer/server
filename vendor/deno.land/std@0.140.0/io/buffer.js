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
var _Buffer_instances, _Buffer_buf, _Buffer_off, _Buffer_tryGrowByReslice, _Buffer_reslice, _Buffer_grow, _BufReader_buf, _BufReader_rd, _BufReader_r, _BufReader_w, _BufReader_eof, _BufReader_fill, _BufReader_reset, _BufWriter_writer, _BufWriterSync_writer;
exports.__esModule = true;
exports.readLines = exports.readStringDelim = exports.readDelim = exports.BufWriterSync = exports.BufWriter = exports.BufReader = exports.PartialReadError = exports.BufferFullError = exports.Buffer = void 0;
var assert_ts_1 = require("../_util/assert.ts");
var bytes_list_ts_1 = require("../bytes/bytes_list.ts");
var mod_ts_1 = require("../bytes/mod.ts");
var MIN_READ = 32 * 1024;
var MAX_SIZE = Math.pow(2, 32) - 2;
var Buffer = (function () {
    function Buffer(ab) {
        _Buffer_instances.add(this);
        _Buffer_buf.set(this, void 0);
        _Buffer_off.set(this, 0);
        __classPrivateFieldSet(this, _Buffer_buf, ab === undefined ? new Uint8Array(0) : new Uint8Array(ab), "f");
    }
    Buffer.prototype.bytes = function (options) {
        if (options === void 0) { options = { copy: true }; }
        if (options.copy === false)
            return __classPrivateFieldGet(this, _Buffer_buf, "f").subarray(__classPrivateFieldGet(this, _Buffer_off, "f"));
        return __classPrivateFieldGet(this, _Buffer_buf, "f").slice(__classPrivateFieldGet(this, _Buffer_off, "f"));
    };
    Buffer.prototype.empty = function () {
        return __classPrivateFieldGet(this, _Buffer_buf, "f").byteLength <= __classPrivateFieldGet(this, _Buffer_off, "f");
    };
    Object.defineProperty(Buffer.prototype, "length", {
        get: function () {
            return __classPrivateFieldGet(this, _Buffer_buf, "f").byteLength - __classPrivateFieldGet(this, _Buffer_off, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Buffer.prototype, "capacity", {
        get: function () {
            return __classPrivateFieldGet(this, _Buffer_buf, "f").buffer.byteLength;
        },
        enumerable: false,
        configurable: true
    });
    Buffer.prototype.truncate = function (n) {
        if (n === 0) {
            this.reset();
            return;
        }
        if (n < 0 || n > this.length) {
            throw Error("bytes.Buffer: truncation out of range");
        }
        __classPrivateFieldGet(this, _Buffer_instances, "m", _Buffer_reslice).call(this, __classPrivateFieldGet(this, _Buffer_off, "f") + n);
    };
    Buffer.prototype.reset = function () {
        __classPrivateFieldGet(this, _Buffer_instances, "m", _Buffer_reslice).call(this, 0);
        __classPrivateFieldSet(this, _Buffer_off, 0, "f");
    };
    Buffer.prototype.readSync = function (p) {
        if (this.empty()) {
            this.reset();
            if (p.byteLength === 0) {
                return 0;
            }
            return null;
        }
        var nread = (0, mod_ts_1.copy)(__classPrivateFieldGet(this, _Buffer_buf, "f").subarray(__classPrivateFieldGet(this, _Buffer_off, "f")), p);
        __classPrivateFieldSet(this, _Buffer_off, __classPrivateFieldGet(this, _Buffer_off, "f") + nread, "f");
        return nread;
    };
    Buffer.prototype.read = function (p) {
        var rr = this.readSync(p);
        return Promise.resolve(rr);
    };
    Buffer.prototype.writeSync = function (p) {
        var m = __classPrivateFieldGet(this, _Buffer_instances, "m", _Buffer_grow).call(this, p.byteLength);
        return (0, mod_ts_1.copy)(p, __classPrivateFieldGet(this, _Buffer_buf, "f"), m);
    };
    Buffer.prototype.write = function (p) {
        var n = this.writeSync(p);
        return Promise.resolve(n);
    };
    Buffer.prototype.grow = function (n) {
        if (n < 0) {
            throw Error("Buffer.grow: negative count");
        }
        var m = __classPrivateFieldGet(this, _Buffer_instances, "m", _Buffer_grow).call(this, n);
        __classPrivateFieldGet(this, _Buffer_instances, "m", _Buffer_reslice).call(this, m);
    };
    Buffer.prototype.readFrom = function (r) {
        return __awaiter(this, void 0, void 0, function () {
            var n, tmp, shouldGrow, buf, nread;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        n = 0;
                        tmp = new Uint8Array(MIN_READ);
                        _a.label = 1;
                    case 1:
                        if (!true) return [3, 3];
                        shouldGrow = this.capacity - this.length < MIN_READ;
                        buf = shouldGrow
                            ? tmp
                            : new Uint8Array(__classPrivateFieldGet(this, _Buffer_buf, "f").buffer, this.length);
                        return [4, r.read(buf)];
                    case 2:
                        nread = _a.sent();
                        if (nread === null) {
                            return [2, n];
                        }
                        if (shouldGrow)
                            this.writeSync(buf.subarray(0, nread));
                        else
                            __classPrivateFieldGet(this, _Buffer_instances, "m", _Buffer_reslice).call(this, this.length + nread);
                        n += nread;
                        return [3, 1];
                    case 3: return [2];
                }
            });
        });
    };
    Buffer.prototype.readFromSync = function (r) {
        var n = 0;
        var tmp = new Uint8Array(MIN_READ);
        while (true) {
            var shouldGrow = this.capacity - this.length < MIN_READ;
            var buf = shouldGrow
                ? tmp
                : new Uint8Array(__classPrivateFieldGet(this, _Buffer_buf, "f").buffer, this.length);
            var nread = r.readSync(buf);
            if (nread === null) {
                return n;
            }
            if (shouldGrow)
                this.writeSync(buf.subarray(0, nread));
            else
                __classPrivateFieldGet(this, _Buffer_instances, "m", _Buffer_reslice).call(this, this.length + nread);
            n += nread;
        }
    };
    return Buffer;
}());
exports.Buffer = Buffer;
_Buffer_buf = new WeakMap(), _Buffer_off = new WeakMap(), _Buffer_instances = new WeakSet(), _Buffer_tryGrowByReslice = function _Buffer_tryGrowByReslice(n) {
    var l = __classPrivateFieldGet(this, _Buffer_buf, "f").byteLength;
    if (n <= this.capacity - l) {
        __classPrivateFieldGet(this, _Buffer_instances, "m", _Buffer_reslice).call(this, l + n);
        return l;
    }
    return -1;
}, _Buffer_reslice = function _Buffer_reslice(len) {
    (0, assert_ts_1.assert)(len <= __classPrivateFieldGet(this, _Buffer_buf, "f").buffer.byteLength);
    __classPrivateFieldSet(this, _Buffer_buf, new Uint8Array(__classPrivateFieldGet(this, _Buffer_buf, "f").buffer, 0, len), "f");
}, _Buffer_grow = function _Buffer_grow(n) {
    var m = this.length;
    if (m === 0 && __classPrivateFieldGet(this, _Buffer_off, "f") !== 0) {
        this.reset();
    }
    var i = __classPrivateFieldGet(this, _Buffer_instances, "m", _Buffer_tryGrowByReslice).call(this, n);
    if (i >= 0) {
        return i;
    }
    var c = this.capacity;
    if (n <= Math.floor(c / 2) - m) {
        (0, mod_ts_1.copy)(__classPrivateFieldGet(this, _Buffer_buf, "f").subarray(__classPrivateFieldGet(this, _Buffer_off, "f")), __classPrivateFieldGet(this, _Buffer_buf, "f"));
    }
    else if (c + n > MAX_SIZE) {
        throw new Error("The buffer cannot be grown beyond the maximum size.");
    }
    else {
        var buf = new Uint8Array(Math.min(2 * c + n, MAX_SIZE));
        (0, mod_ts_1.copy)(__classPrivateFieldGet(this, _Buffer_buf, "f").subarray(__classPrivateFieldGet(this, _Buffer_off, "f")), buf);
        __classPrivateFieldSet(this, _Buffer_buf, buf, "f");
    }
    __classPrivateFieldSet(this, _Buffer_off, 0, "f");
    __classPrivateFieldGet(this, _Buffer_instances, "m", _Buffer_reslice).call(this, Math.min(m + n, MAX_SIZE));
    return m;
};
var DEFAULT_BUF_SIZE = 4096;
var MIN_BUF_SIZE = 16;
var MAX_CONSECUTIVE_EMPTY_READS = 100;
var CR = "\r".charCodeAt(0);
var LF = "\n".charCodeAt(0);
var BufferFullError = (function (_super) {
    __extends(BufferFullError, _super);
    function BufferFullError(partial) {
        var _this = _super.call(this, "Buffer full") || this;
        _this.partial = partial;
        _this.name = "BufferFullError";
        return _this;
    }
    return BufferFullError;
}(Error));
exports.BufferFullError = BufferFullError;
var PartialReadError = (function (_super) {
    __extends(PartialReadError, _super);
    function PartialReadError() {
        var _this = _super.call(this, "Encountered UnexpectedEof, data only partially read") || this;
        _this.name = "PartialReadError";
        return _this;
    }
    return PartialReadError;
}(Error));
exports.PartialReadError = PartialReadError;
var BufReader = (function () {
    function BufReader(rd, size) {
        if (size === void 0) { size = DEFAULT_BUF_SIZE; }
        var _this = this;
        _BufReader_buf.set(this, void 0);
        _BufReader_rd.set(this, void 0);
        _BufReader_r.set(this, 0);
        _BufReader_w.set(this, 0);
        _BufReader_eof.set(this, false);
        _BufReader_fill.set(this, function () { return __awaiter(_this, void 0, void 0, function () {
            var i, rr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (__classPrivateFieldGet(this, _BufReader_r, "f") > 0) {
                            __classPrivateFieldGet(this, _BufReader_buf, "f").copyWithin(0, __classPrivateFieldGet(this, _BufReader_r, "f"), __classPrivateFieldGet(this, _BufReader_w, "f"));
                            __classPrivateFieldSet(this, _BufReader_w, __classPrivateFieldGet(this, _BufReader_w, "f") - __classPrivateFieldGet(this, _BufReader_r, "f"), "f");
                            __classPrivateFieldSet(this, _BufReader_r, 0, "f");
                        }
                        if (__classPrivateFieldGet(this, _BufReader_w, "f") >= __classPrivateFieldGet(this, _BufReader_buf, "f").byteLength) {
                            throw Error("bufio: tried to fill full buffer");
                        }
                        i = MAX_CONSECUTIVE_EMPTY_READS;
                        _a.label = 1;
                    case 1:
                        if (!(i > 0)) return [3, 4];
                        return [4, __classPrivateFieldGet(this, _BufReader_rd, "f").read(__classPrivateFieldGet(this, _BufReader_buf, "f").subarray(__classPrivateFieldGet(this, _BufReader_w, "f")))];
                    case 2:
                        rr = _a.sent();
                        if (rr === null) {
                            __classPrivateFieldSet(this, _BufReader_eof, true, "f");
                            return [2];
                        }
                        (0, assert_ts_1.assert)(rr >= 0, "negative read");
                        __classPrivateFieldSet(this, _BufReader_w, __classPrivateFieldGet(this, _BufReader_w, "f") + rr, "f");
                        if (rr > 0) {
                            return [2];
                        }
                        _a.label = 3;
                    case 3:
                        i--;
                        return [3, 1];
                    case 4: throw new Error("No progress after ".concat(MAX_CONSECUTIVE_EMPTY_READS, " read() calls"));
                }
            });
        }); });
        _BufReader_reset.set(this, function (buf, rd) {
            __classPrivateFieldSet(_this, _BufReader_buf, buf, "f");
            __classPrivateFieldSet(_this, _BufReader_rd, rd, "f");
            __classPrivateFieldSet(_this, _BufReader_eof, false, "f");
        });
        if (size < MIN_BUF_SIZE) {
            size = MIN_BUF_SIZE;
        }
        __classPrivateFieldGet(this, _BufReader_reset, "f").call(this, new Uint8Array(size), rd);
    }
    BufReader.create = function (r, size) {
        if (size === void 0) { size = DEFAULT_BUF_SIZE; }
        return r instanceof BufReader ? r : new BufReader(r, size);
    };
    BufReader.prototype.size = function () {
        return __classPrivateFieldGet(this, _BufReader_buf, "f").byteLength;
    };
    BufReader.prototype.buffered = function () {
        return __classPrivateFieldGet(this, _BufReader_w, "f") - __classPrivateFieldGet(this, _BufReader_r, "f");
    };
    BufReader.prototype.reset = function (r) {
        __classPrivateFieldGet(this, _BufReader_reset, "f").call(this, __classPrivateFieldGet(this, _BufReader_buf, "f"), r);
    };
    BufReader.prototype.read = function (p) {
        return __awaiter(this, void 0, void 0, function () {
            var rr, rr_1, nread, copied;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rr = p.byteLength;
                        if (p.byteLength === 0)
                            return [2, rr];
                        if (!(__classPrivateFieldGet(this, _BufReader_r, "f") === __classPrivateFieldGet(this, _BufReader_w, "f"))) return [3, 4];
                        if (!(p.byteLength >= __classPrivateFieldGet(this, _BufReader_buf, "f").byteLength)) return [3, 2];
                        return [4, __classPrivateFieldGet(this, _BufReader_rd, "f").read(p)];
                    case 1:
                        rr_1 = _a.sent();
                        nread = rr_1 !== null && rr_1 !== void 0 ? rr_1 : 0;
                        (0, assert_ts_1.assert)(nread >= 0, "negative read");
                        return [2, rr_1];
                    case 2:
                        __classPrivateFieldSet(this, _BufReader_r, 0, "f");
                        __classPrivateFieldSet(this, _BufReader_w, 0, "f");
                        return [4, __classPrivateFieldGet(this, _BufReader_rd, "f").read(__classPrivateFieldGet(this, _BufReader_buf, "f"))];
                    case 3:
                        rr = _a.sent();
                        if (rr === 0 || rr === null)
                            return [2, rr];
                        (0, assert_ts_1.assert)(rr >= 0, "negative read");
                        __classPrivateFieldSet(this, _BufReader_w, __classPrivateFieldGet(this, _BufReader_w, "f") + rr, "f");
                        _a.label = 4;
                    case 4:
                        copied = (0, mod_ts_1.copy)(__classPrivateFieldGet(this, _BufReader_buf, "f").subarray(__classPrivateFieldGet(this, _BufReader_r, "f"), __classPrivateFieldGet(this, _BufReader_w, "f")), p, 0);
                        __classPrivateFieldSet(this, _BufReader_r, __classPrivateFieldGet(this, _BufReader_r, "f") + copied, "f");
                        return [2, copied];
                }
            });
        });
    };
    BufReader.prototype.readFull = function (p) {
        return __awaiter(this, void 0, void 0, function () {
            var bytesRead, rr, err_1, e;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bytesRead = 0;
                        _a.label = 1;
                    case 1:
                        if (!(bytesRead < p.length)) return [3, 6];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4, this.read(p.subarray(bytesRead))];
                    case 3:
                        rr = _a.sent();
                        if (rr === null) {
                            if (bytesRead === 0) {
                                return [2, null];
                            }
                            else {
                                throw new PartialReadError();
                            }
                        }
                        bytesRead += rr;
                        return [3, 5];
                    case 4:
                        err_1 = _a.sent();
                        if (err_1 instanceof PartialReadError) {
                            err_1.partial = p.subarray(0, bytesRead);
                        }
                        else if (err_1 instanceof Error) {
                            e = new PartialReadError();
                            e.partial = p.subarray(0, bytesRead);
                            e.stack = err_1.stack;
                            e.message = err_1.message;
                            e.cause = err_1.cause;
                            throw err_1;
                        }
                        throw err_1;
                    case 5: return [3, 1];
                    case 6: return [2, p];
                }
            });
        });
    };
    BufReader.prototype.readByte = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var c;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(__classPrivateFieldGet(this, _BufReader_r, "f") === __classPrivateFieldGet(this, _BufReader_w, "f"))) return [3, 2];
                        if (__classPrivateFieldGet(this, _BufReader_eof, "f"))
                            return [2, null];
                        return [4, __classPrivateFieldGet(this, _BufReader_fill, "f").call(this)];
                    case 1:
                        _b.sent();
                        return [3, 0];
                    case 2:
                        c = __classPrivateFieldGet(this, _BufReader_buf, "f")[__classPrivateFieldGet(this, _BufReader_r, "f")];
                        __classPrivateFieldSet(this, _BufReader_r, (_a = __classPrivateFieldGet(this, _BufReader_r, "f"), _a++, _a), "f");
                        return [2, c];
                }
            });
        });
    };
    BufReader.prototype.readString = function (delim) {
        return __awaiter(this, void 0, void 0, function () {
            var buffer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (delim.length !== 1) {
                            throw new Error("Delimiter should be a single character");
                        }
                        return [4, this.readSlice(delim.charCodeAt(0))];
                    case 1:
                        buffer = _a.sent();
                        if (buffer === null)
                            return [2, null];
                        return [2, new TextDecoder().decode(buffer)];
                }
            });
        });
    };
    BufReader.prototype.readLine = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var line, err_2, partial, drop;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        line = null;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, this.readSlice(LF)];
                    case 2:
                        line = _b.sent();
                        return [3, 4];
                    case 3:
                        err_2 = _b.sent();
                        if (err_2 instanceof Deno.errors.BadResource) {
                            throw err_2;
                        }
                        partial = void 0;
                        if (err_2 instanceof PartialReadError) {
                            partial = err_2.partial;
                            (0, assert_ts_1.assert)(partial instanceof Uint8Array, "bufio: caught error from `readSlice()` without `partial` property");
                        }
                        if (!(err_2 instanceof BufferFullError)) {
                            throw err_2;
                        }
                        partial = err_2.partial;
                        if (!__classPrivateFieldGet(this, _BufReader_eof, "f") && partial &&
                            partial.byteLength > 0 &&
                            partial[partial.byteLength - 1] === CR) {
                            (0, assert_ts_1.assert)(__classPrivateFieldGet(this, _BufReader_r, "f") > 0, "bufio: tried to rewind past start of buffer");
                            __classPrivateFieldSet(this, _BufReader_r, (_a = __classPrivateFieldGet(this, _BufReader_r, "f"), _a--, _a), "f");
                            partial = partial.subarray(0, partial.byteLength - 1);
                        }
                        if (partial) {
                            return [2, { line: partial, more: !__classPrivateFieldGet(this, _BufReader_eof, "f") }];
                        }
                        return [3, 4];
                    case 4:
                        if (line === null) {
                            return [2, null];
                        }
                        if (line.byteLength === 0) {
                            return [2, { line: line, more: false }];
                        }
                        if (line[line.byteLength - 1] == LF) {
                            drop = 1;
                            if (line.byteLength > 1 && line[line.byteLength - 2] === CR) {
                                drop = 2;
                            }
                            line = line.subarray(0, line.byteLength - drop);
                        }
                        return [2, { line: line, more: false }];
                }
            });
        });
    };
    BufReader.prototype.readSlice = function (delim) {
        return __awaiter(this, void 0, void 0, function () {
            var s, slice, i, oldbuf, newbuf, err_3, e;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        s = 0;
                        _a.label = 1;
                    case 1:
                        if (!true) return [3, 6];
                        i = __classPrivateFieldGet(this, _BufReader_buf, "f").subarray(__classPrivateFieldGet(this, _BufReader_r, "f") + s, __classPrivateFieldGet(this, _BufReader_w, "f")).indexOf(delim);
                        if (i >= 0) {
                            i += s;
                            slice = __classPrivateFieldGet(this, _BufReader_buf, "f").subarray(__classPrivateFieldGet(this, _BufReader_r, "f"), __classPrivateFieldGet(this, _BufReader_r, "f") + i + 1);
                            __classPrivateFieldSet(this, _BufReader_r, __classPrivateFieldGet(this, _BufReader_r, "f") + (i + 1), "f");
                            return [3, 6];
                        }
                        if (__classPrivateFieldGet(this, _BufReader_eof, "f")) {
                            if (__classPrivateFieldGet(this, _BufReader_r, "f") === __classPrivateFieldGet(this, _BufReader_w, "f")) {
                                return [2, null];
                            }
                            slice = __classPrivateFieldGet(this, _BufReader_buf, "f").subarray(__classPrivateFieldGet(this, _BufReader_r, "f"), __classPrivateFieldGet(this, _BufReader_w, "f"));
                            __classPrivateFieldSet(this, _BufReader_r, __classPrivateFieldGet(this, _BufReader_w, "f"), "f");
                            return [3, 6];
                        }
                        if (this.buffered() >= __classPrivateFieldGet(this, _BufReader_buf, "f").byteLength) {
                            __classPrivateFieldSet(this, _BufReader_r, __classPrivateFieldGet(this, _BufReader_w, "f"), "f");
                            oldbuf = __classPrivateFieldGet(this, _BufReader_buf, "f");
                            newbuf = __classPrivateFieldGet(this, _BufReader_buf, "f").slice(0);
                            __classPrivateFieldSet(this, _BufReader_buf, newbuf, "f");
                            throw new BufferFullError(oldbuf);
                        }
                        s = __classPrivateFieldGet(this, _BufReader_w, "f") - __classPrivateFieldGet(this, _BufReader_r, "f");
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4, __classPrivateFieldGet(this, _BufReader_fill, "f").call(this)];
                    case 3:
                        _a.sent();
                        return [3, 5];
                    case 4:
                        err_3 = _a.sent();
                        if (err_3 instanceof PartialReadError) {
                            err_3.partial = slice;
                        }
                        else if (err_3 instanceof Error) {
                            e = new PartialReadError();
                            e.partial = slice;
                            e.stack = err_3.stack;
                            e.message = err_3.message;
                            e.cause = err_3.cause;
                            throw err_3;
                        }
                        throw err_3;
                    case 5: return [3, 1];
                    case 6: return [2, slice];
                }
            });
        });
    };
    BufReader.prototype.peek = function (n) {
        return __awaiter(this, void 0, void 0, function () {
            var avail, err_4, e;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (n < 0) {
                            throw Error("negative count");
                        }
                        avail = __classPrivateFieldGet(this, _BufReader_w, "f") - __classPrivateFieldGet(this, _BufReader_r, "f");
                        _a.label = 1;
                    case 1:
                        if (!(avail < n && avail < __classPrivateFieldGet(this, _BufReader_buf, "f").byteLength && !__classPrivateFieldGet(this, _BufReader_eof, "f"))) return [3, 6];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4, __classPrivateFieldGet(this, _BufReader_fill, "f").call(this)];
                    case 3:
                        _a.sent();
                        return [3, 5];
                    case 4:
                        err_4 = _a.sent();
                        if (err_4 instanceof PartialReadError) {
                            err_4.partial = __classPrivateFieldGet(this, _BufReader_buf, "f").subarray(__classPrivateFieldGet(this, _BufReader_r, "f"), __classPrivateFieldGet(this, _BufReader_w, "f"));
                        }
                        else if (err_4 instanceof Error) {
                            e = new PartialReadError();
                            e.partial = __classPrivateFieldGet(this, _BufReader_buf, "f").subarray(__classPrivateFieldGet(this, _BufReader_r, "f"), __classPrivateFieldGet(this, _BufReader_w, "f"));
                            e.stack = err_4.stack;
                            e.message = err_4.message;
                            e.cause = err_4.cause;
                            throw err_4;
                        }
                        throw err_4;
                    case 5:
                        avail = __classPrivateFieldGet(this, _BufReader_w, "f") - __classPrivateFieldGet(this, _BufReader_r, "f");
                        return [3, 1];
                    case 6:
                        if (avail === 0 && __classPrivateFieldGet(this, _BufReader_eof, "f")) {
                            return [2, null];
                        }
                        else if (avail < n && __classPrivateFieldGet(this, _BufReader_eof, "f")) {
                            return [2, __classPrivateFieldGet(this, _BufReader_buf, "f").subarray(__classPrivateFieldGet(this, _BufReader_r, "f"), __classPrivateFieldGet(this, _BufReader_r, "f") + avail)];
                        }
                        else if (avail < n) {
                            throw new BufferFullError(__classPrivateFieldGet(this, _BufReader_buf, "f").subarray(__classPrivateFieldGet(this, _BufReader_r, "f"), __classPrivateFieldGet(this, _BufReader_w, "f")));
                        }
                        return [2, __classPrivateFieldGet(this, _BufReader_buf, "f").subarray(__classPrivateFieldGet(this, _BufReader_r, "f"), __classPrivateFieldGet(this, _BufReader_r, "f") + n)];
                }
            });
        });
    };
    return BufReader;
}());
exports.BufReader = BufReader;
_BufReader_buf = new WeakMap(), _BufReader_rd = new WeakMap(), _BufReader_r = new WeakMap(), _BufReader_w = new WeakMap(), _BufReader_eof = new WeakMap(), _BufReader_fill = new WeakMap(), _BufReader_reset = new WeakMap();
var AbstractBufBase = (function () {
    function AbstractBufBase(buf) {
        this.usedBufferBytes = 0;
        this.err = null;
        this.buf = buf;
    }
    AbstractBufBase.prototype.size = function () {
        return this.buf.byteLength;
    };
    AbstractBufBase.prototype.available = function () {
        return this.buf.byteLength - this.usedBufferBytes;
    };
    AbstractBufBase.prototype.buffered = function () {
        return this.usedBufferBytes;
    };
    return AbstractBufBase;
}());
var BufWriter = (function (_super) {
    __extends(BufWriter, _super);
    function BufWriter(writer, size) {
        if (size === void 0) { size = DEFAULT_BUF_SIZE; }
        var _this = _super.call(this, new Uint8Array(size <= 0 ? DEFAULT_BUF_SIZE : size)) || this;
        _BufWriter_writer.set(_this, void 0);
        __classPrivateFieldSet(_this, _BufWriter_writer, writer, "f");
        return _this;
    }
    BufWriter.create = function (writer, size) {
        if (size === void 0) { size = DEFAULT_BUF_SIZE; }
        return writer instanceof BufWriter ? writer : new BufWriter(writer, size);
    };
    BufWriter.prototype.reset = function (w) {
        this.err = null;
        this.usedBufferBytes = 0;
        __classPrivateFieldSet(this, _BufWriter_writer, w, "f");
    };
    BufWriter.prototype.flush = function () {
        return __awaiter(this, void 0, void 0, function () {
            var p, nwritten, _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.err !== null)
                            throw this.err;
                        if (this.usedBufferBytes === 0)
                            return [2];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        p = this.buf.subarray(0, this.usedBufferBytes);
                        nwritten = 0;
                        _b.label = 2;
                    case 2:
                        if (!(nwritten < p.length)) return [3, 4];
                        _a = nwritten;
                        return [4, __classPrivateFieldGet(this, _BufWriter_writer, "f").write(p.subarray(nwritten))];
                    case 3:
                        nwritten = _a + _b.sent();
                        return [3, 2];
                    case 4: return [3, 6];
                    case 5:
                        e_1 = _b.sent();
                        if (e_1 instanceof Error) {
                            this.err = e_1;
                        }
                        throw e_1;
                    case 6:
                        this.buf = new Uint8Array(this.buf.length);
                        this.usedBufferBytes = 0;
                        return [2];
                }
            });
        });
    };
    BufWriter.prototype.write = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var totalBytesWritten, numBytesWritten, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.err !== null)
                            throw this.err;
                        if (data.length === 0)
                            return [2, 0];
                        totalBytesWritten = 0;
                        numBytesWritten = 0;
                        _a.label = 1;
                    case 1:
                        if (!(data.byteLength > this.available())) return [3, 9];
                        if (!(this.buffered() === 0)) return [3, 6];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4, __classPrivateFieldGet(this, _BufWriter_writer, "f").write(data)];
                    case 3:
                        numBytesWritten = _a.sent();
                        return [3, 5];
                    case 4:
                        e_2 = _a.sent();
                        if (e_2 instanceof Error) {
                            this.err = e_2;
                        }
                        throw e_2;
                    case 5: return [3, 8];
                    case 6:
                        numBytesWritten = (0, mod_ts_1.copy)(data, this.buf, this.usedBufferBytes);
                        this.usedBufferBytes += numBytesWritten;
                        return [4, this.flush()];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        totalBytesWritten += numBytesWritten;
                        data = data.subarray(numBytesWritten);
                        return [3, 1];
                    case 9:
                        numBytesWritten = (0, mod_ts_1.copy)(data, this.buf, this.usedBufferBytes);
                        this.usedBufferBytes += numBytesWritten;
                        totalBytesWritten += numBytesWritten;
                        return [2, totalBytesWritten];
                }
            });
        });
    };
    return BufWriter;
}(AbstractBufBase));
exports.BufWriter = BufWriter;
_BufWriter_writer = new WeakMap();
var BufWriterSync = (function (_super) {
    __extends(BufWriterSync, _super);
    function BufWriterSync(writer, size) {
        if (size === void 0) { size = DEFAULT_BUF_SIZE; }
        var _this = _super.call(this, new Uint8Array(size <= 0 ? DEFAULT_BUF_SIZE : size)) || this;
        _BufWriterSync_writer.set(_this, void 0);
        __classPrivateFieldSet(_this, _BufWriterSync_writer, writer, "f");
        return _this;
    }
    BufWriterSync.create = function (writer, size) {
        if (size === void 0) { size = DEFAULT_BUF_SIZE; }
        return writer instanceof BufWriterSync
            ? writer
            : new BufWriterSync(writer, size);
    };
    BufWriterSync.prototype.reset = function (w) {
        this.err = null;
        this.usedBufferBytes = 0;
        __classPrivateFieldSet(this, _BufWriterSync_writer, w, "f");
    };
    BufWriterSync.prototype.flush = function () {
        if (this.err !== null)
            throw this.err;
        if (this.usedBufferBytes === 0)
            return;
        try {
            var p = this.buf.subarray(0, this.usedBufferBytes);
            var nwritten = 0;
            while (nwritten < p.length) {
                nwritten += __classPrivateFieldGet(this, _BufWriterSync_writer, "f").writeSync(p.subarray(nwritten));
            }
        }
        catch (e) {
            if (e instanceof Error) {
                this.err = e;
            }
            throw e;
        }
        this.buf = new Uint8Array(this.buf.length);
        this.usedBufferBytes = 0;
    };
    BufWriterSync.prototype.writeSync = function (data) {
        if (this.err !== null)
            throw this.err;
        if (data.length === 0)
            return 0;
        var totalBytesWritten = 0;
        var numBytesWritten = 0;
        while (data.byteLength > this.available()) {
            if (this.buffered() === 0) {
                try {
                    numBytesWritten = __classPrivateFieldGet(this, _BufWriterSync_writer, "f").writeSync(data);
                }
                catch (e) {
                    if (e instanceof Error) {
                        this.err = e;
                    }
                    throw e;
                }
            }
            else {
                numBytesWritten = (0, mod_ts_1.copy)(data, this.buf, this.usedBufferBytes);
                this.usedBufferBytes += numBytesWritten;
                this.flush();
            }
            totalBytesWritten += numBytesWritten;
            data = data.subarray(numBytesWritten);
        }
        numBytesWritten = (0, mod_ts_1.copy)(data, this.buf, this.usedBufferBytes);
        this.usedBufferBytes += numBytesWritten;
        totalBytesWritten += numBytesWritten;
        return totalBytesWritten;
    };
    return BufWriterSync;
}(AbstractBufBase));
exports.BufWriterSync = BufWriterSync;
_BufWriterSync_writer = new WeakMap();
function createLPS(pat) {
    var lps = new Uint8Array(pat.length);
    lps[0] = 0;
    var prefixEnd = 0;
    var i = 1;
    while (i < lps.length) {
        if (pat[i] == pat[prefixEnd]) {
            prefixEnd++;
            lps[i] = prefixEnd;
            i++;
        }
        else if (prefixEnd === 0) {
            lps[i] = 0;
            i++;
        }
        else {
            prefixEnd = lps[prefixEnd - 1];
        }
    }
    return lps;
}
function readDelim(reader, delim) {
    return __asyncGenerator(this, arguments, function readDelim_1() {
        var delimLen, delimLPS, chunks, bufSize, inspectIndex, matchIndex, inspectArr, result, localIndex, matchEnd, readyBytes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    delimLen = delim.length;
                    delimLPS = createLPS(delim);
                    chunks = new bytes_list_ts_1.BytesList();
                    bufSize = Math.max(1024, delimLen + 1);
                    inspectIndex = 0;
                    matchIndex = 0;
                    _a.label = 1;
                case 1:
                    if (!true) return [3, 16];
                    inspectArr = new Uint8Array(bufSize);
                    return [4, __await(reader.read(inspectArr))];
                case 2:
                    result = _a.sent();
                    if (!(result === null)) return [3, 6];
                    return [4, __await(chunks.concat())];
                case 3: return [4, _a.sent()];
                case 4:
                    _a.sent();
                    return [4, __await(void 0)];
                case 5: return [2, _a.sent()];
                case 6:
                    if (!(result < 0)) return [3, 8];
                    return [4, __await(void 0)];
                case 7: return [2, _a.sent()];
                case 8:
                    chunks.add(inspectArr, 0, result);
                    localIndex = 0;
                    _a.label = 9;
                case 9:
                    if (!(inspectIndex < chunks.size())) return [3, 15];
                    if (!(inspectArr[localIndex] === delim[matchIndex])) return [3, 13];
                    inspectIndex++;
                    localIndex++;
                    matchIndex++;
                    if (!(matchIndex === delimLen)) return [3, 12];
                    matchEnd = inspectIndex - delimLen;
                    readyBytes = chunks.slice(0, matchEnd);
                    return [4, __await(readyBytes)];
                case 10: return [4, _a.sent()];
                case 11:
                    _a.sent();
                    chunks.shift(inspectIndex);
                    inspectIndex = 0;
                    matchIndex = 0;
                    _a.label = 12;
                case 12: return [3, 14];
                case 13:
                    if (matchIndex === 0) {
                        inspectIndex++;
                        localIndex++;
                    }
                    else {
                        matchIndex = delimLPS[matchIndex - 1];
                    }
                    _a.label = 14;
                case 14: return [3, 9];
                case 15: return [3, 1];
                case 16: return [2];
            }
        });
    });
}
exports.readDelim = readDelim;
function readStringDelim(reader, delim, decoderOpts) {
    return __asyncGenerator(this, arguments, function readStringDelim_1() {
        var encoder, decoder, _a, _b, chunk, e_3_1;
        var e_3, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    encoder = new TextEncoder();
                    decoder = new TextDecoder(decoderOpts === null || decoderOpts === void 0 ? void 0 : decoderOpts.encoding, decoderOpts);
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 8, 9, 14]);
                    _a = __asyncValues(readDelim(reader, encoder.encode(delim)));
                    _d.label = 2;
                case 2: return [4, __await(_a.next())];
                case 3:
                    if (!(_b = _d.sent(), !_b.done)) return [3, 7];
                    chunk = _b.value;
                    return [4, __await(decoder.decode(chunk))];
                case 4: return [4, _d.sent()];
                case 5:
                    _d.sent();
                    _d.label = 6;
                case 6: return [3, 2];
                case 7: return [3, 14];
                case 8:
                    e_3_1 = _d.sent();
                    e_3 = { error: e_3_1 };
                    return [3, 14];
                case 9:
                    _d.trys.push([9, , 12, 13]);
                    if (!(_b && !_b.done && (_c = _a["return"]))) return [3, 11];
                    return [4, __await(_c.call(_a))];
                case 10:
                    _d.sent();
                    _d.label = 11;
                case 11: return [3, 13];
                case 12:
                    if (e_3) throw e_3.error;
                    return [7];
                case 13: return [7];
                case 14: return [2];
            }
        });
    });
}
exports.readStringDelim = readStringDelim;
function readLines(reader, decoderOpts) {
    return __asyncGenerator(this, arguments, function readLines_1() {
        var bufReader, chunks, decoder, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bufReader = new BufReader(reader);
                    chunks = [];
                    decoder = new TextDecoder(decoderOpts === null || decoderOpts === void 0 ? void 0 : decoderOpts.encoding, decoderOpts);
                    _a.label = 1;
                case 1:
                    if (!true) return [3, 10];
                    return [4, __await(bufReader.readLine())];
                case 2:
                    res = _a.sent();
                    if (!!res) return [3, 6];
                    if (!(chunks.length > 0)) return [3, 5];
                    return [4, __await(decoder.decode(mod_ts_1.concat.apply(void 0, chunks)))];
                case 3: return [4, _a.sent()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [3, 10];
                case 6:
                    chunks.push(res.line);
                    if (!!res.more) return [3, 9];
                    return [4, __await(decoder.decode(mod_ts_1.concat.apply(void 0, chunks)))];
                case 7: return [4, _a.sent()];
                case 8:
                    _a.sent();
                    chunks = [];
                    _a.label = 9;
                case 9: return [3, 1];
                case 10: return [2];
            }
        });
    });
}
exports.readLines = readLines;
