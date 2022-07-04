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
var _Pair_endpoint, _Pair_pending;
exports.__esModule = true;
exports.Pair = void 0;
var SocketBase_ts_1 = require("./SocketBase.ts");
var Pair = (function (_super) {
    __extends(Pair, _super);
    function Pair() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _Pair_endpoint.set(_this, void 0);
        _Pair_pending.set(_this, []);
        return _this;
    }
    Pair.prototype.attachEndpoint = function (endpoint) {
        if (__classPrivateFieldGet(this, _Pair_endpoint, "f")) {
            endpoint.close();
            return;
        }
        __classPrivateFieldSet(this, _Pair_endpoint, endpoint, "f");
        for (;;) {
            var msg = __classPrivateFieldGet(this, _Pair_pending, "f").shift();
            if (!msg) {
                break;
            }
            if (!endpoint.send(msg)) {
                break;
            }
        }
    };
    Pair.prototype.endpointTerminated = function (endpoint) {
        if (endpoint === __classPrivateFieldGet(this, _Pair_endpoint, "f")) {
            __classPrivateFieldSet(this, _Pair_endpoint, undefined, "f");
        }
    };
    Pair.prototype.xrecv = function (endpoint) {
        var frames = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            frames[_i - 1] = arguments[_i];
        }
        if (endpoint === __classPrivateFieldGet(this, _Pair_endpoint, "f")) {
            this.emit.apply(this, __spreadArray(["message", endpoint], frames, false));
        }
    };
    Pair.prototype.xsend = function (msg) {
        if (__classPrivateFieldGet(this, _Pair_endpoint, "f")) {
            __classPrivateFieldGet(this, _Pair_endpoint, "f").send(msg);
        }
        else {
            __classPrivateFieldGet(this, _Pair_pending, "f").push(msg);
        }
    };
    return Pair;
}(SocketBase_ts_1.SocketBase));
exports.Pair = Pair;
_Pair_endpoint = new WeakMap(), _Pair_pending = new WeakMap();
