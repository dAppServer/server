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
var _BufReader_instances, _BufReader_buffer, _BufReader_reader, _BufReader_posRead, _BufReader_posWrite, _BufReader_eof, _BufReader_fill, _BufReader_reset;
exports.__esModule = true;
exports.BufReader = exports.BufferFullError = void 0;
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
var BufReader = (function () {
    function BufReader(rd, size) {
        if (size === void 0) { size = DEFAULT_BUF_SIZE; }
        _BufReader_instances.add(this);
        _BufReader_buffer.set(this, void 0);
        _BufReader_reader.set(this, void 0);
        _BufReader_posRead.set(this, 0);
        _BufReader_posWrite.set(this, 0);
        _BufReader_eof.set(this, false);
        if (size < MIN_BUF_SIZE) {
            size = MIN_BUF_SIZE;
        }
        __classPrivateFieldGet(this, _BufReader_instances, "m", _BufReader_reset).call(this, new Uint8Array(size), rd);
    }
    BufReader.prototype.buffered = function () {
        return __classPrivateFieldGet(this, _BufReader_posWrite, "f") - __classPrivateFieldGet(this, _BufReader_posRead, "f");
    };
    BufReader.prototype.readLine = function (strip) {
        var _a;
        if (strip === void 0) { strip = true; }
        return __awaiter(this, void 0, void 0, function () {
            var line, err_1, partial;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, this.readSlice(LF)];
                    case 1:
                        line = _b.sent();
                        return [3, 3];
                    case 2:
                        err_1 = _b.sent();
                        (0, util_ts_1.assert)(err_1 instanceof Error);
                        partial = err_1.partial;
                        (0, util_ts_1.assert)(partial instanceof Uint8Array, "Caught error from `readSlice()` without `partial` property");
                        if (!(err_1 instanceof BufferFullError)) {
                            throw err_1;
                        }
                        if (!__classPrivateFieldGet(this, _BufReader_eof, "f") &&
                            partial.byteLength > 0 &&
                            partial[partial.byteLength - 1] === CR) {
                            (0, util_ts_1.assert)(__classPrivateFieldGet(this, _BufReader_posRead, "f") > 0, "Tried to rewind past start of buffer");
                            __classPrivateFieldSet(this, _BufReader_posRead, (_a = __classPrivateFieldGet(this, _BufReader_posRead, "f"), _a--, _a), "f");
                            partial = partial.subarray(0, partial.byteLength - 1);
                        }
                        return [2, { bytes: partial, eol: __classPrivateFieldGet(this, _BufReader_eof, "f") }];
                    case 3:
                        if (line === null) {
                            return [2, null];
                        }
                        if (line.byteLength === 0) {
                            return [2, { bytes: line, eol: true }];
                        }
                        if (strip) {
                            line = (0, util_ts_1.stripEol)(line);
                        }
                        return [2, { bytes: line, eol: true }];
                }
            });
        });
    };
    BufReader.prototype.readSlice = function (delim) {
        return __awaiter(this, void 0, void 0, function () {
            var s, slice, i, oldbuf, newbuf, err_2, e;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        s = 0;
                        _a.label = 1;
                    case 1:
                        if (!true) return [3, 6];
                        i = __classPrivateFieldGet(this, _BufReader_buffer, "f").subarray(__classPrivateFieldGet(this, _BufReader_posRead, "f") + s, __classPrivateFieldGet(this, _BufReader_posWrite, "f")).indexOf(delim);
                        if (i >= 0) {
                            i += s;
                            slice = __classPrivateFieldGet(this, _BufReader_buffer, "f").subarray(__classPrivateFieldGet(this, _BufReader_posRead, "f"), __classPrivateFieldGet(this, _BufReader_posRead, "f") + i + 1);
                            __classPrivateFieldSet(this, _BufReader_posRead, __classPrivateFieldGet(this, _BufReader_posRead, "f") + (i + 1), "f");
                            return [3, 6];
                        }
                        if (__classPrivateFieldGet(this, _BufReader_eof, "f")) {
                            if (__classPrivateFieldGet(this, _BufReader_posRead, "f") === __classPrivateFieldGet(this, _BufReader_posWrite, "f")) {
                                return [2, null];
                            }
                            slice = __classPrivateFieldGet(this, _BufReader_buffer, "f").subarray(__classPrivateFieldGet(this, _BufReader_posRead, "f"), __classPrivateFieldGet(this, _BufReader_posWrite, "f"));
                            __classPrivateFieldSet(this, _BufReader_posRead, __classPrivateFieldGet(this, _BufReader_posWrite, "f"), "f");
                            return [3, 6];
                        }
                        if (this.buffered() >= __classPrivateFieldGet(this, _BufReader_buffer, "f").byteLength) {
                            __classPrivateFieldSet(this, _BufReader_posRead, __classPrivateFieldGet(this, _BufReader_posWrite, "f"), "f");
                            oldbuf = __classPrivateFieldGet(this, _BufReader_buffer, "f");
                            newbuf = __classPrivateFieldGet(this, _BufReader_buffer, "f").slice(0);
                            __classPrivateFieldSet(this, _BufReader_buffer, newbuf, "f");
                            throw new BufferFullError(oldbuf);
                        }
                        s = __classPrivateFieldGet(this, _BufReader_posWrite, "f") - __classPrivateFieldGet(this, _BufReader_posRead, "f");
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4, __classPrivateFieldGet(this, _BufReader_instances, "m", _BufReader_fill).call(this)];
                    case 3:
                        _a.sent();
                        return [3, 5];
                    case 4:
                        err_2 = _a.sent();
                        e = err_2 instanceof Error ? err_2 : new Error("[non-object thrown]");
                        e.partial = slice;
                        throw err_2;
                    case 5: return [3, 1];
                    case 6: return [2, slice];
                }
            });
        });
    };
    return BufReader;
}());
exports.BufReader = BufReader;
_BufReader_buffer = new WeakMap(), _BufReader_reader = new WeakMap(), _BufReader_posRead = new WeakMap(), _BufReader_posWrite = new WeakMap(), _BufReader_eof = new WeakMap(), _BufReader_instances = new WeakSet(), _BufReader_fill = function _BufReader_fill() {
    return __awaiter(this, void 0, void 0, function () {
        var i, rr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (__classPrivateFieldGet(this, _BufReader_posRead, "f") > 0) {
                        __classPrivateFieldGet(this, _BufReader_buffer, "f").copyWithin(0, __classPrivateFieldGet(this, _BufReader_posRead, "f"), __classPrivateFieldGet(this, _BufReader_posWrite, "f"));
                        __classPrivateFieldSet(this, _BufReader_posWrite, __classPrivateFieldGet(this, _BufReader_posWrite, "f") - __classPrivateFieldGet(this, _BufReader_posRead, "f"), "f");
                        __classPrivateFieldSet(this, _BufReader_posRead, 0, "f");
                    }
                    if (__classPrivateFieldGet(this, _BufReader_posWrite, "f") >= __classPrivateFieldGet(this, _BufReader_buffer, "f").byteLength) {
                        throw Error("bufio: tried to fill full buffer");
                    }
                    i = MAX_CONSECUTIVE_EMPTY_READS;
                    _a.label = 1;
                case 1:
                    if (!(i > 0)) return [3, 4];
                    return [4, __classPrivateFieldGet(this, _BufReader_reader, "f").read(__classPrivateFieldGet(this, _BufReader_buffer, "f").subarray(__classPrivateFieldGet(this, _BufReader_posWrite, "f")))];
                case 2:
                    rr = _a.sent();
                    if (rr === null) {
                        __classPrivateFieldSet(this, _BufReader_eof, true, "f");
                        return [2];
                    }
                    (0, util_ts_1.assert)(rr >= 0, "negative read");
                    __classPrivateFieldSet(this, _BufReader_posWrite, __classPrivateFieldGet(this, _BufReader_posWrite, "f") + rr, "f");
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
}, _BufReader_reset = function _BufReader_reset(buffer, reader) {
    __classPrivateFieldSet(this, _BufReader_buffer, buffer, "f");
    __classPrivateFieldSet(this, _BufReader_reader, reader, "f");
    __classPrivateFieldSet(this, _BufReader_eof, false, "f");
};
