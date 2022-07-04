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
exports.assertThrowsAsync = exports.assertNotEquals = exports.assertEquals = exports.isWebSocketPongEvent = exports.isWebSocketPingEvent = exports.isWebSocketCloseEvent = exports.acceptWebSocket = exports.Server = exports.serve = exports.on = exports.EventEmitter = void 0;
var events_ts_1 = require("https://deno.land/std@0.92.0/node/events.ts");
__createBinding(exports, events_ts_1, "EventEmitter");
__createBinding(exports, events_ts_1, "on");
var server_ts_1 = require("https://deno.land/std@0.92.0/http/server.ts");
__createBinding(exports, server_ts_1, "serve");
__createBinding(exports, server_ts_1, "Server");
var mod_ts_1 = require("https://deno.land/std@0.92.0/ws/mod.ts");
__createBinding(exports, mod_ts_1, "acceptWebSocket");
__createBinding(exports, mod_ts_1, "isWebSocketCloseEvent");
__createBinding(exports, mod_ts_1, "isWebSocketPingEvent");
__createBinding(exports, mod_ts_1, "isWebSocketPongEvent");
var asserts_ts_1 = require("https://deno.land/std@0.92.0/testing/asserts.ts");
__createBinding(exports, asserts_ts_1, "assertEquals");
__createBinding(exports, asserts_ts_1, "assertNotEquals");
__createBinding(exports, asserts_ts_1, "assertThrowsAsync");
