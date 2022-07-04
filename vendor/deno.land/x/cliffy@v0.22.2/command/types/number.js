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
exports.NumberType = void 0;
var number_ts_1 = require("../../flags/types/number.ts");
var type_ts_1 = require("../type.ts");
var NumberType = (function (_super) {
    __extends(NumberType, _super);
    function NumberType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumberType.prototype.parse = function (type) {
        return (0, number_ts_1.number)(type);
    };
    return NumberType;
}(type_ts_1.Type));
exports.NumberType = NumberType;
