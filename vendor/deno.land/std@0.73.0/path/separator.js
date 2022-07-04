"use strict";
exports.__esModule = true;
exports.SEP_PATTERN = exports.SEP = void 0;
var _constants_ts_1 = require("./_constants.ts");
exports.SEP = _constants_ts_1.isWindows ? "\\" : "/";
exports.SEP_PATTERN = _constants_ts_1.isWindows ? /[\\/]+/ : /\/+/;
