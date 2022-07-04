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
exports.HttpClient = void 0;
var HttpClient = (function () {
    function HttpClient(conn) {
        this.conn = conn;
        this.buf = new Uint8Array(1);
        this.res = "";
    }
    HttpClient.prototype.readLine = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dec;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dec = new TextDecoder();
                        this.res = "";
                        this.buf = new Uint8Array(1);
                        _a.label = 1;
                    case 1:
                        if (!true) return [3, 3];
                        if (this.res.indexOf("\n") !== -1) {
                            return [2, this.res.slice(0, this.res.length - 2)];
                        }
                        return [4, this.conn.read(this.buf)];
                    case 2:
                        _a.sent();
                        this.res += dec.decode(this.buf);
                        return [3, 1];
                    case 3: return [2];
                }
            });
        });
    };
    HttpClient.prototype.readHead = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            var line;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.readLine()];
                    case 1:
                        line = _a.sent();
                        res.status = parseInt(line.split(" ")[1]);
                        return [2];
                }
            });
        });
    };
    HttpClient.prototype.readHeaders = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            var isEnd, line, _a, name_1, value;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        isEnd = false;
                        res.headers = {};
                        _b.label = 1;
                    case 1:
                        if (!!isEnd) return [3, 3];
                        return [4, this.readLine()];
                    case 2:
                        line = _b.sent();
                        if (line === "") {
                            isEnd = true;
                        }
                        else {
                            _a = line.split(":"), name_1 = _a[0], value = _a[1];
                            res.headers[name_1.trim()] = value.trim();
                        }
                        return [3, 1];
                    case 3: return [2];
                }
            });
        });
    };
    HttpClient.prototype.readBody = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            var dec, finished, body, headers, bufsize, _a, buf, arr, bufsize, buf, arr;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dec = new TextDecoder();
                        finished = false;
                        body = "";
                        headers = res.headers;
                        if (!(headers["Transfer-Encoding"] === "chunked")) return [3, 8];
                        _b.label = 1;
                    case 1:
                        if (!!finished) return [3, 7];
                        _a = parseInt;
                        return [4, this.readLine()];
                    case 2:
                        bufsize = _a.apply(void 0, [_b.sent(), 16]);
                        if (!(bufsize === 0)) return [3, 3];
                        finished = true;
                        return [3, 6];
                    case 3:
                        buf = new ArrayBuffer(bufsize);
                        arr = new Uint8Array(buf);
                        return [4, this.read(arr)];
                    case 4:
                        _b.sent();
                        body += dec.decode(arr);
                        return [4, this.readLine()];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6: return [3, 1];
                    case 7: return [3, 10];
                    case 8:
                        bufsize = parseInt(res === null || res === void 0 ? void 0 : res.headers["Content-Length"], 10);
                        buf = new ArrayBuffer(bufsize);
                        arr = new Uint8Array(buf);
                        return [4, this.read(arr)];
                    case 9:
                        _b.sent();
                        body += dec.decode(arr);
                        _b.label = 10;
                    case 10:
                        res.body = body;
                        return [2];
                }
            });
        });
    };
    HttpClient.prototype.read = function (buf) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.conn.read(buf)];
            });
        });
    };
    HttpClient.prototype.send = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var enc;
            return __generator(this, function (_a) {
                enc = new TextEncoder();
                return [2, this.conn.write(enc.encode(data))];
            });
        });
    };
    HttpClient.prototype.buildQueryString = function (query) {
        return query.map(function (v) { return "".concat(v.name, "=").concat(v.value); }).join("&");
    };
    HttpClient.prototype.buildHeaders = function (headers) {
        return Object.keys(headers).map(function (v) { return "".concat(v, ": ").concat(headers[v]); }).join("\r\n");
    };
    HttpClient.prototype.sendRequest = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var head, headers, reqString, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        head = "".concat(request.method, " ").concat(request.path, "?").concat(this.buildQueryString(request.query), " HTTP/1.1\r\n");
                        if (request.body.length > 0) {
                            request.headers["Content-length"] = request.body.length.toString();
                            request.headers["Content-type"] = "application/json";
                        }
                        headers = this.buildHeaders(request.headers);
                        reqString = head + headers + "\r\n\r\n" + request.body;
                        return [4, this.send(reqString)];
                    case 1:
                        _a.sent();
                        response = {};
                        return [4, this.readHead(response)];
                    case 2:
                        _a.sent();
                        return [4, this.readHeaders(response)];
                    case 3:
                        _a.sent();
                        return [4, this.readBody(response)];
                    case 4:
                        _a.sent();
                        return [4, this.conn.close()];
                    case 5:
                        _a.sent();
                        return [2, response];
                }
            });
        });
    };
    return HttpClient;
}());
exports.HttpClient = HttpClient;
