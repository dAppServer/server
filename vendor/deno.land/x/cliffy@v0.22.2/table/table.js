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
exports.Table = void 0;
var border_ts_1 = require("./border.ts");
var cell_ts_1 = require("./cell.ts");
var layout_ts_1 = require("./layout.ts");
var row_ts_1 = require("./row.ts");
var Table = (function (_super) {
    __extends(Table, _super);
    function Table() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.options = {
            indent: 0,
            border: false,
            maxColWidth: Infinity,
            minColWidth: 0,
            padding: 1,
            chars: __assign({}, Table._chars)
        };
        return _this;
    }
    Table.from = function (rows) {
        var table = new (this.bind.apply(this, __spreadArray([void 0], rows, false)))();
        if (rows instanceof Table) {
            table.options = __assign({}, rows.options);
            table.headerRow = rows.headerRow ? row_ts_1.Row.from(rows.headerRow) : undefined;
        }
        return table;
    };
    Table.fromJson = function (rows) {
        return new this().fromJson(rows);
    };
    Table.chars = function (chars) {
        Object.assign(this._chars, chars);
        return this;
    };
    Table.render = function (rows) {
        Table.from(rows).render();
    };
    Table.prototype.fromJson = function (rows) {
        this.header(Object.keys(rows[0]));
        this.body(rows.map(function (row) { return Object.values(row); }));
        return this;
    };
    Table.prototype.header = function (header) {
        this.headerRow = header instanceof row_ts_1.Row ? header : row_ts_1.Row.from(header);
        return this;
    };
    Table.prototype.body = function (rows) {
        this.length = 0;
        this.push.apply(this, rows);
        return this;
    };
    Table.prototype.clone = function () {
        var _a;
        var table = new (Table.bind.apply(Table, __spreadArray([void 0], this.map(function (row) {
            return row instanceof row_ts_1.Row ? row.clone() : row_ts_1.Row.from(row).clone();
        }), false)))();
        table.options = __assign({}, this.options);
        table.headerRow = (_a = this.headerRow) === null || _a === void 0 ? void 0 : _a.clone();
        return table;
    };
    Table.prototype.toString = function () {
        return new layout_ts_1.TableLayout(this, this.options).toString();
    };
    Table.prototype.render = function () {
        console.log(this.toString());
        return this;
    };
    Table.prototype.maxColWidth = function (width, override) {
        if (override === void 0) { override = true; }
        if (override || typeof this.options.maxColWidth === "undefined") {
            this.options.maxColWidth = width;
        }
        return this;
    };
    Table.prototype.minColWidth = function (width, override) {
        if (override === void 0) { override = true; }
        if (override || typeof this.options.minColWidth === "undefined") {
            this.options.minColWidth = width;
        }
        return this;
    };
    Table.prototype.indent = function (width, override) {
        if (override === void 0) { override = true; }
        if (override || typeof this.options.indent === "undefined") {
            this.options.indent = width;
        }
        return this;
    };
    Table.prototype.padding = function (padding, override) {
        if (override === void 0) { override = true; }
        if (override || typeof this.options.padding === "undefined") {
            this.options.padding = padding;
        }
        return this;
    };
    Table.prototype.border = function (enable, override) {
        if (override === void 0) { override = true; }
        if (override || typeof this.options.border === "undefined") {
            this.options.border = enable;
        }
        return this;
    };
    Table.prototype.align = function (direction, override) {
        if (override === void 0) { override = true; }
        if (override || typeof this.options.align === "undefined") {
            this.options.align = direction;
        }
        return this;
    };
    Table.prototype.chars = function (chars) {
        Object.assign(this.options.chars, chars);
        return this;
    };
    Table.prototype.getHeader = function () {
        return this.headerRow;
    };
    Table.prototype.getBody = function () {
        return __spreadArray([], this, true);
    };
    Table.prototype.getMaxColWidth = function () {
        return this.options.maxColWidth;
    };
    Table.prototype.getMinColWidth = function () {
        return this.options.minColWidth;
    };
    Table.prototype.getIndent = function () {
        return this.options.indent;
    };
    Table.prototype.getPadding = function () {
        return this.options.padding;
    };
    Table.prototype.getBorder = function () {
        return this.options.border === true;
    };
    Table.prototype.hasHeaderBorder = function () {
        var _a;
        var hasBorder = (_a = this.headerRow) === null || _a === void 0 ? void 0 : _a.hasBorder();
        return hasBorder === true || (this.getBorder() && hasBorder !== false);
    };
    Table.prototype.hasBodyBorder = function () {
        return this.getBorder() ||
            this.some(function (row) {
                return row instanceof row_ts_1.Row
                    ? row.hasBorder()
                    : row.some(function (cell) { return cell instanceof cell_ts_1.Cell ? cell.getBorder : false; });
            });
    };
    Table.prototype.hasBorder = function () {
        return this.hasHeaderBorder() || this.hasBodyBorder();
    };
    Table.prototype.getAlign = function () {
        var _a;
        return (_a = this.options.align) !== null && _a !== void 0 ? _a : "left";
    };
    Table._chars = __assign({}, border_ts_1.border);
    return Table;
}(Array));
exports.Table = Table;
