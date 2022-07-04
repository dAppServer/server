"use strict";
exports.__esModule = true;
exports.lengthBetween = void 0;
var utils_ts_1 = require("../utils.ts");
function lengthBetween(minLength, maxLength) {
    return function lengthBetweenRule(value) {
        if (typeof value !== "string") {
            return (0, utils_ts_1.invalid)("lengthBetween", { value: value, minLength: minLength, maxLength: maxLength }, false);
        }
        if (value.length < minLength || value.length > maxLength) {
            return (0, utils_ts_1.invalid)("lengthBetween", { value: value, minLength: minLength, maxLength: maxLength }, false);
        }
    };
}
exports.lengthBetween = lengthBetween;
