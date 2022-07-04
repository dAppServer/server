"use strict";
exports.__esModule = true;
exports.isEmail = void 0;
var utils_ts_1 = require("../utils.ts");
function isEmail(value) {
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (typeof value !== "string" || !regex.test(value.toLowerCase())) {
        return (0, utils_ts_1.invalid)("isEmail", { value: value });
    }
}
exports.isEmail = isEmail;
