"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
var _Layer_opts, _Layer_paramNames, _Layer_regexp, _Router_instances, _Router_opts, _Router_methods, _Router_params, _Router_stack, _Router_match, _Router_register, _Router_addLayer, _Router_route, _Router_useVerb, _Router_clone;
exports.__esModule = true;
exports.Router = void 0;
var deps_ts_1 = require("./deps.ts");
var httpError_ts_1 = require("./httpError.ts");
var middleware_ts_1 = require("./middleware.ts");
var util_ts_1 = require("./util.ts");
function toUrl(url, params, options) {
    if (params === void 0) { params = {}; }
    var tokens = (0, deps_ts_1.pathParse)(url);
    var replace = {};
    if (tokens.some(function (token) { return typeof token === "object"; })) {
        replace = params;
    }
    else {
        options = params;
    }
    var toPath = (0, deps_ts_1.compile)(url, options);
    var replaced = toPath(replace);
    if (options && options.query) {
        var url_1 = new URL(replaced, "http://oak");
        if (typeof options.query === "string") {
            url_1.search = options.query;
        }
        else {
            url_1.search = String(options.query instanceof URLSearchParams
                ? options.query
                : new URLSearchParams(options.query));
        }
        return "".concat(url_1.pathname).concat(url_1.search).concat(url_1.hash);
    }
    return replaced;
}
var Layer = (function () {
    function Layer(path, methods, middleware, _a) {
        if (_a === void 0) { _a = {}; }
        var name = _a.name, opts = __rest(_a, ["name"]);
        _Layer_opts.set(this, void 0);
        _Layer_paramNames.set(this, []);
        _Layer_regexp.set(this, void 0);
        __classPrivateFieldSet(this, _Layer_opts, opts, "f");
        this.name = name;
        this.methods = __spreadArray([], methods, true);
        if (this.methods.includes("GET")) {
            this.methods.unshift("HEAD");
        }
        this.stack = Array.isArray(middleware) ? middleware.slice() : [middleware];
        this.path = path;
        __classPrivateFieldSet(this, _Layer_regexp, (0, deps_ts_1.pathToRegexp)(path, __classPrivateFieldGet(this, _Layer_paramNames, "f"), __classPrivateFieldGet(this, _Layer_opts, "f")), "f");
    }
    Layer.prototype.clone = function () {
        return new Layer(this.path, this.methods, this.stack, __assign({ name: this.name }, __classPrivateFieldGet(this, _Layer_opts, "f")));
    };
    Layer.prototype.match = function (path) {
        return __classPrivateFieldGet(this, _Layer_regexp, "f").test(path);
    };
    Layer.prototype.params = function (captures, existingParams) {
        if (existingParams === void 0) { existingParams = {}; }
        var params = existingParams;
        for (var i = 0; i < captures.length; i++) {
            if (__classPrivateFieldGet(this, _Layer_paramNames, "f")[i]) {
                var c = captures[i];
                params[__classPrivateFieldGet(this, _Layer_paramNames, "f")[i].name] = c ? (0, util_ts_1.decodeComponent)(c) : c;
            }
        }
        return params;
    };
    Layer.prototype.captures = function (path) {
        var _a, _b;
        if (__classPrivateFieldGet(this, _Layer_opts, "f").ignoreCaptures) {
            return [];
        }
        return (_b = (_a = path.match(__classPrivateFieldGet(this, _Layer_regexp, "f"))) === null || _a === void 0 ? void 0 : _a.slice(1)) !== null && _b !== void 0 ? _b : [];
    };
    Layer.prototype.url = function (params, options) {
        if (params === void 0) { params = {}; }
        var url = this.path.replace(/\(\.\*\)/g, "");
        return toUrl(url, params, options);
    };
    Layer.prototype.param = function (param, fn) {
        var stack = this.stack;
        var params = __classPrivateFieldGet(this, _Layer_paramNames, "f");
        var middleware = function (ctx, next) {
            var p = ctx.params[param];
            (0, util_ts_1.assert)(p);
            return fn.call(this, p, ctx, next);
        };
        middleware.param = param;
        var names = params.map(function (p) { return p.name; });
        var x = names.indexOf(param);
        if (x >= 0) {
            for (var i = 0; i < stack.length; i++) {
                var fn_1 = stack[i];
                if (!fn_1.param || names.indexOf(fn_1.param) > x) {
                    stack.splice(i, 0, middleware);
                    break;
                }
            }
        }
        return this;
    };
    Layer.prototype.setPrefix = function (prefix) {
        if (this.path) {
            this.path = this.path !== "/" || __classPrivateFieldGet(this, _Layer_opts, "f").strict === true
                ? "".concat(prefix).concat(this.path)
                : prefix;
            __classPrivateFieldSet(this, _Layer_paramNames, [], "f");
            __classPrivateFieldSet(this, _Layer_regexp, (0, deps_ts_1.pathToRegexp)(this.path, __classPrivateFieldGet(this, _Layer_paramNames, "f"), __classPrivateFieldGet(this, _Layer_opts, "f")), "f");
        }
        return this;
    };
    Layer.prototype.toJSON = function () {
        return {
            methods: __spreadArray([], this.methods, true),
            middleware: __spreadArray([], this.stack, true),
            paramNames: __classPrivateFieldGet(this, _Layer_paramNames, "f").map(function (key) { return key.name; }),
            path: this.path,
            regexp: __classPrivateFieldGet(this, _Layer_regexp, "f"),
            options: __assign({}, __classPrivateFieldGet(this, _Layer_opts, "f"))
        };
    };
    Layer.prototype[(_Layer_opts = new WeakMap(), _Layer_paramNames = new WeakMap(), _Layer_regexp = new WeakMap(), Symbol["for"]("Deno.customInspect"))] = function (inspect) {
        return "".concat(this.constructor.name, " ").concat(inspect({
            methods: this.methods,
            middleware: this.stack,
            options: __classPrivateFieldGet(this, _Layer_opts, "f"),
            paramNames: __classPrivateFieldGet(this, _Layer_paramNames, "f").map(function (key) { return key.name; }),
            path: this.path,
            regexp: __classPrivateFieldGet(this, _Layer_regexp, "f")
        }));
    };
    Layer.prototype[Symbol["for"]("nodejs.util.inspect.custom")] = function (depth, options, inspect) {
        if (depth < 0) {
            return options.stylize("[".concat(this.constructor.name, "]"), "special");
        }
        var newOptions = Object.assign({}, options, {
            depth: options.depth === null ? null : options.depth - 1
        });
        return "".concat(options.stylize(this.constructor.name, "special"), " ").concat(inspect({
            methods: this.methods,
            middleware: this.stack,
            options: __classPrivateFieldGet(this, _Layer_opts, "f"),
            paramNames: __classPrivateFieldGet(this, _Layer_paramNames, "f").map(function (key) { return key.name; }),
            path: this.path,
            regexp: __classPrivateFieldGet(this, _Layer_regexp, "f")
        }, newOptions));
    };
    return Layer;
}());
var Router = (function () {
    function Router(opts) {
        if (opts === void 0) { opts = {}; }
        var _a;
        _Router_instances.add(this);
        _Router_opts.set(this, void 0);
        _Router_methods.set(this, void 0);
        _Router_params.set(this, {});
        _Router_stack.set(this, []);
        __classPrivateFieldSet(this, _Router_opts, opts, "f");
        __classPrivateFieldSet(this, _Router_methods, (_a = opts.methods) !== null && _a !== void 0 ? _a : [
            "DELETE",
            "GET",
            "HEAD",
            "OPTIONS",
            "PATCH",
            "POST",
            "PUT",
        ], "f");
    }
    Router.prototype.all = function (nameOrPath, pathOrMiddleware) {
        var middleware = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            middleware[_i - 2] = arguments[_i];
        }
        __classPrivateFieldGet(this, _Router_instances, "m", _Router_useVerb).call(this, nameOrPath, pathOrMiddleware, middleware, ["DELETE", "GET", "POST", "PUT"]);
        return this;
    };
    Router.prototype.allowedMethods = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var implemented = __classPrivateFieldGet(this, _Router_methods, "f");
        var allowedMethods = function (context, next) { return __awaiter(_this, void 0, void 0, function () {
            var ctx, allowed, _i, _a, route, _b, _c, method, allowedStr;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        ctx = context;
                        return [4, next()];
                    case 1:
                        _d.sent();
                        if (!ctx.response.status || ctx.response.status === deps_ts_1.Status.NotFound) {
                            (0, util_ts_1.assert)(ctx.matched);
                            allowed = new Set();
                            for (_i = 0, _a = ctx.matched; _i < _a.length; _i++) {
                                route = _a[_i];
                                for (_b = 0, _c = route.methods; _b < _c.length; _b++) {
                                    method = _c[_b];
                                    allowed.add(method);
                                }
                            }
                            allowedStr = __spreadArray([], allowed, true).join(", ");
                            if (!implemented.includes(ctx.request.method)) {
                                if (options["throw"]) {
                                    throw options.notImplemented
                                        ? options.notImplemented()
                                        : new httpError_ts_1.httpErrors.NotImplemented();
                                }
                                else {
                                    ctx.response.status = deps_ts_1.Status.NotImplemented;
                                    ctx.response.headers.set("Allowed", allowedStr);
                                }
                            }
                            else if (allowed.size) {
                                if (ctx.request.method === "OPTIONS") {
                                    ctx.response.status = deps_ts_1.Status.OK;
                                    ctx.response.headers.set("Allowed", allowedStr);
                                }
                                else if (!allowed.has(ctx.request.method)) {
                                    if (options["throw"]) {
                                        throw options.methodNotAllowed
                                            ? options.methodNotAllowed()
                                            : new httpError_ts_1.httpErrors.MethodNotAllowed();
                                    }
                                    else {
                                        ctx.response.status = deps_ts_1.Status.MethodNotAllowed;
                                        ctx.response.headers.set("Allowed", allowedStr);
                                    }
                                }
                            }
                        }
                        return [2];
                }
            });
        }); };
        return allowedMethods;
    };
    Router.prototype["delete"] = function (nameOrPath, pathOrMiddleware) {
        var middleware = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            middleware[_i - 2] = arguments[_i];
        }
        __classPrivateFieldGet(this, _Router_instances, "m", _Router_useVerb).call(this, nameOrPath, pathOrMiddleware, middleware, ["DELETE"]);
        return this;
    };
    Router.prototype.entries = function () {
        var _i, _a, route, value;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _i = 0, _a = __classPrivateFieldGet(this, _Router_stack, "f");
                    _b.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3, 4];
                    route = _a[_i];
                    value = route.toJSON();
                    return [4, [value, value]];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3, 1];
                case 4: return [2];
            }
        });
    };
    Router.prototype.forEach = function (callback, thisArg) {
        if (thisArg === void 0) { thisArg = null; }
        for (var _i = 0, _a = __classPrivateFieldGet(this, _Router_stack, "f"); _i < _a.length; _i++) {
            var route = _a[_i];
            var value = route.toJSON();
            callback.call(thisArg, value, value, this);
        }
    };
    Router.prototype.get = function (nameOrPath, pathOrMiddleware) {
        var middleware = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            middleware[_i - 2] = arguments[_i];
        }
        __classPrivateFieldGet(this, _Router_instances, "m", _Router_useVerb).call(this, nameOrPath, pathOrMiddleware, middleware, ["GET"]);
        return this;
    };
    Router.prototype.head = function (nameOrPath, pathOrMiddleware) {
        var middleware = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            middleware[_i - 2] = arguments[_i];
        }
        __classPrivateFieldGet(this, _Router_instances, "m", _Router_useVerb).call(this, nameOrPath, pathOrMiddleware, middleware, ["HEAD"]);
        return this;
    };
    Router.prototype.keys = function () {
        var _i, _a, route;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _i = 0, _a = __classPrivateFieldGet(this, _Router_stack, "f");
                    _b.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3, 4];
                    route = _a[_i];
                    return [4, route.toJSON()];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3, 1];
                case 4: return [2];
            }
        });
    };
    Router.prototype.options = function (nameOrPath, pathOrMiddleware) {
        var middleware = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            middleware[_i - 2] = arguments[_i];
        }
        __classPrivateFieldGet(this, _Router_instances, "m", _Router_useVerb).call(this, nameOrPath, pathOrMiddleware, middleware, ["OPTIONS"]);
        return this;
    };
    Router.prototype.param = function (param, middleware) {
        __classPrivateFieldGet(this, _Router_params, "f")[param] = middleware;
        for (var _i = 0, _a = __classPrivateFieldGet(this, _Router_stack, "f"); _i < _a.length; _i++) {
            var route = _a[_i];
            route.param(param, middleware);
        }
        return this;
    };
    Router.prototype.patch = function (nameOrPath, pathOrMiddleware) {
        var middleware = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            middleware[_i - 2] = arguments[_i];
        }
        __classPrivateFieldGet(this, _Router_instances, "m", _Router_useVerb).call(this, nameOrPath, pathOrMiddleware, middleware, ["PATCH"]);
        return this;
    };
    Router.prototype.post = function (nameOrPath, pathOrMiddleware) {
        var middleware = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            middleware[_i - 2] = arguments[_i];
        }
        __classPrivateFieldGet(this, _Router_instances, "m", _Router_useVerb).call(this, nameOrPath, pathOrMiddleware, middleware, ["POST"]);
        return this;
    };
    Router.prototype.prefix = function (prefix) {
        prefix = prefix.replace(/\/$/, "");
        __classPrivateFieldGet(this, _Router_opts, "f").prefix = prefix;
        for (var _i = 0, _a = __classPrivateFieldGet(this, _Router_stack, "f"); _i < _a.length; _i++) {
            var route = _a[_i];
            route.setPrefix(prefix);
        }
        return this;
    };
    Router.prototype.put = function (nameOrPath, pathOrMiddleware) {
        var middleware = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            middleware[_i - 2] = arguments[_i];
        }
        __classPrivateFieldGet(this, _Router_instances, "m", _Router_useVerb).call(this, nameOrPath, pathOrMiddleware, middleware, ["PUT"]);
        return this;
    };
    Router.prototype.redirect = function (source, destination, status) {
        var _this = this;
        if (status === void 0) { status = deps_ts_1.Status.Found; }
        if (source[0] !== "/") {
            var s = this.url(source);
            if (!s) {
                throw new RangeError("Could not resolve named route: \"".concat(source, "\""));
            }
            source = s;
        }
        if (typeof destination === "string") {
            if (destination[0] !== "/") {
                var d = this.url(destination);
                if (!d) {
                    try {
                        var url = new URL(destination);
                        destination = url;
                    }
                    catch (_a) {
                        throw new RangeError("Could not resolve named route: \"".concat(source, "\""));
                    }
                }
                else {
                    destination = d;
                }
            }
        }
        this.all(source, function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, next()];
                    case 1:
                        _a.sent();
                        ctx.response.redirect(destination);
                        ctx.response.status = status;
                        return [2];
                }
            });
        }); });
        return this;
    };
    Router.prototype.routes = function () {
        var _this = this;
        var dispatch = function (context, next) {
            var _a;
            var _b, _c;
            var ctx = context;
            var pathname;
            var method;
            try {
                var _d = ctx.request, p = _d.url.pathname, m = _d.method;
                pathname = p;
                method = m;
            }
            catch (e) {
                return Promise.reject(e);
            }
            var path = (_c = (_b = __classPrivateFieldGet(_this, _Router_opts, "f").routerPath) !== null && _b !== void 0 ? _b : ctx.routerPath) !== null && _c !== void 0 ? _c : decodeURI(pathname);
            var matches = __classPrivateFieldGet(_this, _Router_instances, "m", _Router_match).call(_this, path, method);
            if (ctx.matched) {
                (_a = ctx.matched).push.apply(_a, matches.path);
            }
            else {
                ctx.matched = __spreadArray([], matches.path, true);
            }
            ctx.router = _this;
            if (!matches.route)
                return next();
            var matchedRoutes = matches.pathAndMethod;
            var chain = matchedRoutes.reduce(function (prev, route) { return __spreadArray(__spreadArray(__spreadArray([], prev, true), [
                function (ctx, next) {
                    ctx.captures = route.captures(path);
                    ctx.params = route.params(ctx.captures, ctx.params);
                    ctx.routeName = route.name;
                    return next();
                }
            ], false), route.stack, true); }, []);
            return (0, middleware_ts_1.compose)(chain)(ctx, next);
        };
        dispatch.router = this;
        return dispatch;
    };
    Router.prototype.url = function (name, params, options) {
        var route = __classPrivateFieldGet(this, _Router_instances, "m", _Router_route).call(this, name);
        if (route) {
            return route.url(params, options);
        }
    };
    Router.prototype.use = function (pathOrMiddleware) {
        var middleware = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            middleware[_i - 1] = arguments[_i];
        }
        var path;
        if (typeof pathOrMiddleware === "string" || Array.isArray(pathOrMiddleware)) {
            path = pathOrMiddleware;
        }
        else {
            middleware.unshift(pathOrMiddleware);
        }
        __classPrivateFieldGet(this, _Router_instances, "m", _Router_register).call(this, path !== null && path !== void 0 ? path : "(.*)", middleware, [], { end: false, ignoreCaptures: !path, ignorePrefix: !path });
        return this;
    };
    Router.prototype.values = function () {
        var _i, _a, route;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _i = 0, _a = __classPrivateFieldGet(this, _Router_stack, "f");
                    _b.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3, 4];
                    route = _a[_i];
                    return [4, route.toJSON()];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3, 1];
                case 4: return [2];
            }
        });
    };
    Router.prototype[(_Router_opts = new WeakMap(), _Router_methods = new WeakMap(), _Router_params = new WeakMap(), _Router_stack = new WeakMap(), _Router_instances = new WeakSet(), _Router_match = function _Router_match(path, method) {
        var matches = {
            path: [],
            pathAndMethod: [],
            route: false
        };
        for (var _i = 0, _a = __classPrivateFieldGet(this, _Router_stack, "f"); _i < _a.length; _i++) {
            var route = _a[_i];
            if (route.match(path)) {
                matches.path.push(route);
                if (route.methods.length === 0 || route.methods.includes(method)) {
                    matches.pathAndMethod.push(route);
                    if (route.methods.length) {
                        matches.route = true;
                    }
                }
            }
        }
        return matches;
    }, _Router_register = function _Router_register(path, middlewares, methods, options) {
        var _a;
        if (options === void 0) { options = {}; }
        if (Array.isArray(path)) {
            for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
                var p = path_1[_i];
                __classPrivateFieldGet(this, _Router_instances, "m", _Router_register).call(this, p, middlewares, methods, options);
            }
            return;
        }
        var layerMiddlewares = [];
        for (var _b = 0, middlewares_1 = middlewares; _b < middlewares_1.length; _b++) {
            var middleware = middlewares_1[_b];
            if (!middleware.router) {
                layerMiddlewares.push(middleware);
                continue;
            }
            if (layerMiddlewares.length) {
                __classPrivateFieldGet(this, _Router_instances, "m", _Router_addLayer).call(this, path, layerMiddlewares, methods, options);
                layerMiddlewares = [];
            }
            var router = __classPrivateFieldGet((_a = middleware.router), _Router_instances, "m", _Router_clone).call(_a);
            for (var _c = 0, _d = __classPrivateFieldGet(router, _Router_stack, "f"); _c < _d.length; _c++) {
                var layer = _d[_c];
                if (!options.ignorePrefix) {
                    layer.setPrefix(path);
                }
                if (__classPrivateFieldGet(this, _Router_opts, "f").prefix) {
                    layer.setPrefix(__classPrivateFieldGet(this, _Router_opts, "f").prefix);
                }
                __classPrivateFieldGet(this, _Router_stack, "f").push(layer);
            }
            for (var _e = 0, _f = Object.entries(__classPrivateFieldGet(this, _Router_params, "f")); _e < _f.length; _e++) {
                var _g = _f[_e], param = _g[0], mw = _g[1];
                router.param(param, mw);
            }
        }
        if (layerMiddlewares.length) {
            __classPrivateFieldGet(this, _Router_instances, "m", _Router_addLayer).call(this, path, layerMiddlewares, methods, options);
        }
    }, _Router_addLayer = function _Router_addLayer(path, middlewares, methods, options) {
        if (options === void 0) { options = {}; }
        var end = options.end, name = options.name, _a = options.sensitive, sensitive = _a === void 0 ? __classPrivateFieldGet(this, _Router_opts, "f").sensitive : _a, _b = options.strict, strict = _b === void 0 ? __classPrivateFieldGet(this, _Router_opts, "f").strict : _b, ignoreCaptures = options.ignoreCaptures;
        var route = new Layer(path, methods, middlewares, {
            end: end,
            name: name,
            sensitive: sensitive,
            strict: strict,
            ignoreCaptures: ignoreCaptures
        });
        if (__classPrivateFieldGet(this, _Router_opts, "f").prefix) {
            route.setPrefix(__classPrivateFieldGet(this, _Router_opts, "f").prefix);
        }
        for (var _i = 0, _c = Object.entries(__classPrivateFieldGet(this, _Router_params, "f")); _i < _c.length; _i++) {
            var _d = _c[_i], param = _d[0], mw = _d[1];
            route.param(param, mw);
        }
        __classPrivateFieldGet(this, _Router_stack, "f").push(route);
    }, _Router_route = function _Router_route(name) {
        for (var _i = 0, _a = __classPrivateFieldGet(this, _Router_stack, "f"); _i < _a.length; _i++) {
            var route = _a[_i];
            if (route.name === name) {
                return route;
            }
        }
    }, _Router_useVerb = function _Router_useVerb(nameOrPath, pathOrMiddleware, middleware, methods) {
        var name = undefined;
        var path;
        if (typeof pathOrMiddleware === "string") {
            name = nameOrPath;
            path = pathOrMiddleware;
        }
        else {
            path = nameOrPath;
            middleware.unshift(pathOrMiddleware);
        }
        __classPrivateFieldGet(this, _Router_instances, "m", _Router_register).call(this, path, middleware, methods, { name: name });
    }, _Router_clone = function _Router_clone() {
        var router = new Router(__classPrivateFieldGet(this, _Router_opts, "f"));
        __classPrivateFieldSet(router, _Router_methods, __classPrivateFieldGet(router, _Router_methods, "f").slice(), "f");
        __classPrivateFieldSet(router, _Router_params, __assign({}, __classPrivateFieldGet(this, _Router_params, "f")), "f");
        __classPrivateFieldSet(router, _Router_stack, __classPrivateFieldGet(this, _Router_stack, "f").map(function (layer) { return layer.clone(); }), "f");
        return router;
    }, Symbol.iterator)] = function () {
        var _i, _a, route;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _i = 0, _a = __classPrivateFieldGet(this, _Router_stack, "f");
                    _b.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3, 4];
                    route = _a[_i];
                    return [4, route.toJSON()];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3, 1];
                case 4: return [2];
            }
        });
    };
    Router.url = function (path, params, options) {
        return toUrl(path, params, options);
    };
    Router.prototype[Symbol["for"]("Deno.customInspect")] = function (inspect) {
        return "".concat(this.constructor.name, " ").concat(inspect({ "#params": __classPrivateFieldGet(this, _Router_params, "f"), "#stack": __classPrivateFieldGet(this, _Router_stack, "f") }));
    };
    Router.prototype[Symbol["for"]("nodejs.util.inspect.custom")] = function (depth, options, inspect) {
        if (depth < 0) {
            return options.stylize("[".concat(this.constructor.name, "]"), "special");
        }
        var newOptions = Object.assign({}, options, {
            depth: options.depth === null ? null : options.depth - 1
        });
        return "".concat(options.stylize(this.constructor.name, "special"), " ").concat(inspect({ "#params": __classPrivateFieldGet(this, _Router_params, "f"), "#stack": __classPrivateFieldGet(this, _Router_stack, "f") }, newOptions));
    };
    return Router;
}());
exports.Router = Router;
