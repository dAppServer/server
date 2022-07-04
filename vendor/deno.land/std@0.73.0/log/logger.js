"use strict";
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
var _LogRecord_args, _LogRecord_datetime, _Logger_level, _Logger_handlers, _Logger_loggerName;
exports.__esModule = true;
exports.Logger = exports.LogRecord = void 0;
var levels_ts_1 = require("./levels.ts");
var LogRecord = (function () {
    function LogRecord(options) {
        _LogRecord_args.set(this, void 0);
        _LogRecord_datetime.set(this, void 0);
        this.msg = options.msg;
        __classPrivateFieldSet(this, _LogRecord_args, __spreadArray([], options.args, true), "f");
        this.level = options.level;
        this.loggerName = options.loggerName;
        __classPrivateFieldSet(this, _LogRecord_datetime, new Date(), "f");
        this.levelName = (0, levels_ts_1.getLevelName)(options.level);
    }
    Object.defineProperty(LogRecord.prototype, "args", {
        get: function () {
            return __spreadArray([], __classPrivateFieldGet(this, _LogRecord_args, "f"), true);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LogRecord.prototype, "datetime", {
        get: function () {
            return new Date(__classPrivateFieldGet(this, _LogRecord_datetime, "f").getTime());
        },
        enumerable: false,
        configurable: true
    });
    return LogRecord;
}());
exports.LogRecord = LogRecord;
_LogRecord_args = new WeakMap(), _LogRecord_datetime = new WeakMap();
var Logger = (function () {
    function Logger(loggerName, levelName, options) {
        if (options === void 0) { options = {}; }
        _Logger_level.set(this, void 0);
        _Logger_handlers.set(this, void 0);
        _Logger_loggerName.set(this, void 0);
        __classPrivateFieldSet(this, _Logger_loggerName, loggerName, "f");
        __classPrivateFieldSet(this, _Logger_level, (0, levels_ts_1.getLevelByName)(levelName), "f");
        __classPrivateFieldSet(this, _Logger_handlers, options.handlers || [], "f");
    }
    Object.defineProperty(Logger.prototype, "level", {
        get: function () {
            return __classPrivateFieldGet(this, _Logger_level, "f");
        },
        set: function (level) {
            __classPrivateFieldSet(this, _Logger_level, level, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Logger.prototype, "levelName", {
        get: function () {
            return (0, levels_ts_1.getLevelName)(__classPrivateFieldGet(this, _Logger_level, "f"));
        },
        set: function (levelName) {
            __classPrivateFieldSet(this, _Logger_level, (0, levels_ts_1.getLevelByName)(levelName), "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Logger.prototype, "loggerName", {
        get: function () {
            return __classPrivateFieldGet(this, _Logger_loggerName, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Logger.prototype, "handlers", {
        get: function () {
            return __classPrivateFieldGet(this, _Logger_handlers, "f");
        },
        set: function (hndls) {
            __classPrivateFieldSet(this, _Logger_handlers, hndls, "f");
        },
        enumerable: false,
        configurable: true
    });
    Logger.prototype._log = function (level, msg) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (this.level > level) {
            return msg instanceof Function ? undefined : msg;
        }
        var fnResult;
        var logMessage;
        if (msg instanceof Function) {
            fnResult = msg();
            logMessage = this.asString(fnResult);
        }
        else {
            logMessage = this.asString(msg);
        }
        var record = new LogRecord({
            msg: logMessage,
            args: args,
            level: level,
            loggerName: this.loggerName
        });
        __classPrivateFieldGet(this, _Logger_handlers, "f").forEach(function (handler) {
            handler.handle(record);
        });
        return msg instanceof Function ? fnResult : msg;
    };
    Logger.prototype.asString = function (data) {
        if (typeof data === "string") {
            return data;
        }
        else if (data === null ||
            typeof data === "number" ||
            typeof data === "bigint" ||
            typeof data === "boolean" ||
            typeof data === "undefined" ||
            typeof data === "symbol") {
            return String(data);
        }
        else if (typeof data === "object") {
            return JSON.stringify(data);
        }
        return "undefined";
    };
    Logger.prototype.debug = function (msg) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this._log.apply(this, __spreadArray([levels_ts_1.LogLevels.DEBUG, msg], args, false));
    };
    Logger.prototype.info = function (msg) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this._log.apply(this, __spreadArray([levels_ts_1.LogLevels.INFO, msg], args, false));
    };
    Logger.prototype.warning = function (msg) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this._log.apply(this, __spreadArray([levels_ts_1.LogLevels.WARNING, msg], args, false));
    };
    Logger.prototype.error = function (msg) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this._log.apply(this, __spreadArray([levels_ts_1.LogLevels.ERROR, msg], args, false));
    };
    Logger.prototype.critical = function (msg) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this._log.apply(this, __spreadArray([levels_ts_1.LogLevels.CRITICAL, msg], args, false));
    };
    return Logger;
}());
exports.Logger = Logger;
_Logger_level = new WeakMap(), _Logger_handlers = new WeakMap(), _Logger_loggerName = new WeakMap();
