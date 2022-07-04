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
exports.TextProtoReader = void 0;
var mod_ts_1 = require("../bytes/mod.ts");
var decoder = new TextDecoder();
var invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/g;
function str(buf) {
    if (buf == null) {
        return "";
    }
    else {
        return decoder.decode(buf);
    }
}
function charCode(s) {
    return s.charCodeAt(0);
}
var TextProtoReader = (function () {
    function TextProtoReader(r) {
        this.r = r;
    }
    TextProtoReader.prototype.readLine = function () {
        return __awaiter(this, void 0, void 0, function () {
            var s;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.readLineSlice()];
                    case 1:
                        s = _a.sent();
                        if (s === null)
                            return [2, null];
                        return [2, str(s)];
                }
            });
        });
    };
    TextProtoReader.prototype.readMIMEHeader = function () {
        return __awaiter(this, void 0, void 0, function () {
            var m, line, buf, kv, i, key, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        m = new Headers();
                        return [4, this.r.peek(1)];
                    case 1:
                        buf = _a.sent();
                        if (!(buf === null)) return [3, 2];
                        return [2, null];
                    case 2:
                        if (!(buf[0] == charCode(" ") || buf[0] == charCode("\t"))) return [3, 4];
                        return [4, this.readLineSlice()];
                    case 3:
                        line = (_a.sent());
                        _a.label = 4;
                    case 4: return [4, this.r.peek(1)];
                    case 5:
                        buf = _a.sent();
                        if (buf === null) {
                            throw new Deno.errors.UnexpectedEof();
                        }
                        else if (buf[0] == charCode(" ") || buf[0] == charCode("\t")) {
                            throw new Deno.errors.InvalidData("malformed MIME header initial line: ".concat(str(line)));
                        }
                        _a.label = 6;
                    case 6:
                        if (!true) return [3, 8];
                        return [4, this.readLineSlice()];
                    case 7:
                        kv = _a.sent();
                        if (kv === null)
                            throw new Deno.errors.UnexpectedEof();
                        if (kv.byteLength === 0)
                            return [2, m];
                        i = kv.indexOf(charCode(":"));
                        if (i < 0) {
                            throw new Deno.errors.InvalidData("malformed MIME header line: ".concat(str(kv)));
                        }
                        key = str(kv.subarray(0, i));
                        if (key == "") {
                            return [3, 6];
                        }
                        i++;
                        while (i < kv.byteLength &&
                            (kv[i] == charCode(" ") || kv[i] == charCode("\t"))) {
                            i++;
                        }
                        value = str(kv.subarray(i)).replace(invalidHeaderCharRegex, encodeURI);
                        try {
                            m.append(key, value);
                        }
                        catch (_b) {
                        }
                        return [3, 6];
                    case 8: return [2];
                }
            });
        });
    };
    TextProtoReader.prototype.readLineSlice = function () {
        return __awaiter(this, void 0, void 0, function () {
            var line, r, l, more;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!true) return [3, 2];
                        return [4, this.r.readLine()];
                    case 1:
                        r = _a.sent();
                        if (r === null)
                            return [2, null];
                        l = r.line, more = r.more;
                        if (!line && !more) {
                            if (this.skipSpace(l) === 0) {
                                return [2, new Uint8Array(0)];
                            }
                            return [2, l];
                        }
                        line = line ? (0, mod_ts_1.concat)(line, l) : l;
                        if (!more) {
                            return [3, 2];
                        }
                        return [3, 0];
                    case 2: return [2, line];
                }
            });
        });
    };
    TextProtoReader.prototype.skipSpace = function (l) {
        var n = 0;
        for (var i = 0; i < l.length; i++) {
            if (l[i] === charCode(" ") || l[i] === charCode("\t")) {
                continue;
            }
            n++;
        }
        return n;
    };
    return TextProtoReader;
}());
exports.TextProtoReader = TextProtoReader;
