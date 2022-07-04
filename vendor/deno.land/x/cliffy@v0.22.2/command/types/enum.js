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
exports.EnumType = void 0;
var type_ts_1 = require("../type.ts");
var _errors_ts_1 = require("../../flags/_errors.ts");
var EnumType = (function (_super) {
    __extends(EnumType, _super);
    function EnumType(values) {
        var _this = _super.call(this) || this;
        _this.allowedValues = Array.isArray(values) ? values : Object.values(values);
        return _this;
    }
    EnumType.prototype.parse = function (type) {
        for (var _i = 0, _a = this.allowedValues; _i < _a.length; _i++) {
            var value = _a[_i];
            if (value.toString() === type.value) {
                return value;
            }
        }
        throw new _errors_ts_1.InvalidTypeError(type, this.allowedValues.slice());
    };
    EnumType.prototype.values = function () {
        return this.allowedValues.slice();
    };
    EnumType.prototype.complete = function () {
        return this.values();
    };
    return EnumType;
}(type_ts_1.Type));
exports.EnumType = EnumType;
