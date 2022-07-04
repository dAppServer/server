"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _WebSocketEndpoint_socket, _WebSocketEndpoint_state, _WebSocketEndpoint_frames, _WebSocketEndpoint_queue, _WebSocketEndpoint_options, _WebSocketEndpoint_routingIdReceived, _WebSocketEndpoint_accepted;
exports.__esModule = true;
exports.WebSocketEndpoint = void 0;
var events_ts_1 = require("https://deno.land/std@0.108.0/node/events.ts");
var Types_ts_1 = require("./Types.ts");
var State;
(function (State) {
    State[State["Closed"] = 0] = "Closed";
    State[State["Connecting"] = 1] = "Connecting";
    State[State["Reconnecting"] = 2] = "Reconnecting";
    State[State["Active"] = 3] = "Active";
})(State || (State = {}));
var WebSocketEndpoint = (function (_super) {
    __extends(WebSocketEndpoint, _super);
    function WebSocketEndpoint(address, options, data) {
        var _this = _super.call(this) || this;
        _WebSocketEndpoint_socket.set(_this, void 0);
        _WebSocketEndpoint_state.set(_this, void 0);
        _WebSocketEndpoint_frames.set(_this, []);
        _WebSocketEndpoint_queue.set(_this, []);
        _WebSocketEndpoint_options.set(_this, void 0);
        _WebSocketEndpoint_routingIdReceived.set(_this, false);
        _WebSocketEndpoint_accepted.set(_this, void 0);
        _this.routingKey = Types_ts_1.Buffer.alloc(0);
        _this.routingKeyString = "";
        __classPrivateFieldSet(_this, _WebSocketEndpoint_options, options, "f");
        _this.data = data;
        _this.connect = _this.connect.bind(_this);
        if (typeof address === "string") {
            _this.address = address;
            __classPrivateFieldSet(_this, _WebSocketEndpoint_state, State.Connecting, "f");
            __classPrivateFieldSet(_this, _WebSocketEndpoint_accepted, false, "f");
            _this.connect();
        }
        else {
            __classPrivateFieldSet(_this, _WebSocketEndpoint_routingIdReceived, false, "f");
            _this.address = "";
            __classPrivateFieldSet(_this, _WebSocketEndpoint_socket, address, "f");
            __classPrivateFieldSet(_this, _WebSocketEndpoint_accepted, true, "f");
            __classPrivateFieldSet(_this, _WebSocketEndpoint_state, State.Active, "f");
            __classPrivateFieldGet(_this, _WebSocketEndpoint_socket, "f").binaryType = "arraybuffer";
            __classPrivateFieldGet(_this, _WebSocketEndpoint_socket, "f").onclose = _this.onClose.bind(_this);
            __classPrivateFieldGet(_this, _WebSocketEndpoint_socket, "f").onmessage = _this.onMessage.bind(_this);
            _this.send([__classPrivateFieldGet(_this, _WebSocketEndpoint_options, "f").routingId]);
        }
        return _this;
    }
    WebSocketEndpoint.prototype.connect = function () {
        if (__classPrivateFieldGet(this, _WebSocketEndpoint_state, "f") === State.Closed) {
            return;
        }
        __classPrivateFieldSet(this, _WebSocketEndpoint_routingIdReceived, false, "f");
        __classPrivateFieldSet(this, _WebSocketEndpoint_socket, new WebSocket(this.address, ["ZWS2.0"]), "f");
        __classPrivateFieldGet(this, _WebSocketEndpoint_socket, "f").binaryType = "arraybuffer";
        __classPrivateFieldGet(this, _WebSocketEndpoint_socket, "f").onopen = this.onOpen.bind(this);
        __classPrivateFieldGet(this, _WebSocketEndpoint_socket, "f").onclose = this.onClose.bind(this);
        __classPrivateFieldGet(this, _WebSocketEndpoint_socket, "f").onmessage = this.onMessage.bind(this);
    };
    WebSocketEndpoint.prototype.onOpen = function () {
        var _this = this;
        var oldState = __classPrivateFieldGet(this, _WebSocketEndpoint_state, "f");
        __classPrivateFieldSet(this, _WebSocketEndpoint_state, State.Active, "f");
        this.send([__classPrivateFieldGet(this, _WebSocketEndpoint_options, "f").routingId]);
        __classPrivateFieldGet(this, _WebSocketEndpoint_queue, "f").forEach(function (frame) { return __classPrivateFieldGet(_this, _WebSocketEndpoint_socket, "f").send(frame); });
        __classPrivateFieldSet(this, _WebSocketEndpoint_queue, [], "f");
        if (__classPrivateFieldGet(this, _WebSocketEndpoint_options, "f").immediate) {
            this.emit("attach", this);
        }
        else if (oldState === State.Reconnecting) {
            this.emit("hiccuped", this);
        }
    };
    WebSocketEndpoint.prototype.onClose = function () {
        if (__classPrivateFieldGet(this, _WebSocketEndpoint_accepted, "f")) {
            __classPrivateFieldSet(this, _WebSocketEndpoint_state, State.Closed, "f");
            this.emit("terminated", this);
        }
        else if (__classPrivateFieldGet(this, _WebSocketEndpoint_state, "f") !== State.Closed) {
            if ((__classPrivateFieldGet(this, _WebSocketEndpoint_state, "f") === State.Active ||
                __classPrivateFieldGet(this, _WebSocketEndpoint_state, "f") === State.Connecting) &&
                __classPrivateFieldGet(this, _WebSocketEndpoint_options, "f").immediate) {
                this.emit("terminated", this);
            }
            if (__classPrivateFieldGet(this, _WebSocketEndpoint_state, "f") === State.Active) {
                __classPrivateFieldSet(this, _WebSocketEndpoint_state, State.Reconnecting, "f");
            }
            setTimeout(this.connect, __classPrivateFieldGet(this, _WebSocketEndpoint_options, "f").reconnectInterval);
        }
    };
    WebSocketEndpoint.prototype.error = function () {
        __classPrivateFieldGet(this, _WebSocketEndpoint_socket, "f").close();
    };
    WebSocketEndpoint.prototype.onMessage = function (message) {
        if (!__classPrivateFieldGet(this, _WebSocketEndpoint_routingIdReceived, "f")) {
            __classPrivateFieldSet(this, _WebSocketEndpoint_routingIdReceived, true, "f");
            if (!__classPrivateFieldGet(this, _WebSocketEndpoint_options, "f").recvRoutingId) {
                return;
            }
        }
        if (message.data instanceof ArrayBuffer) {
            var buffer = Types_ts_1.Buffer.from(message.data);
            if (buffer.length > 0) {
                var more = buffer.readUInt8(0) === 1;
                var msg = buffer.slice(1);
                __classPrivateFieldGet(this, _WebSocketEndpoint_frames, "f").push(msg);
                if (!more) {
                    this.emit.apply(this, __spreadArray(["message", this], __classPrivateFieldGet(this, _WebSocketEndpoint_frames, "f"), false));
                    __classPrivateFieldSet(this, _WebSocketEndpoint_frames, [], "f");
                }
            }
            else {
                this.error();
            }
        }
        else {
            this.error();
        }
    };
    WebSocketEndpoint.prototype.close = function () {
        if (__classPrivateFieldGet(this, _WebSocketEndpoint_state, "f") !== State.Closed) {
            __classPrivateFieldSet(this, _WebSocketEndpoint_state, State.Closed, "f");
            if (__classPrivateFieldGet(this, _WebSocketEndpoint_socket, "f").readyState === __classPrivateFieldGet(this, _WebSocketEndpoint_socket, "f").CONNECTING ||
                __classPrivateFieldGet(this, _WebSocketEndpoint_socket, "f").readyState === __classPrivateFieldGet(this, _WebSocketEndpoint_socket, "f").OPEN) {
                __classPrivateFieldGet(this, _WebSocketEndpoint_socket, "f").close();
            }
            this.emit("terminated", this);
        }
    };
    WebSocketEndpoint.prototype.send = function (msg) {
        if (__classPrivateFieldGet(this, _WebSocketEndpoint_state, "f") === State.Closed) {
            return false;
        }
        for (var i = 0, len = msg.length; i < len; i++) {
            var isLast = i === len - 1;
            var flags = isLast ? 0 : 1;
            var frame = msg[i];
            if (typeof frame === "string") {
                frame = Types_ts_1.Buffer.from(frame, "utf8");
            }
            else if (frame instanceof ArrayBuffer ||
                frame instanceof Types_ts_1.Buffer) {
            }
            else {
                throw new Error("invalid message type");
            }
            var flagsArray = Types_ts_1.Buffer.alloc(1);
            flagsArray.writeUInt8(flags, 0);
            var buffer = Types_ts_1.Buffer.concat([flagsArray, frame]);
            if (__classPrivateFieldGet(this, _WebSocketEndpoint_state, "f") === State.Active) {
                __classPrivateFieldGet(this, _WebSocketEndpoint_socket, "f").send(buffer);
            }
            else {
                __classPrivateFieldGet(this, _WebSocketEndpoint_queue, "f").push(buffer);
            }
        }
        return true;
    };
    return WebSocketEndpoint;
}(events_ts_1.EventEmitter));
exports.WebSocketEndpoint = WebSocketEndpoint;
_WebSocketEndpoint_socket = new WeakMap(), _WebSocketEndpoint_state = new WeakMap(), _WebSocketEndpoint_frames = new WeakMap(), _WebSocketEndpoint_queue = new WeakMap(), _WebSocketEndpoint_options = new WeakMap(), _WebSocketEndpoint_routingIdReceived = new WeakMap(), _WebSocketEndpoint_accepted = new WeakMap();
