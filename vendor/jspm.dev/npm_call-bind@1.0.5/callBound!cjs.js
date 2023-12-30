import * as _getIntrinsic2 from '../npm:get-intrinsic@1!cjs';
import _ from '../npm:call-bind@1.0.5!cjs';
import '../npm:function-bind@1!cjs';
import '../npm:set-function-length@1!cjs';

var _getIntrinsic = "default" in _getIntrinsic2 ? _getIntrinsic2.default : _getIntrinsic2;
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

export { exports$1 as default };

//# sourceMappingURL=callBound!cjs.map