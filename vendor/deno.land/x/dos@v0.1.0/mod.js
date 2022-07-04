"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var systemPaths_ts_1 = require("./os/systemPaths.ts");
var systemInfo_ts_1 = require("./os/systemInfo.ts");
var os = __assign(__assign({}, systemPaths_ts_1["default"]), systemInfo_ts_1["default"]);
exports["default"] = os;
