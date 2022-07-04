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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.once = exports.on = exports.listenerCount = exports.errorMonitor = exports.captureRejectionSymbol = exports.EventEmitter = exports.defaultMaxListeners = void 0;
var assert_ts_1 = require("../_util/assert.ts");
var _errors_ts_1 = require("./_errors.ts");
var util_ts_1 = require("./util.ts");
function ensureArray(maybeArray) {
    return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
}
function createIterResult(value, done) {
    return { value: value, done: done };
}
exports.defaultMaxListeners = 10;
function validateMaxListeners(n, name) {
    if (!Number.isInteger(n) || n < 0) {
        throw new _errors_ts_1.ERR_OUT_OF_RANGE(name, "a non-negative number", (0, util_ts_1.inspect)(n));
    }
}
var EventEmitter = (function () {
    function EventEmitter() {
        this._events = Object.create(null);
    }
    Object.defineProperty(EventEmitter, "defaultMaxListeners", {
        get: function () {
            return exports.defaultMaxListeners;
        },
        set: function (value) {
            validateMaxListeners(value, "defaultMaxListeners");
            exports.defaultMaxListeners = value;
        },
        enumerable: false,
        configurable: true
    });
    EventEmitter.prototype._addListener = function (eventName, listener, prepend) {
        this.checkListenerArgument(listener);
        this.emit("newListener", eventName, this.unwrapListener(listener));
        if (this.hasListeners(eventName)) {
            var listeners = this._events[eventName];
            if (!Array.isArray(listeners)) {
                listeners = [listeners];
                this._events[eventName] = listeners;
            }
            if (prepend) {
                listeners.unshift(listener);
            }
            else {
                listeners.push(listener);
            }
        }
        else {
            this._events[eventName] = listener;
        }
        var max = this.getMaxListeners();
        if (max > 0 && this.listenerCount(eventName) > max) {
            var warning = new MaxListenersExceededWarning(this, eventName);
            this.warnIfNeeded(eventName, warning);
        }
        return this;
    };
    EventEmitter.prototype.addListener = function (eventName, listener) {
        return this._addListener(eventName, listener, false);
    };
    EventEmitter.prototype.emit = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.hasListeners(eventName)) {
            if (eventName === "error" &&
                this.hasListeners(EventEmitter.errorMonitor)) {
                this.emit.apply(this, __spreadArray([EventEmitter.errorMonitor], args, false));
            }
            var listeners = ensureArray(this._events[eventName])
                .slice();
            for (var _a = 0, listeners_1 = listeners; _a < listeners_1.length; _a++) {
                var listener = listeners_1[_a];
                try {
                    listener.apply(this, args);
                }
                catch (err) {
                    this.emit("error", err);
                }
            }
            return true;
        }
        else if (eventName === "error") {
            if (this.hasListeners(EventEmitter.errorMonitor)) {
                this.emit.apply(this, __spreadArray([EventEmitter.errorMonitor], args, false));
            }
            var errMsg = args.length > 0 ? args[0] : Error("Unhandled error.");
            throw errMsg;
        }
        return false;
    };
    EventEmitter.prototype.eventNames = function () {
        return Reflect.ownKeys(this._events);
    };
    EventEmitter.prototype.getMaxListeners = function () {
        return this.maxListeners == null
            ? EventEmitter.defaultMaxListeners
            : this.maxListeners;
    };
    EventEmitter.prototype.listenerCount = function (eventName) {
        if (this.hasListeners(eventName)) {
            var maybeListeners = this._events[eventName];
            return Array.isArray(maybeListeners) ? maybeListeners.length : 1;
        }
        else {
            return 0;
        }
    };
    EventEmitter.listenerCount = function (emitter, eventName) {
        return emitter.listenerCount(eventName);
    };
    EventEmitter.prototype._listeners = function (target, eventName, unwrap) {
        if (!target.hasListeners(eventName)) {
            return [];
        }
        var eventListeners = target._events[eventName];
        if (Array.isArray(eventListeners)) {
            return unwrap
                ? this.unwrapListeners(eventListeners)
                : eventListeners.slice(0);
        }
        else {
            return [
                unwrap ? this.unwrapListener(eventListeners) : eventListeners,
            ];
        }
    };
    EventEmitter.prototype.unwrapListeners = function (arr) {
        var unwrappedListeners = new Array(arr.length);
        for (var i = 0; i < arr.length; i++) {
            unwrappedListeners[i] = this.unwrapListener(arr[i]);
        }
        return unwrappedListeners;
    };
    EventEmitter.prototype.unwrapListener = function (listener) {
        var _a;
        return (_a = listener["listener"]) !== null && _a !== void 0 ? _a : listener;
    };
    EventEmitter.prototype.listeners = function (eventName) {
        return this._listeners(this, eventName, true);
    };
    EventEmitter.prototype.rawListeners = function (eventName) {
        return this._listeners(this, eventName, false);
    };
    EventEmitter.prototype.off = function (eventName, listener) {
    };
    EventEmitter.prototype.on = function (eventName, listener) {
    };
    EventEmitter.prototype.once = function (eventName, listener) {
        var wrapped = this.onceWrap(eventName, listener);
        this.on(eventName, wrapped);
        return this;
    };
    EventEmitter.prototype.onceWrap = function (eventName, listener) {
        this.checkListenerArgument(listener);
        var wrapper = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this.isCalled) {
                return;
            }
            this.context.removeListener(this.eventName, this.listener);
            this.isCalled = true;
            return this.listener.apply(this.context, args);
        };
        var wrapperContext = {
            eventName: eventName,
            listener: listener,
            rawListener: wrapper,
            context: this
        };
        var wrapped = wrapper.bind(wrapperContext);
        wrapperContext.rawListener = wrapped;
        wrapped.listener = listener;
        return wrapped;
    };
    EventEmitter.prototype.prependListener = function (eventName, listener) {
        return this._addListener(eventName, listener, true);
    };
    EventEmitter.prototype.prependOnceListener = function (eventName, listener) {
        var wrapped = this.onceWrap(eventName, listener);
        this.prependListener(eventName, wrapped);
        return this;
    };
    EventEmitter.prototype.removeAllListeners = function (eventName) {
        var _this = this;
        if (this._events === undefined) {
            return this;
        }
        if (eventName) {
            if (this.hasListeners(eventName)) {
                var listeners = ensureArray(this._events[eventName]).slice()
                    .reverse();
                for (var _i = 0, listeners_2 = listeners; _i < listeners_2.length; _i++) {
                    var listener = listeners_2[_i];
                    this.removeListener(eventName, this.unwrapListener(listener));
                }
            }
        }
        else {
            var eventList = this.eventNames();
            eventList.forEach(function (eventName) {
                if (eventName === "removeListener")
                    return;
                _this.removeAllListeners(eventName);
            });
            this.removeAllListeners("removeListener");
        }
        return this;
    };
    EventEmitter.prototype.removeListener = function (eventName, listener) {
        this.checkListenerArgument(listener);
        if (this.hasListeners(eventName)) {
            var maybeArr = this._events[eventName];
            (0, assert_ts_1.assert)(maybeArr);
            var arr = ensureArray(maybeArr);
            var listenerIndex = -1;
            for (var i = arr.length - 1; i >= 0; i--) {
                if (arr[i] == listener ||
                    (arr[i] && arr[i]["listener"] == listener)) {
                    listenerIndex = i;
                    break;
                }
            }
            if (listenerIndex >= 0) {
                arr.splice(listenerIndex, 1);
                if (arr.length === 0) {
                    delete this._events[eventName];
                }
                else if (arr.length === 1) {
                    this._events[eventName] = arr[0];
                }
                if (this._events.removeListener) {
                    this.emit("removeListener", eventName, listener);
                }
            }
        }
        return this;
    };
    EventEmitter.prototype.setMaxListeners = function (n) {
        if (n !== Infinity) {
            validateMaxListeners(n, "n");
        }
        this.maxListeners = n;
        return this;
    };
    EventEmitter.once = function (emitter, name) {
        return new Promise(function (resolve, reject) {
            if (emitter instanceof EventTarget) {
                emitter.addEventListener(name, function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    resolve(args);
                }, { once: true, passive: false, capture: false });
                return;
            }
            else if (emitter instanceof EventEmitter) {
                var eventListener_1 = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (errorListener_1 !== undefined) {
                        emitter.removeListener("error", errorListener_1);
                    }
                    resolve(args);
                };
                var errorListener_1;
                if (name !== "error") {
                    errorListener_1 = function (err) {
                        emitter.removeListener(name, eventListener_1);
                        reject(err);
                    };
                    emitter.once("error", errorListener_1);
                }
                emitter.once(name, eventListener_1);
                return;
            }
        });
    };
    EventEmitter.on = function (emitter, event) {
        var _a;
        var unconsumedEventValues = [];
        var unconsumedPromises = [];
        var error = null;
        var finished = false;
        var iterator = (_a = {
                next: function () {
                    var value = unconsumedEventValues.shift();
                    if (value) {
                        return Promise.resolve(createIterResult(value, false));
                    }
                    if (error) {
                        var p = Promise.reject(error);
                        error = null;
                        return p;
                    }
                    if (finished) {
                        return Promise.resolve(createIterResult(undefined, true));
                    }
                    return new Promise(function (resolve, reject) {
                        unconsumedPromises.push({ resolve: resolve, reject: reject });
                    });
                },
                "return": function () {
                    emitter.removeListener(event, eventHandler);
                    emitter.removeListener("error", errorHandler);
                    finished = true;
                    for (var _i = 0, unconsumedPromises_1 = unconsumedPromises; _i < unconsumedPromises_1.length; _i++) {
                        var promise = unconsumedPromises_1[_i];
                        promise.resolve(createIterResult(undefined, true));
                    }
                    return Promise.resolve(createIterResult(undefined, true));
                },
                "throw": function (err) {
                    error = err;
                    emitter.removeListener(event, eventHandler);
                    emitter.removeListener("error", errorHandler);
                }
            },
            _a[Symbol.asyncIterator] = function () {
                return this;
            },
            _a);
        emitter.on(event, eventHandler);
        emitter.on("error", errorHandler);
        return iterator;
        function eventHandler() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var promise = unconsumedPromises.shift();
            if (promise) {
                promise.resolve(createIterResult(args, false));
            }
            else {
                unconsumedEventValues.push(args);
            }
        }
        function errorHandler(err) {
            finished = true;
            var toError = unconsumedPromises.shift();
            if (toError) {
                toError.reject(err);
            }
            else {
                error = err;
            }
            iterator["return"]();
        }
    };
    EventEmitter.prototype.checkListenerArgument = function (listener) {
        if (typeof listener !== "function") {
            throw new _errors_ts_1.ERR_INVALID_ARG_TYPE("listener", "function", listener);
        }
    };
    EventEmitter.prototype.warnIfNeeded = function (eventName, warning) {
        var listeners = this._events[eventName];
        if (listeners.warned) {
            return;
        }
        listeners.warned = true;
        console.warn(warning);
        var maybeProcess = globalThis.process;
        if (maybeProcess instanceof EventEmitter) {
            maybeProcess.emit("warning", warning);
        }
    };
    EventEmitter.prototype.hasListeners = function (eventName) {
        return this._events && Boolean(this._events[eventName]);
    };
    EventEmitter.captureRejectionSymbol = Symbol["for"]("nodejs.rejection");
    EventEmitter.errorMonitor = Symbol("events.errorMonitor");
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
EventEmitter.prototype.on = EventEmitter.prototype.addListener;
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
var MaxListenersExceededWarning = (function (_super) {
    __extends(MaxListenersExceededWarning, _super);
    function MaxListenersExceededWarning(emitter, type) {
        var _this = this;
        var listenerCount = emitter.listenerCount(type);
        var message = "Possible EventEmitter memory leak detected. " +
            "".concat(listenerCount, " ").concat(type == null ? "null" : type.toString(), " listeners added to [").concat(emitter.constructor.name, "]. ") +
            " Use emitter.setMaxListeners() to increase limit";
        _this = _super.call(this, message) || this;
        _this.emitter = emitter;
        _this.type = type;
        _this.count = listenerCount;
        _this.name = "MaxListenersExceededWarning";
        return _this;
    }
    return MaxListenersExceededWarning;
}(Error));
exports["default"] = Object.assign(EventEmitter, { EventEmitter: EventEmitter });
exports.captureRejectionSymbol = EventEmitter.captureRejectionSymbol;
exports.errorMonitor = EventEmitter.errorMonitor;
exports.listenerCount = EventEmitter.listenerCount;
exports.on = EventEmitter.on;
exports.once = EventEmitter.once;
