"use strict";
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
var _TableLayout_instances, _TableLayout_getRows;
exports.__esModule = true;
exports.TableLayout = void 0;
var cell_ts_1 = require("./cell.ts");
var row_ts_1 = require("./row.ts");
var utils_ts_1 = require("./utils.ts");
var TableLayout = (function () {
    function TableLayout(table, options) {
        this.table = table;
        this.options = options;
        _TableLayout_instances.add(this);
    }
    TableLayout.prototype.toString = function () {
        var opts = this.createLayout();
        return opts.rows.length ? this.renderRows(opts) : "";
    };
    TableLayout.prototype.createLayout = function () {
        var _this = this;
        Object.keys(this.options.chars).forEach(function (key) {
            if (typeof _this.options.chars[key] !== "string") {
                _this.options.chars[key] = "";
            }
        });
        var hasBodyBorder = this.table.getBorder() ||
            this.table.hasBodyBorder();
        var hasHeaderBorder = this.table.hasHeaderBorder();
        var hasBorder = hasHeaderBorder || hasBodyBorder;
        var rows = __classPrivateFieldGet(this, _TableLayout_instances, "m", _TableLayout_getRows).call(this);
        var columns = Math.max.apply(Math, rows.map(function (row) { return row.length; }));
        for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
            var row = rows_1[_i];
            var length_1 = row.length;
            if (length_1 < columns) {
                var diff = columns - length_1;
                for (var i = 0; i < diff; i++) {
                    row.push(this.createCell(null, row));
                }
            }
        }
        var padding = [];
        var width = [];
        for (var colIndex = 0; colIndex < columns; colIndex++) {
            var minColWidth = Array.isArray(this.options.minColWidth)
                ? this.options.minColWidth[colIndex]
                : this.options.minColWidth;
            var maxColWidth = Array.isArray(this.options.maxColWidth)
                ? this.options.maxColWidth[colIndex]
                : this.options.maxColWidth;
            var colWidth = (0, utils_ts_1.longest)(colIndex, rows, maxColWidth);
            width[colIndex] = Math.min(maxColWidth, Math.max(minColWidth, colWidth));
            padding[colIndex] = Array.isArray(this.options.padding)
                ? this.options.padding[colIndex]
                : this.options.padding;
        }
        return {
            padding: padding,
            width: width,
            rows: rows,
            columns: columns,
            hasBorder: hasBorder,
            hasBodyBorder: hasBodyBorder,
            hasHeaderBorder: hasHeaderBorder
        };
    };
    TableLayout.prototype.spanRows = function (_rows, rowIndex, colIndex, rowSpan, colSpan) {
        if (rowIndex === void 0) { rowIndex = 0; }
        if (colIndex === void 0) { colIndex = 0; }
        if (rowSpan === void 0) { rowSpan = []; }
        if (colSpan === void 0) { colSpan = 1; }
        var rows = _rows;
        if (rowIndex >= rows.length && rowSpan.every(function (span) { return span === 1; })) {
            return rows;
        }
        else if (rows[rowIndex] && colIndex >= rows[rowIndex].length &&
            colIndex >= rowSpan.length && colSpan === 1) {
            return this.spanRows(rows, ++rowIndex, 0, rowSpan, 1);
        }
        if (colSpan > 1) {
            colSpan--;
            rowSpan[colIndex] = rowSpan[colIndex - 1];
            rows[rowIndex].splice(colIndex - 1, 0, rows[rowIndex][colIndex - 1]);
            return this.spanRows(rows, rowIndex, ++colIndex, rowSpan, colSpan);
        }
        if (colIndex === 0) {
            rows[rowIndex] = this.createRow(rows[rowIndex] || []);
        }
        if (rowSpan[colIndex] > 1) {
            rowSpan[colIndex]--;
            rows[rowIndex].splice(colIndex, 0, rows[rowIndex - 1][colIndex]);
            return this.spanRows(rows, rowIndex, ++colIndex, rowSpan, colSpan);
        }
        rows[rowIndex][colIndex] = this.createCell(rows[rowIndex][colIndex] || null, rows[rowIndex]);
        colSpan = rows[rowIndex][colIndex].getColSpan();
        rowSpan[colIndex] = rows[rowIndex][colIndex].getRowSpan();
        return this.spanRows(rows, rowIndex, ++colIndex, rowSpan, colSpan);
    };
    TableLayout.prototype.createRow = function (row) {
        return row_ts_1.Row.from(row)
            .border(this.table.getBorder(), false)
            .align(this.table.getAlign(), false);
    };
    TableLayout.prototype.createCell = function (cell, row) {
        return cell_ts_1.Cell.from(cell !== null && cell !== void 0 ? cell : "")
            .border(row.getBorder(), false)
            .align(row.getAlign(), false);
    };
    TableLayout.prototype.renderRows = function (opts) {
        var result = "";
        var rowSpan = new Array(opts.columns).fill(1);
        for (var rowIndex = 0; rowIndex < opts.rows.length; rowIndex++) {
            result += this.renderRow(rowSpan, rowIndex, opts);
        }
        return result.slice(0, -1);
    };
    TableLayout.prototype.renderRow = function (rowSpan, rowIndex, opts, isMultiline) {
        var row = opts.rows[rowIndex];
        var prevRow = opts.rows[rowIndex - 1];
        var nextRow = opts.rows[rowIndex + 1];
        var result = "";
        var colSpan = 1;
        if (!isMultiline && rowIndex === 0 && row.hasBorder()) {
            result += this.renderBorderRow(undefined, row, rowSpan, opts);
        }
        var isMultilineRow = false;
        result += " ".repeat(this.options.indent || 0);
        for (var colIndex = 0; colIndex < opts.columns; colIndex++) {
            if (colSpan > 1) {
                colSpan--;
                rowSpan[colIndex] = rowSpan[colIndex - 1];
                continue;
            }
            result += this.renderCell(colIndex, row, opts);
            if (rowSpan[colIndex] > 1) {
                if (!isMultiline) {
                    rowSpan[colIndex]--;
                }
            }
            else if (!prevRow || prevRow[colIndex] !== row[colIndex]) {
                rowSpan[colIndex] = row[colIndex].getRowSpan();
            }
            colSpan = row[colIndex].getColSpan();
            if (rowSpan[colIndex] === 1 && row[colIndex].length) {
                isMultilineRow = true;
            }
        }
        if (opts.columns > 0) {
            if (row[opts.columns - 1].getBorder()) {
                result += this.options.chars.right;
            }
            else if (opts.hasBorder) {
                result += " ";
            }
        }
        result += "\n";
        if (isMultilineRow) {
            return result + this.renderRow(rowSpan, rowIndex, opts, isMultilineRow);
        }
        if ((rowIndex === 0 && opts.hasHeaderBorder) ||
            (rowIndex < opts.rows.length - 1 && opts.hasBodyBorder)) {
            result += this.renderBorderRow(row, nextRow, rowSpan, opts);
        }
        if (rowIndex === opts.rows.length - 1 && row.hasBorder()) {
            result += this.renderBorderRow(row, undefined, rowSpan, opts);
        }
        return result;
    };
    TableLayout.prototype.renderCell = function (colIndex, row, opts, noBorder) {
        var result = "";
        var prevCell = row[colIndex - 1];
        var cell = row[colIndex];
        if (!noBorder) {
            if (colIndex === 0) {
                if (cell.getBorder()) {
                    result += this.options.chars.left;
                }
                else if (opts.hasBorder) {
                    result += " ";
                }
            }
            else {
                if (cell.getBorder() || (prevCell === null || prevCell === void 0 ? void 0 : prevCell.getBorder())) {
                    result += this.options.chars.middle;
                }
                else if (opts.hasBorder) {
                    result += " ";
                }
            }
        }
        var maxLength = opts.width[colIndex];
        var colSpan = cell.getColSpan();
        if (colSpan > 1) {
            for (var o = 1; o < colSpan; o++) {
                maxLength += opts.width[colIndex + o] + opts.padding[colIndex + o];
                if (opts.hasBorder) {
                    maxLength += opts.padding[colIndex + o] + 1;
                }
            }
        }
        var _a = this.renderCellValue(cell, maxLength), current = _a.current, next = _a.next;
        row[colIndex].setValue(next);
        if (opts.hasBorder) {
            result += " ".repeat(opts.padding[colIndex]);
        }
        result += current;
        if (opts.hasBorder || colIndex < opts.columns - 1) {
            result += " ".repeat(opts.padding[colIndex]);
        }
        return result;
    };
    TableLayout.prototype.renderCellValue = function (cell, maxLength) {
        var length = Math.min(maxLength, (0, utils_ts_1.strLength)(cell.toString()));
        var words = (0, utils_ts_1.consumeWords)(length, cell.toString());
        var breakWord = (0, utils_ts_1.strLength)(words) > length;
        if (breakWord) {
            words = words.slice(0, length);
        }
        var next = cell.toString().slice(words.length + (breakWord ? 0 : 1));
        var fillLength = maxLength - (0, utils_ts_1.strLength)(words);
        var align = cell.getAlign();
        var current;
        if (fillLength === 0) {
            current = words;
        }
        else if (align === "left") {
            current = words + " ".repeat(fillLength);
        }
        else if (align === "center") {
            current = " ".repeat(Math.floor(fillLength / 2)) + words +
                " ".repeat(Math.ceil(fillLength / 2));
        }
        else if (align === "right") {
            current = " ".repeat(fillLength) + words;
        }
        else {
            throw new Error("Unknown direction: " + align);
        }
        return {
            current: current,
            next: cell.clone(next)
        };
    };
    TableLayout.prototype.renderBorderRow = function (prevRow, nextRow, rowSpan, opts) {
        var _a;
        var result = "";
        var colSpan = 1;
        for (var colIndex = 0; colIndex < opts.columns; colIndex++) {
            if (rowSpan[colIndex] > 1) {
                if (!nextRow) {
                    throw new Error("invalid layout");
                }
                if (colSpan > 1) {
                    colSpan--;
                    continue;
                }
            }
            result += this.renderBorderCell(colIndex, prevRow, nextRow, rowSpan, opts);
            colSpan = (_a = nextRow === null || nextRow === void 0 ? void 0 : nextRow[colIndex].getColSpan()) !== null && _a !== void 0 ? _a : 1;
        }
        return result.length ? " ".repeat(this.options.indent) + result + "\n" : "";
    };
    TableLayout.prototype.renderBorderCell = function (colIndex, prevRow, nextRow, rowSpan, opts) {
        var a1 = prevRow === null || prevRow === void 0 ? void 0 : prevRow[colIndex - 1];
        var a2 = nextRow === null || nextRow === void 0 ? void 0 : nextRow[colIndex - 1];
        var b1 = prevRow === null || prevRow === void 0 ? void 0 : prevRow[colIndex];
        var b2 = nextRow === null || nextRow === void 0 ? void 0 : nextRow[colIndex];
        var a1Border = !!(a1 === null || a1 === void 0 ? void 0 : a1.getBorder());
        var a2Border = !!(a2 === null || a2 === void 0 ? void 0 : a2.getBorder());
        var b1Border = !!(b1 === null || b1 === void 0 ? void 0 : b1.getBorder());
        var b2Border = !!(b2 === null || b2 === void 0 ? void 0 : b2.getBorder());
        var hasColSpan = function (cell) { var _a; return ((_a = cell === null || cell === void 0 ? void 0 : cell.getColSpan()) !== null && _a !== void 0 ? _a : 1) > 1; };
        var hasRowSpan = function (cell) { var _a; return ((_a = cell === null || cell === void 0 ? void 0 : cell.getRowSpan()) !== null && _a !== void 0 ? _a : 1) > 1; };
        var result = "";
        if (colIndex === 0) {
            if (rowSpan[colIndex] > 1) {
                if (b1Border) {
                    result += this.options.chars.left;
                }
                else {
                    result += " ";
                }
            }
            else if (b1Border && b2Border) {
                result += this.options.chars.leftMid;
            }
            else if (b1Border) {
                result += this.options.chars.bottomLeft;
            }
            else if (b2Border) {
                result += this.options.chars.topLeft;
            }
            else {
                result += " ";
            }
        }
        else if (colIndex < opts.columns) {
            if ((a1Border && b2Border) || (b1Border && a2Border)) {
                var a1ColSpan = hasColSpan(a1);
                var a2ColSpan = hasColSpan(a2);
                var b1ColSpan = hasColSpan(b1);
                var b2ColSpan = hasColSpan(b2);
                var a1RowSpan = hasRowSpan(a1);
                var a2RowSpan = hasRowSpan(a2);
                var b1RowSpan = hasRowSpan(b1);
                var b2RowSpan = hasRowSpan(b2);
                var hasAllBorder = a1Border && b2Border && b1Border && a2Border;
                var hasAllRowSpan = a1RowSpan && b1RowSpan && a2RowSpan && b2RowSpan;
                var hasAllColSpan = a1ColSpan && b1ColSpan && a2ColSpan && b2ColSpan;
                if (hasAllRowSpan && hasAllBorder) {
                    result += this.options.chars.middle;
                }
                else if (hasAllColSpan && hasAllBorder && a1 === b1 && a2 === b2) {
                    result += this.options.chars.mid;
                }
                else if (a1ColSpan && b1ColSpan && a1 === b1) {
                    result += this.options.chars.topMid;
                }
                else if (a2ColSpan && b2ColSpan && a2 === b2) {
                    result += this.options.chars.bottomMid;
                }
                else if (a1RowSpan && a2RowSpan && a1 === a2) {
                    result += this.options.chars.leftMid;
                }
                else if (b1RowSpan && b2RowSpan && b1 === b2) {
                    result += this.options.chars.rightMid;
                }
                else {
                    result += this.options.chars.midMid;
                }
            }
            else if (a1Border && b1Border) {
                if (hasColSpan(a1) && hasColSpan(b1) && a1 === b1) {
                    result += this.options.chars.bottom;
                }
                else {
                    result += this.options.chars.bottomMid;
                }
            }
            else if (b1Border && b2Border) {
                if (rowSpan[colIndex] > 1) {
                    result += this.options.chars.left;
                }
                else {
                    result += this.options.chars.leftMid;
                }
            }
            else if (b2Border && a2Border) {
                if (hasColSpan(a2) && hasColSpan(b2) && a2 === b2) {
                    result += this.options.chars.top;
                }
                else {
                    result += this.options.chars.topMid;
                }
            }
            else if (a1Border && a2Border) {
                if (hasRowSpan(a1) && a1 === a2) {
                    result += this.options.chars.right;
                }
                else {
                    result += this.options.chars.rightMid;
                }
            }
            else if (a1Border) {
                result += this.options.chars.bottomRight;
            }
            else if (b1Border) {
                result += this.options.chars.bottomLeft;
            }
            else if (a2Border) {
                result += this.options.chars.topRight;
            }
            else if (b2Border) {
                result += this.options.chars.topLeft;
            }
            else {
                result += " ";
            }
        }
        var length = opts.padding[colIndex] + opts.width[colIndex] +
            opts.padding[colIndex];
        if (rowSpan[colIndex] > 1 && nextRow) {
            result += this.renderCell(colIndex, nextRow, opts, true);
            if (nextRow[colIndex] === nextRow[nextRow.length - 1]) {
                if (b1Border) {
                    result += this.options.chars.right;
                }
                else {
                    result += " ";
                }
                return result;
            }
        }
        else if (b1Border && b2Border) {
            result += this.options.chars.mid.repeat(length);
        }
        else if (b1Border) {
            result += this.options.chars.bottom.repeat(length);
        }
        else if (b2Border) {
            result += this.options.chars.top.repeat(length);
        }
        else {
            result += " ".repeat(length);
        }
        if (colIndex === opts.columns - 1) {
            if (b1Border && b2Border) {
                result += this.options.chars.rightMid;
            }
            else if (b1Border) {
                result += this.options.chars.bottomRight;
            }
            else if (b2Border) {
                result += this.options.chars.topRight;
            }
            else {
                result += " ";
            }
        }
        return result;
    };
    return TableLayout;
}());
exports.TableLayout = TableLayout;
_TableLayout_instances = new WeakSet(), _TableLayout_getRows = function _TableLayout_getRows() {
    var _this = this;
    var header = this.table.getHeader();
    var rows = header ? __spreadArray([header], this.table, true) : this.table.slice();
    var hasSpan = rows.some(function (row) {
        return row.some(function (cell) {
            return cell instanceof cell_ts_1.Cell && (cell.getColSpan() > 1 || cell.getRowSpan() > 1);
        });
    });
    if (hasSpan) {
        return this.spanRows(rows);
    }
    return rows.map(function (row) {
        var newRow = _this.createRow(row);
        return newRow.map(function (cell) { return _this.createCell(cell, newRow); });
    });
};
