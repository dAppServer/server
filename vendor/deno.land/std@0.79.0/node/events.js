"use strict";
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
exports.errorMonitor = exports.captureRejectionSymbol = exports.on = exports.once = exports.EventEmitter = exports.defaultMaxListeners = void 0;
var _utils_ts_1 = require("./_utils.ts");
var assert_ts_1 = require("../_util/assert.ts");
function createIterResult(value, done) {
    return { value: value, done: done };
}
exports.defaultMaxListeners = 10;
var EventEmitter = (function () {
    function EventEmitter() {
        this._events = new Map();
    }
    Object.defineProperty(EventEmitter, "defaultMaxListeners", {
        get: function () {
            return exports.defaultMaxListeners;
        },
        set: function (value) {
            exports.defaultMaxListeners = value;
        },
        enumerable: false,
        configurable: true
    });
    EventEmitter.prototype._addListener = function (eventName, listener, prepend) {
        this.emit("newListener", eventName, listener);
        if (this._events.has(eventName)) {
            var listeners = this._events.get(eventName);
            if (prepend) {
                listeners.unshift(listener);
            }
            else {
                listeners.push(listener);
            }
        }
        else {
            this._events.set(eventName, [listener]);
        }
        var max = this.getMaxListeners();
        if (max > 0 && this.listenerCount(eventName) > max) {
            var warning = new Error("Possible EventEmitter memory leak detected.\n         ".concat(this.listenerCount(eventName), " ").concat(eventName.toString(), " listeners.\n         Use emitter.setMaxListeners() to increase limit"));
            warning.name = "MaxListenersExceededWarning";
            console.warn(warning);
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
        if (this._events.has(eventName)) {
            if (eventName === "error" &&
                this._events.get(EventEmitter.errorMonitor)) {
                this.emit.apply(this, __spreadArray([EventEmitter.errorMonitor], args, false));
            }
            var listeners = this._events.get(eventName).slice();
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
            if (this._events.get(EventEmitter.errorMonitor)) {
                this.emit.apply(this, __spreadArray([EventEmitter.errorMonitor], args, false));
            }
            var errMsg = args.length > 0 ? args[0] : Error("Unhandled error.");
            throw errMsg;
        }
        return false;
    };
    EventEmitter.prototype.eventNames = function () {
        return Array.from(this._events.keys());
    };
    EventEmitter.prototype.getMaxListeners = function () {
        return this.maxListeners || EventEmitter.defaultMaxListeners;
    };
    EventEmitter.prototype.listenerCount = function (eventName) {
        if (this._events.has(eventName)) {
            return this._events.get(eventName).length;
        }
        else {
            return 0;
        }
    };
    EventEmitter.prototype._listeners = function (target, eventName, unwrap) {
        if (!target._events.has(eventName)) {
            return [];
        }
        var eventListeners = target._events.get(eventName);
        return unwrap
            ? this.unwrapListeners(eventListeners)
            : eventListeners.slice(0);
    };
    EventEmitter.prototype.unwrapListeners = function (arr) {
        var unwrappedListeners = new Array(arr.length);
        for (var i = 0; i < arr.length; i++) {
            unwrappedListeners[i] = arr[i]["listener"] || arr[i];
        }
        return unwrappedListeners;
    };
    EventEmitter.prototype.listeners = function (eventName) {
        return this._listeners(this, eventName, true);
    };
    EventEmitter.prototype.rawListeners = function (eventName) {
        return this._listeners(this, eventName, false);
    };
    EventEmitter.prototype.off = function (eventName, listener) {
        return this.removeListener(eventName, listener);
    };
    EventEmitter.prototype.on = function (eventName, listener) {
        return this._addListener(eventName, listener, false);
    };
    EventEmitter.prototype.once = function (eventName, listener) {
        var wrapped = this.onceWrap(eventName, listener);
        this.on(eventName, wrapped);
        return this;
    };
    EventEmitter.prototype.onceWrap = function (eventName, listener) {
        var wrapper = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.context.removeListener(this.eventName, this.rawListener);
            this.listener.apply(this.context, args);
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
            if (this._events.has(eventName)) {
                var listeners = this._events.get(eventName).slice();
                this._events["delete"](eventName);
                for (var _i = 0, listeners_2 = listeners; _i < listeners_2.length; _i++) {
                    var listener = listeners_2[_i];
                    this.emit("removeListener", eventName, listener);
                }
            }
        }
        else {
            var eventList = this.eventNames();
            eventList.map(function (value) {
                _this.removeAllListeners(value);
            });
        }
        return this;
    };
    EventEmitter.prototype.removeListener = function (eventName, listener) {
        if (this._events.has(eventName)) {
            var arr = this._events.get(eventName);
            (0, assert_ts_1.assert)(arr);
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
                this.emit("removeListener", eventName, listener);
                if (arr.length === 0) {
                    this._events["delete"](eventName);
                }
            }
        }
        return this;
    };
    EventEmitter.prototype.setMaxListeners = function (n) {
        if (n !== Infinity) {
            if (n === 0) {
                n = Infinity;
            }
            else {
                (0, _utils_ts_1.validateIntegerRange)(n, "maxListeners", 0);
            }
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
    EventEmitter.captureRejectionSymbol = Symbol["for"]("nodejs.rejection");
    EventEmitter.errorMonitor = Symbol("events.errorMonitor");
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
exports["default"] = EventEmitter;
exports.once = EventEmitter.once;
exports.on = EventEmitter.on;
exports.captureRejectionSymbol = EventEmitter.captureRejectionSymbol;
exports.errorMonitor = EventEmitter.errorMonitor;
