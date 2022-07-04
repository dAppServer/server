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
exports.IntegerType = void 0;
var type_ts_1 = require("../type.ts");
var integer_ts_1 = require("../../flags/types/integer.ts");
var IntegerType = (function (_super) {
    __extends(IntegerType, _super);
    function IntegerType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IntegerType.prototype.parse = function (type) {
        return (0, integer_ts_1.integer)(type);
    };
    return IntegerType;
}(type_ts_1.Type));
exports.IntegerType = IntegerType;
