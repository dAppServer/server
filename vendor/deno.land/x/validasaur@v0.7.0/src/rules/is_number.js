"use strict";
exports.__esModule = true;
exports.isNumber = void 0;
var utils_ts_1 = require("../utils.ts");
function isNumber(value) {
    if (typeof value !== "number") {
        return (0, utils_ts_1.invalid)("isNumber", { value: value });
    }
}
exports.isNumber = isNumber;
