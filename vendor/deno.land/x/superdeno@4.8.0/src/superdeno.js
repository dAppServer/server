"use strict";
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
exports.__esModule = true;
exports.superdeno = void 0;
var deps_ts_1 = require("../deps.ts");
var test_ts_1 = require("./test.ts");
var close_ts_1 = require("./close.ts");
var utils_ts_1 = require("./utils.ts");
function startManagedServer(managedServer, app) {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 4]);
                    return [4, managedServer.listenAndServe()];
                case 1:
                    _a.sent();
                    return [3, 4];
                case 2:
                    error_1 = _a.sent();
                    return [4, (0, close_ts_1.close)(managedServer, app, error_1)];
                case 3:
                    _a.sent();
                    return [3, 4];
                case 4: return [2];
            }
        });
    });
}
function superdeno(app, secure) {
    var obj = {};
    var managedServer;
    if (!(0, utils_ts_1.isString)(app) && !(0, utils_ts_1.isListener)(app) && !(0, utils_ts_1.isServer)(app)) {
        managedServer = new deps_ts_1.Server({
            port: 0,
            handler: function (request) {
                return __awaiter(this, void 0, void 0, function () {
                    var error_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4, app(request)];
                            case 1: return [2, _a.sent()];
                            case 2:
                                error_2 = _a.sent();
                                console.error("SuperDeno experienced an unexpected server error with the underlying app handler.", error_2);
                                throw error_2;
                            case 3: return [2];
                        }
                    });
                });
            }
        });
    }
    deps_ts_1.methods.forEach(function (method) {
        obj[method] = function (url) {
            return new test_ts_1.Test((managedServer !== null && managedServer !== void 0 ? managedServer : app), method, url, undefined, secure);
        };
    });
    if (typeof managedServer !== "undefined") {
        startManagedServer(managedServer, app);
    }
    return obj;
}
exports.superdeno = superdeno;
