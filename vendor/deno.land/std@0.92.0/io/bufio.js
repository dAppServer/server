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
exports.__esModule = true;
exports.readLines = exports.readStringDelim = exports.readDelim = exports.BufWriterSync = exports.BufWriter = exports.BufReader = exports.PartialReadError = exports.BufferFullError = void 0;
var mod_ts_1 = require("../bytes/mod.ts");
var assert_ts_1 = require("../_util/assert.ts");
var buffer_ts_1 = require("./buffer.ts");
var util_ts_1 = require("./util.ts");
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
        this.r = 0;
        this.w = 0;
        this.eof = false;
        if (size < MIN_BUF_SIZE) {
            size = MIN_BUF_SIZE;
        }
        this._reset(new Uint8Array(size), rd);
    }
    BufReader.create = function (r, size) {
        if (size === void 0) { size = DEFAULT_BUF_SIZE; }
        return r instanceof BufReader ? r : new BufReader(r, size);
    };
    BufReader.prototype.size = function () {
        return this.buf.byteLength;
    };
    BufReader.prototype.buffered = function () {
        return this.w - this.r;
    };
    BufReader.prototype._fill = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, rr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.r > 0) {
                            this.buf.copyWithin(0, this.r, this.w);
                            this.w -= this.r;
                            this.r = 0;
                        }
                        if (this.w >= this.buf.byteLength) {
                            throw Error("bufio: tried to fill full buffer");
                        }
                        i = MAX_CONSECUTIVE_EMPTY_READS;
                        _a.label = 1;
                    case 1:
                        if (!(i > 0)) return [3, 4];
                        return [4, this.rd.read(this.buf.subarray(this.w))];
                    case 2:
                        rr = _a.sent();
                        if (rr === null) {
                            this.eof = true;
                            return [2];
                        }
                        (0, assert_ts_1.assert)(rr >= 0, "negative read");
                        this.w += rr;
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
        });
    };
    BufReader.prototype.reset = function (r) {
        this._reset(this.buf, r);
    };
    BufReader.prototype._reset = function (buf, rd) {
        this.buf = buf;
        this.rd = rd;
        this.eof = false;
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
                        if (!(this.r === this.w)) return [3, 4];
                        if (!(p.byteLength >= this.buf.byteLength)) return [3, 2];
                        return [4, this.rd.read(p)];
                    case 1:
                        rr_1 = _a.sent();
                        nread = rr_1 !== null && rr_1 !== void 0 ? rr_1 : 0;
                        (0, assert_ts_1.assert)(nread >= 0, "negative read");
                        return [2, rr_1];
                    case 2:
                        this.r = 0;
                        this.w = 0;
                        return [4, this.rd.read(this.buf)];
                    case 3:
                        rr = _a.sent();
                        if (rr === 0 || rr === null)
                            return [2, rr];
                        (0, assert_ts_1.assert)(rr >= 0, "negative read");
                        this.w += rr;
                        _a.label = 4;
                    case 4:
                        copied = (0, mod_ts_1.copy)(this.buf.subarray(this.r, this.w), p, 0);
                        this.r += copied;
                        return [2, copied];
                }
            });
        });
    };
    BufReader.prototype.readFull = function (p) {
        return __awaiter(this, void 0, void 0, function () {
            var bytesRead, rr, err_1;
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
                        err_1.partial = p.subarray(0, bytesRead);
                        throw err_1;
                    case 5: return [3, 1];
                    case 6: return [2, p];
                }
            });
        });
    };
    BufReader.prototype.readByte = function () {
        return __awaiter(this, void 0, void 0, function () {
            var c;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.r === this.w)) return [3, 2];
                        if (this.eof)
                            return [2, null];
                        return [4, this._fill()];
                    case 1:
                        _a.sent();
                        return [3, 0];
                    case 2:
                        c = this.buf[this.r];
                        this.r++;
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
        return __awaiter(this, void 0, void 0, function () {
            var line, err_2, partial, drop;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.readSlice(LF)];
                    case 1:
                        line = _a.sent();
                        return [3, 3];
                    case 2:
                        err_2 = _a.sent();
                        partial = err_2.partial;
                        (0, assert_ts_1.assert)(partial instanceof Uint8Array, "bufio: caught error from `readSlice()` without `partial` property");
                        if (!(err_2 instanceof BufferFullError)) {
                            throw err_2;
                        }
                        if (!this.eof &&
                            partial.byteLength > 0 &&
                            partial[partial.byteLength - 1] === CR) {
                            (0, assert_ts_1.assert)(this.r > 0, "bufio: tried to rewind past start of buffer");
                            this.r--;
                            partial = partial.subarray(0, partial.byteLength - 1);
                        }
                        return [2, { line: partial, more: !this.eof }];
                    case 3:
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
            var s, slice, i, oldbuf, newbuf, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        s = 0;
                        _a.label = 1;
                    case 1:
                        if (!true) return [3, 6];
                        i = this.buf.subarray(this.r + s, this.w).indexOf(delim);
                        if (i >= 0) {
                            i += s;
                            slice = this.buf.subarray(this.r, this.r + i + 1);
                            this.r += i + 1;
                            return [3, 6];
                        }
                        if (this.eof) {
                            if (this.r === this.w) {
                                return [2, null];
                            }
                            slice = this.buf.subarray(this.r, this.w);
                            this.r = this.w;
                            return [3, 6];
                        }
                        if (this.buffered() >= this.buf.byteLength) {
                            this.r = this.w;
                            oldbuf = this.buf;
                            newbuf = this.buf.slice(0);
                            this.buf = newbuf;
                            throw new BufferFullError(oldbuf);
                        }
                        s = this.w - this.r;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4, this._fill()];
                    case 3:
                        _a.sent();
                        return [3, 5];
                    case 4:
                        err_3 = _a.sent();
                        err_3.partial = slice;
                        throw err_3;
                    case 5: return [3, 1];
                    case 6: return [2, slice];
                }
            });
        });
    };
    BufReader.prototype.peek = function (n) {
        return __awaiter(this, void 0, void 0, function () {
            var avail, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (n < 0) {
                            throw Error("negative count");
                        }
                        avail = this.w - this.r;
                        _a.label = 1;
                    case 1:
                        if (!(avail < n && avail < this.buf.byteLength && !this.eof)) return [3, 6];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4, this._fill()];
                    case 3:
                        _a.sent();
                        return [3, 5];
                    case 4:
                        err_4 = _a.sent();
                        err_4.partial = this.buf.subarray(this.r, this.w);
                        throw err_4;
                    case 5:
                        avail = this.w - this.r;
                        return [3, 1];
                    case 6:
                        if (avail === 0 && this.eof) {
                            return [2, null];
                        }
                        else if (avail < n && this.eof) {
                            return [2, this.buf.subarray(this.r, this.r + avail)];
                        }
                        else if (avail < n) {
                            throw new BufferFullError(this.buf.subarray(this.r, this.w));
                        }
                        return [2, this.buf.subarray(this.r, this.r + n)];
                }
            });
        });
    };
    return BufReader;
}());
exports.BufReader = BufReader;
var AbstractBufBase = (function () {
    function AbstractBufBase() {
        this.usedBufferBytes = 0;
        this.err = null;
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
        var _this = _super.call(this) || this;
        _this.writer = writer;
        if (size <= 0) {
            size = DEFAULT_BUF_SIZE;
        }
        _this.buf = new Uint8Array(size);
        return _this;
    }
    BufWriter.create = function (writer, size) {
        if (size === void 0) { size = DEFAULT_BUF_SIZE; }
        return writer instanceof BufWriter ? writer : new BufWriter(writer, size);
    };
    BufWriter.prototype.reset = function (w) {
        this.err = null;
        this.usedBufferBytes = 0;
        this.writer = w;
    };
    BufWriter.prototype.flush = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.err !== null)
                            throw this.err;
                        if (this.usedBufferBytes === 0)
                            return [2];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, (0, util_ts_1.writeAll)(this.writer, this.buf.subarray(0, this.usedBufferBytes))];
                    case 2:
                        _a.sent();
                        return [3, 4];
                    case 3:
                        e_1 = _a.sent();
                        this.err = e_1;
                        throw e_1;
                    case 4:
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
                        return [4, this.writer.write(data)];
                    case 3:
                        numBytesWritten = _a.sent();
                        return [3, 5];
                    case 4:
                        e_2 = _a.sent();
                        this.err = e_2;
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
var BufWriterSync = (function (_super) {
    __extends(BufWriterSync, _super);
    function BufWriterSync(writer, size) {
        if (size === void 0) { size = DEFAULT_BUF_SIZE; }
        var _this = _super.call(this) || this;
        _this.writer = writer;
        if (size <= 0) {
            size = DEFAULT_BUF_SIZE;
        }
        _this.buf = new Uint8Array(size);
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
        this.writer = w;
    };
    BufWriterSync.prototype.flush = function () {
        if (this.err !== null)
            throw this.err;
        if (this.usedBufferBytes === 0)
            return;
        try {
            (0, util_ts_1.writeAllSync)(this.writer, this.buf.subarray(0, this.usedBufferBytes));
        }
        catch (e) {
            this.err = e;
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
                    numBytesWritten = this.writer.writeSync(data);
                }
                catch (e) {
                    this.err = e;
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
            prefixEnd = pat[prefixEnd - 1];
        }
    }
    return lps;
}
function readDelim(reader, delim) {
    return __asyncGenerator(this, arguments, function readDelim_1() {
        var delimLen, delimLPS, inputBuffer, inspectArr, inspectIndex, matchIndex, result, sliceRead, sliceToProcess, matchEnd, readyBytes, pendingBytes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    delimLen = delim.length;
                    delimLPS = createLPS(delim);
                    inputBuffer = new buffer_ts_1.Buffer();
                    inspectArr = new Uint8Array(Math.max(1024, delimLen + 1));
                    inspectIndex = 0;
                    matchIndex = 0;
                    _a.label = 1;
                case 1:
                    if (!true) return [3, 17];
                    return [4, __await(reader.read(inspectArr))];
                case 2:
                    result = _a.sent();
                    if (!(result === null)) return [3, 6];
                    return [4, __await(inputBuffer.bytes())];
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
                    sliceRead = inspectArr.subarray(0, result);
                    return [4, __await((0, util_ts_1.writeAll)(inputBuffer, sliceRead))];
                case 9:
                    _a.sent();
                    sliceToProcess = inputBuffer.bytes();
                    _a.label = 10;
                case 10:
                    if (!(inspectIndex < sliceToProcess.length)) return [3, 16];
                    if (!(sliceToProcess[inspectIndex] === delim[matchIndex])) return [3, 14];
                    inspectIndex++;
                    matchIndex++;
                    if (!(matchIndex === delimLen)) return [3, 13];
                    matchEnd = inspectIndex - delimLen;
                    readyBytes = sliceToProcess.subarray(0, matchEnd);
                    pendingBytes = sliceToProcess.slice(inspectIndex);
                    return [4, __await(readyBytes)];
                case 11: return [4, _a.sent()];
                case 12:
                    _a.sent();
                    sliceToProcess = pendingBytes;
                    inspectIndex = 0;
                    matchIndex = 0;
                    _a.label = 13;
                case 13: return [3, 15];
                case 14:
                    if (matchIndex === 0) {
                        inspectIndex++;
                    }
                    else {
                        matchIndex = delimLPS[matchIndex - 1];
                    }
                    _a.label = 15;
                case 15: return [3, 10];
                case 16:
                    inputBuffer = new buffer_ts_1.Buffer(sliceToProcess);
                    return [3, 1];
                case 17: return [2];
            }
        });
    });
}
exports.readDelim = readDelim;
function readStringDelim(reader, delim) {
    return __asyncGenerator(this, arguments, function readStringDelim_1() {
        var encoder, decoder, _a, _b, chunk, e_3_1;
        var e_3, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    encoder = new TextEncoder();
                    decoder = new TextDecoder();
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
function readLines(reader) {
    return __asyncGenerator(this, arguments, function readLines_1() {
        var _a, _b, chunk, e_4_1;
        var e_4, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 7, 8, 13]);
                    _a = __asyncValues(readStringDelim(reader, "\n"));
                    _d.label = 1;
                case 1: return [4, __await(_a.next())];
                case 2:
                    if (!(_b = _d.sent(), !_b.done)) return [3, 6];
                    chunk = _b.value;
                    if (chunk.endsWith("\r")) {
                        chunk = chunk.slice(0, -1);
                    }
                    return [4, __await(chunk)];
                case 3: return [4, _d.sent()];
                case 4:
                    _d.sent();
                    _d.label = 5;
                case 5: return [3, 1];
                case 6: return [3, 13];
                case 7:
                    e_4_1 = _d.sent();
                    e_4 = { error: e_4_1 };
                    return [3, 13];
                case 8:
                    _d.trys.push([8, , 11, 12]);
                    if (!(_b && !_b.done && (_c = _a["return"]))) return [3, 10];
                    return [4, __await(_c.call(_a))];
                case 9:
                    _d.sent();
                    _d.label = 10;
                case 10: return [3, 12];
                case 11:
                    if (e_4) throw e_4.error;
                    return [7];
                case 12: return [7];
                case 13: return [2];
            }
        });
    });
}
exports.readLines = readLines;
