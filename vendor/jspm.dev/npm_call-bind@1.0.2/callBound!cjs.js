import '/npm:function-bind@1!cjs';
import _getIntrinsic from '/npm:get-intrinsic@1!cjs';
import _ from '../npm:call-bind@1.0.2!cjs';

var exports = {};
var GetIntrinsic = _getIntrinsic;
var callBind = _;
var $indexOf = callBind(GetIntrinsic("String.prototype.indexOf"));

exports = function callBoundIntrinsic(name, allowMissing) {
  var intrinsic = GetIntrinsic(name, !!allowMissing);

  if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
    return callBind(intrinsic);
  }

  return intrinsic;
};

var exports$1 = exports;

export default exports$1;

//# sourceMappingURL=callBound!cjs.map