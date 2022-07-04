"use strict";
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
exports.BytesList = void 0;
var BytesList = (function () {
    function BytesList() {
        this.len = 0;
        this.chunks = [];
    }
    BytesList.prototype.size = function () {
        return this.len;
    };
    BytesList.prototype.add = function (value, start, end) {
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = value.byteLength; }
        if (value.byteLength === 0 || end - start === 0) {
            return;
        }
        checkRange(start, end, value.byteLength);
        this.chunks.push({
            value: value,
            end: end,
            start: start,
            offset: this.len
        });
        this.len += end - start;
    };
    BytesList.prototype.shift = function (n) {
        if (n === 0) {
            return;
        }
        if (this.len <= n) {
            this.chunks = [];
            this.len = 0;
            return;
        }
        var idx = this.getChunkIndex(n);
        this.chunks.splice(0, idx);
        var chunk = this.chunks[0];
        if (chunk) {
            var diff = n - chunk.offset;
            chunk.start += diff;
        }
        var offset = 0;
        for (var _i = 0, _a = this.chunks; _i < _a.length; _i++) {
            var chunk_1 = _a[_i];
            chunk_1.offset = offset;
            offset += chunk_1.end - chunk_1.start;
        }
        this.len = offset;
    };
    BytesList.prototype.getChunkIndex = function (pos) {
        var max = this.chunks.length;
        var min = 0;
        while (true) {
            var i = min + Math.floor((max - min) / 2);
            if (i < 0 || this.chunks.length <= i) {
                return -1;
            }
            var _a = this.chunks[i], offset = _a.offset, start = _a.start, end = _a.end;
            var len = end - start;
            if (offset <= pos && pos < offset + len) {
                return i;
            }
            else if (offset + len <= pos) {
                min = i + 1;
            }
            else {
                max = i - 1;
            }
        }
    };
    BytesList.prototype.get = function (i) {
        if (i < 0 || this.len <= i) {
            throw new Error("out of range");
        }
        var idx = this.getChunkIndex(i);
        var _a = this.chunks[idx], value = _a.value, offset = _a.offset, start = _a.start;
        return value[start + i - offset];
    };
    BytesList.prototype.iterator = function (start) {
        var startIdx, first, firstOffset, i, chunk, j;
        if (start === void 0) { start = 0; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    startIdx = this.getChunkIndex(start);
                    if (startIdx < 0)
                        return [2];
                    first = this.chunks[startIdx];
                    firstOffset = start - first.offset;
                    i = startIdx;
                    _a.label = 1;
                case 1:
                    if (!(i < this.chunks.length)) return [3, 7];
                    chunk = this.chunks[i];
                    j = chunk.start + firstOffset;
                    _a.label = 2;
                case 2:
                    if (!(j < chunk.end)) return [3, 5];
                    return [4, chunk.value[j]];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    j++;
                    return [3, 2];
                case 5:
                    firstOffset = 0;
                    _a.label = 6;
                case 6:
                    i++;
                    return [3, 1];
                case 7: return [2];
            }
        });
    };
    BytesList.prototype.slice = function (start, end) {
        if (end === void 0) { end = this.len; }
        if (end === start) {
            return new Uint8Array();
        }
        checkRange(start, end, this.len);
        var result = new Uint8Array(end - start);
        var startIdx = this.getChunkIndex(start);
        var endIdx = this.getChunkIndex(end - 1);
        var written = 0;
        for (var i = startIdx; i < endIdx; i++) {
            var chunk = this.chunks[i];
            var len = chunk.end - chunk.start;
            result.set(chunk.value.subarray(chunk.start, chunk.end), written);
            written += len;
        }
        var last = this.chunks[endIdx];
        var rest = end - start - written;
        result.set(last.value.subarray(last.start, last.start + rest), written);
        return result;
    };
    BytesList.prototype.concat = function () {
        var result = new Uint8Array(this.len);
        var sum = 0;
        for (var _i = 0, _a = this.chunks; _i < _a.length; _i++) {
            var _b = _a[_i], value = _b.value, start = _b.start, end = _b.end;
            result.set(value.subarray(start, end), sum);
            sum += end - start;
        }
        return result;
    };
    return BytesList;
}());
exports.BytesList = BytesList;
function checkRange(start, end, len) {
    if (start < 0 || len < start || end < 0 || len < end || end < start) {
        throw new Error("invalid range");
    }
}
