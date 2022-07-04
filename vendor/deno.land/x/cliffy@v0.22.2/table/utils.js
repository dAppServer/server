"use strict";
exports.__esModule = true;
exports.strLength = exports.longest = exports.consumeWords = void 0;
var cell_ts_1 = require("./cell.ts");
var deps_ts_1 = require("./deps.ts");
function consumeWords(length, content) {
    var _a;
    var consumed = "";
    var words = (_a = content.split("\n")[0]) === null || _a === void 0 ? void 0 : _a.split(/ /g);
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        if (consumed) {
            var nextLength = (0, exports.strLength)(word);
            var consumedLength = (0, exports.strLength)(consumed);
            if (consumedLength + nextLength >= length) {
                break;
            }
        }
        consumed += (i > 0 ? " " : "") + word;
    }
    return consumed;
}
exports.consumeWords = consumeWords;
function longest(index, rows, maxWidth) {
    var cellLengths = rows.map(function (row) {
        var cell = row[index];
        var cellValue = cell instanceof cell_ts_1.Cell && cell.getColSpan() > 1
            ? ""
            : (cell === null || cell === void 0 ? void 0 : cell.toString()) || "";
        return cellValue
            .split("\n")
            .map(function (line) {
            var str = typeof maxWidth === "undefined"
                ? line
                : consumeWords(maxWidth, line);
            return (0, exports.strLength)(str) || 0;
        });
    }).flat();
    return Math.max.apply(Math, cellLengths);
}
exports.longest = longest;
var strLength = function (str) {
    str = (0, deps_ts_1.stripColor)(str);
    var length = 0;
    for (var i = 0; i < str.length; i++) {
        var charCode = str.charCodeAt(i);
        if (charCode >= 19968 && charCode <= 40869) {
            length += 2;
        }
        else {
            length += 1;
        }
    }
    return length;
};
exports.strLength = strLength;
