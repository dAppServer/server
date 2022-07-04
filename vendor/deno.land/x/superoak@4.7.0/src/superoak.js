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
exports.superoak = void 0;
var deps_ts_1 = require("../deps.ts");
function random(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}
function isOakApplication(thing) {
    return typeof thing === "object" && typeof (thing === null || thing === void 0 ? void 0 : thing.listen) === "function" &&
        typeof (thing === null || thing === void 0 ? void 0 : thing.addEventListener) === "function";
}
function superoak(app, secure) {
    return __awaiter(this, void 0, void 0, function () {
        var controller_1, signal_1, freePort_1, listenPromise_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isOakApplication(app)) return [3, 2];
                    controller_1 = new AbortController();
                    signal_1 = controller_1.signal;
                    return [4, (0, deps_ts_1.getFreePort)(random(1024, 49151))];
                case 1:
                    freePort_1 = _a.sent();
                    return [2, new Promise(function (resolve) {
                            app.addEventListener("listen", function (_a) {
                                var hostname = _a.hostname, port = _a.port, secure = _a.secure;
                                var serverSham = {
                                    listenAndServe: function () {
                                        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                                            return [2];
                                        }); });
                                    },
                                    close: function () {
                                        return __awaiter(this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        controller_1.abort();
                                                        if (!listenPromise_1) return [3, 2];
                                                        return [4, listenPromise_1];
                                                    case 1:
                                                        _a.sent();
                                                        _a.label = 2;
                                                    case 2: return [2];
                                                }
                                            });
                                        });
                                    },
                                    get addrs() {
                                        return [{
                                                port: port,
                                                hostname: hostname,
                                                transport: "tcp"
                                            }];
                                    }
                                };
                                resolve((0, deps_ts_1.superdeno)(serverSham, secure));
                            });
                            listenPromise_1 = app.listen({ hostname: "127.0.0.1", port: freePort_1, signal: signal_1 });
                        })];
                case 2: return [2, (0, deps_ts_1.superdeno)(app, secure)];
            }
        });
    });
}
exports.superoak = superoak;
