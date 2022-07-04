"use strict";
exports.__esModule = true;
var env = Deno.env;
var systemPaths = {};
systemPaths.homeDir = function () { var _a; return "".concat((_a = env.get('HOME')) !== null && _a !== void 0 ? _a : env.get('USERPROFILE')); };
systemPaths.tempDir = function () { var _a; return "".concat((_a = env.get('TEMP')) !== null && _a !== void 0 ? _a : env.get('TEMPDIR')); };
exports["default"] = systemPaths;
