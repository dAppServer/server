"use strict";
var _a;
exports.__esModule = true;
exports.getLevelName = exports.getLevelByName = exports.LogLevelNames = exports.LogLevels = void 0;
var LogLevels;
(function (LogLevels) {
    LogLevels[LogLevels["NOTSET"] = 0] = "NOTSET";
    LogLevels[LogLevels["DEBUG"] = 10] = "DEBUG";
    LogLevels[LogLevels["INFO"] = 20] = "INFO";
    LogLevels[LogLevels["WARNING"] = 30] = "WARNING";
    LogLevels[LogLevels["ERROR"] = 40] = "ERROR";
    LogLevels[LogLevels["CRITICAL"] = 50] = "CRITICAL";
})(LogLevels = exports.LogLevels || (exports.LogLevels = {}));
exports.LogLevelNames = Object.keys(LogLevels).filter(function (key) {
    return isNaN(Number(key));
});
var byLevel = (_a = {},
    _a[String(LogLevels.NOTSET)] = "NOTSET",
    _a[String(LogLevels.DEBUG)] = "DEBUG",
    _a[String(LogLevels.INFO)] = "INFO",
    _a[String(LogLevels.WARNING)] = "WARNING",
    _a[String(LogLevels.ERROR)] = "ERROR",
    _a[String(LogLevels.CRITICAL)] = "CRITICAL",
    _a);
function getLevelByName(name) {
    switch (name) {
        case "NOTSET":
            return LogLevels.NOTSET;
        case "DEBUG":
            return LogLevels.DEBUG;
        case "INFO":
            return LogLevels.INFO;
        case "WARNING":
            return LogLevels.WARNING;
        case "ERROR":
            return LogLevels.ERROR;
        case "CRITICAL":
            return LogLevels.CRITICAL;
        default:
            throw new Error("no log level found for \"".concat(name, "\""));
    }
}
exports.getLevelByName = getLevelByName;
function getLevelName(level) {
    var levelName = byLevel[level];
    if (levelName) {
        return levelName;
    }
    throw new Error("no level name found for level: ".concat(level));
}
exports.getLevelName = getLevelName;
