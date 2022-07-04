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
exports.superagent = exports.mergeDescriptors = exports.methods = exports.assertEquals = exports.STATUS_TEXT = exports.Server = void 0;
var server_ts_1 = require("https://deno.land/std@0.129.0/http/server.ts");
__createBinding(exports, server_ts_1, "Server");
var http_status_ts_1 = require("https://deno.land/std@0.129.0/http/http_status.ts");
__createBinding(exports, http_status_ts_1, "STATUS_TEXT");
var asserts_ts_1 = require("https://deno.land/std@0.129.0/testing/asserts.ts");
__createBinding(exports, asserts_ts_1, "assertEquals");
var methods_ts_1 = require("https://deno.land/x/opine@2.1.2/src/methods.ts");
__createBinding(exports, methods_ts_1, "methods");
var mergeDescriptors_ts_1 = require("https://deno.land/x/opine@2.1.2/src/utils/mergeDescriptors.ts");
__createBinding(exports, mergeDescriptors_ts_1, "mergeDescriptors");
var superagent_6_1_0_1 = require("https://jspm.dev/superagent@6.1.0");
__createBinding(exports, superagent_6_1_0_1, "default", "superagent");
