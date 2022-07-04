"use strict";
exports.__esModule = true;
exports.isBool = void 0;
var utils_ts_1 = require("../utils.ts");
function isBool(value) {
    if (typeof value !== "boolean") {
        return (0, utils_ts_1.invalid)("isBool", { value: value });
    }
}
exports.isBool = isBool;
