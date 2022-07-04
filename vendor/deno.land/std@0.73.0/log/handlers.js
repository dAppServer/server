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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _WriterHandler_encoder, _FileHandler_unloadCallback, _RotatingFileHandler_maxBytes, _RotatingFileHandler_maxBackupCount, _RotatingFileHandler_currentFileSize;
exports.__esModule = true;
exports.RotatingFileHandler = exports.FileHandler = exports.WriterHandler = exports.ConsoleHandler = exports.BaseHandler = void 0;
var levels_ts_1 = require("./levels.ts");
var colors_ts_1 = require("../fmt/colors.ts");
var exists_ts_1 = require("../fs/exists.ts");
var bufio_ts_1 = require("../io/bufio.ts");
var DEFAULT_FORMATTER = "{levelName} {msg}";
var BaseHandler = (function () {
    function BaseHandler(levelName, options) {
        if (options === void 0) { options = {}; }
        this.level = (0, levels_ts_1.getLevelByName)(levelName);
        this.levelName = levelName;
        this.formatter = options.formatter || DEFAULT_FORMATTER;
    }
    BaseHandler.prototype.handle = function (logRecord) {
        if (this.level > logRecord.level)
            return;
        var msg = this.format(logRecord);
        return this.log(msg);
    };
    BaseHandler.prototype.format = function (logRecord) {
        if (this.formatter instanceof Function) {
            return this.formatter(logRecord);
        }
        return this.formatter.replace(/{(\S+)}/g, function (match, p1) {
            var value = logRecord[p1];
            if (value == null) {
                return match;
            }
            return String(value);
        });
    };
    BaseHandler.prototype.log = function (_msg) { };
    BaseHandler.prototype.setup = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2];
        }); });
    };
    BaseHandler.prototype.destroy = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2];
        }); });
    };
    return BaseHandler;
}());
exports.BaseHandler = BaseHandler;
var ConsoleHandler = (function (_super) {
    __extends(ConsoleHandler, _super);
    function ConsoleHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConsoleHandler.prototype.format = function (logRecord) {
        var msg = _super.prototype.format.call(this, logRecord);
        switch (logRecord.level) {
            case levels_ts_1.LogLevels.INFO:
                msg = (0, colors_ts_1.blue)(msg);
                break;
            case levels_ts_1.LogLevels.WARNING:
                msg = (0, colors_ts_1.yellow)(msg);
                break;
            case levels_ts_1.LogLevels.ERROR:
                msg = (0, colors_ts_1.red)(msg);
                break;
            case levels_ts_1.LogLevels.CRITICAL:
                msg = (0, colors_ts_1.bold)((0, colors_ts_1.red)(msg));
                break;
            default:
                break;
        }
        return msg;
    };
    ConsoleHandler.prototype.log = function (msg) {
        console.log(msg);
    };
    return ConsoleHandler;
}(BaseHandler));
exports.ConsoleHandler = ConsoleHandler;
var WriterHandler = (function (_super) {
    __extends(WriterHandler, _super);
    function WriterHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _WriterHandler_encoder.set(_this, new TextEncoder());
        return _this;
    }
    return WriterHandler;
}(BaseHandler));
exports.WriterHandler = WriterHandler;
_WriterHandler_encoder = new WeakMap();
var FileHandler = (function (_super) {
    __extends(FileHandler, _super);
    function FileHandler(levelName, options) {
        var _this = _super.call(this, levelName, options) || this;
        _this._encoder = new TextEncoder();
        _FileHandler_unloadCallback.set(_this, function () { return _this.destroy(); });
        _this._filename = options.filename;
        _this._mode = options.mode ? options.mode : "a";
        _this._openOptions = {
            createNew: _this._mode === "x",
            create: _this._mode !== "x",
            append: _this._mode === "a",
            truncate: _this._mode !== "a",
            write: true
        };
        return _this;
    }
    FileHandler.prototype.setup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4, Deno.open(this._filename, this._openOptions)];
                    case 1:
                        _a._file = _b.sent();
                        this._writer = this._file;
                        this._buf = new bufio_ts_1.BufWriterSync(this._file);
                        addEventListener("unload", __classPrivateFieldGet(this, _FileHandler_unloadCallback, "f"));
                        return [2];
                }
            });
        });
    };
    FileHandler.prototype.handle = function (logRecord) {
        _super.prototype.handle.call(this, logRecord);
        if (logRecord.level > levels_ts_1.LogLevels.ERROR) {
            this.flush();
        }
    };
    FileHandler.prototype.log = function (msg) {
        this._buf.writeSync(this._encoder.encode(msg + "\n"));
    };
    FileHandler.prototype.flush = function () {
        var _a;
        if (((_a = this._buf) === null || _a === void 0 ? void 0 : _a.buffered()) > 0) {
            this._buf.flush();
        }
    };
    FileHandler.prototype.destroy = function () {
        var _a;
        this.flush();
        (_a = this._file) === null || _a === void 0 ? void 0 : _a.close();
        this._file = undefined;
        removeEventListener("unload", __classPrivateFieldGet(this, _FileHandler_unloadCallback, "f"));
        return Promise.resolve();
    };
    return FileHandler;
}(WriterHandler));
exports.FileHandler = FileHandler;
_FileHandler_unloadCallback = new WeakMap();
var RotatingFileHandler = (function (_super) {
    __extends(RotatingFileHandler, _super);
    function RotatingFileHandler(levelName, options) {
        var _this = _super.call(this, levelName, options) || this;
        _RotatingFileHandler_maxBytes.set(_this, void 0);
        _RotatingFileHandler_maxBackupCount.set(_this, void 0);
        _RotatingFileHandler_currentFileSize.set(_this, 0);
        __classPrivateFieldSet(_this, _RotatingFileHandler_maxBytes, options.maxBytes, "f");
        __classPrivateFieldSet(_this, _RotatingFileHandler_maxBackupCount, options.maxBackupCount, "f");
        return _this;
    }
    RotatingFileHandler.prototype.setup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, i, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (__classPrivateFieldGet(this, _RotatingFileHandler_maxBytes, "f") < 1) {
                            this.destroy();
                            throw new Error("maxBytes cannot be less than 1");
                        }
                        if (__classPrivateFieldGet(this, _RotatingFileHandler_maxBackupCount, "f") < 1) {
                            this.destroy();
                            throw new Error("maxBackupCount cannot be less than 1");
                        }
                        return [4, _super.prototype.setup.call(this)];
                    case 1:
                        _b.sent();
                        if (!(this._mode === "w")) return [3, 7];
                        i = 1;
                        _b.label = 2;
                    case 2:
                        if (!(i <= __classPrivateFieldGet(this, _RotatingFileHandler_maxBackupCount, "f"))) return [3, 6];
                        return [4, (0, exists_ts_1.exists)(this._filename + "." + i)];
                    case 3:
                        if (!_b.sent()) return [3, 5];
                        return [4, Deno.remove(this._filename + "." + i)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        i++;
                        return [3, 2];
                    case 6: return [3, 14];
                    case 7:
                        if (!(this._mode === "x")) return [3, 12];
                        i = 1;
                        _b.label = 8;
                    case 8:
                        if (!(i <= __classPrivateFieldGet(this, _RotatingFileHandler_maxBackupCount, "f"))) return [3, 11];
                        return [4, (0, exists_ts_1.exists)(this._filename + "." + i)];
                    case 9:
                        if (_b.sent()) {
                            this.destroy();
                            throw new Deno.errors.AlreadyExists("Backup log file " + this._filename + "." + i + " already exists");
                        }
                        _b.label = 10;
                    case 10:
                        i++;
                        return [3, 8];
                    case 11: return [3, 14];
                    case 12:
                        _a = [this, _RotatingFileHandler_currentFileSize];
                        return [4, Deno.stat(this._filename)];
                    case 13:
                        __classPrivateFieldSet.apply(void 0, _a.concat([(_b.sent()).size, "f"]));
                        _b.label = 14;
                    case 14: return [2];
                }
            });
        });
    };
    RotatingFileHandler.prototype.log = function (msg) {
        var msgByteLength = this._encoder.encode(msg).byteLength + 1;
        if (__classPrivateFieldGet(this, _RotatingFileHandler_currentFileSize, "f") + msgByteLength > __classPrivateFieldGet(this, _RotatingFileHandler_maxBytes, "f")) {
            this.rotateLogFiles();
            __classPrivateFieldSet(this, _RotatingFileHandler_currentFileSize, 0, "f");
        }
        this._buf.writeSync(this._encoder.encode(msg + "\n"));
        __classPrivateFieldSet(this, _RotatingFileHandler_currentFileSize, __classPrivateFieldGet(this, _RotatingFileHandler_currentFileSize, "f") + msgByteLength, "f");
    };
    RotatingFileHandler.prototype.rotateLogFiles = function () {
        this._buf.flush();
        Deno.close(this._file.rid);
        for (var i = __classPrivateFieldGet(this, _RotatingFileHandler_maxBackupCount, "f") - 1; i >= 0; i--) {
            var source = this._filename + (i === 0 ? "" : "." + i);
            var dest = this._filename + "." + (i + 1);
            if ((0, exists_ts_1.existsSync)(source)) {
                Deno.renameSync(source, dest);
            }
        }
        this._file = Deno.openSync(this._filename, this._openOptions);
        this._writer = this._file;
        this._buf = new bufio_ts_1.BufWriterSync(this._file);
    };
    return RotatingFileHandler;
}(FileHandler));
exports.RotatingFileHandler = RotatingFileHandler;
_RotatingFileHandler_maxBytes = new WeakMap(), _RotatingFileHandler_maxBackupCount = new WeakMap(), _RotatingFileHandler_currentFileSize = new WeakMap();
