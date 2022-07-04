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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _XSub_subscriptions, _XSub_distribution;
exports.__esModule = true;
exports.XSub = void 0;
var SocketBase_ts_1 = require("./SocketBase.ts");
var Types_ts_1 = require("./Types.ts");
var Trie_ts_1 = require("./utils/Trie.ts");
var Distribution_ts_1 = require("./utils/Distribution.ts");
var XSub = (function (_super) {
    __extends(XSub, _super);
    function XSub() {
        var _this = _super.call(this) || this;
        _XSub_subscriptions.set(_this, void 0);
        _XSub_distribution.set(_this, void 0);
        __classPrivateFieldSet(_this, _XSub_subscriptions, new Trie_ts_1.Trie(), "f");
        __classPrivateFieldSet(_this, _XSub_distribution, new Distribution_ts_1.Distribution(), "f");
        return _this;
    }
    XSub.prototype.attachEndpoint = function (endpoint) {
        __classPrivateFieldGet(this, _XSub_distribution, "f").attach(endpoint);
        __classPrivateFieldGet(this, _XSub_subscriptions, "f").forEach(function (s) {
            return endpoint.send([Types_ts_1.Buffer.concat([Types_ts_1.Buffer.from([1]), s])]);
        });
    };
    XSub.prototype.hiccuped = function (endpoint) {
        __classPrivateFieldGet(this, _XSub_subscriptions, "f").forEach(function (s) {
            return endpoint.send([Types_ts_1.Buffer.concat([Types_ts_1.Buffer.from([1]), s])]);
        });
    };
    XSub.prototype.endpointTerminated = function (endpoint) {
        __classPrivateFieldGet(this, _XSub_distribution, "f").terminated(endpoint);
    };
    XSub.prototype.xrecv = function (endpoint) {
        var frames = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            frames[_i - 1] = arguments[_i];
        }
        var topic = frames[0];
        var subscribed = __classPrivateFieldGet(this, _XSub_subscriptions, "f").check(topic, 0, topic.length);
        if (subscribed) {
            this.emit.apply(this, __spreadArray(["message", endpoint], frames, false));
        }
    };
    XSub.prototype.xsend = function (msg) {
        var frame = msg[0];
        if (!Types_ts_1.Buffer.isBuffer(frame)) {
            throw new Error("subscription must be a buffer");
        }
        if (frame.length > 0 && frame.readUInt8(0) === 1) {
            __classPrivateFieldGet(this, _XSub_subscriptions, "f").add(frame, 1, frame.length - 1);
            __classPrivateFieldGet(this, _XSub_distribution, "f").sendToAll(msg);
        }
        else if (frame.length > 0 && frame.readUInt8(0) === 0) {
            var removed = __classPrivateFieldGet(this, _XSub_subscriptions, "f").remove(frame, 1, frame.length - 1);
            if (removed) {
                __classPrivateFieldGet(this, _XSub_distribution, "f").sendToAll(msg);
            }
        }
        else {
            __classPrivateFieldGet(this, _XSub_distribution, "f").sendToAll(msg);
        }
    };
    return XSub;
}(SocketBase_ts_1.SocketBase));
exports.XSub = XSub;
_XSub_subscriptions = new WeakMap(), _XSub_distribution = new WeakMap();
