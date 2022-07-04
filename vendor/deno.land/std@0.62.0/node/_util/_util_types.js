"use strict";
exports.__esModule = true;
exports.isWeakSet = exports.isWeakMap = exports.isUint32Array = exports.isUint16Array = exports.isUint8ClampedArray = exports.isUint8Array = exports.isTypedArray = exports.isSymbolObject = exports.isStringObject = exports.isSharedArrayBuffer = exports.isSetIterator = exports.isSet = exports.isRegExp = exports.isPromise = exports.isBigIntObject = exports.isNumberObject = exports.isNativeError = exports.isModuleNamespaceObject = exports.isMapIterator = exports.isMap = exports.isInt32Array = exports.isInt16Array = exports.isInt8Array = exports.isGeneratorObject = exports.isGeneratorFunction = exports.isFloat64Array = exports.isFloat32Array = exports.isDate = exports.isDataView = exports.isBoxedPrimitive = exports.isBooleanObject = exports.isBigUint64Array = exports.isBigInt64Array = exports.isAsyncFunction = exports.isArrayBuffer = exports.isArgumentsObject = exports.isArrayBufferView = exports.isAnyArrayBuffer = void 0;
var _toString = Object.prototype.toString;
var _isObjectLike = function (value) {
    return value !== null && typeof value === "object";
};
var _isFunctionLike = function (value) {
    return value !== null && typeof value === "function";
};
function isAnyArrayBuffer(value) {
    return (_isObjectLike(value) &&
        (_toString.call(value) === "[object ArrayBuffer]" ||
            _toString.call(value) === "[object SharedArrayBuffer]"));
}
exports.isAnyArrayBuffer = isAnyArrayBuffer;
function isArrayBufferView(value) {
    return ArrayBuffer.isView(value);
}
exports.isArrayBufferView = isArrayBufferView;
function isArgumentsObject(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Arguments]";
}
exports.isArgumentsObject = isArgumentsObject;
function isArrayBuffer(value) {
    return (_isObjectLike(value) && _toString.call(value) === "[object ArrayBuffer]");
}
exports.isArrayBuffer = isArrayBuffer;
function isAsyncFunction(value) {
    return (_isFunctionLike(value) && _toString.call(value) === "[object AsyncFunction]");
}
exports.isAsyncFunction = isAsyncFunction;
function isBigInt64Array(value) {
    return (_isObjectLike(value) && _toString.call(value) === "[object BigInt64Array]");
}
exports.isBigInt64Array = isBigInt64Array;
function isBigUint64Array(value) {
    return (_isObjectLike(value) && _toString.call(value) === "[object BigUint64Array]");
}
exports.isBigUint64Array = isBigUint64Array;
function isBooleanObject(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Boolean]";
}
exports.isBooleanObject = isBooleanObject;
function isBoxedPrimitive(value) {
    return (isBooleanObject(value) ||
        isStringObject(value) ||
        isNumberObject(value) ||
        isSymbolObject(value) ||
        isBigIntObject(value));
}
exports.isBoxedPrimitive = isBoxedPrimitive;
function isDataView(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object DataView]";
}
exports.isDataView = isDataView;
function isDate(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Date]";
}
exports.isDate = isDate;
function isFloat32Array(value) {
    return (_isObjectLike(value) && _toString.call(value) === "[object Float32Array]");
}
exports.isFloat32Array = isFloat32Array;
function isFloat64Array(value) {
    return (_isObjectLike(value) && _toString.call(value) === "[object Float64Array]");
}
exports.isFloat64Array = isFloat64Array;
function isGeneratorFunction(value) {
    return (_isFunctionLike(value) &&
        _toString.call(value) === "[object GeneratorFunction]");
}
exports.isGeneratorFunction = isGeneratorFunction;
function isGeneratorObject(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Generator]";
}
exports.isGeneratorObject = isGeneratorObject;
function isInt8Array(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Int8Array]";
}
exports.isInt8Array = isInt8Array;
function isInt16Array(value) {
    return (_isObjectLike(value) && _toString.call(value) === "[object Int16Array]");
}
exports.isInt16Array = isInt16Array;
function isInt32Array(value) {
    return (_isObjectLike(value) && _toString.call(value) === "[object Int32Array]");
}
exports.isInt32Array = isInt32Array;
function isMap(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Map]";
}
exports.isMap = isMap;
function isMapIterator(value) {
    return (_isObjectLike(value) && _toString.call(value) === "[object Map Iterator]");
}
exports.isMapIterator = isMapIterator;
function isModuleNamespaceObject(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Module]";
}
exports.isModuleNamespaceObject = isModuleNamespaceObject;
function isNativeError(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Error]";
}
exports.isNativeError = isNativeError;
function isNumberObject(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Number]";
}
exports.isNumberObject = isNumberObject;
function isBigIntObject(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object BigInt]";
}
exports.isBigIntObject = isBigIntObject;
function isPromise(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Promise]";
}
exports.isPromise = isPromise;
function isRegExp(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object RegExp]";
}
exports.isRegExp = isRegExp;
function isSet(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Set]";
}
exports.isSet = isSet;
function isSetIterator(value) {
    return (_isObjectLike(value) && _toString.call(value) === "[object Set Iterator]");
}
exports.isSetIterator = isSetIterator;
function isSharedArrayBuffer(value) {
    return (_isObjectLike(value) &&
        _toString.call(value) === "[object SharedArrayBuffer]");
}
exports.isSharedArrayBuffer = isSharedArrayBuffer;
function isStringObject(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object String]";
}
exports.isStringObject = isStringObject;
function isSymbolObject(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object Symbol]";
}
exports.isSymbolObject = isSymbolObject;
function isTypedArray(value) {
    var reTypedTag = /^\[object (?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|Uint8Clamped)Array\]$/;
    return _isObjectLike(value) && reTypedTag.test(_toString.call(value));
}
exports.isTypedArray = isTypedArray;
function isUint8Array(value) {
    return (_isObjectLike(value) && _toString.call(value) === "[object Uint8Array]");
}
exports.isUint8Array = isUint8Array;
function isUint8ClampedArray(value) {
    return (_isObjectLike(value) &&
        _toString.call(value) === "[object Uint8ClampedArray]");
}
exports.isUint8ClampedArray = isUint8ClampedArray;
function isUint16Array(value) {
    return (_isObjectLike(value) && _toString.call(value) === "[object Uint16Array]");
}
exports.isUint16Array = isUint16Array;
function isUint32Array(value) {
    return (_isObjectLike(value) && _toString.call(value) === "[object Uint32Array]");
}
exports.isUint32Array = isUint32Array;
function isWeakMap(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object WeakMap]";
}
exports.isWeakMap = isWeakMap;
function isWeakSet(value) {
    return _isObjectLike(value) && _toString.call(value) === "[object WeakSet]";
}
exports.isWeakSet = isWeakSet;
