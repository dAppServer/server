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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.Row = void 0;
var cell_ts_1 = require("./cell.ts");
var Row = (function (_super) {
    __extends(Row, _super);
    function Row() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.options = {};
        return _this;
    }
    Row.from = function (cells) {
        var row = new (this.bind.apply(this, __spreadArray([void 0], cells, false)))();
        if (cells instanceof Row) {
            row.options = __assign({}, cells.options);
        }
        return row;
    };
    Row.prototype.clone = function () {
        var row = new (Row.bind.apply(Row, __spreadArray([void 0], this.map(function (cell) { return cell instanceof cell_ts_1.Cell ? cell.clone() : cell; }), false)))();
        row.options = __assign({}, this.options);
        return row;
    };
    Row.prototype.border = function (enable, override) {
        if (override === void 0) { override = true; }
        if (override || typeof this.options.border === "undefined") {
            this.options.border = enable;
        }
        return this;
    };
    Row.prototype.align = function (direction, override) {
        if (override === void 0) { override = true; }
        if (override || typeof this.options.align === "undefined") {
            this.options.align = direction;
        }
        return this;
    };
    Row.prototype.getBorder = function () {
        return this.options.border === true;
    };
    Row.prototype.hasBorder = function () {
        return this.getBorder() ||
            this.some(function (cell) { return cell instanceof cell_ts_1.Cell && cell.getBorder(); });
    };
    Row.prototype.getAlign = function () {
        var _a;
        return (_a = this.options.align) !== null && _a !== void 0 ? _a : "left";
    };
    return Row;
}(Array));
exports.Row = Row;
