"use strict";
exports.__esModule = true;
exports.minNumber = void 0;
var utils_ts_1 = require("../utils.ts");
function minNumber(minValue) {
    return function minRule(value) {
        if (typeof value !== "number" || value < minValue) {
            return (0, utils_ts_1.invalid)("minNumber", { value: value, minValue: minValue });
        }
    };
}
exports.minNumber = minNumber;
