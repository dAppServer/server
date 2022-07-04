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
var _Buffer_buf, _Buffer_off, _Buffer_tryGrowByReslice, _Buffer_reslice, _Buffer_grow;
exports.__esModule = true;
exports.Buffer = void 0;
var assert_ts_1 = require("../_util/assert.ts");
var MIN_READ = 32 * 1024;
var MAX_SIZE = Math.pow(2, 32) - 2;
function copyBytes(src, dst, off) {
    if (off === void 0) { off = 0; }
    var r = dst.byteLength - off;
    if (src.byteLength > r) {
        src = src.subarray(0, r);
    }
    dst.set(src, off);
    return src.byteLength;
}
var Buffer = (function () {
    function Buffer(ab) {
        var _this = this;
        _Buffer_buf.set(this, void 0);
        _Buffer_off.set(this, 0);
        _Buffer_tryGrowByReslice.set(this, function (n) {
            var l = __classPrivateFieldGet(_this, _Buffer_buf, "f").byteLength;
            if (n <= _this.capacity - l) {
                __classPrivateFieldGet(_this, _Buffer_reslice, "f").call(_this, l + n);
                return l;
            }
            return -1;
        });
        _Buffer_reslice.set(this, function (len) {
            (0, assert_ts_1.assert)(len <= __classPrivateFieldGet(_this, _Buffer_buf, "f").buffer.byteLength);
            __classPrivateFieldSet(_this, _Buffer_buf, new Uint8Array(__classPrivateFieldGet(_this, _Buffer_buf, "f").buffer, 0, len), "f");
        });
        _Buffer_grow.set(this, function (n) {
            var m = _this.length;
            if (m === 0 && __classPrivateFieldGet(_this, _Buffer_off, "f") !== 0) {
                _this.reset();
            }
            var i = __classPrivateFieldGet(_this, _Buffer_tryGrowByReslice, "f").call(_this, n);
            if (i >= 0) {
                return i;
            }
            var c = _this.capacity;
            if (n <= Math.floor(c / 2) - m) {
                copyBytes(__classPrivateFieldGet(_this, _Buffer_buf, "f").subarray(__classPrivateFieldGet(_this, _Buffer_off, "f")), __classPrivateFieldGet(_this, _Buffer_buf, "f"));
            }
            else if (c + n > MAX_SIZE) {
                throw new Error("The buffer cannot be grown beyond the maximum size.");
            }
            else {
                var buf = new Uint8Array(Math.min(2 * c + n, MAX_SIZE));
                copyBytes(__classPrivateFieldGet(_this, _Buffer_buf, "f").subarray(__classPrivateFieldGet(_this, _Buffer_off, "f")), buf);
                __classPrivateFieldSet(_this, _Buffer_buf, buf, "f");
            }
            __classPrivateFieldSet(_this, _Buffer_off, 0, "f");
            __classPrivateFieldGet(_this, _Buffer_reslice, "f").call(_this, Math.min(m + n, MAX_SIZE));
            return m;
        });
        if (ab === undefined) {
            __classPrivateFieldSet(this, _Buffer_buf, new Uint8Array(0), "f");
            return;
        }
        __classPrivateFieldSet(this, _Buffer_buf, new Uint8Array(ab), "f");
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
        __classPrivateFieldGet(this, _Buffer_reslice, "f").call(this, __classPrivateFieldGet(this, _Buffer_off, "f") + n);
    };
    Buffer.prototype.reset = function () {
        __classPrivateFieldGet(this, _Buffer_reslice, "f").call(this, 0);
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
        var nread = copyBytes(__classPrivateFieldGet(this, _Buffer_buf, "f").subarray(__classPrivateFieldGet(this, _Buffer_off, "f")), p);
        __classPrivateFieldSet(this, _Buffer_off, __classPrivateFieldGet(this, _Buffer_off, "f") + nread, "f");
        return nread;
    };
    Buffer.prototype.read = function (p) {
        var rr = this.readSync(p);
        return Promise.resolve(rr);
    };
    Buffer.prototype.writeSync = function (p) {
        var m = __classPrivateFieldGet(this, _Buffer_grow, "f").call(this, p.byteLength);
        return copyBytes(p, __classPrivateFieldGet(this, _Buffer_buf, "f"), m);
    };
    Buffer.prototype.write = function (p) {
        var n = this.writeSync(p);
        return Promise.resolve(n);
    };
    Buffer.prototype.grow = function (n) {
        if (n < 0) {
            throw Error("Buffer.grow: negative count");
        }
        var m = __classPrivateFieldGet(this, _Buffer_grow, "f").call(this, n);
        __classPrivateFieldGet(this, _Buffer_reslice, "f").call(this, m);
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
                            __classPrivateFieldGet(this, _Buffer_reslice, "f").call(this, this.length + nread);
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
                __classPrivateFieldGet(this, _Buffer_reslice, "f").call(this, this.length + nread);
            n += nread;
        }
    };
    return Buffer;
}());
exports.Buffer = Buffer;
_Buffer_buf = new WeakMap(), _Buffer_off = new WeakMap(), _Buffer_tryGrowByReslice = new WeakMap(), _Buffer_reslice = new WeakMap(), _Buffer_grow = new WeakMap();
