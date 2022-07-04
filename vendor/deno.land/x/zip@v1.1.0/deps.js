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
exports.log = exports.exists = exports.join = void 0;
var mod_ts_1 = require("https://deno.land/std@0.73.0/path/mod.ts");
__createBinding(exports, mod_ts_1, "join");
var mod_ts_2 = require("https://deno.land/std@0.73.0/fs/mod.ts");
__createBinding(exports, mod_ts_2, "exists");
exports.log = require("https://deno.land/std@0.73.0/log/mod.ts");
