"use strict";
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
var _Distribution_endpoints, _Distribution_matching, _Distribution_active;
exports.__esModule = true;
exports.Distribution = void 0;
var lodash_1 = require("https://cdn.skypack.dev/lodash");
function swap(items, index1, index2) {
    if (index1 === index2) {
        return;
    }
    var item1 = items[index1];
    var item2 = items[index2];
    if (item1 !== null) {
        items[index2] = item1;
    }
    if (item2 !== null) {
        items[index1] = item2;
    }
}
var Distribution = (function () {
    function Distribution() {
        _Distribution_endpoints.set(this, []);
        _Distribution_matching.set(this, 0);
        _Distribution_active.set(this, 0);
    }
    Distribution.prototype.attach = function (endpoint) {
        var _a;
        __classPrivateFieldGet(this, _Distribution_endpoints, "f").push(endpoint);
        swap(__classPrivateFieldGet(this, _Distribution_endpoints, "f"), __classPrivateFieldGet(this, _Distribution_active, "f"), __classPrivateFieldGet(this, _Distribution_endpoints, "f").length - 1);
        __classPrivateFieldSet(this, _Distribution_active, (_a = __classPrivateFieldGet(this, _Distribution_active, "f"), _a++, _a), "f");
    };
    Distribution.prototype.match = function (endpoint) {
        var _a;
        var index = __classPrivateFieldGet(this, _Distribution_endpoints, "f").indexOf(endpoint);
        if (index < __classPrivateFieldGet(this, _Distribution_matching, "f")) {
            return;
        }
        if (index >= __classPrivateFieldGet(this, _Distribution_active, "f")) {
            return;
        }
        swap(__classPrivateFieldGet(this, _Distribution_endpoints, "f"), index, __classPrivateFieldGet(this, _Distribution_matching, "f"));
        __classPrivateFieldSet(this, _Distribution_matching, (_a = __classPrivateFieldGet(this, _Distribution_matching, "f"), _a++, _a), "f");
    };
    Distribution.prototype.unmatch = function () {
        __classPrivateFieldSet(this, _Distribution_matching, 0, "f");
    };
    Distribution.prototype.terminated = function (endpoint) {
        var _a, _b;
        if (__classPrivateFieldGet(this, _Distribution_endpoints, "f").indexOf(endpoint) < __classPrivateFieldGet(this, _Distribution_matching, "f")) {
            __classPrivateFieldSet(this, _Distribution_matching, (_a = __classPrivateFieldGet(this, _Distribution_matching, "f"), _a--, _a), "f");
        }
        if (__classPrivateFieldGet(this, _Distribution_endpoints, "f").indexOf(endpoint) < __classPrivateFieldGet(this, _Distribution_active, "f")) {
            __classPrivateFieldSet(this, _Distribution_active, (_b = __classPrivateFieldGet(this, _Distribution_active, "f"), _b--, _b), "f");
        }
        (0, lodash_1.pull)(__classPrivateFieldGet(this, _Distribution_endpoints, "f"), endpoint);
    };
    Distribution.prototype.activated = function (endpoint) {
        var _a;
        swap(__classPrivateFieldGet(this, _Distribution_endpoints, "f"), __classPrivateFieldGet(this, _Distribution_endpoints, "f").indexOf(endpoint), __classPrivateFieldGet(this, _Distribution_active, "f"));
        __classPrivateFieldSet(this, _Distribution_active, (_a = __classPrivateFieldGet(this, _Distribution_active, "f"), _a++, _a), "f");
    };
    Distribution.prototype.sendToAll = function (msg) {
        __classPrivateFieldSet(this, _Distribution_matching, __classPrivateFieldGet(this, _Distribution_active, "f"), "f");
        this.sendToMatching(msg);
    };
    Distribution.prototype.sendToMatching = function (msg) {
        if (__classPrivateFieldGet(this, _Distribution_matching, "f") === 0) {
            return;
        }
        for (var i = 0; i < __classPrivateFieldGet(this, _Distribution_matching, "f"); i++) {
            if (!this.write(__classPrivateFieldGet(this, _Distribution_endpoints, "f")[i], msg)) {
                --i;
            }
        }
    };
    Distribution.prototype.write = function (endpoint, msg) {
        var _a, _b;
        if (!endpoint.send(msg)) {
            swap(__classPrivateFieldGet(this, _Distribution_endpoints, "f"), __classPrivateFieldGet(this, _Distribution_endpoints, "f").indexOf(endpoint), __classPrivateFieldGet(this, _Distribution_matching, "f") - 1);
            __classPrivateFieldSet(this, _Distribution_matching, (_a = __classPrivateFieldGet(this, _Distribution_matching, "f"), _a--, _a), "f");
            swap(__classPrivateFieldGet(this, _Distribution_endpoints, "f"), __classPrivateFieldGet(this, _Distribution_endpoints, "f").indexOf(endpoint), __classPrivateFieldGet(this, _Distribution_active, "f") - 1);
            __classPrivateFieldSet(this, _Distribution_active, (_b = __classPrivateFieldGet(this, _Distribution_active, "f"), _b--, _b), "f");
            return false;
        }
        return true;
    };
    return Distribution;
}());
exports.Distribution = Distribution;
_Distribution_endpoints = new WeakMap(), _Distribution_matching = new WeakMap(), _Distribution_active = new WeakMap();
