"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
exports.SEP_PATTERN = exports.SEP = exports.toNamespacedPath = exports.toFileUrl = exports.sep = exports.resolve = exports.relative = exports.parse = exports.normalize = exports.join = exports.isAbsolute = exports.fromFileUrl = exports.format = exports.extname = exports.dirname = exports.delimiter = exports.basename = exports.posix = exports.win32 = void 0;
var os_ts_1 = require("../_util/os.ts");
var _win32 = require("./win32.ts");
var _posix = require("./posix.ts");
var path = os_ts_1.isWindows ? _win32 : _posix;
exports.win32 = _win32;
exports.posix = _posix;
exports.basename = path.basename, exports.delimiter = path.delimiter, exports.dirname = path.dirname, exports.extname = path.extname, exports.format = path.format, exports.fromFileUrl = path.fromFileUrl, exports.isAbsolute = path.isAbsolute, exports.join = path.join, exports.normalize = path.normalize, exports.parse = path.parse, exports.relative = path.relative, exports.resolve = path.resolve, exports.sep = path.sep, exports.toFileUrl = path.toFileUrl, exports.toNamespacedPath = path.toNamespacedPath;
__exportStar(require("./common.ts"), exports);
var separator_ts_1 = require("./separator.ts");
__createBinding(exports, separator_ts_1, "SEP");
__createBinding(exports, separator_ts_1, "SEP_PATTERN");
__exportStar(require("./_interface.ts"), exports);
__exportStar(require("./glob.ts"), exports);
