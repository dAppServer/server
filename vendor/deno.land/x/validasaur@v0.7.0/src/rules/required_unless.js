"use strict";
exports.__esModule = true;
exports.requiredUnless = void 0;
var required_ts_1 = require("./required.ts");
function requiredUnless(field, fieldValue) {
    return function requiredUnlessRule(value, _a) {
        var getValue = _a.getValue;
        var val = getValue(field);
        if (val !== fieldValue) {
            return (0, required_ts_1.required)(value);
        }
    };
}
exports.requiredUnless = requiredUnless;
