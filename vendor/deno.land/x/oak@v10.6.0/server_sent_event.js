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
var _ServerSentEvent_data, _ServerSentEvent_id, _ServerSentEvent_type, _SSEStreamTarget_instances, _SSEStreamTarget_closed, _SSEStreamTarget_context, _SSEStreamTarget_controller, _SSEStreamTarget_keepAliveId, _SSEStreamTarget_error, _SSEStreamTarget_push;
exports.__esModule = true;
exports.SSEStreamTarget = exports.ServerSentEvent = void 0;
var util_ts_1 = require("./util.ts");
var encoder = new TextEncoder();
var DEFAULT_KEEP_ALIVE_INTERVAL = 30000;
var CloseEvent = (function (_super) {
    __extends(CloseEvent, _super);
    function CloseEvent(eventInit) {
        return _super.call(this, "close", eventInit) || this;
    }
    return CloseEvent;
}(Event));
var ServerSentEvent = (function (_super) {
    __extends(ServerSentEvent, _super);
    function ServerSentEvent(type, data, eventInit) {
        if (eventInit === void 0) { eventInit = {}; }
        var _this = _super.call(this, type, eventInit) || this;
        _ServerSentEvent_data.set(_this, void 0);
        _ServerSentEvent_id.set(_this, void 0);
        _ServerSentEvent_type.set(_this, void 0);
        var replacer = eventInit.replacer, space = eventInit.space;
        __classPrivateFieldSet(_this, _ServerSentEvent_type, type, "f");
        try {
            __classPrivateFieldSet(_this, _ServerSentEvent_data, typeof data === "string"
                ? data
                : JSON.stringify(data, replacer, space), "f");
        }
        catch (e) {
            (0, util_ts_1.assert)(e instanceof Error);
            throw new TypeError("data could not be coerced into a serialized string.\n  ".concat(e.message));
        }
        var id = eventInit.id;
        __classPrivateFieldSet(_this, _ServerSentEvent_id, id, "f");
        return _this;
    }
    Object.defineProperty(ServerSentEvent.prototype, "data", {
        get: function () {
            return __classPrivateFieldGet(this, _ServerSentEvent_data, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ServerSentEvent.prototype, "id", {
        get: function () {
            return __classPrivateFieldGet(this, _ServerSentEvent_id, "f");
        },
        enumerable: false,
        configurable: true
    });
    ServerSentEvent.prototype.toString = function () {
        var data = "data: ".concat(__classPrivateFieldGet(this, _ServerSentEvent_data, "f").split("\n").join("\ndata: "), "\n");
        return "".concat(__classPrivateFieldGet(this, _ServerSentEvent_type, "f") === "__message" ? "" : "event: ".concat(__classPrivateFieldGet(this, _ServerSentEvent_type, "f"), "\n")).concat(__classPrivateFieldGet(this, _ServerSentEvent_id, "f") ? "id: ".concat(String(__classPrivateFieldGet(this, _ServerSentEvent_id, "f")), "\n") : "").concat(data, "\n");
    };
    return ServerSentEvent;
}(Event));
exports.ServerSentEvent = ServerSentEvent;
_ServerSentEvent_data = new WeakMap(), _ServerSentEvent_id = new WeakMap(), _ServerSentEvent_type = new WeakMap();
var RESPONSE_HEADERS = [
    ["Connection", "Keep-Alive"],
    ["Content-Type", "text/event-stream"],
    ["Cache-Control", "no-cache"],
    ["Keep-Alive", "timeout=".concat(Number.MAX_SAFE_INTEGER)],
];
var SSEStreamTarget = (function (_super) {
    __extends(SSEStreamTarget, _super);
    function SSEStreamTarget(context, _a) {
        var _b = _a === void 0 ? {} : _a, headers = _b.headers, _c = _b.keepAlive, keepAlive = _c === void 0 ? false : _c;
        var _this = _super.call(this) || this;
        _SSEStreamTarget_instances.add(_this);
        _SSEStreamTarget_closed.set(_this, false);
        _SSEStreamTarget_context.set(_this, void 0);
        _SSEStreamTarget_controller.set(_this, void 0);
        _SSEStreamTarget_keepAliveId.set(_this, void 0);
        __classPrivateFieldSet(_this, _SSEStreamTarget_context, context, "f");
        context.response.body = new ReadableStream({
            start: function (controller) {
                __classPrivateFieldSet(_this, _SSEStreamTarget_controller, controller, "f");
            },
            cancel: function (error) {
                if (error instanceof Error && error.message.includes("connection closed")) {
                    _this.close();
                }
                else {
                    __classPrivateFieldGet(_this, _SSEStreamTarget_instances, "m", _SSEStreamTarget_error).call(_this, error);
                }
            }
        });
        if (headers) {
            for (var _i = 0, headers_1 = headers; _i < headers_1.length; _i++) {
                var _d = headers_1[_i], key = _d[0], value = _d[1];
                context.response.headers.set(key, value);
            }
        }
        for (var _e = 0, RESPONSE_HEADERS_1 = RESPONSE_HEADERS; _e < RESPONSE_HEADERS_1.length; _e++) {
            var _f = RESPONSE_HEADERS_1[_e], key = _f[0], value = _f[1];
            context.response.headers.set(key, value);
        }
        _this.addEventListener("close", function () {
            __classPrivateFieldSet(_this, _SSEStreamTarget_closed, true, "f");
            if (__classPrivateFieldGet(_this, _SSEStreamTarget_keepAliveId, "f") != null) {
                clearInterval(__classPrivateFieldGet(_this, _SSEStreamTarget_keepAliveId, "f"));
                __classPrivateFieldSet(_this, _SSEStreamTarget_keepAliveId, undefined, "f");
            }
            if (__classPrivateFieldGet(_this, _SSEStreamTarget_controller, "f")) {
                try {
                    __classPrivateFieldGet(_this, _SSEStreamTarget_controller, "f").close();
                }
                catch (_a) {
                }
            }
        });
        if (keepAlive) {
            var interval = typeof keepAlive === "number"
                ? keepAlive
                : DEFAULT_KEEP_ALIVE_INTERVAL;
            __classPrivateFieldSet(_this, _SSEStreamTarget_keepAliveId, setInterval(function () {
                _this.dispatchComment("keep-alive comment");
            }, interval), "f");
        }
        return _this;
    }
    Object.defineProperty(SSEStreamTarget.prototype, "closed", {
        get: function () {
            return __classPrivateFieldGet(this, _SSEStreamTarget_closed, "f");
        },
        enumerable: false,
        configurable: true
    });
    SSEStreamTarget.prototype.close = function () {
        this.dispatchEvent(new CloseEvent({ cancelable: false }));
        return Promise.resolve();
    };
    SSEStreamTarget.prototype.dispatchComment = function (comment) {
        __classPrivateFieldGet(this, _SSEStreamTarget_instances, "m", _SSEStreamTarget_push).call(this, ": ".concat(comment.split("\n").join("\n: "), "\n\n"));
        return true;
    };
    SSEStreamTarget.prototype.dispatchMessage = function (data) {
        var event = new ServerSentEvent("__message", data);
        return this.dispatchEvent(event);
    };
    SSEStreamTarget.prototype.dispatchEvent = function (event) {
        var dispatched = _super.prototype.dispatchEvent.call(this, event);
        if (dispatched && event instanceof ServerSentEvent) {
            __classPrivateFieldGet(this, _SSEStreamTarget_instances, "m", _SSEStreamTarget_push).call(this, String(event));
        }
        return dispatched;
    };
    SSEStreamTarget.prototype[(_SSEStreamTarget_closed = new WeakMap(), _SSEStreamTarget_context = new WeakMap(), _SSEStreamTarget_controller = new WeakMap(), _SSEStreamTarget_keepAliveId = new WeakMap(), _SSEStreamTarget_instances = new WeakSet(), _SSEStreamTarget_error = function _SSEStreamTarget_error(error) {
        console.log("error", error);
        this.dispatchEvent(new CloseEvent({ cancelable: false }));
        var errorEvent = new ErrorEvent("error", { error: error });
        this.dispatchEvent(errorEvent);
        __classPrivateFieldGet(this, _SSEStreamTarget_context, "f").app.dispatchEvent(errorEvent);
    }, _SSEStreamTarget_push = function _SSEStreamTarget_push(payload) {
        if (!__classPrivateFieldGet(this, _SSEStreamTarget_controller, "f")) {
            __classPrivateFieldGet(this, _SSEStreamTarget_instances, "m", _SSEStreamTarget_error).call(this, new Error("The controller has not been set."));
            return;
        }
        if (__classPrivateFieldGet(this, _SSEStreamTarget_closed, "f")) {
            return;
        }
        __classPrivateFieldGet(this, _SSEStreamTarget_controller, "f").enqueue(encoder.encode(payload));
    }, Symbol["for"]("Deno.customInspect"))] = function (inspect) {
        return "".concat(this.constructor.name, " ").concat(inspect({ "#closed": __classPrivateFieldGet(this, _SSEStreamTarget_closed, "f"), "#context": __classPrivateFieldGet(this, _SSEStreamTarget_context, "f") }));
    };
    SSEStreamTarget.prototype[Symbol["for"]("nodejs.util.inspect.custom")] = function (depth, options, inspect) {
        if (depth < 0) {
            return options.stylize("[".concat(this.constructor.name, "]"), "special");
        }
        var newOptions = Object.assign({}, options, {
            depth: options.depth === null ? null : options.depth - 1
        });
        return "".concat(options.stylize(this.constructor.name, "special"), " ").concat(inspect({ "#closed": __classPrivateFieldGet(this, _SSEStreamTarget_closed, "f"), "#context": __classPrivateFieldGet(this, _SSEStreamTarget_context, "f") }, newOptions));
    };
    return SSEStreamTarget;
}(EventTarget));
exports.SSEStreamTarget = SSEStreamTarget;
