"use strict";
exports.__esModule = true;
exports.match = void 0;
var utils_ts_1 = require("../utils.ts");
function match(regex, trim) {
    if (trim === void 0) { trim = false; }
    return function matchRule(value) {
        if (typeof value !== "string") {
            return (0, utils_ts_1.invalid)("match", { value: value, regex: regex }, false);
        }
        if (trim) {
            value = value.trim();
        }
        if (!value.match(regex)) {
            return (0, utils_ts_1.invalid)("match", { value: value, regex: regex }, false);
        }
    };
}
exports.match = match;
