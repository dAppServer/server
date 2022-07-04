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
exports.__esModule = true;
exports.VERSION = exports.DENO_SUPPORTED_VERSIONS = exports.Test = exports.superdeno = void 0;
var superdeno_ts_1 = require("./src/superdeno.ts");
__createBinding(exports, superdeno_ts_1, "superdeno");
var test_ts_1 = require("./src/test.ts");
__createBinding(exports, test_ts_1, "Test");
var version_ts_1 = require("./version.ts");
__createBinding(exports, version_ts_1, "DENO_SUPPORTED_VERSIONS");
__createBinding(exports, version_ts_1, "VERSION");
