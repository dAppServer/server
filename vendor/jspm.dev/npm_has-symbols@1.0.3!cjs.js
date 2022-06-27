import _shams from './npm:has-symbols@1.0.3/shams!cjs';

var exports = {};
var origSymbol = typeof Symbol !== "undefined" && Symbol;
var hasSymbolSham = _shams;

exports = function hasNativeSymbols() {
  if (typeof origSymbol !== "function") {
    return false;
  }

  if (typeof Symbol !== "function") {
    return false;
  }

  if (typeof origSymbol("foo") !== "symbol") {
    return false;
  }

  if (typeof Symbol("bar") !== "symbol") {
    return false;
  }

  return hasSymbolSham();
};

var exports$1 = exports;

export { exports$1 as default };

//# sourceMappingURL=npm:has-symbols@1.0.3!cjs.map