import * as _hasPropertyDescriptors2 from './npm:has-property-descriptors@1!cjs';
import * as _getIntrinsic2 from './npm:get-intrinsic@1!cjs';
import * as _gopd2 from './npm:gopd@1!cjs';

var _hasPropertyDescriptors = "default" in _hasPropertyDescriptors2 ? _hasPropertyDescriptors2.default : _hasPropertyDescriptors2;
var _getIntrinsic = "default" in _getIntrinsic2 ? _getIntrinsic2.default : _getIntrinsic2;
var _gopd = "default" in _gopd2 ? _gopd2.default : _gopd2;
var exports = {};
var hasPropertyDescriptors = _hasPropertyDescriptors();
var GetIntrinsic = _getIntrinsic;
var $defineProperty = hasPropertyDescriptors && GetIntrinsic("%Object.defineProperty%", true);
if ($defineProperty) {
  try {
    $defineProperty({}, "a", {
      value: 1
    });
  } catch (e) {
    // IE 8 has a broken defineProperty
    $defineProperty = false;
  }
}
var $SyntaxError = GetIntrinsic("%SyntaxError%");
var $TypeError = GetIntrinsic("%TypeError%");
var gopd = _gopd;

/** @type {(obj: Record<PropertyKey, unknown>, property: PropertyKey, value: unknown, nonEnumerable?: boolean | null, nonWritable?: boolean | null, nonConfigurable?: boolean | null, loose?: boolean) => void} */
exports = function defineDataProperty(obj, property, value) {
  if (!obj || typeof obj !== "object" && typeof obj !== "function") {
    throw new $TypeError("`obj` must be an object or a function`");
  }
  if (typeof property !== "string" && typeof property !== "symbol") {
    throw new $TypeError("`property` must be a string or a symbol`");
  }
  if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null) {
    throw new $TypeError("`nonEnumerable`, if provided, must be a boolean or null");
  }
  if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null) {
    throw new $TypeError("`nonWritable`, if provided, must be a boolean or null");
  }
  if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null) {
    throw new $TypeError("`nonConfigurable`, if provided, must be a boolean or null");
  }
  if (arguments.length > 6 && typeof arguments[6] !== "boolean") {
    throw new $TypeError("`loose`, if provided, must be a boolean");
  }
  var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
  var nonWritable = arguments.length > 4 ? arguments[4] : null;
  var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
  var loose = arguments.length > 6 ? arguments[6] : false;

  /* @type {false | TypedPropertyDescriptor<unknown>} */
  var desc = !!gopd && gopd(obj, property);
  if ($defineProperty) {
    $defineProperty(obj, property, {
      configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
      enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
      value: value,
      writable: nonWritable === null && desc ? desc.writable : !nonWritable
    });
  } else if (loose || !nonEnumerable && !nonWritable && !nonConfigurable) {
    // must fall back to [[Set]], and was not explicitly asked to make non-enumerable, non-writable, or non-configurable
    obj[property] = value; // eslint-disable-line no-param-reassign
  } else {
    throw new $SyntaxError("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  }
};
var exports$1 = exports;

export { exports$1 as default };

//# sourceMappingURL=npm:define-data-property@1.1.1!cjs.map