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
var _WebSocketListener_endPoint;
exports.__esModule = true;
exports.WebSocketListener = void 0;
var events_ts_1 = require("https://deno.land/std@0.108.0/node/events.ts");
var WebSocketEndpoint_ts_1 = require("./WebSocketEndpoint.ts");
var WebSocketListener = (function (_super) {
    __extends(WebSocketListener, _super);
    function WebSocketListener(address, httpServer, options) {
        var _this = _super.call(this) || this;
        _this.address = address;
        _this.httpServer = httpServer;
        _this.options = options;
        _WebSocketListener_endPoint.set(_this, void 0);
        _this.onConnection = _this.onConnection.bind(_this);
        if (!Deno) {
            throw "binding websocket is not supported on browser";
        }
        var url = new URL(address);
        _this.path = url.pathname;
        _this.httpServer.registerPath(url.pathname, _this);
        return _this;
    }
    WebSocketListener.prototype.onConnection = function (connection, data) {
        __classPrivateFieldSet(this, _WebSocketListener_endPoint, new WebSocketEndpoint_ts_1.WebSocketEndpoint(connection, this.options, data), "f");
        this.emit("attach", __classPrivateFieldGet(this, _WebSocketListener_endPoint, "f"));
    };
    WebSocketListener.prototype.close = function () {
        var _a;
        if (this.path) {
            this.httpServer.removePath(this.path);
        }
        (_a = __classPrivateFieldGet(this, _WebSocketListener_endPoint, "f")) === null || _a === void 0 ? void 0 : _a.close();
    };
    return WebSocketListener;
}(events_ts_1.EventEmitter));
exports.WebSocketListener = WebSocketListener;
_WebSocketListener_endPoint = new WeakMap();
