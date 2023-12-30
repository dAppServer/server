import * as _functionBind2 from './npm:function-bind@1!cjs';
import * as _getIntrinsic2 from './npm:get-intrinsic@1!cjs';
import * as _setFunctionLength2 from './npm:set-function-length@1!cjs';

var _functionBind = "default" in _functionBind2 ? _functionBind2.default : _functionBind2;
var _getIntrinsic = "default" in _getIntrinsic2 ? _getIntrinsic2.default : _getIntrinsic2;
var _setFunctionLength = "default" in _setFunctionLength2 ? _setFunctionLength2.default : _setFunctionLength2;
var exports = {};
var bind = _functionBind;
var GetIntrinsic = _getIntrinsic;
var setFunctionLength = _setFunctionLength;
var $TypeError = GetIntrinsic("%TypeError%");
var $apply = GetIntrinsic("%Function.prototype.apply%");
var $call = GetIntrinsic("%Function.prototype.call%");
var $reflectApply = GetIntrinsic("%Reflect.apply%", true) || bind.call($call, $apply);
var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
var $max = GetIntrinsic("%Math.max%");
if ($defineProperty) {
  try {
    $defineProperty({}, "a", {
      value: 1
    });
  } catch (e) {
    // IE 8 has a broken defineProperty
    $defineProperty = null;
  }
}
exports = function callBind(originalFunction) {
  if (typeof originalFunction !== "function") {
    throw new $TypeError("a function is required");
  }
  var func = $reflectApply(bind, $call, arguments);
  return setFunctionLength(func, 1 + $max(0, originalFunction.length - (arguments.length - 1)), true);
};
var applyBind = function applyBind() {
  return $reflectApply(bind, $apply, arguments);
};
if ($defineProperty) {
  $defineProperty(exports, "apply", {
    value: applyBind
  });
} else {
  exports.apply = applyBind;
}
var _ = exports;
const apply = exports.apply;

export { apply, _ as default };

//# sourceMappingURL=npm:call-bind@1.0.5!cjs.map