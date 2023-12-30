var exports = {};
exports.__esModule = true;

function SafeString(string) {
  this.string = string;
}

SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
  return "" + this.string;
};

exports["default"] = SafeString;
exports = exports["default"]; 

var _safeString = exports;
const __esModule = exports.__esModule;

export default _safeString;
export { __esModule };

//# sourceMappingURL=safe-string!cjs.map