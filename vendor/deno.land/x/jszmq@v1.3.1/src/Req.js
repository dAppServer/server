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
exports.Req = void 0;
var Dealer_ts_1 = require("./Dealer.ts");
var Types_ts_1 = require("./Types.ts");
var Req = (function (_super) {
    __extends(Req, _super);
    function Req() {
        var _this = _super.call(this) || this;
        _this.receivingReply = false;
        return _this;
    }
    Req.prototype.xsend = function (msg) {
        if (this.receivingReply) {
            throw new Error("cannot send another request");
        }
        var withBottom = __spreadArray([Req.bottom], msg, true);
        _super.prototype.xsend.call(this, withBottom);
        this.receivingReply = true;
    };
    Req.prototype.xrecv = function (endpoint, bottom) {
        var frames = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            frames[_i - 2] = arguments[_i];
        }
        if (!this.receivingReply) {
            return;
        }
        if (frames.length === 0 || bottom.length !== 0) {
            return;
        }
        this.receivingReply = false;
        _super.prototype.xrecv.apply(this, __spreadArray([endpoint], frames, false));
    };
    Req.bottom = Types_ts_1.Buffer.alloc(0);
    return Req;
}(Dealer_ts_1.Dealer));
exports.Req = Req;
