import * as _getIntrinsic2 from './npm:get-intrinsic@1!cjs';
import * as _defineDataProperty2 from './npm:define-data-property@1!cjs';
import * as _hasPropertyDescriptors2 from './npm:has-property-descriptors@1!cjs';
import * as _gopd2 from './npm:gopd@1!cjs';

var _getIntrinsic = "default" in _getIntrinsic2 ? _getIntrinsic2.default : _getIntrinsic2;
var _defineDataProperty = "default" in _defineDataProperty2 ? _defineDataProperty2.default : _defineDataProperty2;
var _hasPropertyDescriptors = "default" in _hasPropertyDescriptors2 ? _hasPropertyDescriptors2.default : _hasPropertyDescriptors2;
var _gopd = "default" in _gopd2 ? _gopd2.default : _gopd2;
var exports = {};
var GetIntrinsic = _getIntrinsic;
var define = _defineDataProperty;
var hasDescriptors = _hasPropertyDescriptors();
var gOPD = _gopd;
var $TypeError = GetIntrinsic("%TypeError%");
var $floor = GetIntrinsic("%Math.floor%");
exports = function setFunctionLength(fn, length) {
  if (typeof fn !== "function") {
    throw new $TypeError("`fn` is not a function");
  }
  if (typeof length !== "number" || length < 0 || length > 4294967295 || $floor(length) !== length) {
    throw new $TypeError("`length` must be a positive 32-bit integer");
  }
  var loose = arguments.length > 2 && !!arguments[2];
  var functionLengthIsConfigurable = true;
  var functionLengthIsWritable = true;
  if ("length" in fn && gOPD) {
    var desc = gOPD(fn, "length");
    if (desc && !desc.configurable) {
      functionLengthIsConfigurable = false;
    }
    if (desc && !desc.writable) {
      functionLengthIsWritable = false;
    }
  }
  if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
    if (hasDescriptors) {
      define(fn, "length", length, true, true);
    } else {
      define(fn, "length", length);
    }
  }
  return fn;
};
var exports$1 = exports;

export { exports$1 as default };

//# sourceMappingURL=npm:set-function-length@1.1.1!cjs.map