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
exports.Sub = void 0;
var Xsub_ts_1 = require("./Xsub.ts");
var Types_ts_1 = require("./Types.ts");
var Sub = (function (_super) {
    __extends(Sub, _super);
    function Sub() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Sub.prototype.subscribe = function (topic) {
        if (typeof topic === "string") {
            var frame = Types_ts_1.Buffer.concat([Types_ts_1.Buffer.from([1]), Types_ts_1.Buffer.from(topic)]);
            _super.prototype.xsend.call(this, [frame]);
        }
        else if (Types_ts_1.Buffer.isBuffer(topic)) {
            var frame = Types_ts_1.Buffer.concat([Types_ts_1.Buffer.from([1]), topic]);
            _super.prototype.xsend.call(this, [frame]);
        }
        else {
            throw new Error("unsupported topic type");
        }
    };
    Sub.prototype.unsubscribe = function (topic) {
        if (typeof topic === "string") {
            var frame = Types_ts_1.Buffer.concat([Types_ts_1.Buffer.from([0]), Types_ts_1.Buffer.from(topic)]);
            _super.prototype.xsend.call(this, [frame]);
        }
        else if (Types_ts_1.Buffer.isBuffer(topic)) {
            var frame = Types_ts_1.Buffer.concat([Types_ts_1.Buffer.from([0]), topic]);
            _super.prototype.xsend.call(this, [frame]);
        }
        else {
            throw new Error("unsupported topic type");
        }
    };
    Sub.prototype.xsend = function (_msg) {
        throw new Error("not supported");
    };
    return Sub;
}(Xsub_ts_1.XSub));
exports.Sub = Sub;
