"use strict";
exports.__esModule = true;
exports.numberBetween = void 0;
var utils_ts_1 = require("../utils.ts");
function numberBetween(minValue, maxValue) {
    return function maxRule(value) {
        if (typeof value !== "number" || (value < minValue || value > maxValue)) {
            return (0, utils_ts_1.invalid)("numberBetween", { value: value, maxValue: maxValue, minValue: minValue });
        }
    };
}
exports.numberBetween = numberBetween;
