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
exports.__esModule = true;
exports.Pub = void 0;
var Xpub_ts_1 = require("./Xpub.ts");
var Pub = (function (_super) {
    __extends(Pub, _super);
    function Pub() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Pub.prototype.xxrecv = function (_endpoint) {
        var _frames = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            _frames[_i - 1] = arguments[_i];
        }
    };
    Pub.prototype.sendUnsubscription = function () { };
    return Pub;
}(Xpub_ts_1.XPub));
exports.Pub = Pub;
