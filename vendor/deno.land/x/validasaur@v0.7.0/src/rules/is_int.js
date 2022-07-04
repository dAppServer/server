"use strict";
exports.__esModule = true;
exports.isInt = void 0;
var utils_ts_1 = require("../utils.ts");
function isInt(value) {
    if (typeof value !== "number" || value % 1 !== 0) {
        return (0, utils_ts_1.invalid)("isInt", { value: value });
    }
}
exports.isInt = isInt;
