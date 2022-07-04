"use strict";
exports.__esModule = true;
exports.maxNumber = void 0;
var utils_ts_1 = require("../utils.ts");
function maxNumber(maxValue) {
    return function maxRule(value) {
        if (typeof value !== "number" || value > maxValue) {
            return (0, utils_ts_1.invalid)("maxNumber", { value: value, maxValue: maxValue });
        }
    };
}
exports.maxNumber = maxNumber;
