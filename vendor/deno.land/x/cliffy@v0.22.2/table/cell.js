"use strict";
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
exports.__esModule = true;
exports.Cell = void 0;
var Cell = (function () {
    function Cell(value) {
        this.value = value;
        this.options = {};
    }
    Object.defineProperty(Cell.prototype, "length", {
        get: function () {
            return this.toString().length;
        },
        enumerable: false,
        configurable: true
    });
    Cell.from = function (value) {
        var cell = new this(value);
        if (value instanceof Cell) {
            cell.options = __assign({}, value.options);
        }
        return cell;
    };
    Cell.prototype.toString = function () {
        return this.value.toString();
    };
    Cell.prototype.setValue = function (value) {
        this.value = value;
        return this;
    };
    Cell.prototype.clone = function (value) {
        var cell = new Cell(value !== null && value !== void 0 ? value : this);
        cell.options = __assign({}, this.options);
        return cell;
    };
    Cell.prototype.border = function (enable, override) {
        if (override === void 0) { override = true; }
        if (override || typeof this.options.border === "undefined") {
            this.options.border = enable;
        }
        return this;
    };
    Cell.prototype.colSpan = function (span, override) {
        if (override === void 0) { override = true; }
        if (override || typeof this.options.colSpan === "undefined") {
            this.options.colSpan = span;
        }
        return this;
    };
    Cell.prototype.rowSpan = function (span, override) {
        if (override === void 0) { override = true; }
        if (override || typeof this.options.rowSpan === "undefined") {
            this.options.rowSpan = span;
        }
        return this;
    };
    Cell.prototype.align = function (direction, override) {
        if (override === void 0) { override = true; }
        if (override || typeof this.options.align === "undefined") {
            this.options.align = direction;
        }
        return this;
    };
    Cell.prototype.getBorder = function () {
        return this.options.border === true;
    };
    Cell.prototype.getColSpan = function () {
        return typeof this.options.colSpan === "number" && this.options.colSpan > 0
            ? this.options.colSpan
            : 1;
    };
    Cell.prototype.getRowSpan = function () {
        return typeof this.options.rowSpan === "number" && this.options.rowSpan > 0
            ? this.options.rowSpan
            : 1;
    };
    Cell.prototype.getAlign = function () {
        var _a;
        return (_a = this.options.align) !== null && _a !== void 0 ? _a : "left";
    };
    return Cell;
}());
exports.Cell = Cell;
