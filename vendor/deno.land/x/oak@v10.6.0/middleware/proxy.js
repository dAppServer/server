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
exports.proxy = void 0;
var util_ts_1 = require("../util.ts");
var FORWARDED_RE = /^(,[ \\t]*)*([!#$%&'*+.^_`|~0-9A-Za-z-]+=([!#$%&'*+.^_`|~0-9A-Za-z-]+|\"([\\t \\x21\\x23-\\x5B\\x5D-\\x7E\\x80-\\xFF]|\\\\[\\t \\x21-\\x7E\\x80-\\xFF])*\"))?(;([!#$%&'*+.^_`|~0-9A-Za-z-]+=([!#$%&'*+.^_`|~0-9A-Za-z-]+|\"([\\t \\x21\\x23-\\x5B\\x5D-\\x7E\\x80-\\xFF]|\\\\[\\t \\x21-\\x7E\\x80-\\xFF])*\"))?)*([ \\t]*,([ \\t]*([!#$%&'*+.^_`|~0-9A-Za-z-]+=([!#$%&'*+.^_`|~0-9A-Za-z-]+|\"([\\t \\x21\\x23-\\x5B\\x5D-\\x7E\\x80-\\xFF]|\\\\[\\t \\x21-\\x7E\\x80-\\xFF])*\"))?(;([!#$%&'*+.^_`|~0-9A-Za-z-]+=([!#$%&'*+.^_`|~0-9A-Za-z-]+|\"([\\t \\x21\\x23-\\x5B\\x5D-\\x7E\\x80-\\xFF]|\\\\[\\t \\x21-\\x7E\\x80-\\xFF])*\"))?)*)?)*$/;
function createMatcher(_a) {
    var match = _a.match;
    return function matches(ctx) {
        if (!match) {
            return true;
        }
        if (typeof match === "string") {
            return ctx.request.url.pathname.startsWith(match);
        }
        if (match instanceof RegExp) {
            return match.test(ctx.request.url.pathname);
        }
        return match(ctx);
    };
}
function createRequest(target, ctx, _a) {
    var _b;
    var optHeaders = _a.headers, map = _a.map, _c = _a.proxyHeaders, proxyHeaders = _c === void 0 ? true : _c, reqFn = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var path, params, url, body, headers, _i, _d, _e, key, value, maybeForwarded, ip, host, value, init, request;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    path = ctx.request.url.pathname;
                    if ((0, util_ts_1.isRouterContext)(ctx)) {
                        params = ctx.params;
                    }
                    if (map && typeof map === "function") {
                        path = map(path, params);
                    }
                    else if (map) {
                        path = (_b = map[path]) !== null && _b !== void 0 ? _b : path;
                    }
                    url = new URL(String(target));
                    if (url.pathname.endsWith("/") && path.startsWith("/")) {
                        url.pathname = "".concat(url.pathname).concat(path.slice(1));
                    }
                    else if (!url.pathname.endsWith("/") && !path.startsWith("/")) {
                        url.pathname = "".concat(url.pathname, "/").concat(path);
                    }
                    else {
                        url.pathname = "".concat(url.pathname).concat(path);
                    }
                    url.search = ctx.request.url.search;
                    body = getBodyInit(ctx);
                    headers = new Headers(ctx.request.headers);
                    if (!optHeaders) return [3, 3];
                    if (!(typeof optHeaders === "function")) return [3, 2];
                    return [4, optHeaders(ctx)];
                case 1:
                    optHeaders = _f.sent();
                    _f.label = 2;
                case 2:
                    for (_i = 0, _d = iterableHeaders(optHeaders); _i < _d.length; _i++) {
                        _e = _d[_i], key = _e[0], value = _e[1];
                        headers.set(key, value);
                    }
                    _f.label = 3;
                case 3:
                    if (proxyHeaders) {
                        maybeForwarded = headers.get("forwarded");
                        ip = ctx.request.ip.startsWith("[")
                            ? "\"".concat(ctx.request.ip, "\"")
                            : ctx.request.ip;
                        host = headers.get("host");
                        if (maybeForwarded && FORWARDED_RE.test(maybeForwarded)) {
                            value = "for=".concat(ip);
                            if (host) {
                                value += ";host=".concat(host);
                            }
                            headers.append("forwarded", value);
                        }
                        else {
                            headers.append("x-forwarded-for", ip);
                            if (host) {
                                headers.append("x-forwarded-host", host);
                            }
                        }
                    }
                    init = {
                        body: body,
                        headers: headers,
                        method: ctx.request.method,
                        redirect: "follow"
                    };
                    request = new Request(url.toString(), init);
                    if (!reqFn) return [3, 5];
                    return [4, reqFn(request)];
                case 4:
                    request = _f.sent();
                    _f.label = 5;
                case 5: return [2, request];
            }
        });
    });
}
function getBodyInit(ctx) {
    if (!ctx.request.hasBody) {
        return null;
    }
    return ctx.request.body({ type: "stream" }).value;
}
function iterableHeaders(headers) {
    if (headers instanceof Headers) {
        return headers.entries();
    }
    else if (Array.isArray(headers)) {
        return headers.values();
    }
    else {
        return Object.entries(headers).values();
    }
}
function processResponse(response, ctx, _a) {
    var _b;
    var contentTypeFn = _a.contentType, resFn = _a.response;
    return __awaiter(this, void 0, void 0, function () {
        var _i, _c, _d, key, value, value;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (!resFn) return [3, 2];
                    return [4, resFn(response)];
                case 1:
                    response = _e.sent();
                    _e.label = 2;
                case 2:
                    if (response.body) {
                        ctx.response.body = response.body;
                    }
                    else {
                        ctx.response.body = null;
                    }
                    ctx.response.status = response.status;
                    for (_i = 0, _c = response.headers; _i < _c.length; _i++) {
                        _d = _c[_i], key = _d[0], value = _d[1];
                        ctx.response.headers.append(key, value);
                    }
                    if (!contentTypeFn) return [3, 4];
                    return [4, contentTypeFn(response.url, (_b = ctx.response.headers.get("content-type")) !== null && _b !== void 0 ? _b : undefined)];
                case 3:
                    value = _e.sent();
                    if (value != null) {
                        ctx.response.headers.set("content-type", value);
                    }
                    _e.label = 4;
                case 4: return [2];
            }
        });
    });
}
function proxy(target, options) {
    if (options === void 0) { options = {}; }
    var matches = createMatcher(options);
    return function proxy(ctx, next) {
        return __awaiter(this, void 0, void 0, function () {
            var request, _a, fetch, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!matches(ctx)) {
                            return [2, next()];
                        }
                        return [4, createRequest(target, ctx, options)];
                    case 1:
                        request = _b.sent();
                        _a = options.fetch, fetch = _a === void 0 ? globalThis.fetch : _a;
                        return [4, fetch(request)];
                    case 2:
                        response = _b.sent();
                        return [4, processResponse(response, ctx, options)];
                    case 3:
                        _b.sent();
                        return [2, next()];
                }
            });
        });
    };
}
exports.proxy = proxy;
