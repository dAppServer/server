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
var _ChildCommandType_cmd;
exports.__esModule = true;
exports.ChildCommandType = void 0;
var string_ts_1 = require("./string.ts");
var ChildCommandType = (function (_super) {
    __extends(ChildCommandType, _super);
    function ChildCommandType(cmd) {
        var _this = _super.call(this) || this;
        _ChildCommandType_cmd.set(_this, void 0);
        __classPrivateFieldSet(_this, _ChildCommandType_cmd, cmd, "f");
        return _this;
    }
    ChildCommandType.prototype.complete = function (cmd) {
        var _a, _b;
        return ((_b = ((_a = __classPrivateFieldGet(this, _ChildCommandType_cmd, "f")) !== null && _a !== void 0 ? _a : cmd)) === null || _b === void 0 ? void 0 : _b.getCommands(false).map(function (cmd) { return cmd.getName(); })) || [];
    };
    return ChildCommandType;
}(string_ts_1.StringType));
exports.ChildCommandType = ChildCommandType;
_ChildCommandType_cmd = new WeakMap();
