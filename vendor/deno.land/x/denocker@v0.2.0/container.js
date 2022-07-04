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
exports.Container = void 0;
var Container = (function () {
    function Container(client) {
        this.client = client;
    }
    Container.prototype.list = function (options) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.client.get("/containers/json", [
                            { name: "all", value: (options === null || options === void 0 ? void 0 : options.all) ? "true" : "" },
                            { name: "limit", value: (options === null || options === void 0 ? void 0 : options.limit) ? options.limit.toString() : "" },
                            { name: "size", value: (options === null || options === void 0 ? void 0 : options.size) ? options.size.toString() : "" },
                            { name: "filters", value: (_a = options === null || options === void 0 ? void 0 : options.filters) !== null && _a !== void 0 ? _a : "" },
                        ])];
                    case 1:
                        res = _b.sent();
                        if (!res.body || !res.body.length) {
                            return [2, []];
                        }
                        return [2, JSON.parse(res.body)];
                }
            });
        });
    };
    Container.prototype.create = function (name, config) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.post("/containers/create", JSON.stringify(config), [{ name: "name", value: name }])];
                    case 1:
                        res = _a.sent();
                        if (!res.body || !res.body.length) {
                            return [2, {}];
                        }
                        return [2, JSON.parse(res.body)];
                }
            });
        });
    };
    Container.prototype.start = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.post("/containers/".concat(id, "/start"), "")];
                    case 1:
                        res = _a.sent();
                        if (!res.body || !res.body.length) {
                            return [2, {}];
                        }
                        return [2, JSON.parse(res.body)];
                }
            });
        });
    };
    Container.prototype.stop = function (id, timeout) {
        if (timeout === void 0) { timeout = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.post("/containers/".concat(id, "/stop"), "", [{ name: "t", value: timeout.toString() }])];
                    case 1:
                        res = _a.sent();
                        if (!res.body || !res.body.length) {
                            return [2, {}];
                        }
                        return [2, JSON.parse(res.body)];
                }
            });
        });
    };
    Container.prototype.restart = function (id, timeout) {
        if (timeout === void 0) { timeout = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.post("/containers/".concat(id, "/restart"), "", [{ name: "t", value: timeout.toString() }])];
                    case 1:
                        res = _a.sent();
                        if (!res.body || !res.body.length) {
                            return [2, {}];
                        }
                        return [2, JSON.parse(res.body)];
                }
            });
        });
    };
    Container.prototype.kill = function (id, signal) {
        if (signal === void 0) { signal = "SIGKILL"; }
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.post("/containers/".concat(id, "/restart"), "", [{ name: "signal", value: signal }])];
                    case 1:
                        res = _a.sent();
                        if (!res.body || !res.body.length) {
                            return [2, {}];
                        }
                        return [2, JSON.parse(res.body)];
                }
            });
        });
    };
    Container.prototype.wait = function (id, condition) {
        if (condition === void 0) { condition = "not-running"; }
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.post("/containers/".concat(id, "/wait"), "", [{ name: "condition", value: condition }])];
                    case 1:
                        res = _a.sent();
                        if (!res.body || !res.body.length) {
                            return [2, {}];
                        }
                        return [2, JSON.parse(res.body)];
                }
            });
        });
    };
    Container.prototype.rm = function (id, condition) {
        if (condition === void 0) { condition = "not-running"; }
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client["delete"]("/containers/".concat(id), "", [{ name: "condition", value: condition }])];
                    case 1:
                        res = _a.sent();
                        if (!res.body || !res.body.length) {
                            return [2, {}];
                        }
                        return [2, JSON.parse(res.body)];
                }
            });
        });
    };
    return Container;
}());
exports.Container = Container;
