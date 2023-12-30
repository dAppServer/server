import exports$e from '../dist/cjs/handlebars/utils!cjs';
import _exception3 from '../dist/cjs/handlebars/exception!cjs';

var exports = {};
exports.__esModule = true;
var _utils = exports$e;

exports["default"] = function (instance) {
  instance.registerHelper("blockHelperMissing", function (context, options) {
    var inverse = options.inverse,
        fn = options.fn;

    if (context === true) {
      return fn(this);
    } else if (context === false || context == null) {
      return inverse(this);
    } else if (_utils.isArray(context)) {
      if (context.length > 0) {
        if (options.ids) {
          options.ids = [options.name];
        }

        return instance.helpers.each(context, options);
      } else {
        return inverse(this);
      }
    } else {
      if (options.data && options.ids) {
        var data = _utils.createFrame(options.data);

        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
        options = {
          data: data
        };
      }

      return fn(context, options);
    }
  });
};

exports = exports["default"]; 

var _blockHelperMissing = exports;

var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

var exports$1 = {};
exports$1.__esModule = true; // istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

var _utils$1 = exports$e;
var _exception = _exception3;

var _exception2 = _interopRequireDefault(_exception);

exports$1["default"] = function (instance) {
  instance.registerHelper("each", function (context, options) {
    if (!options) {
      throw new _exception2["default"]("Must pass iterator to #each");
    }

    var fn = options.fn,
        inverse = options.inverse,
        i = 0,
        ret = "",
        data = undefined,
        contextPath = undefined;

    if (options.data && options.ids) {
      contextPath = _utils$1.appendContextPath(options.data.contextPath, options.ids[0]) + ".";
    }

    if (_utils$1.isFunction(context)) {
      context = context.call(this);
    }

    if (options.data) {
      data = _utils$1.createFrame(options.data);
    }

    function execIteration(field, index, last) {
      if (data) {
        data.key = field;
        data.index = index;
        data.first = index === 0;
        data.last = !!last;

        if (contextPath) {
          data.contextPath = contextPath + field;
        }
      }

      ret = ret + fn(context[field], {
        data: data,
        blockParams: _utils$1.blockParams([context[field], field], [contextPath + field, null])
      });
    }

    if (context && typeof context === "object") {
      if (_utils$1.isArray(context)) {
        for (var j = context.length; i < j; i++) {
          if (i in context) {
            execIteration(i, i, i === context.length - 1);
          }
        }
      } else if (_global.Symbol && context[_global.Symbol.iterator]) {
        var newContext = [];

        var iterator = context[_global.Symbol.iterator]();

        for (var it = iterator.next(); !it.done; it = iterator.next()) {
          newContext.push(it.value);
        }

        context = newContext;

        for (var j = context.length; i < j; i++) {
          execIteration(i, i, i === context.length - 1);
        }
      } else {
        (function () {
          var priorKey = undefined;
          Object.keys(context).forEach(function (key) {
            // We're running the iterations one step out of sync so we can detect
            // the last iteration without have to scan the object twice and create
            // an itermediate keys array.
            if (priorKey !== undefined) {
              execIteration(priorKey, i - 1);
            }

            priorKey = key;
            i++;
          });

          if (priorKey !== undefined) {
            execIteration(priorKey, i - 1, true);
          }
        })();
      }
    }

    if (i === 0) {
      ret = inverse(this);
    }

    return ret;
  });
};

exports$1 = exports$1["default"]; 

var _each = exports$1;

var exports$2 = {};
exports$2.__esModule = true; // istanbul ignore next

function _interopRequireDefault$1(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

var _exception$1 = _exception3;

var _exception2$1 = _interopRequireDefault$1(_exception$1);

exports$2["default"] = function (instance) {
  instance.registerHelper("helperMissing", function ()
  /* [args, ]options */
  {
    if (arguments.length === 1) {
      // A missing field in a {{foo}} construct.
      return undefined;
    } else {
      // Someone is actually trying to call something, blow up.
      throw new _exception2$1["default"]("Missing helper: \"" + arguments[arguments.length - 1].name + "\"");
    }
  });
};

exports$2 = exports$2["default"]; 

var _helperMissing = exports$2;

var exports$3 = {};
exports$3.__esModule = true; // istanbul ignore next

function _interopRequireDefault$2(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

var _utils$2 = exports$e;
var _exception$2 = _exception3;

var _exception2$2 = _interopRequireDefault$2(_exception$2);

exports$3["default"] = function (instance) {
  instance.registerHelper("if", function (conditional, options) {
    if (arguments.length != 2) {
      throw new _exception2$2["default"]("#if requires exactly one argument");
    }

    if (_utils$2.isFunction(conditional)) {
      conditional = conditional.call(this);
    } // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.


    if (!options.hash.includeZero && !conditional || _utils$2.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });
  instance.registerHelper("unless", function (conditional, options) {
    if (arguments.length != 2) {
      throw new _exception2$2["default"]("#unless requires exactly one argument");
    }

    return instance.helpers["if"].call(this, conditional, {
      fn: options.inverse,
      inverse: options.fn,
      hash: options.hash
    });
  });
};

exports$3 = exports$3["default"]; 

var _if = exports$3;

var exports$4 = {};
exports$4.__esModule = true;

exports$4["default"] = function (instance) {
  instance.registerHelper("log", function ()
  /* message, options */
  {
    var args = [undefined],
        options = arguments[arguments.length - 1];

    for (var i = 0; i < arguments.length - 1; i++) {
      args.push(arguments[i]);
    }

    var level = 1;

    if (options.hash.level != null) {
      level = options.hash.level;
    } else if (options.data && options.data.level != null) {
      level = options.data.level;
    }

    args[0] = level;
    instance.log.apply(instance, args);
  });
};

exports$4 = exports$4["default"]; 

var _log = exports$4;

var exports$5 = {};
exports$5.__esModule = true;

exports$5["default"] = function (instance) {
  instance.registerHelper("lookup", function (obj, field, options) {
    if (!obj) {
      // Note for 5.0: Change to "obj == null" in 5.0
      return obj;
    }

    return options.lookupProperty(obj, field);
  });
};

exports$5 = exports$5["default"]; 

var _lookup = exports$5;

var exports$6 = {};
exports$6.__esModule = true; // istanbul ignore next

function _interopRequireDefault$3(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

var _utils$3 = exports$e;
var _exception$3 = _exception3;

var _exception2$3 = _interopRequireDefault$3(_exception$3);

exports$6["default"] = function (instance) {
  instance.registerHelper("with", function (context, options) {
    if (arguments.length != 2) {
      throw new _exception2$3["default"]("#with requires exactly one argument");
    }

    if (_utils$3.isFunction(context)) {
      context = context.call(this);
    }

    var fn = options.fn;

    if (!_utils$3.isEmpty(context)) {
      var data = options.data;

      if (options.data && options.ids) {
        data = _utils$3.createFrame(options.data);
        data.contextPath = _utils$3.appendContextPath(options.data.contextPath, options.ids[0]);
      }

      return fn(context, {
        data: data,
        blockParams: _utils$3.blockParams([context], [data && data.contextPath])
      });
    } else {
      return options.inverse(this);
    }
  });
};

exports$6 = exports$6["default"]; 

var _with = exports$6;

var exports$7 = {};
exports$7.__esModule = true;
exports$7.registerDefaultHelpers = registerDefaultHelpers;
exports$7.moveHelperToHooks = moveHelperToHooks; // istanbul ignore next

function _interopRequireDefault$4(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

var _helpersBlockHelperMissing = _blockHelperMissing;

var _helpersBlockHelperMissing2 = _interopRequireDefault$4(_helpersBlockHelperMissing);

var _helpersEach = _each;

var _helpersEach2 = _interopRequireDefault$4(_helpersEach);

var _helpersHelperMissing = _helperMissing;

var _helpersHelperMissing2 = _interopRequireDefault$4(_helpersHelperMissing);

var _helpersIf = _if;

var _helpersIf2 = _interopRequireDefault$4(_helpersIf);

var _helpersLog = _log;

var _helpersLog2 = _interopRequireDefault$4(_helpersLog);

var _helpersLookup = _lookup;

var _helpersLookup2 = _interopRequireDefault$4(_helpersLookup);

var _helpersWith = _with;

var _helpersWith2 = _interopRequireDefault$4(_helpersWith);

function registerDefaultHelpers(instance) {
  _helpersBlockHelperMissing2["default"](instance);

  _helpersEach2["default"](instance);

  _helpersHelperMissing2["default"](instance);

  _helpersIf2["default"](instance);

  _helpersLog2["default"](instance);

  _helpersLookup2["default"](instance);

  _helpersWith2["default"](instance);
}

function moveHelperToHooks(instance, helperName, keepHelper) {
  if (instance.helpers[helperName]) {
    instance.hooks[helperName] = instance.helpers[helperName];

    if (!keepHelper) {
      delete instance.helpers[helperName];
    }
  }
}

var exports$8 = {};
exports$8.__esModule = true;
var _utils$4 = exports$e;

exports$8["default"] = function (instance) {
  instance.registerDecorator("inline", function (fn, props, container, options) {
    var ret = fn;

    if (!props.partials) {
      props.partials = {};

      ret = function (context, options) {
        // Create a new partials stack frame prior to exec.
        var original = container.partials;
        container.partials = _utils$4.extend({}, original, props.partials);
        var ret = fn(context, options);
        container.partials = original;
        return ret;
      };
    }

    props.partials[options.args[0]] = options.fn;
    return ret;
  });
};

exports$8 = exports$8["default"]; 

var _inline = exports$8;

var exports$9 = {};
exports$9.__esModule = true;
exports$9.registerDefaultDecorators = registerDefaultDecorators; // istanbul ignore next

function _interopRequireDefault$5(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

var _decoratorsInline = _inline;

var _decoratorsInline2 = _interopRequireDefault$5(_decoratorsInline);

function registerDefaultDecorators(instance) {
  _decoratorsInline2["default"](instance);
}

var exports$a = {};
exports$a.__esModule = true;
var _utils$5 = exports$e;
var logger = {
  methodMap: ["debug", "info", "warn", "error"],
  level: "info",
  // Maps a given level value to the `methodMap` indexes above.
  lookupLevel: function lookupLevel(level) {
    if (typeof level === "string") {
      var levelMap = _utils$5.indexOf(logger.methodMap, level.toLowerCase());

      if (levelMap >= 0) {
        level = levelMap;
      } else {
        level = parseInt(level, 10);
      }
    }

    return level;
  },
  // Can be overridden in the host environment
  log: function log(level) {
    level = logger.lookupLevel(level);

    if (typeof console !== "undefined" && logger.lookupLevel(logger.level) <= level) {
      var method = logger.methodMap[level]; // eslint-disable-next-line no-console

      if (!console[method]) {
        method = "log";
      }

      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        message[_key - 1] = arguments[_key];
      }

      console[method].apply(console, message); // eslint-disable-line no-console
    }
  }
};
exports$a["default"] = logger;
exports$a = exports$a["default"]; 

var _logger3 = exports$a;

var exports$b = {};
exports$b.__esModule = true;
exports$b.createNewLookupObject = createNewLookupObject;
var _utils$6 = exports$e;
/**
 * Create a new object with "null"-prototype to avoid truthy results on prototype properties.
 * The resulting object can be used with "object[property]" to check if a property exists
 * @param {...object} sources a varargs parameter of source objects that will be merged
 * @returns {object}
 */

function createNewLookupObject() {
  for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
    sources[_key] = arguments[_key];
  }

  return _utils$6.extend.apply(undefined, [Object.create(null)].concat(sources));
}

var exports$c = {};
exports$c.__esModule = true;
exports$c.createProtoAccessControl = createProtoAccessControl;
exports$c.resultIsAllowed = resultIsAllowed;
exports$c.resetLoggedProperties = resetLoggedProperties; // istanbul ignore next

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

var _createNewLookupObject = exports$b;
var _logger = _logger3;

var logger$1 = _interopRequireWildcard(_logger);

var loggedProperties = Object.create(null);

function createProtoAccessControl(runtimeOptions) {
  var defaultMethodWhiteList = Object.create(null);
  defaultMethodWhiteList["constructor"] = false;
  defaultMethodWhiteList["__defineGetter__"] = false;
  defaultMethodWhiteList["__defineSetter__"] = false;
  defaultMethodWhiteList["__lookupGetter__"] = false;
  var defaultPropertyWhiteList = Object.create(null); // eslint-disable-next-line no-proto

  defaultPropertyWhiteList["__proto__"] = false;
  return {
    properties: {
      whitelist: _createNewLookupObject.createNewLookupObject(defaultPropertyWhiteList, runtimeOptions.allowedProtoProperties),
      defaultValue: runtimeOptions.allowProtoPropertiesByDefault
    },
    methods: {
      whitelist: _createNewLookupObject.createNewLookupObject(defaultMethodWhiteList, runtimeOptions.allowedProtoMethods),
      defaultValue: runtimeOptions.allowProtoMethodsByDefault
    }
  };
}

function resultIsAllowed(result, protoAccessControl, propertyName) {
  if (typeof result === "function") {
    return checkWhiteList(protoAccessControl.methods, propertyName);
  } else {
    return checkWhiteList(protoAccessControl.properties, propertyName);
  }
}

function checkWhiteList(protoAccessControlForType, propertyName) {
  if (protoAccessControlForType.whitelist[propertyName] !== undefined) {
    return protoAccessControlForType.whitelist[propertyName] === true;
  }

  if (protoAccessControlForType.defaultValue !== undefined) {
    return protoAccessControlForType.defaultValue;
  }

  logUnexpecedPropertyAccessOnce(propertyName);
  return false;
}

function logUnexpecedPropertyAccessOnce(propertyName) {
  if (loggedProperties[propertyName] !== true) {
    loggedProperties[propertyName] = true;
    logger$1.log("error", "Handlebars: Access has been denied to resolve the property \"" + propertyName + "\" because it is not an \"own property\" of its parent.\n" + "You can add a runtime option to disable the check or this warning:\n" + "See https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details");
  }
}

function resetLoggedProperties() {
  Object.keys(loggedProperties).forEach(function (propertyName) {
    delete loggedProperties[propertyName];
  });
}

var exports$d = {};
exports$d.__esModule = true;
exports$d.HandlebarsEnvironment = HandlebarsEnvironment; // istanbul ignore next

function _interopRequireDefault$6(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

var _utils$7 = exports$e;
var _exception$4 = _exception3;

var _exception2$4 = _interopRequireDefault$6(_exception$4);

var _helpers = exports$7;
var _decorators = exports$9;
var _logger$1 = _logger3;

var _logger2 = _interopRequireDefault$6(_logger$1);

var _internalProtoAccess = exports$c;
var VERSION = "4.7.6";
exports$d.VERSION = VERSION;
var COMPILER_REVISION = 8;
exports$d.COMPILER_REVISION = COMPILER_REVISION;
var LAST_COMPATIBLE_COMPILER_REVISION = 7;
exports$d.LAST_COMPATIBLE_COMPILER_REVISION = LAST_COMPATIBLE_COMPILER_REVISION;
var REVISION_CHANGES = {
  1: "<= 1.0.rc.2",
  // 1.0.rc.2 is actually rev2 but doesn't report it
  2: "== 1.0.0-rc.3",
  3: "== 1.0.0-rc.4",
  4: "== 1.x.x",
  5: "== 2.0.0-alpha.x",
  6: ">= 2.0.0-beta.1",
  7: ">= 4.0.0 <4.3.0",
  8: ">= 4.3.0"
};
exports$d.REVISION_CHANGES = REVISION_CHANGES;
var objectType = "[object Object]";

function HandlebarsEnvironment(helpers, partials, decorators) {
  this.helpers = helpers || {};
  this.partials = partials || {};
  this.decorators = decorators || {};

  _helpers.registerDefaultHelpers(this);

  _decorators.registerDefaultDecorators(this);
}

HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,
  logger: _logger2["default"],
  log: _logger2["default"].log,
  registerHelper: function registerHelper(name, fn) {
    if (_utils$7.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2$4["default"]("Arg not supported with multiple helpers");
      }

      _utils$7.extend(this.helpers, name);
    } else {
      this.helpers[name] = fn;
    }
  },
  unregisterHelper: function unregisterHelper(name) {
    delete this.helpers[name];
  },
  registerPartial: function registerPartial(name, partial) {
    if (_utils$7.toString.call(name) === objectType) {
      _utils$7.extend(this.partials, name);
    } else {
      if (typeof partial === "undefined") {
        throw new _exception2$4["default"]("Attempting to register a partial called \"" + name + "\" as undefined");
      }

      this.partials[name] = partial;
    }
  },
  unregisterPartial: function unregisterPartial(name) {
    delete this.partials[name];
  },
  registerDecorator: function registerDecorator(name, fn) {
    if (_utils$7.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2$4["default"]("Arg not supported with multiple decorators");
      }

      _utils$7.extend(this.decorators, name);
    } else {
      this.decorators[name] = fn;
    }
  },
  unregisterDecorator: function unregisterDecorator(name) {
    delete this.decorators[name];
  },

  /**
   * Reset the memory of illegal property accesses that have already been logged.
   * @deprecated should only be used in handlebars test-cases
   */
  resetLoggedPropertyAccesses: function resetLoggedPropertyAccesses() {
    _internalProtoAccess.resetLoggedProperties();
  }
};
var log = _logger2["default"].log;
exports$d.log = log;
exports$d.createFrame = _utils$7.createFrame;
exports$d.logger = _logger2["default"]; 
const __esModule = exports$d.__esModule,
      createFrame = exports$d.createFrame,
      logger$2 = exports$d.logger;
const _HandlebarsEnvironment = exports$d.HandlebarsEnvironment,
      _VERSION = exports$d.VERSION,
      _COMPILER_REVISION = exports$d.COMPILER_REVISION,
      _LAST_COMPATIBLE_COMPILER_REVISION = exports$d.LAST_COMPATIBLE_COMPILER_REVISION,
      _REVISION_CHANGES = exports$d.REVISION_CHANGES,
      _log$1 = exports$d.log;

export { __esModule as _, exports$7 as a, exports$c as b, createFrame as c, _HandlebarsEnvironment as d, exports$d as e, _VERSION as f, _COMPILER_REVISION as g, _LAST_COMPATIBLE_COMPILER_REVISION as h, _REVISION_CHANGES as i, _log$1 as j, logger$2 as l };

//# sourceMappingURL=cac9e115.js.map