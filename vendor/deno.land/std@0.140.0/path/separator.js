"use strict";
exports.__esModule = true;
exports.SEP_PATTERN = exports.SEP = void 0;
var os_ts_1 = require("../_util/os.ts");
exports.SEP = os_ts_1.isWindows ? "\\" : "/";
exports.SEP_PATTERN = os_ts_1.isWindows ? /[\\/]+/ : /\/+/;
