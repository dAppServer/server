"use strict";
exports.__esModule = true;
exports.maxLength = void 0;
var utils_ts_1 = require("../utils.ts");
function maxLength(maxValue) {
    return function maxLengthRule(value) {
        if (typeof value !== "string") {
            return (0, utils_ts_1.invalid)("maxLength", { value: value, maxValue: maxValue }, false);
        }
        if (value.length > maxValue) {
            return (0, utils_ts_1.invalid)("maxLength", { value: value, maxValue: maxValue }, false);
        }
    };
}
exports.maxLength = maxLength;
