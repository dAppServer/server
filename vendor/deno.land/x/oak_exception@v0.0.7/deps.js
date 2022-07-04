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
exports.STATUS_TEXT = exports.Status = exports.vary = void 0;
var mod_ts_1 = require("https://deno.land/x/vary@1.0.0/mod.ts");
__createBinding(exports, mod_ts_1, "vary");
var http_status_ts_1 = require("https://deno.land/std@0.115.1/http/http_status.ts");
__createBinding(exports, http_status_ts_1, "Status");
__createBinding(exports, http_status_ts_1, "STATUS_TEXT");
