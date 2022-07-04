"use strict";
exports.__esModule = true;
exports.v5 = exports.v4 = exports.v1 = exports.v3 = exports.isNil = exports.NIL_UUID = void 0;
var v1 = require("./v1.ts");
exports.v1 = v1;
var v4 = require("./v4.ts");
exports.v4 = v4;
var v5 = require("./v5.ts");
exports.v5 = v5;
exports.NIL_UUID = "00000000-0000-0000-0000-000000000000";
function isNil(val) {
    return val === exports.NIL_UUID;
}
exports.isNil = isNil;
var NOT_IMPLEMENTED = {
    generate: function () {
        throw new Error("Not implemented");
    },
    validate: function () {
        throw new Error("Not implemented");
    }
};
exports.v3 = NOT_IMPLEMENTED;
