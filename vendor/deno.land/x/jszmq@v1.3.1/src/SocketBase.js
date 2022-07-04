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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _SocketBase_endpoints, _SocketBase_binds;
exports.__esModule = true;
exports.SocketBase = void 0;
var events_ts_1 = require("https://deno.land/std@0.108.0/node/events.ts");
var SocketOptions_ts_1 = require("./SocketOptions.ts");
var lodash_1 = require("https://cdn.skypack.dev/lodash");
var WebSocketListener_ts_1 = require("./WebSocketListener.ts");
var WebSocketEndpoint_ts_1 = require("./WebSocketEndpoint.ts");
var SocketBase = (function (_super) {
    __extends(SocketBase, _super);
    function SocketBase() {
        var _this = _super.call(this) || this;
        _SocketBase_endpoints.set(_this, []);
        _SocketBase_binds.set(_this, []);
        _this.options = new SocketOptions_ts_1.SocketOptions();
        _this.bindAttachEndpoint = _this.bindAttachEndpoint.bind(_this);
        _this.bindEndpointTerminated = _this.bindEndpointTerminated.bind(_this);
        _this.attachEndpoint = _this.attachEndpoint.bind(_this);
        _this.endpointTerminated = _this.endpointTerminated.bind(_this);
        _this.xrecv = _this.xrecv.bind(_this);
        _this.hiccuped = _this.hiccuped.bind(_this);
        return _this;
    }
    SocketBase.prototype.connect = function (address) {
        if (address.startsWith("ws://") || address.startsWith("wss://")) {
            var endpoint = new WebSocketEndpoint_ts_1.WebSocketEndpoint(address, this.options, {});
            endpoint.on("attach", this.attachEndpoint);
            endpoint.on("terminated", this.endpointTerminated);
            endpoint.on("message", this.xrecv);
            endpoint.on("hiccuped", this.hiccuped);
            __classPrivateFieldGet(this, _SocketBase_endpoints, "f").push(endpoint);
            if (!this.options.immediate) {
                this.attachEndpoint(endpoint);
            }
        }
        else {
            throw new Error("unsupported transport");
        }
    };
    SocketBase.prototype.disconnect = function (address) {
        var endpoint = (0, lodash_1.find)(__classPrivateFieldGet(this, _SocketBase_endpoints, "f"), function (e) { return e.address === address; });
        if (endpoint) {
            endpoint.removeListener("attach", this.attachEndpoint);
            endpoint.removeListener("terminated", this.endpointTerminated);
            endpoint.removeListener("message", this.xrecv);
            endpoint.removeListener("hiccuped", this.hiccuped);
            endpoint.close();
            (0, lodash_1.pull)(__classPrivateFieldGet(this, _SocketBase_endpoints, "f"), endpoint);
            this.endpointTerminated(endpoint);
        }
    };
    SocketBase.prototype.bind = function (server, address) {
        if (address === void 0) { address = server.address; }
        var listener = new WebSocketListener_ts_1.WebSocketListener(address, server, this.options);
        listener.on("attach", this.bindAttachEndpoint);
        __classPrivateFieldGet(this, _SocketBase_binds, "f").push(listener);
    };
    SocketBase.prototype.unbind = function (address) {
        var listener = (0, lodash_1.find)(__classPrivateFieldGet(this, _SocketBase_binds, "f"), function (b) { return b.address === address; });
        if (listener) {
            listener.removeListener("attach", this.attachEndpoint);
            listener.close();
            (0, lodash_1.pull)(__classPrivateFieldGet(this, _SocketBase_binds, "f"), listener);
        }
    };
    SocketBase.prototype.close = function () {
        var _this = this;
        __classPrivateFieldGet(this, _SocketBase_binds, "f").forEach(function (listener) {
            listener.removeListener("attach", _this.attachEndpoint);
            listener.close();
        });
        __classPrivateFieldSet(this, _SocketBase_binds, [], "f");
        __classPrivateFieldGet(this, _SocketBase_endpoints, "f").forEach(function (endpoint) {
            endpoint.removeListener("attach", _this.attachEndpoint);
            endpoint.removeListener("terminated", _this.endpointTerminated);
            endpoint.removeListener("message", _this.xrecv);
            endpoint.removeListener("hiccuped", _this.hiccuped);
            endpoint.close();
            (0, lodash_1.pull)(__classPrivateFieldGet(_this, _SocketBase_endpoints, "f"), endpoint);
            _this.endpointTerminated(endpoint);
        });
    };
    SocketBase.prototype.emit = function (eventName, endpoint) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return _super.prototype.emit.apply(this, __spreadArray([eventName, endpoint], args, false));
    };
    SocketBase.prototype.subscribe = function (_topic) {
        throw new Error("not supported");
    };
    SocketBase.prototype.unsubscribe = function (_topic) {
        throw new Error("not supported");
    };
    SocketBase.prototype.bindAttachEndpoint = function (endpoint) {
        endpoint.on("terminated", this.bindEndpointTerminated);
        endpoint.on("message", this.xrecv);
        this.attachEndpoint(endpoint);
    };
    SocketBase.prototype.bindEndpointTerminated = function (endpoint) {
        endpoint.removeListener("terminated", this.bindEndpointTerminated);
        endpoint.removeListener("message", this.xrecv);
        this.endpointTerminated(endpoint);
    };
    SocketBase.prototype.attachEndpoint = function (_endpoint) { };
    SocketBase.prototype.endpointTerminated = function (_endpoint) { };
    SocketBase.prototype.hiccuped = function (_endpoint) { };
    SocketBase.prototype.xrecv = function (_endpoint) {
        var _frames = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            _frames[_i - 1] = arguments[_i];
        }
    };
    SocketBase.prototype.xsend = function (_msg) { };
    SocketBase.prototype.send = function (msg) {
        if (Array.isArray(msg)) {
            this.xsend(msg);
        }
        else {
            this.xsend([msg]);
        }
    };
    return SocketBase;
}(events_ts_1.EventEmitter));
exports.SocketBase = SocketBase;
_SocketBase_endpoints = new WeakMap(), _SocketBase_binds = new WeakMap();
