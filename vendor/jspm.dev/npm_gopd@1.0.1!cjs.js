import * as _getIntrinsic2 from './npm:get-intrinsic@1!cjs';

var _getIntrinsic = "default" in _getIntrinsic2 ? _getIntrinsic2.default : _getIntrinsic2;

var exports = {};
var GetIntrinsic = _getIntrinsic;
var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);

if ($gOPD) {
  try {
    $gOPD([], "length");
  } catch (e) {
    // IE 8 has a broken gOPD
    $gOPD = null;
  }
}

exports = $gOPD;
var exports$1 = exports;

export { exports$1 as default };

//# sourceMappingURL=npm:gopd@1.0.1!cjs.map