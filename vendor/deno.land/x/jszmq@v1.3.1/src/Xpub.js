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
var _XPub_subscriptions, _XPub_distribution;
exports.__esModule = true;
exports.XPub = void 0;
var SocketBase_ts_1 = require("./SocketBase.ts");
var Types_ts_1 = require("./Types.ts");
var MultiTrie_ts_1 = require("./utils/MultiTrie.ts");
var Distribution_ts_1 = require("./utils/Distribution.ts");
var XPub = (function (_super) {
    __extends(XPub, _super);
    function XPub() {
        var _this = _super.call(this) || this;
        _XPub_subscriptions.set(_this, new MultiTrie_ts_1.MultiTrie());
        _XPub_distribution.set(_this, new Distribution_ts_1.Distribution());
        _this.markAsMatching = _this.markAsMatching.bind(_this);
        _this.sendUnsubscription = _this.sendUnsubscription.bind(_this);
        return _this;
    }
    XPub.prototype.markAsMatching = function (endpoint) {
        __classPrivateFieldGet(this, _XPub_distribution, "f").match(endpoint);
    };
    XPub.prototype.sendUnsubscription = function (endpoint, data, size) {
        var unsubscription = Types_ts_1.Buffer.concat([
            Types_ts_1.Buffer.from([0]),
            data.slice(0, size),
        ]);
        endpoint.send([unsubscription]);
    };
    XPub.prototype.attachEndpoint = function (endpoint) {
        __classPrivateFieldGet(this, _XPub_distribution, "f").attach(endpoint);
    };
    XPub.prototype.endpointTerminated = function (endpoint) {
        __classPrivateFieldGet(this, _XPub_subscriptions, "f").removeEndpoint(endpoint, this.sendUnsubscription);
        __classPrivateFieldGet(this, _XPub_distribution, "f").terminated(endpoint);
    };
    XPub.prototype.xsend = function (msg) {
        var topic;
        if (Types_ts_1.Buffer.isBuffer(msg[0])) {
            topic = msg[0];
        }
        else {
            topic = Types_ts_1.Buffer.from(msg[0], "utf8");
        }
        __classPrivateFieldGet(this, _XPub_subscriptions, "f").match(topic, 0, topic.length, this.markAsMatching);
        __classPrivateFieldGet(this, _XPub_distribution, "f").sendToMatching(msg);
    };
    XPub.prototype.xrecv = function (endpoint, subscription) {
        var frames = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            frames[_i - 2] = arguments[_i];
        }
        if (subscription.length > 0) {
            var type = subscription.readUInt8(0);
            if (type === 0 || type === 1) {
                var unique = void 0;
                if (type === 0) {
                    unique = __classPrivateFieldGet(this, _XPub_subscriptions, "f").remove(subscription, 1, subscription.length - 1, endpoint);
                }
                else {
                    unique = __classPrivateFieldGet(this, _XPub_subscriptions, "f").add(subscription, 1, subscription.length - 1, endpoint);
                }
                if (unique || this.options.xpubVerbose) {
                    this.xxrecv.apply(this, __spreadArray([endpoint, subscription], frames, false));
                }
                return;
            }
        }
        this.xxrecv.apply(this, __spreadArray([endpoint, subscription], frames, false));
    };
    XPub.prototype.xxrecv = function (endpoint) {
        var frames = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            frames[_i - 1] = arguments[_i];
        }
        this.emit.apply(this, __spreadArray(["message", endpoint], frames, false));
    };
    return XPub;
}(SocketBase_ts_1.SocketBase));
exports.XPub = XPub;
_XPub_subscriptions = new WeakMap(), _XPub_distribution = new WeakMap();
