"use strict";
exports.__esModule = true;
exports.isString = void 0;
var utils_ts_1 = require("../utils.ts");
function isString(value) {
    if (typeof value !== "string") {
        return (0, utils_ts_1.invalid)("isString", { value: value });
    }
}
exports.isString = isString;
