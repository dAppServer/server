import * as _getIntrinsic2 from './npm:get-intrinsic@1!cjs';

var _getIntrinsic = "default" in _getIntrinsic2 ? _getIntrinsic2.default : _getIntrinsic2;
var exports = {};
var GetIntrinsic = _getIntrinsic;
var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
var hasPropertyDescriptors = function hasPropertyDescriptors() {
  if ($defineProperty) {
    try {
      $defineProperty({}, "a", {
        value: 1
      });
      return true;
    } catch (e) {
      // IE 8 has a broken defineProperty
      return false;
    }
  }
  return false;
};
hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
  // node v0.6 has a bug where array lengths can be Set but not Defined
  if (!hasPropertyDescriptors()) {
    return null;
  }
  try {
    return $defineProperty([], "length", {
      value: 1
    }).length !== 1;
  } catch (e) {
    // In Firefox 4-22, defining length on an array throws an exception.
    return true;
  }
};
exports = hasPropertyDescriptors;
var exports$1 = exports;

export { exports$1 as default };

//# sourceMappingURL=npm:has-property-descriptors@1.0.1!cjs.map