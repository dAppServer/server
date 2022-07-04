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
exports.unquote = exports.readHeaders = exports.toParamRegExp = void 0;
var httpError_ts_1 = require("./httpError.ts");
var COLON = ":".charCodeAt(0);
var HTAB = "\t".charCodeAt(0);
var SPACE = " ".charCodeAt(0);
var decoder = new TextDecoder();
function toParamRegExp(attributePattern, flags) {
    return new RegExp("(?:^|;)\\s*".concat(attributePattern, "\\s*=\\s*") +
        "(" +
        "[^\";\\s][^;\\s]*" +
        "|" +
        "\"(?:[^\"\\\\]|\\\\\"?)+\"?" +
        ")", flags);
}
exports.toParamRegExp = toParamRegExp;
function readHeaders(body) {
    return __awaiter(this, void 0, void 0, function () {
        var headers, readResult, bytes, i, key, value;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    headers = {};
                    return [4, body.readLine()];
                case 1:
                    readResult = _a.sent();
                    _a.label = 2;
                case 2:
                    if (!readResult) return [3, 4];
                    bytes = readResult.bytes;
                    if (!bytes.length) {
                        return [2, headers];
                    }
                    i = bytes.indexOf(COLON);
                    if (i === -1) {
                        throw new httpError_ts_1.httpErrors.BadRequest("Malformed header: ".concat(decoder.decode(bytes)));
                    }
                    key = decoder.decode(bytes.subarray(0, i)).trim().toLowerCase();
                    if (key === "") {
                        throw new httpError_ts_1.httpErrors.BadRequest("Invalid header key.");
                    }
                    i++;
                    while (i < bytes.byteLength && (bytes[i] === SPACE || bytes[i] === HTAB)) {
                        i++;
                    }
                    value = decoder.decode(bytes.subarray(i)).trim();
                    headers[key] = value;
                    return [4, body.readLine()];
                case 3:
                    readResult = _a.sent();
                    return [3, 2];
                case 4: throw new httpError_ts_1.httpErrors.BadRequest("Unexpected end of body reached.");
            }
        });
    });
}
exports.readHeaders = readHeaders;
function unquote(value) {
    if (value.startsWith("\"")) {
        var parts = value.slice(1).split("\\\"");
        for (var i = 0; i < parts.length; ++i) {
            var quoteIndex = parts[i].indexOf("\"");
            if (quoteIndex !== -1) {
                parts[i] = parts[i].slice(0, quoteIndex);
                parts.length = i + 1;
            }
            parts[i] = parts[i].replace(/\\(.)/g, "$1");
        }
        value = parts.join("\"");
    }
    return value;
}
exports.unquote = unquote;
