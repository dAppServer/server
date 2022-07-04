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
var _Push_loadBalancer, _Push_pending;
exports.__esModule = true;
exports.Push = void 0;
var SocketBase_ts_1 = require("./SocketBase.ts");
var LoadBalancer_ts_1 = require("./utils/LoadBalancer.ts");
var Push = (function (_super) {
    __extends(Push, _super);
    function Push() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _Push_loadBalancer.set(_this, new LoadBalancer_ts_1.LoadBalancer());
        _Push_pending.set(_this, []);
        return _this;
    }
    Push.prototype.attachEndpoint = function (endpoint) {
        __classPrivateFieldGet(this, _Push_loadBalancer, "f").attach(endpoint);
        for (;;) {
            var msg = __classPrivateFieldGet(this, _Push_pending, "f").shift();
            if (!msg) {
                break;
            }
            if (!__classPrivateFieldGet(this, _Push_loadBalancer, "f").send(msg)) {
                break;
            }
        }
    };
    Push.prototype.endpointTerminated = function (endpoint) {
        __classPrivateFieldGet(this, _Push_loadBalancer, "f").terminated(endpoint);
    };
    Push.prototype.xsend = function (msg) {
        if (!__classPrivateFieldGet(this, _Push_loadBalancer, "f").send(msg)) {
            __classPrivateFieldGet(this, _Push_pending, "f").push(msg);
        }
    };
    return Push;
}(SocketBase_ts_1.SocketBase));
exports.Push = Push;
_Push_loadBalancer = new WeakMap(), _Push_pending = new WeakMap();
