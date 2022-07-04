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
exports.Cache = exports.green = exports.extname = void 0;
var mod_ts_1 = require("https://deno.land/std@0.122.0/path/mod.ts");
__createBinding(exports, mod_ts_1, "extname");
var colors_ts_1 = require("https://deno.land/std@0.122.0/fmt/colors.ts");
__createBinding(exports, colors_ts_1, "green");
exports.Cache = require("https://deno.land/x/cache@0.2.13/mod.ts");
