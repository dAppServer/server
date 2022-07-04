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
var _Trie_referenceCount, _Trie_minCharacter, _Trie_count, _Trie_liveNodes, _Trie_next;
exports.__esModule = true;
exports.Trie = void 0;
var asserts_ts_1 = require("https://deno.land/std@0.108.0/testing/asserts.ts");
var Types_ts_1 = require("../Types.ts");
var array_ts_1 = require("./array.ts");
var Trie = (function () {
    function Trie() {
        _Trie_referenceCount.set(this, void 0);
        _Trie_minCharacter.set(this, void 0);
        _Trie_count.set(this, void 0);
        _Trie_liveNodes.set(this, void 0);
        _Trie_next.set(this, void 0);
        __classPrivateFieldSet(this, _Trie_referenceCount, 0, "f");
        __classPrivateFieldSet(this, _Trie_minCharacter, 0, "f");
        __classPrivateFieldSet(this, _Trie_count, 0, "f");
        __classPrivateFieldSet(this, _Trie_liveNodes, 0, "f");
        __classPrivateFieldSet(this, _Trie_next, [], "f");
    }
    Object.defineProperty(Trie.prototype, "isRedundant", {
        get: function () {
            return __classPrivateFieldGet(this, _Trie_referenceCount, "f") === 0 && __classPrivateFieldGet(this, _Trie_liveNodes, "f") === 0;
        },
        enumerable: false,
        configurable: true
    });
    Trie.prototype.add = function (prefix, start, size) {
        var _a, _b;
        var _c, _d;
        if (size === 0) {
            __classPrivateFieldSet(this, _Trie_referenceCount, (_c = __classPrivateFieldGet(this, _Trie_referenceCount, "f"), _c++, _c), "f");
            return __classPrivateFieldGet(this, _Trie_referenceCount, "f") === 1;
        }
        var currentCharacter = prefix.readUInt8(start);
        if (currentCharacter < __classPrivateFieldGet(this, _Trie_minCharacter, "f") ||
            currentCharacter >= __classPrivateFieldGet(this, _Trie_minCharacter, "f") + __classPrivateFieldGet(this, _Trie_count, "f")) {
            if (__classPrivateFieldGet(this, _Trie_count, "f") === 0) {
                __classPrivateFieldSet(this, _Trie_minCharacter, currentCharacter, "f");
                __classPrivateFieldSet(this, _Trie_count, 1, "f");
                __classPrivateFieldSet(this, _Trie_next, Array(1).fill(null), "f");
            }
            else if (__classPrivateFieldGet(this, _Trie_count, "f") === 1) {
                var oldc = __classPrivateFieldGet(this, _Trie_minCharacter, "f");
                var oldp = __classPrivateFieldGet(this, _Trie_next, "f")[0];
                __classPrivateFieldSet(this, _Trie_count, (__classPrivateFieldGet(this, _Trie_minCharacter, "f") < currentCharacter
                    ? currentCharacter - __classPrivateFieldGet(this, _Trie_minCharacter, "f")
                    : __classPrivateFieldGet(this, _Trie_minCharacter, "f") - currentCharacter) + 1, "f");
                __classPrivateFieldSet(this, _Trie_next, Array(__classPrivateFieldGet(this, _Trie_count, "f")).fill(null), "f");
                __classPrivateFieldSet(this, _Trie_minCharacter, Math.min(__classPrivateFieldGet(this, _Trie_minCharacter, "f"), currentCharacter), "f");
                __classPrivateFieldGet(this, _Trie_next, "f")[oldc - __classPrivateFieldGet(this, _Trie_minCharacter, "f")] = oldp;
            }
            else if (__classPrivateFieldGet(this, _Trie_minCharacter, "f") < currentCharacter) {
                __classPrivateFieldSet(this, _Trie_count, currentCharacter - __classPrivateFieldGet(this, _Trie_minCharacter, "f") + 1, "f");
                __classPrivateFieldSet(this, _Trie_next, (0, array_ts_1.resize)(__classPrivateFieldGet(this, _Trie_next, "f"), __classPrivateFieldGet(this, _Trie_count, "f"), true), "f");
            }
            else {
                __classPrivateFieldSet(this, _Trie_count, __classPrivateFieldGet(this, _Trie_minCharacter, "f") + __classPrivateFieldGet(this, _Trie_count, "f") - currentCharacter, "f");
                __classPrivateFieldSet(this, _Trie_next, (0, array_ts_1.resize)(__classPrivateFieldGet(this, _Trie_next, "f"), __classPrivateFieldGet(this, _Trie_count, "f"), false), "f");
                __classPrivateFieldSet(this, _Trie_minCharacter, currentCharacter, "f");
            }
        }
        if (__classPrivateFieldGet(this, _Trie_next, "f")[currentCharacter - __classPrivateFieldGet(this, _Trie_minCharacter, "f")] === null) {
            __classPrivateFieldGet(this, _Trie_next, "f")[currentCharacter - __classPrivateFieldGet(this, _Trie_minCharacter, "f")] = new Trie();
            __classPrivateFieldSet(this, _Trie_liveNodes, (_d = __classPrivateFieldGet(this, _Trie_liveNodes, "f"), _d++, _d), "f");
        }
        return ((_b = (_a = __classPrivateFieldGet(this, _Trie_next, "f")[currentCharacter - __classPrivateFieldGet(this, _Trie_minCharacter, "f")]) === null || _a === void 0 ? void 0 : _a.add(prefix, start + 1, size - 1)) !== null && _b !== void 0 ? _b : false);
    };
    Trie.prototype.remove = function (prefix, start, size) {
        var _a, _b, _c;
        if (size === 0) {
            if (__classPrivateFieldGet(this, _Trie_referenceCount, "f") === 0) {
                return false;
            }
            __classPrivateFieldSet(this, _Trie_referenceCount, (_a = __classPrivateFieldGet(this, _Trie_referenceCount, "f"), _a--, _a), "f");
            return __classPrivateFieldGet(this, _Trie_referenceCount, "f") === 0;
        }
        var currentCharacter = prefix.readUInt8(start);
        if (__classPrivateFieldGet(this, _Trie_count, "f") === 0 ||
            currentCharacter < __classPrivateFieldGet(this, _Trie_minCharacter, "f") ||
            currentCharacter >= __classPrivateFieldGet(this, _Trie_minCharacter, "f") + __classPrivateFieldGet(this, _Trie_count, "f")) {
            return false;
        }
        var nextNode = __classPrivateFieldGet(this, _Trie_count, "f") === 1
            ? __classPrivateFieldGet(this, _Trie_next, "f")[0]
            : __classPrivateFieldGet(this, _Trie_next, "f")[currentCharacter - __classPrivateFieldGet(this, _Trie_minCharacter, "f")];
        if (nextNode === null) {
            return false;
        }
        var wasRemoved = nextNode.remove(prefix, start + 1, size - 1);
        if (nextNode.isRedundant) {
            if (__classPrivateFieldGet(this, _Trie_count, "f") === 1) {
                __classPrivateFieldSet(this, _Trie_next, [], "f");
                __classPrivateFieldSet(this, _Trie_count, 0, "f");
                __classPrivateFieldSet(this, _Trie_liveNodes, (_b = __classPrivateFieldGet(this, _Trie_liveNodes, "f"), _b--, _b), "f");
                (0, asserts_ts_1.assert)(__classPrivateFieldGet(this, _Trie_liveNodes, "f") === 0);
            }
            else {
                __classPrivateFieldGet(this, _Trie_next, "f")[currentCharacter - __classPrivateFieldGet(this, _Trie_minCharacter, "f")] = null;
                (0, asserts_ts_1.assert)(__classPrivateFieldGet(this, _Trie_liveNodes, "f") > 1);
                __classPrivateFieldSet(this, _Trie_liveNodes, (_c = __classPrivateFieldGet(this, _Trie_liveNodes, "f"), _c--, _c), "f");
                if (currentCharacter === __classPrivateFieldGet(this, _Trie_minCharacter, "f")) {
                    var newMin = __classPrivateFieldGet(this, _Trie_minCharacter, "f");
                    for (var i = 1; i < __classPrivateFieldGet(this, _Trie_count, "f"); ++i) {
                        if (__classPrivateFieldGet(this, _Trie_next, "f")[i] !== null) {
                            newMin = i + __classPrivateFieldGet(this, _Trie_minCharacter, "f");
                            break;
                        }
                    }
                    (0, asserts_ts_1.assert)(newMin !== __classPrivateFieldGet(this, _Trie_minCharacter, "f"));
                    (0, asserts_ts_1.assert)(newMin > __classPrivateFieldGet(this, _Trie_minCharacter, "f"));
                    (0, asserts_ts_1.assert)(__classPrivateFieldGet(this, _Trie_count, "f") > newMin - __classPrivateFieldGet(this, _Trie_minCharacter, "f"));
                    __classPrivateFieldSet(this, _Trie_count, __classPrivateFieldGet(this, _Trie_count, "f") - (newMin - __classPrivateFieldGet(this, _Trie_minCharacter, "f")), "f");
                    __classPrivateFieldSet(this, _Trie_next, (0, array_ts_1.resize)(__classPrivateFieldGet(this, _Trie_next, "f"), __classPrivateFieldGet(this, _Trie_count, "f"), false), "f");
                    __classPrivateFieldSet(this, _Trie_minCharacter, newMin, "f");
                }
                else if (currentCharacter ===
                    __classPrivateFieldGet(this, _Trie_minCharacter, "f") + __classPrivateFieldGet(this, _Trie_count, "f") - 1) {
                    var newCount = __classPrivateFieldGet(this, _Trie_count, "f");
                    for (var i = 1; i < __classPrivateFieldGet(this, _Trie_count, "f"); i++) {
                        if (__classPrivateFieldGet(this, _Trie_next, "f")[__classPrivateFieldGet(this, _Trie_count, "f") - 1 - i] != null) {
                            newCount = __classPrivateFieldGet(this, _Trie_count, "f") - i;
                            break;
                        }
                    }
                    (0, asserts_ts_1.assert)(newCount !== __classPrivateFieldGet(this, _Trie_count, "f"));
                    __classPrivateFieldSet(this, _Trie_count, newCount, "f");
                    __classPrivateFieldSet(this, _Trie_next, (0, array_ts_1.resize)(__classPrivateFieldGet(this, _Trie_next, "f"), __classPrivateFieldGet(this, _Trie_count, "f"), true), "f");
                }
            }
        }
        return wasRemoved;
    };
    Trie.prototype.check = function (data, offset, size) {
        var current = this;
        var start = offset;
        while (current) {
            if (__classPrivateFieldGet(current, _Trie_referenceCount, "f") > 0) {
                return true;
            }
            if (size === 0) {
                return false;
            }
            var character = data.readUInt8(start);
            if (character < __classPrivateFieldGet(current, _Trie_minCharacter, "f") ||
                character >= __classPrivateFieldGet(current, _Trie_minCharacter, "f") + __classPrivateFieldGet(current, _Trie_count, "f")) {
                return false;
            }
            if (__classPrivateFieldGet(current, _Trie_count, "f") === 1) {
                current = __classPrivateFieldGet(current, _Trie_next, "f")[0];
            }
            else {
                current = __classPrivateFieldGet(current, _Trie_next, "f")[character - __classPrivateFieldGet(current, _Trie_minCharacter, "f")];
                if (current === null) {
                    return false;
                }
            }
            start++;
            size--;
        }
    };
    Trie.prototype.forEach = function (func) {
        this.forEachHelper(Types_ts_1.Buffer.alloc(0), 0, 0, func);
    };
    Trie.prototype.forEachHelper = function (buffer, bufferSize, maxBufferSize, func) {
        var _a, _b;
        if (__classPrivateFieldGet(this, _Trie_referenceCount, "f") > 0) {
            func(buffer.slice(0, bufferSize));
        }
        if (bufferSize >= maxBufferSize) {
            maxBufferSize = bufferSize + 256;
            var newBuffer = Types_ts_1.Buffer.alloc(maxBufferSize, 0);
            buffer.copy(newBuffer);
            buffer = newBuffer;
        }
        if (__classPrivateFieldGet(this, _Trie_count, "f") === 0) {
            return;
        }
        if (__classPrivateFieldGet(this, _Trie_count, "f") === 1) {
            buffer[bufferSize] = __classPrivateFieldGet(this, _Trie_minCharacter, "f");
            bufferSize++;
            (_a = __classPrivateFieldGet(this, _Trie_next, "f")[0]) === null || _a === void 0 ? void 0 : _a.forEachHelper(buffer, bufferSize, maxBufferSize, func);
            return;
        }
        for (var c = 0; c !== __classPrivateFieldGet(this, _Trie_count, "f"); c++) {
            buffer.writeUInt8(__classPrivateFieldGet(this, _Trie_minCharacter, "f") + c, bufferSize);
            if (__classPrivateFieldGet(this, _Trie_next, "f")[c] != null) {
                (_b = __classPrivateFieldGet(this, _Trie_next, "f")[c]) === null || _b === void 0 ? void 0 : _b.forEachHelper(buffer, bufferSize + 1, maxBufferSize, func);
            }
        }
    };
    return Trie;
}());
exports.Trie = Trie;
_Trie_referenceCount = new WeakMap(), _Trie_minCharacter = new WeakMap(), _Trie_count = new WeakMap(), _Trie_liveNodes = new WeakMap(), _Trie_next = new WeakMap();
