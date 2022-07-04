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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _Dealer_loadBalancer, _Dealer_pending;
exports.__esModule = true;
exports.Dealer = void 0;
var SocketBase_ts_1 = require("./SocketBase.ts");
var LoadBalancer_ts_1 = require("./utils/LoadBalancer.ts");
var Dealer = (function (_super) {
    __extends(Dealer, _super);
    function Dealer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _Dealer_loadBalancer.set(_this, new LoadBalancer_ts_1.LoadBalancer());
        _Dealer_pending.set(_this, []);
        return _this;
    }
    Dealer.prototype.attachEndpoint = function (endpoint) {
        __classPrivateFieldGet(this, _Dealer_loadBalancer, "f").attach(endpoint);
        for (;;) {
            var msg = __classPrivateFieldGet(this, _Dealer_pending, "f").shift();
            if (!msg) {
                break;
            }
            if (!__classPrivateFieldGet(this, _Dealer_loadBalancer, "f").send(msg)) {
                break;
            }
        }
    };
    Dealer.prototype.endpointTerminated = function (endpoint) {
        __classPrivateFieldGet(this, _Dealer_loadBalancer, "f").terminated(endpoint);
    };
    Dealer.prototype.xrecv = function (endpoint) {
        var frames = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            frames[_i - 1] = arguments[_i];
        }
        this.emit.apply(this, __spreadArray(["message", endpoint], frames, false));
    };
    Dealer.prototype.xsend = function (msg) {
        if (!__classPrivateFieldGet(this, _Dealer_loadBalancer, "f").send(msg)) {
            __classPrivateFieldGet(this, _Dealer_pending, "f").push(msg);
        }
    };
    return Dealer;
}(SocketBase_ts_1.SocketBase));
exports.Dealer = Dealer;
_Dealer_loadBalancer = new WeakMap(), _Dealer_pending = new WeakMap();
