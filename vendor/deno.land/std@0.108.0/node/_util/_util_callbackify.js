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
exports.__esModule = true;
exports.callbackify = void 0;
var NodeFalsyValueRejectionError = (function (_super) {
    __extends(NodeFalsyValueRejectionError, _super);
    function NodeFalsyValueRejectionError(reason) {
        var _this = _super.call(this, "Promise was rejected with falsy value") || this;
        _this.code = "ERR_FALSY_VALUE_REJECTION";
        _this.reason = reason;
        return _this;
    }
    return NodeFalsyValueRejectionError;
}(Error));
var NodeInvalidArgTypeError = (function (_super) {
    __extends(NodeInvalidArgTypeError, _super);
    function NodeInvalidArgTypeError(argumentName) {
        var _this = _super.call(this, "The ".concat(argumentName, " argument must be of type function.")) || this;
        _this.code = "ERR_INVALID_ARG_TYPE";
        return _this;
    }
    return NodeInvalidArgTypeError;
}(TypeError));
function callbackify(original) {
    if (typeof original !== "function") {
        throw new NodeInvalidArgTypeError('"original"');
    }
    var callbackified = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var maybeCb = args.pop();
        if (typeof maybeCb !== "function") {
            throw new NodeInvalidArgTypeError("last");
        }
        var cb = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            maybeCb.apply(_this, args);
        };
        original.apply(this, args).then(function (ret) {
            queueMicrotask(cb.bind(_this, null, ret));
        }, function (rej) {
            rej = rej || new NodeFalsyValueRejectionError(rej);
            queueMicrotask(cb.bind(_this, rej));
        });
    };
    var descriptors = Object.getOwnPropertyDescriptors(original);
    if (typeof descriptors.length.value === "number") {
        descriptors.length.value++;
    }
    if (typeof descriptors.name.value === "string") {
        descriptors.name.value += "Callbackified";
    }
    Object.defineProperties(callbackified, descriptors);
    return callbackified;
}
exports.callbackify = callbackify;
