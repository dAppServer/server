import exports$3 from '../dist/cjs/handlebars/utils!cjs';
import _exception3 from '../dist/cjs/handlebars/exception!cjs';
import { e as exports$2 } from './cac9e115.js';
import _safeString from '../dist/cjs/handlebars/safe-string!cjs';
import exports$4 from '../dist/cjs/handlebars/runtime!cjs';

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

var exports = {};
exports.__esModule = true;

exports["default"] = function (Handlebars) {
  /* istanbul ignore next */
  var root = typeof _global !== "undefined" ? _global : window,
      $Handlebars = root.Handlebars;
  /* istanbul ignore next */

  Handlebars.noConflict = function () {
    if (root.Handlebars === Handlebars) {
      root.Handlebars = $Handlebars;
    }

    return Handlebars;
  };
};

exports = exports["default"]; 

var _noConflict = exports;

var exports$1 = {};
exports$1.__esModule = true; // istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
} // istanbul ignore next


function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }

    newObj["default"] = obj;
    return newObj;
  }
}

var _handlebarsBase = exports$2;

var base = _interopRequireWildcard(_handlebarsBase); // Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)


var _handlebarsSafeString = _safeString;

var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

var _handlebarsException = _exception3;

var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

var _handlebarsUtils = exports$3;

var Utils = _interopRequireWildcard(_handlebarsUtils);

var _handlebarsRuntime = exports$4;

var runtime = _interopRequireWildcard(_handlebarsRuntime);

var _handlebarsNoConflict = _noConflict;

var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict); // For compatibility and usage outside of module systems, make the Handlebars object a namespace


function create() {
  var hb = new base.HandlebarsEnvironment();
  Utils.extend(hb, base);
  hb.SafeString = _handlebarsSafeString2["default"];
  hb.Exception = _handlebarsException2["default"];
  hb.Utils = Utils;
  hb.escapeExpression = Utils.escapeExpression;
  hb.VM = runtime;

  hb.template = function (spec) {
    return runtime.template(spec, hb);
  };

  return hb;
}

var inst = create();
inst.create = create;

_handlebarsNoConflict2["default"](inst);

inst["default"] = inst;
exports$1["default"] = inst;
exports$1 = exports$1["default"]; 

var _handlebars = exports$1;
const __esModule = exports$1.__esModule;

export { _handlebars as _, _noConflict as a, __esModule as b };

//# sourceMappingURL=a1417093.js.map