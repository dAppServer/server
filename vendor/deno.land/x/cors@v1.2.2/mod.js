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
exports.attainCors = exports.mithCors = exports.opineCors = exports.abcCors = exports.oakCors = void 0;
__exportStar(require("./types.ts"), exports);
var oakCors_ts_1 = require("./oakCors.ts");
__createBinding(exports, oakCors_ts_1, "oakCors");
var abcCors_ts_1 = require("./abcCors.ts");
__createBinding(exports, abcCors_ts_1, "abcCors");
var opineCors_ts_1 = require("./opineCors.ts");
__createBinding(exports, opineCors_ts_1, "opineCors");
var mithCors_ts_1 = require("./mithCors.ts");
__createBinding(exports, mithCors_ts_1, "mithCors");
var attainCors_ts_1 = require("./attainCors.ts");
__createBinding(exports, attainCors_ts_1, "attainCors");
