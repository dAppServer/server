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
exports.__esModule = true;
exports.sliceLongToBytes = exports.readLong = exports.readInt = exports.readShort = exports.copyN = void 0;
var assert_ts_1 = require("../_util/assert.ts");
var DEFAULT_BUFFER_SIZE = 32 * 1024;
function copyN(r, dest, size) {
    return __awaiter(this, void 0, void 0, function () {
        var bytesRead, buf, result, nread, n, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    bytesRead = 0;
                    buf = new Uint8Array(DEFAULT_BUFFER_SIZE);
                    _b.label = 1;
                case 1:
                    if (!(bytesRead < size)) return [3, 7];
                    if (size - bytesRead < DEFAULT_BUFFER_SIZE) {
                        buf = new Uint8Array(size - bytesRead);
                    }
                    return [4, r.read(buf)];
                case 2:
                    result = _b.sent();
                    nread = result !== null && result !== void 0 ? result : 0;
                    bytesRead += nread;
                    if (!(nread > 0)) return [3, 6];
                    n = 0;
                    _b.label = 3;
                case 3:
                    if (!(n < nread)) return [3, 5];
                    _a = n;
                    return [4, dest.write(buf.slice(n, nread))];
                case 4:
                    n = _a + _b.sent();
                    return [3, 3];
                case 5:
                    (0, assert_ts_1.assert)(n === nread, "could not write");
                    _b.label = 6;
                case 6:
                    if (result === null) {
                        return [3, 7];
                    }
                    return [3, 1];
                case 7: return [2, bytesRead];
            }
        });
    });
}
exports.copyN = copyN;
function readShort(buf) {
    return __awaiter(this, void 0, void 0, function () {
        var high, low;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, buf.readByte()];
                case 1:
                    high = _a.sent();
                    if (high === null)
                        return [2, null];
                    return [4, buf.readByte()];
                case 2:
                    low = _a.sent();
                    if (low === null)
                        throw new Deno.errors.UnexpectedEof();
                    return [2, (high << 8) | low];
            }
        });
    });
}
exports.readShort = readShort;
function readInt(buf) {
    return __awaiter(this, void 0, void 0, function () {
        var high, low;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, readShort(buf)];
                case 1:
                    high = _a.sent();
                    if (high === null)
                        return [2, null];
                    return [4, readShort(buf)];
                case 2:
                    low = _a.sent();
                    if (low === null)
                        throw new Deno.errors.UnexpectedEof();
                    return [2, (high << 16) | low];
            }
        });
    });
}
exports.readInt = readInt;
var MAX_SAFE_INTEGER = BigInt(Number.MAX_SAFE_INTEGER);
function readLong(buf) {
    return __awaiter(this, void 0, void 0, function () {
        var high, low, big;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, readInt(buf)];
                case 1:
                    high = _a.sent();
                    if (high === null)
                        return [2, null];
                    return [4, readInt(buf)];
                case 2:
                    low = _a.sent();
                    if (low === null)
                        throw new Deno.errors.UnexpectedEof();
                    big = (BigInt(high) << 32n) | BigInt(low);
                    if (big > MAX_SAFE_INTEGER) {
                        throw new RangeError("Long value too big to be represented as a JavaScript number.");
                    }
                    return [2, Number(big)];
            }
        });
    });
}
exports.readLong = readLong;
function sliceLongToBytes(d, dest) {
    if (dest === void 0) { dest = new Array(8); }
    var big = BigInt(d);
    for (var i = 0; i < 8; i++) {
        dest[7 - i] = Number(big & 0xffn);
        big >>= 8n;
    }
    return dest;
}
exports.sliceLongToBytes = sliceLongToBytes;
