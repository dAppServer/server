"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.cloneState = void 0;
var objectCloneMemo = new WeakMap();
function cloneArrayBuffer(srcBuffer, srcByteOffset, srcLength, _cloneConstructor) {
    return srcBuffer.slice(srcByteOffset, srcByteOffset + srcLength);
}
function cloneValue(value) {
    switch (typeof value) {
        case "number":
        case "string":
        case "boolean":
        case "undefined":
        case "bigint":
            return value;
        case "object": {
            if (objectCloneMemo.has(value)) {
                return objectCloneMemo.get(value);
            }
            if (value === null) {
                return value;
            }
            if (value instanceof Date) {
                return new Date(value.valueOf());
            }
            if (value instanceof RegExp) {
                return new RegExp(value);
            }
            if (value instanceof SharedArrayBuffer) {
                return value;
            }
            if (value instanceof ArrayBuffer) {
                var cloned = cloneArrayBuffer(value, 0, value.byteLength, ArrayBuffer);
                objectCloneMemo.set(value, cloned);
                return cloned;
            }
            if (ArrayBuffer.isView(value)) {
                var clonedBuffer = cloneValue(value.buffer);
                var length_1;
                if (value instanceof DataView) {
                    length_1 = value.byteLength;
                }
                else {
                    length_1 = value.length;
                }
                return new value.constructor(clonedBuffer, value.byteOffset, length_1);
            }
            if (value instanceof Map) {
                var clonedMap_1 = new Map();
                objectCloneMemo.set(value, clonedMap_1);
                value.forEach(function (v, k) {
                    clonedMap_1.set(cloneValue(k), cloneValue(v));
                });
                return clonedMap_1;
            }
            if (value instanceof Set) {
                var clonedSet = new Set(__spreadArray([], value, true).map(cloneValue));
                objectCloneMemo.set(value, clonedSet);
                return clonedSet;
            }
            var clonedObj = {};
            objectCloneMemo.set(value, clonedObj);
            var sourceKeys = Object.getOwnPropertyNames(value);
            for (var _i = 0, sourceKeys_1 = sourceKeys; _i < sourceKeys_1.length; _i++) {
                var key = sourceKeys_1[_i];
                clonedObj[key] = cloneValue(value[key]);
            }
            Reflect.setPrototypeOf(clonedObj, Reflect.getPrototypeOf(value));
            return clonedObj;
        }
        case "symbol":
        case "function":
        default:
            throw new DOMException("Uncloneable value in stream", "DataCloneError");
    }
}
var core = Deno === null || Deno === void 0 ? void 0 : Deno.core;
var structuredClone = globalThis.structuredClone;
function sc(value) {
    return structuredClone
        ? structuredClone(value)
        : core
            ? core.deserialize(core.serialize(value))
            : cloneValue(value);
}
function cloneState(state) {
    var clone = {};
    for (var _i = 0, _a = Object.entries(state); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        try {
            var clonedValue = sc(value);
            clone[key] = clonedValue;
        }
        catch (_c) {
        }
    }
    return clone;
}
exports.cloneState = cloneState;
