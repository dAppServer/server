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
exports.__esModule = true;
exports.Rep = void 0;
var Router_ts_1 = require("./Router.ts");
var Types_ts_1 = require("./Types.ts");
var Rep = (function (_super) {
    __extends(Rep, _super);
    function Rep() {
        var _this = _super.call(this) || this;
        _Rep_sendingReply.set(_this, void 0);
        _Rep_ids.set(_this, void 0);
        _Rep_pending.set(_this, void 0);
        __classPrivateFieldSet(_this, _Rep_sendingReply, false, "f");
        __classPrivateFieldSet(_this, _Rep_ids, [], "f");
        __classPrivateFieldSet(_this, _Rep_pending, [], "f");
        return _this;
    }
    Rep.prototype.xsend = function (msg) {
        var _this = this;
        if (!__classPrivateFieldGet(this, _Rep_sendingReply, "f")) {
            throw new Error("cannot send another reply");
        }
        var withIds = __spreadArray(__spreadArray(__spreadArray([], __classPrivateFieldGet(this, _Rep_ids, "f"), true), [Rep.bottom], false), msg, true);
        _super.prototype.xsend.call(this, withIds);
        __classPrivateFieldSet(this, _Rep_ids, [], "f");
        var nextMsg = __classPrivateFieldGet(this, _Rep_pending, "f").shift();
        if (nextMsg) {
            setTimeout(function () { return _this.recvInternal(nextMsg[0], nextMsg[1]); });
        }
        else {
            __classPrivateFieldSet(this, _Rep_sendingReply, false, "f");
        }
    };
    Rep.prototype.recvInternal = function (endpoint, frames) {
        for (;;) {
            var frame = frames.shift();
            if (!frame) {
                __classPrivateFieldSet(this, _Rep_ids, [], "f");
                var nextMsg = __classPrivateFieldGet(this, _Rep_pending, "f").shift();
                if (nextMsg) {
                    this.recvInternal(nextMsg[0], nextMsg[1]);
                }
                return;
            }
            if (frame.length === 0) {
                __classPrivateFieldSet(this, _Rep_sendingReply, true, "f");
                this.emit.apply(this, __spreadArray(["message", endpoint], frames, false));
                return;
            }
            __classPrivateFieldGet(this, _Rep_ids, "f").push(frame);
        }
    };
    Rep.prototype.xxrecv = function (endpoint) {
        var frames = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            frames[_i - 1] = arguments[_i];
        }
        if (__classPrivateFieldGet(this, _Rep_sendingReply, "f")) {
            __classPrivateFieldGet(this, _Rep_pending, "f").push([endpoint, frames]);
        }
        else {
            this.recvInternal(endpoint, frames);
        }
    };
    var _Rep_sendingReply, _Rep_ids, _Rep_pending;
    _Rep_sendingReply = new WeakMap(), _Rep_ids = new WeakMap(), _Rep_pending = new WeakMap();
    Rep.bottom = Types_ts_1.Buffer.alloc(0);
    return Rep;
}(Router_ts_1.Router));
exports.Rep = Rep;
