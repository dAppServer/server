"use strict";
exports.__esModule = true;
exports.isFloat = void 0;
var utils_ts_1 = require("../utils.ts");
function isFloat(value) {
    if (typeof value !== "number" || value % 1 === 0) {
        return (0, utils_ts_1.invalid)("isFloat", { value: value });
    }
}
exports.isFloat = isFloat;
