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
exports.WebSocketError = exports.WebSocketState = exports.WebSocketServer = exports.WebSocketAcceptedClient = exports.StandardWebSocketClient = void 0;
var websocket_ts_1 = require("./lib/websocket.ts");
__createBinding(exports, websocket_ts_1, "StandardWebSocketClient");
__createBinding(exports, websocket_ts_1, "WebSocketAcceptedClient");
__createBinding(exports, websocket_ts_1, "WebSocketServer");
__createBinding(exports, websocket_ts_1, "WebSocketState");
var errors_ts_1 = require("./lib/errors.ts");
__createBinding(exports, errors_ts_1, "WebSocketError");
