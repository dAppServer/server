"use strict";
exports.__esModule = true;
exports.isNumeric = void 0;
var utils_ts_1 = require("../utils.ts");
function isNumeric(value) {
    if (typeof value !== "string" && typeof value !== "number") {
        return (0, utils_ts_1.invalid)("isNumeric", { value: value });
    }
    if (typeof value === "string" && !value.match(/\d+(\.\d+)?/)) {
        return (0, utils_ts_1.invalid)("isNumeric", { value: value });
    }
}
exports.isNumeric = isNumeric;
