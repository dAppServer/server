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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
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
exports.readRequest = exports.parseHTTPVersion = exports.writeResponse = exports.writeTrailers = exports.writeChunkedBody = exports.readTrailers = exports.chunkedBodyReader = exports.bodyReader = exports.emptyReader = void 0;
var bufio_ts_1 = require("../io/bufio.ts");
var mod_ts_1 = require("../textproto/mod.ts");
var assert_ts_1 = require("../_util/assert.ts");
var server_ts_1 = require("./server.ts");
var http_status_ts_1 = require("./http_status.ts");
var encoder = new TextEncoder();
function emptyReader() {
    return {
        read: function (_) {
            return Promise.resolve(null);
        }
    };
}
exports.emptyReader = emptyReader;
function bodyReader(contentLength, r) {
    var totalRead = 0;
    var finished = false;
    function read(buf) {
        return __awaiter(this, void 0, void 0, function () {
            var result, remaining, readBuf;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (finished)
                            return [2, null];
                        remaining = contentLength - totalRead;
                        if (!(remaining >= buf.byteLength)) return [3, 2];
                        return [4, r.read(buf)];
                    case 1:
                        result = _a.sent();
                        return [3, 4];
                    case 2:
                        readBuf = buf.subarray(0, remaining);
                        return [4, r.read(readBuf)];
                    case 3:
                        result = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (result !== null) {
                            totalRead += result;
                        }
                        finished = totalRead === contentLength;
                        return [2, result];
                }
            });
        });
    }
    return { read: read };
}
exports.bodyReader = bodyReader;
function chunkedBodyReader(h, r) {
    var tp = new mod_ts_1.TextProtoReader(r);
    var finished = false;
    var chunks = [];
    function read(buf) {
        return __awaiter(this, void 0, void 0, function () {
            var chunk, chunkRemaining, readLength, i, line, chunkSizeString, chunkSize, eof, restChunk, bufToFill, eof;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (finished)
                            return [2, null];
                        chunk = chunks[0];
                        if (!chunk) return [3, 3];
                        chunkRemaining = chunk.data.byteLength - chunk.offset;
                        readLength = Math.min(chunkRemaining, buf.byteLength);
                        for (i = 0; i < readLength; i++) {
                            buf[i] = chunk.data[chunk.offset + i];
                        }
                        chunk.offset += readLength;
                        if (!(chunk.offset === chunk.data.byteLength)) return [3, 2];
                        chunks.shift();
                        return [4, tp.readLine()];
                    case 1:
                        if ((_a.sent()) === null) {
                            throw new Deno.errors.UnexpectedEof();
                        }
                        _a.label = 2;
                    case 2: return [2, readLength];
                    case 3: return [4, tp.readLine()];
                    case 4:
                        line = _a.sent();
                        if (line === null)
                            throw new Deno.errors.UnexpectedEof();
                        chunkSizeString = line.split(";")[0];
                        chunkSize = parseInt(chunkSizeString, 16);
                        if (Number.isNaN(chunkSize) || chunkSize < 0) {
                            throw new Deno.errors.InvalidData("Invalid chunk size");
                        }
                        if (!(chunkSize > 0)) return [3, 11];
                        if (!(chunkSize > buf.byteLength)) return [3, 7];
                        return [4, r.readFull(buf)];
                    case 5:
                        eof = _a.sent();
                        if (eof === null) {
                            throw new Deno.errors.UnexpectedEof();
                        }
                        restChunk = new Uint8Array(chunkSize - buf.byteLength);
                        return [4, r.readFull(restChunk)];
                    case 6:
                        eof = _a.sent();
                        if (eof === null) {
                            throw new Deno.errors.UnexpectedEof();
                        }
                        else {
                            chunks.push({
                                offset: 0,
                                data: restChunk
                            });
                        }
                        return [2, buf.byteLength];
                    case 7:
                        bufToFill = buf.subarray(0, chunkSize);
                        return [4, r.readFull(bufToFill)];
                    case 8:
                        eof = _a.sent();
                        if (eof === null) {
                            throw new Deno.errors.UnexpectedEof();
                        }
                        return [4, tp.readLine()];
                    case 9:
                        if ((_a.sent()) === null) {
                            throw new Deno.errors.UnexpectedEof();
                        }
                        return [2, chunkSize];
                    case 10: return [3, 14];
                    case 11:
                        (0, assert_ts_1.assert)(chunkSize === 0);
                        return [4, r.readLine()];
                    case 12:
                        if ((_a.sent()) === null) {
                            throw new Deno.errors.UnexpectedEof();
                        }
                        return [4, readTrailers(h, r)];
                    case 13:
                        _a.sent();
                        finished = true;
                        return [2, null];
                    case 14: return [2];
                }
            });
        });
    }
    return { read: read };
}
exports.chunkedBodyReader = chunkedBodyReader;
function isProhibidedForTrailer(key) {
    var s = new Set(["transfer-encoding", "content-length", "trailer"]);
    return s.has(key.toLowerCase());
}
function readTrailers(headers, r) {
    return __awaiter(this, void 0, void 0, function () {
        var trailers, trailerNames, tp, result, undeclared, _i, result_1, _a, k, v, missingTrailers;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    trailers = parseTrailer(headers.get("trailer"));
                    if (trailers == null)
                        return [2];
                    trailerNames = __spreadArray([], trailers.keys(), true);
                    tp = new mod_ts_1.TextProtoReader(r);
                    return [4, tp.readMIMEHeader()];
                case 1:
                    result = _b.sent();
                    if (result == null) {
                        throw new Deno.errors.InvalidData("Missing trailer header.");
                    }
                    undeclared = __spreadArray([], result.keys(), true).filter(function (k) { return !trailerNames.includes(k); });
                    if (undeclared.length > 0) {
                        throw new Deno.errors.InvalidData("Undeclared trailers: ".concat(Deno.inspect(undeclared), "."));
                    }
                    for (_i = 0, result_1 = result; _i < result_1.length; _i++) {
                        _a = result_1[_i], k = _a[0], v = _a[1];
                        headers.append(k, v);
                    }
                    missingTrailers = trailerNames.filter(function (k) { return !result.has(k); });
                    if (missingTrailers.length > 0) {
                        throw new Deno.errors.InvalidData("Missing trailers: ".concat(Deno.inspect(missingTrailers), "."));
                    }
                    headers["delete"]("trailer");
                    return [2];
            }
        });
    });
}
exports.readTrailers = readTrailers;
function parseTrailer(field) {
    if (field == null) {
        return undefined;
    }
    var trailerNames = field.split(",").map(function (v) { return v.trim().toLowerCase(); });
    if (trailerNames.length === 0) {
        throw new Deno.errors.InvalidData("Empty trailer header.");
    }
    var prohibited = trailerNames.filter(function (k) { return isProhibidedForTrailer(k); });
    if (prohibited.length > 0) {
        throw new Deno.errors.InvalidData("Prohibited trailer names: ".concat(Deno.inspect(prohibited), "."));
    }
    return new Headers(trailerNames.map(function (key) { return [key, ""]; }));
}
function writeChunkedBody(w, r) {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function () {
        var _b, _c, chunk, start, end, e_1_1, endChunk;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 9, 10, 15]);
                    _b = __asyncValues(Deno.iter(r));
                    _d.label = 1;
                case 1: return [4, _b.next()];
                case 2:
                    if (!(_c = _d.sent(), !_c.done)) return [3, 8];
                    chunk = _c.value;
                    if (chunk.byteLength <= 0)
                        return [3, 7];
                    start = encoder.encode("".concat(chunk.byteLength.toString(16), "\r\n"));
                    end = encoder.encode("\r\n");
                    return [4, w.write(start)];
                case 3:
                    _d.sent();
                    return [4, w.write(chunk)];
                case 4:
                    _d.sent();
                    return [4, w.write(end)];
                case 5:
                    _d.sent();
                    return [4, w.flush()];
                case 6:
                    _d.sent();
                    _d.label = 7;
                case 7: return [3, 1];
                case 8: return [3, 15];
                case 9:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3, 15];
                case 10:
                    _d.trys.push([10, , 13, 14]);
                    if (!(_c && !_c.done && (_a = _b["return"]))) return [3, 12];
                    return [4, _a.call(_b)];
                case 11:
                    _d.sent();
                    _d.label = 12;
                case 12: return [3, 14];
                case 13:
                    if (e_1) throw e_1.error;
                    return [7];
                case 14: return [7];
                case 15:
                    endChunk = encoder.encode("0\r\n\r\n");
                    return [4, w.write(endChunk)];
                case 16:
                    _d.sent();
                    return [2];
            }
        });
    });
}
exports.writeChunkedBody = writeChunkedBody;
function writeTrailers(w, headers, trailers) {
    return __awaiter(this, void 0, void 0, function () {
        var trailer, transferEncoding, writer, trailerNames, prohibitedTrailers, undeclared, _i, trailers_1, _a, key, value;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    trailer = headers.get("trailer");
                    if (trailer === null) {
                        throw new TypeError("Missing trailer header.");
                    }
                    transferEncoding = headers.get("transfer-encoding");
                    if (transferEncoding === null || !transferEncoding.match(/^chunked/)) {
                        throw new TypeError("Trailers are only allowed for \"transfer-encoding: chunked\", got \"transfer-encoding: ".concat(transferEncoding, "\"."));
                    }
                    writer = bufio_ts_1.BufWriter.create(w);
                    trailerNames = trailer.split(",").map(function (s) { return s.trim().toLowerCase(); });
                    prohibitedTrailers = trailerNames.filter(function (k) {
                        return isProhibidedForTrailer(k);
                    });
                    if (prohibitedTrailers.length > 0) {
                        throw new TypeError("Prohibited trailer names: ".concat(Deno.inspect(prohibitedTrailers), "."));
                    }
                    undeclared = __spreadArray([], trailers.keys(), true).filter(function (k) { return !trailerNames.includes(k); });
                    if (undeclared.length > 0) {
                        throw new TypeError("Undeclared trailers: ".concat(Deno.inspect(undeclared), "."));
                    }
                    _i = 0, trailers_1 = trailers;
                    _b.label = 1;
                case 1:
                    if (!(_i < trailers_1.length)) return [3, 4];
                    _a = trailers_1[_i], key = _a[0], value = _a[1];
                    return [4, writer.write(encoder.encode("".concat(key, ": ").concat(value, "\r\n")))];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3, 1];
                case 4: return [4, writer.write(encoder.encode("\r\n"))];
                case 5:
                    _b.sent();
                    return [4, writer.flush()];
                case 6:
                    _b.sent();
                    return [2];
            }
        });
    });
}
exports.writeTrailers = writeTrailers;
function writeResponse(w, r) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var protoMajor, protoMinor, statusCode, statusText, writer, out, headers, _i, headers_1, _b, key, value, header, n, n_1, contentLength, bodyLength, n_2, t;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    protoMajor = 1;
                    protoMinor = 1;
                    statusCode = r.status || 200;
                    statusText = http_status_ts_1.STATUS_TEXT.get(statusCode);
                    writer = bufio_ts_1.BufWriter.create(w);
                    if (!statusText) {
                        throw new Deno.errors.InvalidData("Bad status code");
                    }
                    if (!r.body) {
                        r.body = new Uint8Array();
                    }
                    if (typeof r.body === "string") {
                        r.body = encoder.encode(r.body);
                    }
                    out = "HTTP/".concat(protoMajor, ".").concat(protoMinor, " ").concat(statusCode, " ").concat(statusText, "\r\n");
                    headers = (_a = r.headers) !== null && _a !== void 0 ? _a : new Headers();
                    if (r.body && !headers.get("content-length")) {
                        if (r.body instanceof Uint8Array) {
                            out += "content-length: ".concat(r.body.byteLength, "\r\n");
                        }
                        else if (!headers.get("transfer-encoding")) {
                            out += "transfer-encoding: chunked\r\n";
                        }
                    }
                    for (_i = 0, headers_1 = headers; _i < headers_1.length; _i++) {
                        _b = headers_1[_i], key = _b[0], value = _b[1];
                        out += "".concat(key, ": ").concat(value, "\r\n");
                    }
                    out += "\r\n";
                    header = encoder.encode(out);
                    return [4, writer.write(header)];
                case 1:
                    n = _c.sent();
                    (0, assert_ts_1.assert)(n === header.byteLength);
                    if (!(r.body instanceof Uint8Array)) return [3, 3];
                    return [4, writer.write(r.body)];
                case 2:
                    n_1 = _c.sent();
                    (0, assert_ts_1.assert)(n_1 === r.body.byteLength);
                    return [3, 7];
                case 3:
                    if (!headers.has("content-length")) return [3, 5];
                    contentLength = headers.get("content-length");
                    (0, assert_ts_1.assert)(contentLength != null);
                    bodyLength = parseInt(contentLength);
                    return [4, Deno.copy(r.body, writer)];
                case 4:
                    n_2 = _c.sent();
                    (0, assert_ts_1.assert)(n_2 === bodyLength);
                    return [3, 7];
                case 5: return [4, writeChunkedBody(writer, r.body)];
                case 6:
                    _c.sent();
                    _c.label = 7;
                case 7:
                    if (!r.trailers) return [3, 10];
                    return [4, r.trailers()];
                case 8:
                    t = _c.sent();
                    return [4, writeTrailers(writer, headers, t)];
                case 9:
                    _c.sent();
                    _c.label = 10;
                case 10: return [4, writer.flush()];
                case 11:
                    _c.sent();
                    return [2];
            }
        });
    });
}
exports.writeResponse = writeResponse;
function parseHTTPVersion(vers) {
    switch (vers) {
        case "HTTP/1.1":
            return [1, 1];
        case "HTTP/1.0":
            return [1, 0];
        default: {
            var Big = 1000000;
            if (!vers.startsWith("HTTP/")) {
                break;
            }
            var dot = vers.indexOf(".");
            if (dot < 0) {
                break;
            }
            var majorStr = vers.substring(vers.indexOf("/") + 1, dot);
            var major = Number(majorStr);
            if (!Number.isInteger(major) || major < 0 || major > Big) {
                break;
            }
            var minorStr = vers.substring(dot + 1);
            var minor = Number(minorStr);
            if (!Number.isInteger(minor) || minor < 0 || minor > Big) {
                break;
            }
            return [major, minor];
        }
    }
    throw new Error("malformed HTTP version ".concat(vers));
}
exports.parseHTTPVersion = parseHTTPVersion;
function readRequest(conn, bufr) {
    return __awaiter(this, void 0, void 0, function () {
        var tp, firstLine, headers, req;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    tp = new mod_ts_1.TextProtoReader(bufr);
                    return [4, tp.readLine()];
                case 1:
                    firstLine = _c.sent();
                    if (firstLine === null)
                        return [2, null];
                    return [4, tp.readMIMEHeader()];
                case 2:
                    headers = _c.sent();
                    if (headers === null)
                        throw new Deno.errors.UnexpectedEof();
                    req = new server_ts_1.ServerRequest();
                    req.conn = conn;
                    req.r = bufr;
                    _a = firstLine.split(" ", 3), req.method = _a[0], req.url = _a[1], req.proto = _a[2];
                    _b = parseHTTPVersion(req.proto), req.protoMajor = _b[0], req.protoMinor = _b[1];
                    req.headers = headers;
                    fixLength(req);
                    return [2, req];
            }
        });
    });
}
exports.readRequest = readRequest;
function fixLength(req) {
    var contentLength = req.headers.get("Content-Length");
    if (contentLength) {
        var arrClen = contentLength.split(",");
        if (arrClen.length > 1) {
            var distinct = __spreadArray([], new Set(arrClen.map(function (e) { return e.trim(); })), true);
            if (distinct.length > 1) {
                throw Error("cannot contain multiple Content-Length headers");
            }
            else {
                req.headers.set("Content-Length", distinct[0]);
            }
        }
        var c = req.headers.get("Content-Length");
        if (req.method === "HEAD" && c && c !== "0") {
            throw Error("http: method cannot contain a Content-Length");
        }
        if (c && req.headers.has("transfer-encoding")) {
            throw new Error("http: Transfer-Encoding and Content-Length cannot be send together");
        }
    }
}
