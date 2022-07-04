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
exports.__esModule = true;
exports.copy = exports.iterSync = exports.iter = exports.writeAllSync = exports.writeAll = exports.readRangeSync = exports.readRange = exports.readAllSync = exports.readAll = void 0;
var buffer_ts_1 = require("./buffer.ts");
var mod_ts_1 = require("../bytes/mod.ts");
var asserts_ts_1 = require("../testing/asserts.ts");
var DEFAULT_BUFFER_SIZE = 32 * 1024;
function readAll(r) {
    return __awaiter(this, void 0, void 0, function () {
        var buf;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    buf = new buffer_ts_1.Buffer();
                    return [4, buf.readFrom(r)];
                case 1:
                    _a.sent();
                    return [2, buf.bytes()];
            }
        });
    });
}
exports.readAll = readAll;
function readAllSync(r) {
    var buf = new buffer_ts_1.Buffer();
    buf.readFromSync(r);
    return buf.bytes();
}
exports.readAllSync = readAllSync;
function readRange(r, range) {
    return __awaiter(this, void 0, void 0, function () {
        var length, result, off, p, nread;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    length = range.end - range.start + 1;
                    (0, asserts_ts_1.assert)(length > 0, "Invalid byte range was passed.");
                    return [4, r.seek(range.start, Deno.SeekMode.Start)];
                case 1:
                    _a.sent();
                    result = new Uint8Array(length);
                    off = 0;
                    _a.label = 2;
                case 2:
                    if (!length) return [3, 4];
                    p = new Uint8Array(Math.min(length, DEFAULT_BUFFER_SIZE));
                    return [4, r.read(p)];
                case 3:
                    nread = _a.sent();
                    (0, asserts_ts_1.assert)(nread !== null, "Unexpected EOF reach while reading a range.");
                    (0, asserts_ts_1.assert)(nread > 0, "Unexpected read of 0 bytes while reading a range.");
                    (0, mod_ts_1.copy)(p, result, off);
                    off += nread;
                    length -= nread;
                    (0, asserts_ts_1.assert)(length >= 0, "Unexpected length remaining after reading range.");
                    return [3, 2];
                case 4: return [2, result];
            }
        });
    });
}
exports.readRange = readRange;
function readRangeSync(r, range) {
    var length = range.end - range.start + 1;
    (0, asserts_ts_1.assert)(length > 0, "Invalid byte range was passed.");
    r.seekSync(range.start, Deno.SeekMode.Start);
    var result = new Uint8Array(length);
    var off = 0;
    while (length) {
        var p = new Uint8Array(Math.min(length, DEFAULT_BUFFER_SIZE));
        var nread = r.readSync(p);
        (0, asserts_ts_1.assert)(nread !== null, "Unexpected EOF reach while reading a range.");
        (0, asserts_ts_1.assert)(nread > 0, "Unexpected read of 0 bytes while reading a range.");
        (0, mod_ts_1.copy)(p, result, off);
        off += nread;
        length -= nread;
        (0, asserts_ts_1.assert)(length >= 0, "Unexpected length remaining after reading range.");
    }
    return result;
}
exports.readRangeSync = readRangeSync;
function writeAll(w, arr) {
    return __awaiter(this, void 0, void 0, function () {
        var nwritten, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    nwritten = 0;
                    _b.label = 1;
                case 1:
                    if (!(nwritten < arr.length)) return [3, 3];
                    _a = nwritten;
                    return [4, w.write(arr.subarray(nwritten))];
                case 2:
                    nwritten = _a + _b.sent();
                    return [3, 1];
                case 3: return [2];
            }
        });
    });
}
exports.writeAll = writeAll;
function writeAllSync(w, arr) {
    var nwritten = 0;
    while (nwritten < arr.length) {
        nwritten += w.writeSync(arr.subarray(nwritten));
    }
}
exports.writeAllSync = writeAllSync;
function iter(r, options) {
    var _a;
    return __asyncGenerator(this, arguments, function iter_1() {
        var bufSize, b, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    bufSize = (_a = options === null || options === void 0 ? void 0 : options.bufSize) !== null && _a !== void 0 ? _a : DEFAULT_BUFFER_SIZE;
                    b = new Uint8Array(bufSize);
                    _b.label = 1;
                case 1:
                    if (!true) return [3, 5];
                    return [4, __await(r.read(b))];
                case 2:
                    result = _b.sent();
                    if (result === null) {
                        return [3, 5];
                    }
                    return [4, __await(b.subarray(0, result))];
                case 3: return [4, _b.sent()];
                case 4:
                    _b.sent();
                    return [3, 1];
                case 5: return [2];
            }
        });
    });
}
exports.iter = iter;
function iterSync(r, options) {
    var bufSize, b, result;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                bufSize = (_a = options === null || options === void 0 ? void 0 : options.bufSize) !== null && _a !== void 0 ? _a : DEFAULT_BUFFER_SIZE;
                b = new Uint8Array(bufSize);
                _b.label = 1;
            case 1:
                if (!true) return [3, 3];
                result = r.readSync(b);
                if (result === null) {
                    return [3, 3];
                }
                return [4, b.subarray(0, result)];
            case 2:
                _b.sent();
                return [3, 1];
            case 3: return [2];
        }
    });
}
exports.iterSync = iterSync;
function copy(src, dst, options) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var n, bufSize, b, gotEOF, result, nwritten, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    n = 0;
                    bufSize = (_a = options === null || options === void 0 ? void 0 : options.bufSize) !== null && _a !== void 0 ? _a : DEFAULT_BUFFER_SIZE;
                    b = new Uint8Array(bufSize);
                    gotEOF = false;
                    _c.label = 1;
                case 1:
                    if (!(gotEOF === false)) return [3, 8];
                    return [4, src.read(b)];
                case 2:
                    result = _c.sent();
                    if (!(result === null)) return [3, 3];
                    gotEOF = true;
                    return [3, 7];
                case 3:
                    nwritten = 0;
                    _c.label = 4;
                case 4:
                    if (!(nwritten < result)) return [3, 6];
                    _b = nwritten;
                    return [4, dst.write(b.subarray(nwritten, result))];
                case 5:
                    nwritten = _b + _c.sent();
                    return [3, 4];
                case 6:
                    n += nwritten;
                    _c.label = 7;
                case 7: return [3, 1];
                case 8: return [2, n];
            }
        });
    });
}
exports.copy = copy;
