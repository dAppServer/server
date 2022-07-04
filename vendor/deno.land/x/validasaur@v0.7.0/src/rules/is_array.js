"use strict";
exports.__esModule = true;
exports.isArray = void 0;
var utils_ts_1 = require("../utils.ts");
function isArray(value) {
    if (false === value instanceof Array) {
        return (0, utils_ts_1.invalid)("isArray", { value: value });
    }
}
exports.isArray = isArray;
