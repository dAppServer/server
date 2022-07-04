"use strict";
/*!
 * Adapted from koa-send at https://github.com/koajs/send and which is licensed
 * with the MIT license.
 */
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
exports.send = void 0;
var etag_ts_1 = require("./etag.ts");
var httpError_ts_1 = require("./httpError.ts");
var deps_ts_1 = require("./deps.ts");
var range_ts_1 = require("./range.ts");
var util_ts_1 = require("./util.ts");
var MAXBUFFER_DEFAULT = 1048576;
var boundary;
function isHidden(path) {
    var pathArr = path.split("/");
    for (var _i = 0, pathArr_1 = pathArr; _i < pathArr_1.length; _i++) {
        var segment = pathArr_1[_i];
        if (segment[0] === "." && segment !== "." && segment !== "..") {
            return true;
        }
        return false;
    }
}
function exists(path) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4, Deno.stat(path)];
                case 1: return [2, (_b.sent()).isFile];
                case 2:
                    _a = _b.sent();
                    return [2, false];
                case 3: return [2];
            }
        });
    });
}
function getEntity(path, mtime, stats, maxbuffer, response) {
    return __awaiter(this, void 0, void 0, function () {
        var body, entity, file, buffer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, Deno.open(path, { read: true })];
                case 1:
                    file = _a.sent();
                    if (!(stats.size < maxbuffer)) return [3, 3];
                    return [4, (0, deps_ts_1.readAll)(file)];
                case 2:
                    buffer = _a.sent();
                    file.close();
                    body = entity = buffer;
                    return [3, 4];
                case 3:
                    response.addResource(file.rid);
                    body = file;
                    entity = {
                        mtime: new Date(mtime),
                        size: stats.size
                    };
                    _a.label = 4;
                case 4: return [2, [body, entity]];
            }
        });
    });
}
function sendRange(response, body, range, size) {
    return __awaiter(this, void 0, void 0, function () {
        var ranges, byteRange, multipartBody;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ranges = (0, range_ts_1.parseRange)(range, size);
                    if (ranges.length === 0) {
                        throw (0, httpError_ts_1.createHttpError)(deps_ts_1.Status.RequestedRangeNotSatisfiable);
                    }
                    response.status = deps_ts_1.Status.PartialContent;
                    if (!(ranges.length === 1)) return [3, 4];
                    byteRange = ranges[0];
                    response.headers.set("Content-Length", String(byteRange.end - byteRange.start + 1));
                    response.headers.set("Content-Range", "bytes ".concat(byteRange.start, "-").concat(byteRange.end, "/").concat(size));
                    if (!(body instanceof Uint8Array)) return [3, 1];
                    response.body = body.slice(byteRange.start, byteRange.end + 1);
                    return [3, 3];
                case 1: return [4, body.seek(byteRange.start, Deno.SeekMode.Start)];
                case 2:
                    _a.sent();
                    response.body = new deps_ts_1.LimitedReader(body, byteRange.end - byteRange.start + 1);
                    _a.label = 3;
                case 3: return [3, 7];
                case 4:
                    (0, util_ts_1.assert)(response.type);
                    if (!!boundary) return [3, 6];
                    return [4, (0, util_ts_1.getBoundary)()];
                case 5:
                    boundary = _a.sent();
                    _a.label = 6;
                case 6:
                    response.headers.set("content-type", "multipart/byteranges; boundary=".concat(boundary));
                    multipartBody = new range_ts_1.MultiPartStream(body, response.type, ranges, size, boundary);
                    response.headers.set("content-length", String(multipartBody.contentLength()));
                    response.body = multipartBody;
                    _a.label = 7;
                case 7: return [2];
            }
        });
    });
}
function send(_a, path, options) {
    var _b;
    var request = _a.request, response = _a.response;
    if (options === void 0) { options = { root: "" }; }
    return __awaiter(this, void 0, void 0, function () {
        var _c, brotli, _d, contentTypes, extensions, _e, format, _f, gzip, _g, hidden, _h, immutable, index, _j, maxbuffer, _k, maxage, root, trailingSlash, encodingExt, _l, _m, _i, extensions_1, ext, stats, err_1, mtime, directives, entity, body, _o, _p, _q, ifModifiedSince, _r, _s, _t, _u;
        var _v, _w;
        return __generator(this, function (_x) {
            switch (_x.label) {
                case 0:
                    _c = options.brotli, brotli = _c === void 0 ? true : _c, _d = options.contentTypes, contentTypes = _d === void 0 ? {} : _d, extensions = options.extensions, _e = options.format, format = _e === void 0 ? true : _e, _f = options.gzip, gzip = _f === void 0 ? true : _f, _g = options.hidden, hidden = _g === void 0 ? false : _g, _h = options.immutable, immutable = _h === void 0 ? false : _h, index = options.index, _j = options.maxbuffer, maxbuffer = _j === void 0 ? MAXBUFFER_DEFAULT : _j, _k = options.maxage, maxage = _k === void 0 ? 0 : _k, root = options.root;
                    trailingSlash = path[path.length - 1] === "/";
                    path = (0, util_ts_1.decodeComponent)(path.substr((0, deps_ts_1.parse)(path).root.length));
                    if (index && trailingSlash) {
                        path += index;
                    }
                    if (!hidden && isHidden(path)) {
                        throw (0, httpError_ts_1.createHttpError)(403);
                    }
                    path = (0, util_ts_1.resolvePath)(root, path);
                    encodingExt = "";
                    _l = brotli &&
                        request.acceptsEncodings("br", "identity") === "br";
                    if (!_l) return [3, 2];
                    return [4, exists("".concat(path, ".br"))];
                case 1:
                    _l = (_x.sent());
                    _x.label = 2;
                case 2:
                    if (!_l) return [3, 3];
                    path = "".concat(path, ".br");
                    response.headers.set("Content-Encoding", "br");
                    response.headers["delete"]("Content-Length");
                    encodingExt = ".br";
                    return [3, 6];
                case 3:
                    _m = gzip &&
                        request.acceptsEncodings("gzip", "identity") === "gzip";
                    if (!_m) return [3, 5];
                    return [4, exists("".concat(path, ".gz"))];
                case 4:
                    _m = (_x.sent());
                    _x.label = 5;
                case 5:
                    if (_m) {
                        path = "".concat(path, ".gz");
                        response.headers.set("Content-Encoding", "gzip");
                        response.headers["delete"]("Content-Length");
                        encodingExt = ".gz";
                    }
                    _x.label = 6;
                case 6:
                    if (!(extensions && !/\.[^/]*$/.exec(path))) return [3, 10];
                    _i = 0, extensions_1 = extensions;
                    _x.label = 7;
                case 7:
                    if (!(_i < extensions_1.length)) return [3, 10];
                    ext = extensions_1[_i];
                    if (!/^\./.exec(ext)) {
                        ext = ".".concat(ext);
                    }
                    return [4, exists("".concat(path).concat(ext))];
                case 8:
                    if (_x.sent()) {
                        path += ext;
                        return [3, 10];
                    }
                    _x.label = 9;
                case 9:
                    _i++;
                    return [3, 7];
                case 10:
                    _x.trys.push([10, 15, , 16]);
                    return [4, Deno.stat(path)];
                case 11:
                    stats = _x.sent();
                    if (!stats.isDirectory) return [3, 14];
                    if (!(format && index)) return [3, 13];
                    path += "/".concat(index);
                    return [4, Deno.stat(path)];
                case 12:
                    stats = _x.sent();
                    return [3, 14];
                case 13: return [2];
                case 14: return [3, 16];
                case 15:
                    err_1 = _x.sent();
                    if (err_1 instanceof Deno.errors.NotFound) {
                        throw (0, httpError_ts_1.createHttpError)(404, err_1.message);
                    }
                    if (err_1 instanceof Error && err_1.message.startsWith("ENOENT:")) {
                        throw (0, httpError_ts_1.createHttpError)(404, err_1.message);
                    }
                    throw (0, httpError_ts_1.createHttpError)(500, err_1 instanceof Error ? err_1.message : "[non-error thrown]");
                case 16:
                    mtime = null;
                    if (response.headers.has("Last-Modified")) {
                        mtime = new Date(response.headers.get("Last-Modified")).getTime();
                    }
                    else if (stats.mtime) {
                        mtime = stats.mtime.getTime();
                        mtime -= mtime % 1000;
                        response.headers.set("Last-Modified", new Date(mtime).toUTCString());
                    }
                    if (!response.headers.has("Cache-Control")) {
                        directives = ["max-age=".concat((maxage / 1000) | 0)];
                        if (immutable) {
                            directives.push("immutable");
                        }
                        response.headers.set("Cache-Control", directives.join(","));
                    }
                    if (!response.type) {
                        response.type = encodingExt !== ""
                            ? (0, deps_ts_1.extname)((0, deps_ts_1.basename)(path, encodingExt))
                            : (_b = contentTypes[(0, deps_ts_1.extname)(path)]) !== null && _b !== void 0 ? _b : (0, deps_ts_1.extname)(path);
                    }
                    entity = null;
                    body = null;
                    if (!(request.headers.has("If-None-Match") && mtime)) return [3, 20];
                    return [4, getEntity(path, mtime, stats, maxbuffer, response)];
                case 17:
                    _v = _x.sent(), body = _v[0], entity = _v[1];
                    return [4, (0, etag_ts_1.ifNoneMatch)(request.headers.get("If-None-Match"), entity)];
                case 18:
                    if (!!(_x.sent())) return [3, 20];
                    _p = (_o = response.headers).set;
                    _q = ["ETag"];
                    return [4, (0, etag_ts_1.calculate)(entity)];
                case 19:
                    _p.apply(_o, _q.concat([_x.sent()]));
                    response.status = 304;
                    return [2, path];
                case 20:
                    if (request.headers.has("If-Modified-Since") && mtime) {
                        ifModifiedSince = new Date(request.headers.get("If-Modified-Since"));
                        if (ifModifiedSince.getTime() >= mtime) {
                            response.status = 304;
                            return [2, path];
                        }
                    }
                    if (!(!body || !entity)) return [3, 22];
                    return [4, getEntity(path, mtime !== null && mtime !== void 0 ? mtime : 0, stats, maxbuffer, response)];
                case 21:
                    _w = _x.sent(), body = _w[0], entity = _w[1];
                    _x.label = 22;
                case 22:
                    _r = request.headers.has("If-Range") && mtime;
                    if (!_r) return [3, 24];
                    return [4, (0, range_ts_1.ifRange)(request.headers.get("If-Range"), mtime, entity)];
                case 23:
                    _r = (_x.sent());
                    _x.label = 24;
                case 24:
                    if (!(_r &&
                        request.headers.has("Range"))) return [3, 26];
                    return [4, sendRange(response, body, request.headers.get("Range"), stats.size)];
                case 25:
                    _x.sent();
                    return [2, path];
                case 26:
                    if (!request.headers.has("Range")) return [3, 28];
                    return [4, sendRange(response, body, request.headers.get("Range"), stats.size)];
                case 27:
                    _x.sent();
                    return [2, path];
                case 28:
                    response.headers.set("Content-Length", String(stats.size));
                    response.body = body;
                    if (!!response.headers.has("ETag")) return [3, 30];
                    _t = (_s = response.headers).set;
                    _u = ["ETag"];
                    return [4, (0, etag_ts_1.calculate)(entity)];
                case 29:
                    _t.apply(_s, _u.concat([_x.sent()]));
                    _x.label = 30;
                case 30:
                    if (!response.headers.has("Accept-Ranges")) {
                        response.headers.set("Accept-Ranges", "bytes");
                    }
                    return [2, path];
            }
        });
    });
}
exports.send = send;
