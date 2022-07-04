"use strict";
exports.__esModule = true;
exports.minLength = void 0;
var utils_ts_1 = require("../utils.ts");
function minLength(minValue) {
    return function minLengthRule(value) {
        if (typeof value !== "string") {
            return (0, utils_ts_1.invalid)("minLength", { value: value, minValue: minValue }, false);
        }
        if (value.length < minValue) {
            return (0, utils_ts_1.invalid)("minLength", { value: value, minValue: minValue }, false);
        }
    };
}
exports.minLength = minLength;
