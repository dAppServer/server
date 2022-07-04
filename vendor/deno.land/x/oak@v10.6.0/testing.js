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
exports.createMockNext = exports.createMockContext = exports.mockContextState = exports.createMockApp = void 0;
var httpError_ts_1 = require("./httpError.ts");
var cookies_ts_1 = require("./cookies.ts");
var response_ts_1 = require("./response.ts");
var mediaType_ts_1 = require("./negotiation/mediaType.ts");
function createMockApp(state) {
    var _a;
    if (state === void 0) { state = {}; }
    var app = (_a = {
            state: state,
            use: function () {
                return app;
            }
        },
        _a[Symbol["for"]("Deno.customInspect")] = function () {
            return "MockApplication {}";
        },
        _a[Symbol["for"]("nodejs.util.inspect.custom")] = function (depth, options, inspect) {
            if (depth < 0) {
                return options.stylize("[MockApplication]", "special");
            }
            var newOptions = Object.assign({}, options, {
                depth: options.depth === null ? null : options.depth - 1
            });
            return "".concat(options.stylize("MockApplication", "special"), " ").concat(inspect({}, newOptions));
        },
        _a);
    return app;
}
exports.createMockApp = createMockApp;
exports.mockContextState = {
    encodingsAccepted: "identity"
};
function createMockContext(_a) {
    var _b;
    var _c = _a === void 0 ? {} : _a, _d = _c.ip, ip = _d === void 0 ? "127.0.0.1" : _d, _e = _c.method, method = _e === void 0 ? "GET" : _e, params = _c.params, _f = _c.path, path = _f === void 0 ? "/" : _f, state = _c.state, _g = _c.app, app = _g === void 0 ? createMockApp(state) : _g, headers = _c.headers;
    function createMockRequest() {
        var headerMap = new Headers(headers);
        return {
            accepts: function () {
                var types = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    types[_i] = arguments[_i];
                }
                var acceptValue = headerMap.get("Accept");
                if (!acceptValue) {
                    return;
                }
                if (types.length) {
                    return (0, mediaType_ts_1.preferredMediaTypes)(acceptValue, types)[0];
                }
                return (0, mediaType_ts_1.preferredMediaTypes)(acceptValue);
            },
            acceptsEncodings: function () {
                return exports.mockContextState.encodingsAccepted;
            },
            headers: headerMap,
            ip: ip,
            method: method,
            path: path,
            search: undefined,
            searchParams: new URLSearchParams(),
            url: new URL(path, "http://localhost/")
        };
    }
    var request = createMockRequest();
    var response = new response_ts_1.Response(request);
    var cookies = new cookies_ts_1.Cookies(request, response);
    return _b = {
            app: app,
            params: params,
            request: request,
            cookies: cookies,
            response: response,
            state: Object.assign({}, app.state),
            assert: function (condition, errorStatus, message, props) {
                if (errorStatus === void 0) { errorStatus = 500; }
                if (condition) {
                    return;
                }
                var err = (0, httpError_ts_1.createHttpError)(errorStatus, message);
                if (props) {
                    Object.assign(err, props);
                }
                throw err;
            },
            "throw": function (errorStatus, message, props) {
                var err = (0, httpError_ts_1.createHttpError)(errorStatus, message);
                if (props) {
                    Object.assign(err, props);
                }
                throw err;
            }
        },
        _b[Symbol["for"]("Deno.customInspect")] = function () {
            return "MockContext {}";
        },
        _b[Symbol["for"]("nodejs.util.inspect.custom")] = function (depth, options, inspect) {
            if (depth < 0) {
                return options.stylize("[MockContext]", "special");
            }
            var newOptions = Object.assign({}, options, {
                depth: options.depth === null ? null : options.depth - 1
            });
            return "".concat(options.stylize("MockContext", "special"), " ").concat(inspect({}, newOptions));
        },
        _b;
}
exports.createMockContext = createMockContext;
function createMockNext() {
    return function next() {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2];
        }); });
    };
}
exports.createMockNext = createMockNext;
