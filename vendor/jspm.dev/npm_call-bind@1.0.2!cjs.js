import _functionBind from '/npm:function-bind@1!cjs';
import _getIntrinsic from '/npm:get-intrinsic@1!cjs';

var exports = {};
var bind = _functionBind;
var GetIntrinsic = _getIntrinsic;
var $apply = GetIntrinsic("%Function.prototype.apply%");
var $call = GetIntrinsic("%Function.prototype.call%");
var $reflectApply = GetIntrinsic("%Reflect.apply%", true) || bind.call($call, $apply);
var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
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
  var func = $reflectApply(bind, $call, arguments);

  if ($gOPD && $defineProperty) {
    var desc = $gOPD(func, "length");

    if (desc.configurable) {
      // original length, plus the receiver, minus any additional arguments (after the receiver)
      $defineProperty(func, "length", {
        value: 1 + $max(0, originalFunction.length - (arguments.length - 1))
      });
    }
  }

  return func;
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

export default _;
export { apply };

//# sourceMappingURL=npm:call-bind@1.0.2!cjs.map