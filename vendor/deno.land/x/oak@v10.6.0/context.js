"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
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
var _Context_socket, _Context_sse;
exports.__esModule = true;
exports.Context = void 0;
var cookies_ts_1 = require("./cookies.ts");
var httpError_ts_1 = require("./httpError.ts");
var request_ts_1 = require("./request.ts");
var response_ts_1 = require("./response.ts");
var send_ts_1 = require("./send.ts");
var server_sent_event_ts_1 = require("./server_sent_event.ts");
var Context = (function () {
    function Context(app, serverRequest, state, secure) {
        if (secure === void 0) { secure = false; }
        _Context_socket.set(this, void 0);
        _Context_sse.set(this, void 0);
        this.app = app;
        this.state = state;
        this.request = new request_ts_1.Request(serverRequest, app.proxy, secure);
        this.respond = true;
        this.response = new response_ts_1.Response(this.request);
        this.cookies = new cookies_ts_1.Cookies(this.request, this.response, {
            keys: this.app.keys,
            secure: this.request.secure
        });
    }
    Object.defineProperty(Context.prototype, "isUpgradable", {
        get: function () {
            var upgrade = this.request.headers.get("upgrade");
            if (!upgrade || upgrade.toLowerCase() !== "websocket") {
                return false;
            }
            var secKey = this.request.headers.get("sec-websocket-key");
            return typeof secKey === "string" && secKey != "";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "socket", {
        get: function () {
            return __classPrivateFieldGet(this, _Context_socket, "f");
        },
        enumerable: false,
        configurable: true
    });
    Context.prototype.assert = function (condition, errorStatus, message, props) {
        if (errorStatus === void 0) { errorStatus = 500; }
        if (condition) {
            return;
        }
        var err = (0, httpError_ts_1.createHttpError)(errorStatus, message);
        if (props) {
            Object.assign(err, props);
        }
        throw err;
    };
    Context.prototype.send = function (options) {
        var _a = options.path, path = _a === void 0 ? this.request.url.pathname : _a, sendOptions = __rest(options, ["path"]);
        return (0, send_ts_1.send)(this, path, sendOptions);
    };
    Context.prototype.sendEvents = function (options) {
        if (!__classPrivateFieldGet(this, _Context_sse, "f")) {
            __classPrivateFieldSet(this, _Context_sse, new server_sent_event_ts_1.SSEStreamTarget(this, options), "f");
        }
        return __classPrivateFieldGet(this, _Context_sse, "f");
    };
    Context.prototype["throw"] = function (errorStatus, message, props) {
        var err = (0, httpError_ts_1.createHttpError)(errorStatus, message);
        if (props) {
            Object.assign(err, props);
        }
        throw err;
    };
    Context.prototype.upgrade = function (options) {
        if (__classPrivateFieldGet(this, _Context_socket, "f")) {
            return __classPrivateFieldGet(this, _Context_socket, "f");
        }
        if (!this.request.originalRequest.upgrade) {
            throw new TypeError("Web socket upgrades not currently supported for this type of server.");
        }
        __classPrivateFieldSet(this, _Context_socket, this.request.originalRequest.upgrade(options), "f");
        this.respond = false;
        return __classPrivateFieldGet(this, _Context_socket, "f");
    };
    Context.prototype[(_Context_socket = new WeakMap(), _Context_sse = new WeakMap(), Symbol["for"]("Deno.customInspect"))] = function (inspect) {
        var _a = this, app = _a.app, cookies = _a.cookies, isUpgradable = _a.isUpgradable, respond = _a.respond, request = _a.request, response = _a.response, socket = _a.socket, state = _a.state;
        return "".concat(this.constructor.name, " ").concat(inspect({
            app: app,
            cookies: cookies,
            isUpgradable: isUpgradable,
            respond: respond,
            request: request,
            response: response,
            socket: socket,
            state: state
        }));
    };
    Context.prototype[Symbol["for"]("nodejs.util.inspect.custom")] = function (depth, options, inspect) {
        if (depth < 0) {
            return options.stylize("[".concat(this.constructor.name, "]"), "special");
        }
        var newOptions = Object.assign({}, options, {
            depth: options.depth === null ? null : options.depth - 1
        });
        var _a = this, app = _a.app, cookies = _a.cookies, isUpgradable = _a.isUpgradable, respond = _a.respond, request = _a.request, response = _a.response, socket = _a.socket, state = _a.state;
        return "".concat(options.stylize(this.constructor.name, "special"), " ").concat(inspect({
            app: app,
            cookies: cookies,
            isUpgradable: isUpgradable,
            respond: respond,
            request: request,
            response: response,
            socket: socket,
            state: state
        }, newOptions));
    };
    return Context;
}());
exports.Context = Context;
