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
exports.__esModule = true;
exports.btoa = exports.atob = exports.constants = exports.kStringMaxLength = exports.kMaxLength = exports.Buffer = void 0;
var hex = require("../encoding/hex.ts");
var base64 = require("../encoding/base64.ts");
var _utils_ts_1 = require("./_utils.ts");
var notImplementedEncodings = [
    "ascii",
    "binary",
    "latin1",
    "ucs2",
    "utf16le",
];
function checkEncoding(encoding, strict) {
    if (encoding === void 0) { encoding = "utf8"; }
    if (strict === void 0) { strict = true; }
    if (typeof encoding !== "string" || (strict && encoding === "")) {
        if (!strict)
            return "utf8";
        throw new TypeError("Unknown encoding: ".concat(encoding));
    }
    var normalized = (0, _utils_ts_1.normalizeEncoding)(encoding);
    if (normalized === undefined) {
        throw new TypeError("Unknown encoding: ".concat(encoding));
    }
    if (notImplementedEncodings.includes(encoding)) {
        (0, _utils_ts_1.notImplemented)("\"".concat(encoding, "\" encoding"));
    }
    return normalized;
}
var encodingOps = {
    utf8: {
        byteLength: function (string) {
            return new TextEncoder().encode(string).byteLength;
        }
    },
    ucs2: {
        byteLength: function (string) { return string.length * 2; }
    },
    utf16le: {
        byteLength: function (string) { return string.length * 2; }
    },
    latin1: {
        byteLength: function (string) { return string.length; }
    },
    ascii: {
        byteLength: function (string) { return string.length; }
    },
    base64: {
        byteLength: function (string) {
            return base64ByteLength(string, string.length);
        }
    },
    hex: {
        byteLength: function (string) { return string.length >>> 1; }
    }
};
function base64ByteLength(str, bytes) {
    if (str.charCodeAt(bytes - 1) === 0x3d)
        bytes--;
    if (bytes > 1 && str.charCodeAt(bytes - 1) === 0x3d)
        bytes--;
    return (bytes * 3) >>> 2;
}
var Buffer = (function (_super) {
    __extends(Buffer, _super);
    function Buffer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Buffer.alloc = function (size, fill, encoding) {
        if (encoding === void 0) { encoding = "utf8"; }
        if (typeof size !== "number") {
            throw new TypeError("The \"size\" argument must be of type number. Received type ".concat(typeof size));
        }
        var buf = new Buffer(size);
        if (size === 0)
            return buf;
        var bufFill;
        if (typeof fill === "string") {
            var clearEncoding = checkEncoding(encoding);
            if (typeof fill === "string" &&
                fill.length === 1 &&
                clearEncoding === "utf8") {
                buf.fill(fill.charCodeAt(0));
            }
            else
                bufFill = Buffer.from(fill, clearEncoding);
        }
        else if (typeof fill === "number") {
            buf.fill(fill);
        }
        else if (fill instanceof Uint8Array) {
            if (fill.length === 0) {
                throw new TypeError("The argument \"value\" is invalid. Received ".concat(fill.constructor.name, " []"));
            }
            bufFill = fill;
        }
        if (bufFill) {
            if (bufFill.length > buf.length) {
                bufFill = bufFill.subarray(0, buf.length);
            }
            var offset = 0;
            while (offset < size) {
                buf.set(bufFill, offset);
                offset += bufFill.length;
                if (offset + bufFill.length >= size)
                    break;
            }
            if (offset !== size) {
                buf.set(bufFill.subarray(0, size - offset), offset);
            }
        }
        return buf;
    };
    Buffer.allocUnsafe = function (size) {
        return new Buffer(size);
    };
    Buffer.byteLength = function (string, encoding) {
        if (encoding === void 0) { encoding = "utf8"; }
        if (typeof string != "string")
            return string.byteLength;
        encoding = (0, _utils_ts_1.normalizeEncoding)(encoding) || "utf8";
        return encodingOps[encoding].byteLength(string);
    };
    Buffer.concat = function (list, totalLength) {
        if (totalLength == undefined) {
            totalLength = 0;
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var buf = list_1[_i];
                totalLength += buf.length;
            }
        }
        var buffer = Buffer.allocUnsafe(totalLength);
        var pos = 0;
        for (var _a = 0, list_2 = list; _a < list_2.length; _a++) {
            var item = list_2[_a];
            var buf = void 0;
            if (!(item instanceof Buffer)) {
                buf = Buffer.from(item);
            }
            else {
                buf = item;
            }
            buf.copy(buffer, pos);
            pos += buf.length;
        }
        return buffer;
    };
    Buffer.from = function (value, offsetOrEncoding, length) {
        var offset = typeof offsetOrEncoding === "string"
            ? undefined
            : offsetOrEncoding;
        var encoding = typeof offsetOrEncoding === "string"
            ? offsetOrEncoding
            : undefined;
        if (typeof value == "string") {
            encoding = checkEncoding(encoding, false);
            if (encoding === "hex") {
                return new Buffer(hex.decode(new TextEncoder().encode(value)).buffer);
            }
            if (encoding === "base64")
                return new Buffer(base64.decode(value).buffer);
            return new Buffer(new TextEncoder().encode(value).buffer);
        }
        return new Buffer(value, offset, length);
    };
    Buffer.isBuffer = function (obj) {
        return obj instanceof Buffer;
    };
    Buffer.isEncoding = function (encoding) {
        return (typeof encoding === "string" &&
            encoding.length !== 0 &&
            (0, _utils_ts_1.normalizeEncoding)(encoding) !== undefined);
    };
    Buffer.prototype.copy = function (targetBuffer, targetStart, sourceStart, sourceEnd) {
        if (targetStart === void 0) { targetStart = 0; }
        if (sourceStart === void 0) { sourceStart = 0; }
        if (sourceEnd === void 0) { sourceEnd = this.length; }
        var sourceBuffer = this
            .subarray(sourceStart, sourceEnd)
            .subarray(0, Math.max(0, targetBuffer.length - targetStart));
        if (sourceBuffer.length === 0)
            return 0;
        targetBuffer.set(sourceBuffer, targetStart);
        return sourceBuffer.length;
    };
    Buffer.prototype.equals = function (otherBuffer) {
        if (!(otherBuffer instanceof Uint8Array)) {
            throw new TypeError("The \"otherBuffer\" argument must be an instance of Buffer or Uint8Array. Received type ".concat(typeof otherBuffer));
        }
        if (this === otherBuffer)
            return true;
        if (this.byteLength !== otherBuffer.byteLength)
            return false;
        for (var i = 0; i < this.length; i++) {
            if (this[i] !== otherBuffer[i])
                return false;
        }
        return true;
    };
    Buffer.prototype.readBigInt64BE = function (offset) {
        if (offset === void 0) { offset = 0; }
        return new DataView(this.buffer, this.byteOffset, this.byteLength).getBigInt64(offset);
    };
    Buffer.prototype.readBigInt64LE = function (offset) {
        if (offset === void 0) { offset = 0; }
        return new DataView(this.buffer, this.byteOffset, this.byteLength).getBigInt64(offset, true);
    };
    Buffer.prototype.readBigUInt64BE = function (offset) {
        if (offset === void 0) { offset = 0; }
        return new DataView(this.buffer, this.byteOffset, this.byteLength).getBigUint64(offset);
    };
    Buffer.prototype.readBigUInt64LE = function (offset) {
        if (offset === void 0) { offset = 0; }
        return new DataView(this.buffer, this.byteOffset, this.byteLength).getBigUint64(offset, true);
    };
    Buffer.prototype.readDoubleBE = function (offset) {
        if (offset === void 0) { offset = 0; }
        return new DataView(this.buffer, this.byteOffset, this.byteLength).getFloat64(offset);
    };
    Buffer.prototype.readDoubleLE = function (offset) {
        if (offset === void 0) { offset = 0; }
        return new DataView(this.buffer, this.byteOffset, this.byteLength).getFloat64(offset, true);
    };
    Buffer.prototype.readFloatBE = function (offset) {
        if (offset === void 0) { offset = 0; }
        return new DataView(this.buffer, this.byteOffset, this.byteLength).getFloat32(offset);
    };
    Buffer.prototype.readFloatLE = function (offset) {
        if (offset === void 0) { offset = 0; }
        return new DataView(this.buffer, this.byteOffset, this.byteLength).getFloat32(offset, true);
    };
    Buffer.prototype.readInt8 = function (offset) {
        if (offset === void 0) { offset = 0; }
        return new DataView(this.buffer, this.byteOffset, this.byteLength).getInt8(offset);
    };
    Buffer.prototype.readInt16BE = function (offset) {
        if (offset === void 0) { offset = 0; }
        return new DataView(this.buffer, this.byteOffset, this.byteLength).getInt16(offset);
    };
    Buffer.prototype.readInt16LE = function (offset) {
        if (offset === void 0) { offset = 0; }
        return new DataView(this.buffer, this.byteOffset, this.byteLength).getInt16(offset, true);
    };
    Buffer.prototype.readInt32BE = function (offset) {
        if (offset === void 0) { offset = 0; }
        return new DataView(this.buffer, this.byteOffset, this.byteLength).getInt32(offset);
    };
    Buffer.prototype.readInt32LE = function (offset) {
        if (offset === void 0) { offset = 0; }
        return new DataView(this.buffer, this.byteOffset, this.byteLength).getInt32(offset, true);
    };
    Buffer.prototype.readUInt8 = function (offset) {
        if (offset === void 0) { offset = 0; }
        return new DataView(this.buffer, this.byteOffset, this.byteLength).getUint8(offset);
    };
    Buffer.prototype.readUInt16BE = function (offset) {
        if (offset === void 0) { offset = 0; }
        return new DataView(this.buffer, this.byteOffset, this.byteLength).getUint16(offset);
    };
    Buffer.prototype.readUInt16LE = function (offset) {
        if (offset === void 0) { offset = 0; }
        return new DataView(this.buffer, this.byteOffset, this.byteLength).getUint16(offset, true);
    };
    Buffer.prototype.readUInt32BE = function (offset) {
        if (offset === void 0) { offset = 0; }
        return new DataView(this.buffer, this.byteOffset, this.byteLength).getUint32(offset);
    };
    Buffer.prototype.readUInt32LE = function (offset) {
        if (offset === void 0) { offset = 0; }
        return new DataView(this.buffer, this.byteOffset, this.byteLength).getUint32(offset, true);
    };
    Buffer.prototype.slice = function (begin, end) {
        if (begin === void 0) { begin = 0; }
        if (end === void 0) { end = this.length; }
        return this.subarray(begin, end);
    };
    Buffer.prototype.toJSON = function () {
        return { type: "Buffer", data: Array.from(this) };
    };
    Buffer.prototype.toString = function (encoding, start, end) {
        if (encoding === void 0) { encoding = "utf8"; }
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = this.length; }
        encoding = checkEncoding(encoding);
        var b = this.subarray(start, end);
        if (encoding === "hex")
            return new TextDecoder().decode(hex.encode(b));
        if (encoding === "base64")
            return base64.encode(b);
        return new TextDecoder(encoding).decode(b);
    };
    Buffer.prototype.write = function (string, offset, length) {
        if (offset === void 0) { offset = 0; }
        if (length === void 0) { length = this.length; }
        return new TextEncoder().encodeInto(string, this.subarray(offset, offset + length)).written;
    };
    Buffer.prototype.writeBigInt64BE = function (value, offset) {
        if (offset === void 0) { offset = 0; }
        new DataView(this.buffer, this.byteOffset, this.byteLength).setBigInt64(offset, value);
        return offset + 4;
    };
    Buffer.prototype.writeBigInt64LE = function (value, offset) {
        if (offset === void 0) { offset = 0; }
        new DataView(this.buffer, this.byteOffset, this.byteLength).setBigInt64(offset, value, true);
        return offset + 4;
    };
    Buffer.prototype.writeBigUInt64BE = function (value, offset) {
        if (offset === void 0) { offset = 0; }
        new DataView(this.buffer, this.byteOffset, this.byteLength).setBigUint64(offset, value);
        return offset + 4;
    };
    Buffer.prototype.writeBigUInt64LE = function (value, offset) {
        if (offset === void 0) { offset = 0; }
        new DataView(this.buffer, this.byteOffset, this.byteLength).setBigUint64(offset, value, true);
        return offset + 4;
    };
    Buffer.prototype.writeDoubleBE = function (value, offset) {
        if (offset === void 0) { offset = 0; }
        new DataView(this.buffer, this.byteOffset, this.byteLength).setFloat64(offset, value);
        return offset + 8;
    };
    Buffer.prototype.writeDoubleLE = function (value, offset) {
        if (offset === void 0) { offset = 0; }
        new DataView(this.buffer, this.byteOffset, this.byteLength).setFloat64(offset, value, true);
        return offset + 8;
    };
    Buffer.prototype.writeFloatBE = function (value, offset) {
        if (offset === void 0) { offset = 0; }
        new DataView(this.buffer, this.byteOffset, this.byteLength).setFloat32(offset, value);
        return offset + 4;
    };
    Buffer.prototype.writeFloatLE = function (value, offset) {
        if (offset === void 0) { offset = 0; }
        new DataView(this.buffer, this.byteOffset, this.byteLength).setFloat32(offset, value, true);
        return offset + 4;
    };
    Buffer.prototype.writeInt8 = function (value, offset) {
        if (offset === void 0) { offset = 0; }
        new DataView(this.buffer, this.byteOffset, this.byteLength).setInt8(offset, value);
        return offset + 1;
    };
    Buffer.prototype.writeInt16BE = function (value, offset) {
        if (offset === void 0) { offset = 0; }
        new DataView(this.buffer, this.byteOffset, this.byteLength).setInt16(offset, value);
        return offset + 2;
    };
    Buffer.prototype.writeInt16LE = function (value, offset) {
        if (offset === void 0) { offset = 0; }
        new DataView(this.buffer, this.byteOffset, this.byteLength).setInt16(offset, value, true);
        return offset + 2;
    };
    Buffer.prototype.writeInt32BE = function (value, offset) {
        if (offset === void 0) { offset = 0; }
        new DataView(this.buffer, this.byteOffset, this.byteLength).setUint32(offset, value);
        return offset + 4;
    };
    Buffer.prototype.writeInt32LE = function (value, offset) {
        if (offset === void 0) { offset = 0; }
        new DataView(this.buffer, this.byteOffset, this.byteLength).setInt32(offset, value, true);
        return offset + 4;
    };
    Buffer.prototype.writeUInt8 = function (value, offset) {
        if (offset === void 0) { offset = 0; }
        new DataView(this.buffer, this.byteOffset, this.byteLength).setUint8(offset, value);
        return offset + 1;
    };
    Buffer.prototype.writeUInt16BE = function (value, offset) {
        if (offset === void 0) { offset = 0; }
        new DataView(this.buffer, this.byteOffset, this.byteLength).setUint16(offset, value);
        return offset + 2;
    };
    Buffer.prototype.writeUInt16LE = function (value, offset) {
        if (offset === void 0) { offset = 0; }
        new DataView(this.buffer, this.byteOffset, this.byteLength).setUint16(offset, value, true);
        return offset + 2;
    };
    Buffer.prototype.writeUInt32BE = function (value, offset) {
        if (offset === void 0) { offset = 0; }
        new DataView(this.buffer, this.byteOffset, this.byteLength).setUint32(offset, value);
        return offset + 4;
    };
    Buffer.prototype.writeUInt32LE = function (value, offset) {
        if (offset === void 0) { offset = 0; }
        new DataView(this.buffer, this.byteOffset, this.byteLength).setUint32(offset, value, true);
        return offset + 4;
    };
    return Buffer;
}(Uint8Array));
exports.Buffer = Buffer;
exports.kMaxLength = 4294967296;
exports.kStringMaxLength = 536870888;
exports.constants = {
    MAX_LENGTH: exports.kMaxLength,
    MAX_STRING_LENGTH: exports.kStringMaxLength
};
exports.atob = globalThis.atob;
exports.btoa = globalThis.btoa;
exports["default"] = {
    Buffer: Buffer,
    kMaxLength: exports.kMaxLength,
    kStringMaxLength: exports.kStringMaxLength,
    constants: exports.constants,
    atob: exports.atob,
    btoa: exports.btoa
};
