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
var _Application_instances, _Application_composedMiddleware, _Application_contextState, _Application_keys, _Application_middleware, _Application_serverConstructor, _Application_getComposed, _Application_getContextState, _Application_handleError, _Application_handleRequest;
exports.__esModule = true;
exports.Application = exports.ApplicationListenEvent = exports.ApplicationErrorEvent = void 0;
var context_ts_1 = require("./context.ts");
var deps_ts_1 = require("./deps.ts");
var http_server_native_ts_1 = require("./http_server_native.ts");
var http_server_native_request_ts_1 = require("./http_server_native_request.ts");
var keyStack_ts_1 = require("./keyStack.ts");
var middleware_ts_1 = require("./middleware.ts");
var structured_clone_ts_1 = require("./structured_clone.ts");
var util_ts_1 = require("./util.ts");
var ADDR_REGEXP = /^\[?([^\]]*)\]?:([0-9]{1,5})$/;
var DEFAULT_SERVER = http_server_native_ts_1.HttpServer;
var ApplicationErrorEvent = (function (_super) {
    __extends(ApplicationErrorEvent, _super);
    function ApplicationErrorEvent(eventInitDict) {
        var _this = _super.call(this, "error", eventInitDict) || this;
        _this.context = eventInitDict.context;
        return _this;
    }
    return ApplicationErrorEvent;
}(ErrorEvent));
exports.ApplicationErrorEvent = ApplicationErrorEvent;
function logErrorListener(_a) {
    var error = _a.error, context = _a.context;
    if (error instanceof Error) {
        console.error("[uncaught application error]: ".concat(error.name, " - ").concat(error.message));
    }
    else {
        console.error("[uncaught application error]\n", error);
    }
    if (context) {
        var url = void 0;
        try {
            url = context.request.url.toString();
        }
        catch (_b) {
            url = "[malformed url]";
        }
        console.error("\nrequest:", {
            url: url,
            method: context.request.method,
            hasBody: context.request.hasBody
        });
        console.error("response:", {
            status: context.response.status,
            type: context.response.type,
            hasBody: !!context.response.body,
            writable: context.response.writable
        });
    }
    if (error instanceof Error && error.stack) {
        console.error("\n".concat(error.stack.split("\n").slice(1).join("\n")));
    }
}
var ApplicationListenEvent = (function (_super) {
    __extends(ApplicationListenEvent, _super);
    function ApplicationListenEvent(eventInitDict) {
        var _this = _super.call(this, "listen", eventInitDict) || this;
        _this.hostname = eventInitDict.hostname;
        _this.listener = eventInitDict.listener;
        _this.port = eventInitDict.port;
        _this.secure = eventInitDict.secure;
        _this.serverType = eventInitDict.serverType;
        return _this;
    }
    return ApplicationListenEvent;
}(Event));
exports.ApplicationListenEvent = ApplicationListenEvent;
var Application = (function (_super) {
    __extends(Application, _super);
    function Application(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _Application_instances.add(_this);
        _Application_composedMiddleware.set(_this, void 0);
        _Application_contextState.set(_this, void 0);
        _Application_keys.set(_this, void 0);
        _Application_middleware.set(_this, []);
        _Application_serverConstructor.set(_this, void 0);
        _this.handle = (function (request, secureOrConn, secure) {
            if (secure === void 0) { secure = false; }
            return __awaiter(_this, void 0, void 0, function () {
                var contextRequest, context, err_1, response, err_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!__classPrivateFieldGet(this, _Application_middleware, "f").length) {
                                throw new TypeError("There is no middleware to process requests.");
                            }
                            (0, util_ts_1.assert)((0, util_ts_1.isConn)(secureOrConn) || typeof secureOrConn === "undefined");
                            contextRequest = new http_server_native_request_ts_1.NativeRequest({
                                request: request,
                                respondWith: function () {
                                    return Promise.resolve(undefined);
                                }
                            }, { conn: secureOrConn });
                            context = new context_ts_1.Context(this, contextRequest, __classPrivateFieldGet(this, _Application_instances, "m", _Application_getContextState).call(this), secure);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4, __classPrivateFieldGet(this, _Application_instances, "m", _Application_getComposed).call(this)(context)];
                        case 2:
                            _a.sent();
                            return [3, 4];
                        case 3:
                            err_1 = _a.sent();
                            __classPrivateFieldGet(this, _Application_instances, "m", _Application_handleError).call(this, context, err_1);
                            return [3, 4];
                        case 4:
                            if (context.respond === false) {
                                context.response.destroy();
                                return [2];
                            }
                            _a.label = 5;
                        case 5:
                            _a.trys.push([5, 7, , 8]);
                            return [4, context.response.toDomResponse()];
                        case 6:
                            response = _a.sent();
                            context.response.destroy(false);
                            return [2, response];
                        case 7:
                            err_2 = _a.sent();
                            __classPrivateFieldGet(this, _Application_instances, "m", _Application_handleError).call(this, context, err_2);
                            throw err_2;
                        case 8: return [2];
                    }
                });
            });
        });
        var state = options.state, keys = options.keys, proxy = options.proxy, _a = options.serverConstructor, serverConstructor = _a === void 0 ? DEFAULT_SERVER : _a, _b = options.contextState, contextState = _b === void 0 ? "clone" : _b, _c = options.logErrors, logErrors = _c === void 0 ? true : _c;
        _this.proxy = proxy !== null && proxy !== void 0 ? proxy : false;
        _this.keys = keys;
        _this.state = state !== null && state !== void 0 ? state : {};
        __classPrivateFieldSet(_this, _Application_serverConstructor, serverConstructor, "f");
        __classPrivateFieldSet(_this, _Application_contextState, contextState, "f");
        if (logErrors) {
            _this.addEventListener("error", logErrorListener);
        }
        return _this;
    }
    Object.defineProperty(Application.prototype, "keys", {
        get: function () {
            return __classPrivateFieldGet(this, _Application_keys, "f");
        },
        set: function (keys) {
            if (!keys) {
                __classPrivateFieldSet(this, _Application_keys, undefined, "f");
                return;
            }
            else if (Array.isArray(keys)) {
                __classPrivateFieldSet(this, _Application_keys, new keyStack_ts_1.KeyStack(keys), "f");
            }
            else {
                __classPrivateFieldSet(this, _Application_keys, keys, "f");
            }
        },
        enumerable: false,
        configurable: true
    });
    Application.prototype.addEventListener = function (type, listener, options) {
        _super.prototype.addEventListener.call(this, type, listener, options);
    };
    Application.prototype.listen = function (options) {
        var e_1, _a;
        if (options === void 0) { options = { port: 0 }; }
        return __awaiter(this, void 0, void 0, function () {
            var match, hostname_1, portStr, server, signal, state, _b, secure, serverType, listener, _c, hostname, port, server_1, server_1_1, request, e_1_1, error_1, message;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!__classPrivateFieldGet(this, _Application_middleware, "f").length) {
                            throw new TypeError("There is no middleware to process requests.");
                        }
                        if (typeof options === "string") {
                            match = ADDR_REGEXP.exec(options);
                            if (!match) {
                                throw TypeError("Invalid address passed: \"".concat(options, "\""));
                            }
                            hostname_1 = match[1], portStr = match[2];
                            options = { hostname: hostname_1, port: parseInt(portStr, 10) };
                        }
                        options = Object.assign({ port: 0 }, options);
                        server = new (__classPrivateFieldGet(this, _Application_serverConstructor, "f"))(this, options);
                        signal = options.signal;
                        state = {
                            closed: false,
                            closing: false,
                            handling: new Set(),
                            server: server
                        };
                        if (signal) {
                            signal.addEventListener("abort", function () {
                                if (!state.handling.size) {
                                    server.close();
                                    state.closed = true;
                                }
                                state.closing = true;
                            });
                        }
                        _b = options.secure, secure = _b === void 0 ? false : _b;
                        serverType = server instanceof http_server_native_ts_1.HttpServer ? "native" : "custom";
                        listener = server.listen();
                        _c = listener.addr, hostname = _c.hostname, port = _c.port;
                        this.dispatchEvent(new ApplicationListenEvent({
                            hostname: hostname,
                            listener: listener,
                            port: port,
                            secure: secure,
                            serverType: serverType
                        }));
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 15, , 16]);
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 7, 8, 13]);
                        server_1 = __asyncValues(server);
                        _d.label = 3;
                    case 3: return [4, server_1.next()];
                    case 4:
                        if (!(server_1_1 = _d.sent(), !server_1_1.done)) return [3, 6];
                        request = server_1_1.value;
                        __classPrivateFieldGet(this, _Application_instances, "m", _Application_handleRequest).call(this, request, secure, state);
                        _d.label = 5;
                    case 5: return [3, 3];
                    case 6: return [3, 13];
                    case 7:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3, 13];
                    case 8:
                        _d.trys.push([8, , 11, 12]);
                        if (!(server_1_1 && !server_1_1.done && (_a = server_1["return"]))) return [3, 10];
                        return [4, _a.call(server_1)];
                    case 9:
                        _d.sent();
                        _d.label = 10;
                    case 10: return [3, 12];
                    case 11:
                        if (e_1) throw e_1.error;
                        return [7];
                    case 12: return [7];
                    case 13: return [4, Promise.all(state.handling)];
                    case 14:
                        _d.sent();
                        return [3, 16];
                    case 15:
                        error_1 = _d.sent();
                        message = error_1 instanceof Error
                            ? error_1.message
                            : "Application Error";
                        this.dispatchEvent(new ApplicationErrorEvent({ message: message, error: error_1 }));
                        return [3, 16];
                    case 16: return [2];
                }
            });
        });
    };
    Application.prototype.use = function () {
        var _a;
        var middleware = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            middleware[_i] = arguments[_i];
        }
        (_a = __classPrivateFieldGet(this, _Application_middleware, "f")).push.apply(_a, middleware);
        __classPrivateFieldSet(this, _Application_composedMiddleware, undefined, "f");
        return this;
    };
    Application.prototype[(_Application_composedMiddleware = new WeakMap(), _Application_contextState = new WeakMap(), _Application_keys = new WeakMap(), _Application_middleware = new WeakMap(), _Application_serverConstructor = new WeakMap(), _Application_instances = new WeakSet(), _Application_getComposed = function _Application_getComposed() {
        if (!__classPrivateFieldGet(this, _Application_composedMiddleware, "f")) {
            __classPrivateFieldSet(this, _Application_composedMiddleware, (0, middleware_ts_1.compose)(__classPrivateFieldGet(this, _Application_middleware, "f")), "f");
        }
        return __classPrivateFieldGet(this, _Application_composedMiddleware, "f");
    }, _Application_getContextState = function _Application_getContextState() {
        switch (__classPrivateFieldGet(this, _Application_contextState, "f")) {
            case "alias":
                return this.state;
            case "clone":
                return (0, structured_clone_ts_1.cloneState)(this.state);
            case "empty":
                return {};
            case "prototype":
                return Object.create(this.state);
        }
    }, _Application_handleError = function _Application_handleError(context, error) {
        if (!(error instanceof Error)) {
            error = new Error("non-error thrown: ".concat(JSON.stringify(error)));
        }
        var message = error.message;
        this.dispatchEvent(new ApplicationErrorEvent({ context: context, message: message, error: error }));
        if (!context.response.writable) {
            return;
        }
        for (var _i = 0, _a = __spreadArray([], context.response.headers.keys(), true); _i < _a.length; _i++) {
            var key = _a[_i];
            context.response.headers["delete"](key);
        }
        if (error.headers && error.headers instanceof Headers) {
            for (var _b = 0, _c = error.headers; _b < _c.length; _b++) {
                var _d = _c[_b], key = _d[0], value = _d[1];
                context.response.headers.set(key, value);
            }
        }
        context.response.type = "text";
        var status = context.response.status =
            Deno.errors && error instanceof Deno.errors.NotFound
                ? 404
                : error.status && typeof error.status === "number"
                    ? error.status
                    : 500;
        context.response.body = error.expose
            ? error.message
            : deps_ts_1.STATUS_TEXT.get(status);
    }, _Application_handleRequest = function _Application_handleRequest(request, secure, state) {
        var context = new context_ts_1.Context(this, request, __classPrivateFieldGet(this, _Application_instances, "m", _Application_getContextState).call(this), secure);
        var resolve;
        var handlingPromise = new Promise(function (res) { return resolve = res; });
        state.handling.add(handlingPromise);
        if (!state.closing && !state.closed) {
            try {
                await __classPrivateFieldGet(this, _Application_instances, "m", _Application_getComposed).call(this)(context);
            }
            catch (err) {
                __classPrivateFieldGet(this, _Application_instances, "m", _Application_handleError).call(this, context, err);
            }
        }
        if (context.respond === false) {
            context.response.destroy();
            resolve();
            state.handling["delete"](handlingPromise);
            return;
        }
        var closeResources = true;
        var response;
        try {
            closeResources = false;
            response = await context.response.toDomResponse();
        }
        catch (err) {
            __classPrivateFieldGet(this, _Application_instances, "m", _Application_handleError).call(this, context, err);
            response = await context.response.toDomResponse();
        }
        (0, util_ts_1.assert)(response);
        try {
            await request.respond(response);
        }
        catch (err) {
            __classPrivateFieldGet(this, _Application_instances, "m", _Application_handleError).call(this, context, err);
        }
        finally {
            context.response.destroy(closeResources);
            resolve();
            state.handling["delete"](handlingPromise);
            if (state.closing) {
                state.server.close();
                state.closed = true;
            }
        }
    }, Symbol["for"]("Deno.customInspect"))] = function (inspect) {
        var _a = this, keys = _a.keys, proxy = _a.proxy, state = _a.state;
        return "".concat(this.constructor.name, " ").concat(inspect({ "#middleware": __classPrivateFieldGet(this, _Application_middleware, "f"), keys: keys, proxy: proxy, state: state }));
    };
    Application.prototype[Symbol["for"]("nodejs.util.inspect.custom")] = function (depth, options, inspect) {
        if (depth < 0) {
            return options.stylize("[".concat(this.constructor.name, "]"), "special");
        }
        var newOptions = Object.assign({}, options, {
            depth: options.depth === null ? null : options.depth - 1
        });
        var _a = this, keys = _a.keys, proxy = _a.proxy, state = _a.state;
        return "".concat(options.stylize(this.constructor.name, "special"), " ").concat(inspect({ "#middleware": __classPrivateFieldGet(this, _Application_middleware, "f"), keys: keys, proxy: proxy, state: state }, newOptions));
    };
    return Application;
}(EventTarget));
exports.Application = Application;
