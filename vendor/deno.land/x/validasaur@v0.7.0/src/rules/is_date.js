"use strict";
exports.__esModule = true;
exports.isDate = void 0;
var utils_ts_1 = require("../utils.ts");
function isDate(value) {
    if (typeof value !== "string") {
        return (0, utils_ts_1.invalid)("isDate", { value: value });
    }
    if (value.length < 10) {
        return (0, utils_ts_1.invalid)("isDate", { value: value });
    }
    var date = new Date(value);
    if (isNaN(date.getTime())) {
        return (0, utils_ts_1.invalid)("isDate", { value: value });
    }
}
exports.isDate = isDate;
