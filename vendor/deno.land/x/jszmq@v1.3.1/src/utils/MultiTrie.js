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
var _MultiTrie_endpoints, _MultiTrie_minCharacter, _MultiTrie_count, _MultiTrie_liveNodes, _MultiTrie_next;
exports.__esModule = true;
exports.MultiTrie = void 0;
var asserts_ts_1 = require("https://deno.land/std@0.108.0/testing/asserts.ts");
var Types_ts_1 = require("../Types.ts");
var array_ts_1 = require("./array.ts");
var MultiTrie = (function () {
    function MultiTrie() {
        _MultiTrie_endpoints.set(this, void 0);
        _MultiTrie_minCharacter.set(this, void 0);
        _MultiTrie_count.set(this, void 0);
        _MultiTrie_liveNodes.set(this, void 0);
        _MultiTrie_next.set(this, void 0);
        __classPrivateFieldSet(this, _MultiTrie_minCharacter, 0, "f");
        __classPrivateFieldSet(this, _MultiTrie_count, 0, "f");
        __classPrivateFieldSet(this, _MultiTrie_liveNodes, 0, "f");
        __classPrivateFieldSet(this, _MultiTrie_next, [], "f");
    }
    Object.defineProperty(MultiTrie.prototype, "isRedundant", {
        get: function () {
            return !__classPrivateFieldGet(this, _MultiTrie_endpoints, "f") && __classPrivateFieldGet(this, _MultiTrie_liveNodes, "f") === 0;
        },
        enumerable: false,
        configurable: true
    });
    MultiTrie.prototype.add = function (prefix, start, size, endpoint) {
        return this.addHelper(prefix, start, size, endpoint);
    };
    MultiTrie.prototype.addHelper = function (prefix, start, size, endpoint) {
        var _a, _b;
        var _c;
        if (size === 0) {
            var result = !__classPrivateFieldGet(this, _MultiTrie_endpoints, "f");
            if (!__classPrivateFieldGet(this, _MultiTrie_endpoints, "f")) {
                __classPrivateFieldSet(this, _MultiTrie_endpoints, new Set(), "f");
            }
            __classPrivateFieldGet(this, _MultiTrie_endpoints, "f").add(endpoint);
            return result;
        }
        var currentCharacter = prefix.readUInt8(start);
        if (currentCharacter < __classPrivateFieldGet(this, _MultiTrie_minCharacter, "f") ||
            currentCharacter >= __classPrivateFieldGet(this, _MultiTrie_minCharacter, "f") + __classPrivateFieldGet(this, _MultiTrie_count, "f")) {
            if (__classPrivateFieldGet(this, _MultiTrie_count, "f") === 0) {
                __classPrivateFieldSet(this, _MultiTrie_minCharacter, currentCharacter, "f");
                __classPrivateFieldSet(this, _MultiTrie_count, 1, "f");
                __classPrivateFieldSet(this, _MultiTrie_next, Array(1).fill(null), "f");
            }
            else if (__classPrivateFieldGet(this, _MultiTrie_count, "f") === 1) {
                var oldc = __classPrivateFieldGet(this, _MultiTrie_minCharacter, "f");
                var oldp = __classPrivateFieldGet(this, _MultiTrie_next, "f")[0];
                __classPrivateFieldSet(this, _MultiTrie_count, (__classPrivateFieldGet(this, _MultiTrie_minCharacter, "f") < currentCharacter
                    ? currentCharacter - __classPrivateFieldGet(this, _MultiTrie_minCharacter, "f")
                    : __classPrivateFieldGet(this, _MultiTrie_minCharacter, "f") - currentCharacter) + 1, "f");
                __classPrivateFieldSet(this, _MultiTrie_next, Array(__classPrivateFieldGet(this, _MultiTrie_count, "f")).fill(null), "f");
                __classPrivateFieldSet(this, _MultiTrie_minCharacter, Math.min(__classPrivateFieldGet(this, _MultiTrie_minCharacter, "f"), currentCharacter), "f");
                __classPrivateFieldGet(this, _MultiTrie_next, "f")[oldc - __classPrivateFieldGet(this, _MultiTrie_minCharacter, "f")] = oldp;
            }
            else if (__classPrivateFieldGet(this, _MultiTrie_minCharacter, "f") < currentCharacter) {
                __classPrivateFieldSet(this, _MultiTrie_count, currentCharacter - __classPrivateFieldGet(this, _MultiTrie_minCharacter, "f") + 1, "f");
                __classPrivateFieldSet(this, _MultiTrie_next, (0, array_ts_1.resize)(__classPrivateFieldGet(this, _MultiTrie_next, "f"), __classPrivateFieldGet(this, _MultiTrie_count, "f"), true), "f");
            }
            else {
                __classPrivateFieldSet(this, _MultiTrie_count, __classPrivateFieldGet(this, _MultiTrie_minCharacter, "f") + __classPrivateFieldGet(this, _MultiTrie_count, "f") - currentCharacter, "f");
                __classPrivateFieldSet(this, _MultiTrie_next, (0, array_ts_1.resize)(__classPrivateFieldGet(this, _MultiTrie_next, "f"), __classPrivateFieldGet(this, _MultiTrie_count, "f"), false), "f");
                __classPrivateFieldSet(this, _MultiTrie_minCharacter, currentCharacter, "f");
            }
        }
        if (__classPrivateFieldGet(this, _MultiTrie_next, "f")[currentCharacter - __classPrivateFieldGet(this, _MultiTrie_minCharacter, "f")] === null) {
            __classPrivateFieldGet(this, _MultiTrie_next, "f")[currentCharacter - __classPrivateFieldGet(this, _MultiTrie_minCharacter, "f")] = new MultiTrie();
            __classPrivateFieldSet(this, _MultiTrie_liveNodes, (_c = __classPrivateFieldGet(this, _MultiTrie_liveNodes, "f"), _c++, _c), "f");
        }
        return ((_b = (_a = __classPrivateFieldGet(this, _MultiTrie_next, "f")[currentCharacter - __classPrivateFieldGet(this, _MultiTrie_minCharacter, "f")]) === null || _a === void 0 ? void 0 : _a.addHelper(prefix, start + 1, size - 1, endpoint)) !== null && _b !== void 0 ? _b : false);
    };
    MultiTrie.prototype.removeEndpoint = function (endpoint, func) {
        return this.removeEndpointHelper(endpoint, Types_ts_1.Buffer.alloc(0), 0, 0, func);
    };
    MultiTrie.prototype.removeEndpointHelper = function (endpoint, buffer, bufferSize, maxBufferSize, func) {
        var _a, _b;
        var _c, _d;
        if (__classPrivateFieldGet(this, _MultiTrie_endpoints, "f") &&
            __classPrivateFieldGet(this, _MultiTrie_endpoints, "f")["delete"](endpoint) &&
            __classPrivateFieldGet(this, _MultiTrie_endpoints, "f").size === 0) {
            func(endpoint, buffer, bufferSize);
            __classPrivateFieldSet(this, _MultiTrie_endpoints, undefined, "f");
        }
        if (bufferSize >= maxBufferSize) {
            maxBufferSize = bufferSize + 256;
            var newBuffer = Types_ts_1.Buffer.alloc(maxBufferSize, 0);
            buffer.copy(newBuffer);
            buffer = newBuffer;
        }
        if (__classPrivateFieldGet(this, _MultiTrie_count, "f") === 0) {
            return true;
        }
        if (__classPrivateFieldGet(this, _MultiTrie_count, "f") === 1) {
            buffer.writeUInt8(__classPrivateFieldGet(this, _MultiTrie_minCharacter, "f"), bufferSize);
            bufferSize++;
            (_a = __classPrivateFieldGet(this, _MultiTrie_next, "f")[0]) === null || _a === void 0 ? void 0 : _a.removeEndpointHelper(endpoint, buffer, bufferSize, maxBufferSize, func);
            if ((_b = __classPrivateFieldGet(this, _MultiTrie_next, "f")[0]) === null || _b === void 0 ? void 0 : _b.isRedundant) {
                __classPrivateFieldSet(this, _MultiTrie_next, [], "f");
                __classPrivateFieldSet(this, _MultiTrie_count, 0, "f");
                __classPrivateFieldSet(this, _MultiTrie_liveNodes, (_c = __classPrivateFieldGet(this, _MultiTrie_liveNodes, "f"), _c--, _c), "f");
            }
            return true;
        }
        var newMin = __classPrivateFieldGet(this, _MultiTrie_minCharacter, "f") + __classPrivateFieldGet(this, _MultiTrie_count, "f") - 1;
        var newMax = __classPrivateFieldGet(this, _MultiTrie_minCharacter, "f");
        for (var currentCharacter = 0; currentCharacter !== __classPrivateFieldGet(this, _MultiTrie_count, "f"); currentCharacter++) {
            buffer.writeUInt8(__classPrivateFieldGet(this, _MultiTrie_minCharacter, "f") + currentCharacter, bufferSize);
            var next = __classPrivateFieldGet(this, _MultiTrie_next, "f")[currentCharacter];
            if (next) {
                next.removeEndpointHelper(endpoint, buffer, bufferSize + 1, maxBufferSize, func);
                if (next.isRedundant) {
                    __classPrivateFieldGet(this, _MultiTrie_next, "f")[currentCharacter] = null;
                    __classPrivateFieldSet(this, _MultiTrie_liveNodes, (_d = __classPrivateFieldGet(this, _MultiTrie_liveNodes, "f"), _d--, _d), "f");
                }
                else {
                    if (currentCharacter + __classPrivateFieldGet(this, _MultiTrie_minCharacter, "f") < newMin) {
                        newMin = currentCharacter + __classPrivateFieldGet(this, _MultiTrie_minCharacter, "f");
                    }
                    if (currentCharacter + __classPrivateFieldGet(this, _MultiTrie_minCharacter, "f") > newMax) {
                        newMax = currentCharacter + __classPrivateFieldGet(this, _MultiTrie_minCharacter, "f");
                    }
                }
            }
        }
        if (__classPrivateFieldGet(this, _MultiTrie_liveNodes, "f") === 0) {
            __classPrivateFieldSet(this, _MultiTrie_next, [], "f");
            __classPrivateFieldSet(this, _MultiTrie_count, 0, "f");
        }
        else if (__classPrivateFieldGet(this, _MultiTrie_liveNodes, "f") === 1) {
            var node = __classPrivateFieldGet(this, _MultiTrie_next, "f")[newMin - __classPrivateFieldGet(this, _MultiTrie_minCharacter, "f")];
            (0, asserts_ts_1.assert)(node);
            __classPrivateFieldSet(this, _MultiTrie_next, [node], "f");
            __classPrivateFieldSet(this, _MultiTrie_count, 1, "f");
            __classPrivateFieldSet(this, _MultiTrie_minCharacter, newMin, "f");
        }
        else if (__classPrivateFieldGet(this, _MultiTrie_liveNodes, "f") > 1 &&
            (newMin > __classPrivateFieldGet(this, _MultiTrie_minCharacter, "f") ||
                newMax < __classPrivateFieldGet(this, _MultiTrie_minCharacter, "f") + __classPrivateFieldGet(this, _MultiTrie_count, "f") - 1)) {
            var oldTable = __classPrivateFieldGet(this, _MultiTrie_next, "f");
            __classPrivateFieldSet(this, _MultiTrie_count, newMax - newMin + 1, "f");
            __classPrivateFieldSet(this, _MultiTrie_next, Array(__classPrivateFieldGet(this, _MultiTrie_count, "f")).fill(null), "f");
            (0, array_ts_1.copy)(oldTable, newMin - __classPrivateFieldGet(this, _MultiTrie_minCharacter, "f"), __classPrivateFieldGet(this, _MultiTrie_next, "f"), 0, __classPrivateFieldGet(this, _MultiTrie_count, "f"));
            __classPrivateFieldSet(this, _MultiTrie_minCharacter, newMin, "f");
        }
        return true;
    };
    MultiTrie.prototype.remove = function (prefix, start, size, endpoint) {
        var _a, _b;
        if (size === 0) {
            if (__classPrivateFieldGet(this, _MultiTrie_endpoints, "f")) {
                var erased = __classPrivateFieldGet(this, _MultiTrie_endpoints, "f")["delete"](endpoint);
                (0, asserts_ts_1.assert)(erased);
                if (__classPrivateFieldGet(this, _MultiTrie_endpoints, "f").size === 0) {
                    __classPrivateFieldSet(this, _MultiTrie_endpoints, undefined, "f");
                }
            }
            return !__classPrivateFieldGet(this, _MultiTrie_endpoints, "f");
        }
        var currentCharacter = prefix.readUInt8(start);
        if (__classPrivateFieldGet(this, _MultiTrie_count, "f") === 0 ||
            currentCharacter < __classPrivateFieldGet(this, _MultiTrie_minCharacter, "f") ||
            currentCharacter >= __classPrivateFieldGet(this, _MultiTrie_minCharacter, "f") + __classPrivateFieldGet(this, _MultiTrie_count, "f")) {
            return false;
        }
        var nextNode = __classPrivateFieldGet(this, _MultiTrie_count, "f") === 1
            ? __classPrivateFieldGet(this, _MultiTrie_next, "f")[0]
            : __classPrivateFieldGet(this, _MultiTrie_next, "f")[currentCharacter - __classPrivateFieldGet(this, _MultiTrie_minCharacter, "f")];
        if (nextNode === null) {
            return false;
        }
        var ret = nextNode.remove(prefix, start + 1, size - 1, endpoint);
        if (nextNode.isRedundant) {
            (0, asserts_ts_1.assert)(__classPrivateFieldGet(this, _MultiTrie_count, "f") > 0);
            if (__classPrivateFieldGet(this, _MultiTrie_count, "f") === 1) {
                __classPrivateFieldSet(this, _MultiTrie_next, [], "f");
                __classPrivateFieldSet(this, _MultiTrie_count, 0, "f");
                __classPrivateFieldSet(this, _MultiTrie_liveNodes, (_a = __classPrivateFieldGet(this, _MultiTrie_liveNodes, "f"), _a--, _a), "f");
            }
            else {
                __classPrivateFieldGet(this, _MultiTrie_next, "f")[currentCharacter - __classPrivateFieldGet(this, _MultiTrie_minCharacter, "f")] = null;
                __classPrivateFieldSet(this, _MultiTrie_liveNodes, (_b = __classPrivateFieldGet(this, _MultiTrie_liveNodes, "f"), _b--, _b), "f");
                if (__classPrivateFieldGet(this, _MultiTrie_liveNodes, "f") === 1) {
                    var i = 0;
                    for (; i < __classPrivateFieldGet(this, _MultiTrie_count, "f"); i++) {
                        if (__classPrivateFieldGet(this, _MultiTrie_next, "f")[i] !== null) {
                            break;
                        }
                    }
                    __classPrivateFieldSet(this, _MultiTrie_minCharacter, __classPrivateFieldGet(this, _MultiTrie_minCharacter, "f") + i, "f");
                    __classPrivateFieldSet(this, _MultiTrie_count, 1, "f");
                    var old = __classPrivateFieldGet(this, _MultiTrie_next, "f")[i];
                    __classPrivateFieldSet(this, _MultiTrie_next, [old], "f");
                }
                else if (currentCharacter === __classPrivateFieldGet(this, _MultiTrie_minCharacter, "f")) {
                    var i = 1;
                    for (; i < __classPrivateFieldGet(this, _MultiTrie_count, "f"); i++) {
                        if (__classPrivateFieldGet(this, _MultiTrie_next, "f")[i] !== null) {
                            break;
                        }
                    }
                    __classPrivateFieldSet(this, _MultiTrie_minCharacter, __classPrivateFieldGet(this, _MultiTrie_minCharacter, "f") + i, "f");
                    __classPrivateFieldSet(this, _MultiTrie_count, __classPrivateFieldGet(this, _MultiTrie_count, "f") - i, "f");
                    __classPrivateFieldSet(this, _MultiTrie_next, (0, array_ts_1.resize)(__classPrivateFieldGet(this, _MultiTrie_next, "f"), __classPrivateFieldGet(this, _MultiTrie_count, "f"), false), "f");
                }
                else if (currentCharacter ===
                    __classPrivateFieldGet(this, _MultiTrie_minCharacter, "f") + __classPrivateFieldGet(this, _MultiTrie_count, "f") - 1) {
                    var i = 1;
                    for (; i < __classPrivateFieldGet(this, _MultiTrie_count, "f"); i++) {
                        if (__classPrivateFieldGet(this, _MultiTrie_next, "f")[__classPrivateFieldGet(this, _MultiTrie_count, "f") - 1 - i] !== null) {
                            break;
                        }
                    }
                    __classPrivateFieldSet(this, _MultiTrie_count, __classPrivateFieldGet(this, _MultiTrie_count, "f") - i, "f");
                    __classPrivateFieldSet(this, _MultiTrie_next, (0, array_ts_1.resize)(__classPrivateFieldGet(this, _MultiTrie_next, "f"), __classPrivateFieldGet(this, _MultiTrie_count, "f"), true), "f");
                }
            }
        }
        return ret;
    };
    MultiTrie.prototype.match = function (data, offset, size, func) {
        var current = this;
        var index = offset;
        while (current) {
            if (__classPrivateFieldGet(current, _MultiTrie_endpoints, "f")) {
                __classPrivateFieldGet(current, _MultiTrie_endpoints, "f").forEach(function (e) { return func(e); });
            }
            if (size === 0) {
                break;
            }
            if (__classPrivateFieldGet(current, _MultiTrie_count, "f") === 0) {
                break;
            }
            var c = data.readUInt8(index);
            if (__classPrivateFieldGet(current, _MultiTrie_count, "f") === 1) {
                if (c !== __classPrivateFieldGet(current, _MultiTrie_minCharacter, "f")) {
                    break;
                }
                current = __classPrivateFieldGet(current, _MultiTrie_next, "f")[0];
                index++;
                size--;
                continue;
            }
            if (c < __classPrivateFieldGet(current, _MultiTrie_minCharacter, "f") ||
                c >= __classPrivateFieldGet(current, _MultiTrie_minCharacter, "f") + __classPrivateFieldGet(current, _MultiTrie_count, "f")) {
                break;
            }
            if (__classPrivateFieldGet(current, _MultiTrie_next, "f")[c - __classPrivateFieldGet(current, _MultiTrie_minCharacter, "f")] === null) {
                break;
            }
            current = __classPrivateFieldGet(current, _MultiTrie_next, "f")[c - __classPrivateFieldGet(current, _MultiTrie_minCharacter, "f")];
            index++;
            size--;
        }
    };
    return MultiTrie;
}());
exports.MultiTrie = MultiTrie;
_MultiTrie_endpoints = new WeakMap(), _MultiTrie_minCharacter = new WeakMap(), _MultiTrie_count = new WeakMap(), _MultiTrie_liveNodes = new WeakMap(), _MultiTrie_next = new WeakMap();
