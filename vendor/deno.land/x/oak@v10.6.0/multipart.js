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
var _FormDataReader_body, _FormDataReader_boundaryFinal, _FormDataReader_boundaryPart, _FormDataReader_reading;
exports.__esModule = true;
exports.FormDataReader = void 0;
var buf_reader_ts_1 = require("./buf_reader.ts");
var content_disposition_ts_1 = require("./content_disposition.ts");
var deps_ts_1 = require("./deps.ts");
var headers_ts_1 = require("./headers.ts");
var httpError_ts_1 = require("./httpError.ts");
var util_ts_1 = require("./util.ts");
var decoder = new TextDecoder();
var encoder = new TextEncoder();
var BOUNDARY_PARAM_REGEX = (0, headers_ts_1.toParamRegExp)("boundary", "i");
var DEFAULT_BUFFER_SIZE = 1048576;
var DEFAULT_MAX_FILE_SIZE = 10485760;
var DEFAULT_MAX_SIZE = 0;
var NAME_PARAM_REGEX = (0, headers_ts_1.toParamRegExp)("name", "i");
function append(a, b) {
    var ab = new Uint8Array(a.length + b.length);
    ab.set(a, 0);
    ab.set(b, a.length);
    return ab;
}
function isEqual(a, b) {
    return (0, deps_ts_1.equals)((0, util_ts_1.skipLWSPChar)(a), b);
}
function readToStartOrEnd(body, start, end) {
    return __awaiter(this, void 0, void 0, function () {
        var lineResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, body.readLine()];
                case 1:
                    if (!(lineResult = _a.sent())) return [3, 2];
                    if (isEqual(lineResult.bytes, start)) {
                        return [2, true];
                    }
                    if (isEqual(lineResult.bytes, end)) {
                        return [2, false];
                    }
                    return [3, 0];
                case 2: throw new httpError_ts_1.httpErrors.BadRequest("Unable to find multi-part boundary.");
            }
        });
    });
}
function parts(_a) {
    var body = _a.body, _b = _a.customContentTypes, customContentTypes = _b === void 0 ? {} : _b, final = _a.final, part = _a.part, maxFileSize = _a.maxFileSize, maxSize = _a.maxSize, outPath = _a.outPath, prefix = _a.prefix;
    return __asyncGenerator(this, arguments, function parts_1() {
        function getFile(contentType) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var ext, filename, _b, _c, file;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            ext = (_a = customContentTypes[contentType.toLowerCase()]) !== null && _a !== void 0 ? _a : (0, deps_ts_1.extension)(contentType);
                            if (!ext) {
                                throw new httpError_ts_1.httpErrors.BadRequest("The form contained content type \"".concat(contentType, "\" which is not supported by the server."));
                            }
                            if (!!outPath) return [3, 2];
                            return [4, Deno.makeTempDir()];
                        case 1:
                            outPath = _d.sent();
                            _d.label = 2;
                        case 2:
                            _c = (_b = "".concat(outPath, "/")).concat;
                            return [4, (0, util_ts_1.getRandomFilename)(prefix, ext)];
                        case 3:
                            filename = _c.apply(_b, [_d.sent()]);
                            return [4, Deno.open(filename, { write: true, createNew: true })];
                        case 4:
                            file = _d.sent();
                            return [2, [filename, file]];
                    }
                });
            });
        }
        var headers, contentType, contentDisposition, matches, name_1, originalName, byteLength, file, filename, buf, result, readResult, bytes, strippedBytes, bytesDiff, originalBytesSize, result, lines, readResult, bytes;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!true) return [3, 31];
                    return [4, __await((0, headers_ts_1.readHeaders)(body))];
                case 1:
                    headers = _c.sent();
                    contentType = headers["content-type"];
                    contentDisposition = headers["content-disposition"];
                    if (!contentDisposition) {
                        throw new httpError_ts_1.httpErrors.BadRequest("Form data part missing content-disposition header");
                    }
                    if (!contentDisposition.match(/^form-data;/i)) {
                        throw new httpError_ts_1.httpErrors.BadRequest("Unexpected content-disposition header: \"".concat(contentDisposition, "\""));
                    }
                    matches = NAME_PARAM_REGEX.exec(contentDisposition);
                    if (!matches) {
                        throw new httpError_ts_1.httpErrors.BadRequest("Unable to determine name of form body part");
                    }
                    name_1 = matches[1];
                    name_1 = (0, headers_ts_1.unquote)(name_1);
                    if (!contentType) return [3, 22];
                    originalName = (0, content_disposition_ts_1.getFilename)(contentDisposition);
                    byteLength = 0;
                    file = void 0;
                    filename = void 0;
                    buf = void 0;
                    if (!maxSize) return [3, 2];
                    buf = new Uint8Array();
                    return [3, 4];
                case 2: return [4, __await(getFile(contentType))];
                case 3:
                    result = _c.sent();
                    filename = result[0];
                    file = result[1];
                    _c.label = 4;
                case 4:
                    if (!true) return [3, 21];
                    return [4, __await(body.readLine(false))];
                case 5:
                    readResult = _c.sent();
                    if (!readResult) {
                        throw new httpError_ts_1.httpErrors.BadRequest("Unexpected EOF reached");
                    }
                    bytes = readResult.bytes;
                    strippedBytes = (0, util_ts_1.stripEol)(bytes);
                    if (!(isEqual(strippedBytes, part) || isEqual(strippedBytes, final))) return [3, 14];
                    if (!file) return [3, 9];
                    bytesDiff = bytes.length - strippedBytes.length;
                    if (!bytesDiff) return [3, 8];
                    return [4, __await(file.seek(-bytesDiff, Deno.SeekMode.Current))];
                case 6:
                    originalBytesSize = _c.sent();
                    return [4, __await(file.truncate(originalBytesSize))];
                case 7:
                    _c.sent();
                    _c.label = 8;
                case 8:
                    file.close();
                    _c.label = 9;
                case 9: return [4, __await([
                        name_1,
                        {
                            content: buf,
                            contentType: contentType,
                            name: name_1,
                            filename: filename,
                            originalName: originalName
                        },
                    ])];
                case 10: return [4, _c.sent()];
                case 11:
                    _c.sent();
                    if (!isEqual(strippedBytes, final)) return [3, 13];
                    return [4, __await(void 0)];
                case 12: return [2, _c.sent()];
                case 13: return [3, 21];
                case 14:
                    byteLength += bytes.byteLength;
                    if (byteLength > maxFileSize) {
                        if (file) {
                            file.close();
                        }
                        throw new httpError_ts_1.httpErrors.RequestEntityTooLarge("File size exceeds limit of ".concat(maxFileSize, " bytes."));
                    }
                    if (!buf) return [3, 18];
                    if (!(byteLength > maxSize)) return [3, 17];
                    return [4, __await(getFile(contentType))];
                case 15:
                    result = _c.sent();
                    filename = result[0];
                    file = result[1];
                    return [4, __await((0, deps_ts_1.writeAll)(file, buf))];
                case 16:
                    _c.sent();
                    buf = undefined;
                    return [3, 18];
                case 17:
                    buf = append(buf, bytes);
                    _c.label = 18;
                case 18:
                    if (!file) return [3, 20];
                    return [4, __await((0, deps_ts_1.writeAll)(file, bytes))];
                case 19:
                    _c.sent();
                    _c.label = 20;
                case 20: return [3, 4];
                case 21: return [3, 30];
                case 22:
                    lines = [];
                    _c.label = 23;
                case 23:
                    if (!true) return [3, 30];
                    return [4, __await(body.readLine())];
                case 24:
                    readResult = _c.sent();
                    if (!readResult) {
                        throw new httpError_ts_1.httpErrors.BadRequest("Unexpected EOF reached");
                    }
                    bytes = readResult.bytes;
                    if (!(isEqual(bytes, part) || isEqual(bytes, final))) return [3, 29];
                    return [4, __await([name_1, lines.join("\n")])];
                case 25: return [4, _c.sent()];
                case 26:
                    _c.sent();
                    if (!isEqual(bytes, final)) return [3, 28];
                    return [4, __await(void 0)];
                case 27: return [2, _c.sent()];
                case 28: return [3, 30];
                case 29:
                    lines.push(decoder.decode(bytes));
                    return [3, 23];
                case 30: return [3, 0];
                case 31: return [2];
            }
        });
    });
}
var FormDataReader = (function () {
    function FormDataReader(contentType, body) {
        _FormDataReader_body.set(this, void 0);
        _FormDataReader_boundaryFinal.set(this, void 0);
        _FormDataReader_boundaryPart.set(this, void 0);
        _FormDataReader_reading.set(this, false);
        var matches = contentType.match(BOUNDARY_PARAM_REGEX);
        if (!matches) {
            throw new httpError_ts_1.httpErrors.BadRequest("Content type \"".concat(contentType, "\" does not contain a valid boundary."));
        }
        var boundary = matches[1];
        boundary = (0, headers_ts_1.unquote)(boundary);
        __classPrivateFieldSet(this, _FormDataReader_boundaryPart, encoder.encode("--".concat(boundary)), "f");
        __classPrivateFieldSet(this, _FormDataReader_boundaryFinal, encoder.encode("--".concat(boundary, "--")), "f");
        __classPrivateFieldSet(this, _FormDataReader_body, body, "f");
    }
    FormDataReader.prototype.read = function (options) {
        var e_1, _a;
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var outPath, _b, maxFileSize, _c, maxSize, _d, bufferSize, customContentTypes, body, result, _e, _f, part, key, value, e_1_1, err_1;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (__classPrivateFieldGet(this, _FormDataReader_reading, "f")) {
                            throw new Error("Body is already being read.");
                        }
                        __classPrivateFieldSet(this, _FormDataReader_reading, true, "f");
                        outPath = options.outPath, _b = options.maxFileSize, maxFileSize = _b === void 0 ? DEFAULT_MAX_FILE_SIZE : _b, _c = options.maxSize, maxSize = _c === void 0 ? DEFAULT_MAX_SIZE : _c, _d = options.bufferSize, bufferSize = _d === void 0 ? DEFAULT_BUFFER_SIZE : _d, customContentTypes = options.customContentTypes;
                        body = new buf_reader_ts_1.BufReader(__classPrivateFieldGet(this, _FormDataReader_body, "f"), bufferSize);
                        result = { fields: {} };
                        return [4, readToStartOrEnd(body, __classPrivateFieldGet(this, _FormDataReader_boundaryPart, "f"), __classPrivateFieldGet(this, _FormDataReader_boundaryFinal, "f"))];
                    case 1:
                        if (!(_g.sent())) {
                            return [2, result];
                        }
                        _g.label = 2;
                    case 2:
                        _g.trys.push([2, 15, , 16]);
                        _g.label = 3;
                    case 3:
                        _g.trys.push([3, 8, 9, 14]);
                        _e = __asyncValues(parts({
                            body: body,
                            customContentTypes: customContentTypes,
                            part: __classPrivateFieldGet(this, _FormDataReader_boundaryPart, "f"),
                            final: __classPrivateFieldGet(this, _FormDataReader_boundaryFinal, "f"),
                            maxFileSize: maxFileSize,
                            maxSize: maxSize,
                            outPath: outPath
                        }));
                        _g.label = 4;
                    case 4: return [4, _e.next()];
                    case 5:
                        if (!(_f = _g.sent(), !_f.done)) return [3, 7];
                        part = _f.value;
                        key = part[0], value = part[1];
                        if (typeof value === "string") {
                            result.fields[key] = value;
                        }
                        else {
                            if (!result.files) {
                                result.files = [];
                            }
                            result.files.push(value);
                        }
                        _g.label = 6;
                    case 6: return [3, 4];
                    case 7: return [3, 14];
                    case 8:
                        e_1_1 = _g.sent();
                        e_1 = { error: e_1_1 };
                        return [3, 14];
                    case 9:
                        _g.trys.push([9, , 12, 13]);
                        if (!(_f && !_f.done && (_a = _e["return"]))) return [3, 11];
                        return [4, _a.call(_e)];
                    case 10:
                        _g.sent();
                        _g.label = 11;
                    case 11: return [3, 13];
                    case 12:
                        if (e_1) throw e_1.error;
                        return [7];
                    case 13: return [7];
                    case 14: return [3, 16];
                    case 15:
                        err_1 = _g.sent();
                        if (err_1 instanceof Deno.errors.PermissionDenied) {
                            console.error(err_1.stack ? err_1.stack : "".concat(err_1.name, ": ").concat(err_1.message));
                        }
                        else {
                            throw err_1;
                        }
                        return [3, 16];
                    case 16: return [2, result];
                }
            });
        });
    };
    FormDataReader.prototype.stream = function (options) {
        if (options === void 0) { options = {}; }
        return __asyncGenerator(this, arguments, function stream_1() {
            var outPath, customContentTypes, _a, maxFileSize, _b, maxSize, _c, bufferSize, body, _d, _e, part, e_2_1, err_2;
            var e_2, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (__classPrivateFieldGet(this, _FormDataReader_reading, "f")) {
                            throw new Error("Body is already being read.");
                        }
                        __classPrivateFieldSet(this, _FormDataReader_reading, true, "f");
                        outPath = options.outPath, customContentTypes = options.customContentTypes, _a = options.maxFileSize, maxFileSize = _a === void 0 ? DEFAULT_MAX_FILE_SIZE : _a, _b = options.maxSize, maxSize = _b === void 0 ? DEFAULT_MAX_SIZE : _b, _c = options.bufferSize, bufferSize = _c === void 0 ? 32000 : _c;
                        body = new buf_reader_ts_1.BufReader(__classPrivateFieldGet(this, _FormDataReader_body, "f"), bufferSize);
                        return [4, __await(readToStartOrEnd(body, __classPrivateFieldGet(this, _FormDataReader_boundaryPart, "f"), __classPrivateFieldGet(this, _FormDataReader_boundaryFinal, "f")))];
                    case 1:
                        if (!!(_g.sent())) return [3, 3];
                        return [4, __await(void 0)];
                    case 2: return [2, _g.sent()];
                    case 3:
                        _g.trys.push([3, 18, , 19]);
                        _g.label = 4;
                    case 4:
                        _g.trys.push([4, 11, 12, 17]);
                        _d = __asyncValues(parts({
                            body: body,
                            customContentTypes: customContentTypes,
                            part: __classPrivateFieldGet(this, _FormDataReader_boundaryPart, "f"),
                            final: __classPrivateFieldGet(this, _FormDataReader_boundaryFinal, "f"),
                            maxFileSize: maxFileSize,
                            maxSize: maxSize,
                            outPath: outPath
                        }));
                        _g.label = 5;
                    case 5: return [4, __await(_d.next())];
                    case 6:
                        if (!(_e = _g.sent(), !_e.done)) return [3, 10];
                        part = _e.value;
                        return [4, __await(part)];
                    case 7: return [4, _g.sent()];
                    case 8:
                        _g.sent();
                        _g.label = 9;
                    case 9: return [3, 5];
                    case 10: return [3, 17];
                    case 11:
                        e_2_1 = _g.sent();
                        e_2 = { error: e_2_1 };
                        return [3, 17];
                    case 12:
                        _g.trys.push([12, , 15, 16]);
                        if (!(_e && !_e.done && (_f = _d["return"]))) return [3, 14];
                        return [4, __await(_f.call(_d))];
                    case 13:
                        _g.sent();
                        _g.label = 14;
                    case 14: return [3, 16];
                    case 15:
                        if (e_2) throw e_2.error;
                        return [7];
                    case 16: return [7];
                    case 17: return [3, 19];
                    case 18:
                        err_2 = _g.sent();
                        if (err_2 instanceof Deno.errors.PermissionDenied) {
                            console.error(err_2.stack ? err_2.stack : "".concat(err_2.name, ": ").concat(err_2.message));
                        }
                        else {
                            throw err_2;
                        }
                        return [3, 19];
                    case 19: return [2];
                }
            });
        });
    };
    FormDataReader.prototype[(_FormDataReader_body = new WeakMap(), _FormDataReader_boundaryFinal = new WeakMap(), _FormDataReader_boundaryPart = new WeakMap(), _FormDataReader_reading = new WeakMap(), Symbol["for"]("Deno.customInspect"))] = function (inspect) {
        return "".concat(this.constructor.name, " ").concat(inspect({}));
    };
    FormDataReader.prototype[Symbol["for"]("nodejs.util.inspect.custom")] = function (depth, options, inspect) {
        if (depth < 0) {
            return options.stylize("[".concat(this.constructor.name, "]"), "special");
        }
        var newOptions = Object.assign({}, options, {
            depth: options.depth === null ? null : options.depth - 1
        });
        return "".concat(options.stylize(this.constructor.name, "special"), " ").concat(inspect({}, newOptions));
    };
    return FormDataReader;
}());
exports.FormDataReader = FormDataReader;
