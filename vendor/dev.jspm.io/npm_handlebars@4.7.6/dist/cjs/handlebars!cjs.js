import exports$4 from './handlebars/utils!cjs';
import _exception3 from './handlebars/exception!cjs';
import '../../_/cac9e115.js';
import './handlebars/safe-string!cjs';
import './handlebars/runtime!cjs';
import { _ as _handlebars$1, a as _noConflict } from '../../_/a1417093.js';
import _ast from './handlebars/compiler/ast!cjs';
import _parser3 from './handlebars/compiler/parser!cjs';
import _visitor3 from './handlebars/compiler/visitor!cjs';
import exports$5 from './handlebars/compiler/compiler!cjs';
import '/npm:source-map@0.6!cjs';
import _javascriptCompiler from './handlebars/compiler/javascript-compiler!cjs';

var exports = {};
exports.__esModule = true; // istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

var _visitor = _visitor3;

var _visitor2 = _interopRequireDefault(_visitor);

function WhitespaceControl() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  this.options = options;
}

WhitespaceControl.prototype = new _visitor2["default"]();

WhitespaceControl.prototype.Program = function (program) {
  var doStandalone = !this.options.ignoreStandalone;
  var isRoot = !this.isRootSeen;
  this.isRootSeen = true;
  var body = program.body;

  for (var i = 0, l = body.length; i < l; i++) {
    var current = body[i],
        strip = this.accept(current);

    if (!strip) {
      continue;
    }

    var _isPrevWhitespace = isPrevWhitespace(body, i, isRoot),
        _isNextWhitespace = isNextWhitespace(body, i, isRoot),
        openStandalone = strip.openStandalone && _isPrevWhitespace,
        closeStandalone = strip.closeStandalone && _isNextWhitespace,
        inlineStandalone = strip.inlineStandalone && _isPrevWhitespace && _isNextWhitespace;

    if (strip.close) {
      omitRight(body, i, true);
    }

    if (strip.open) {
      omitLeft(body, i, true);
    }

    if (doStandalone && inlineStandalone) {
      omitRight(body, i);

      if (omitLeft(body, i)) {
        // If we are on a standalone node, save the indent info for partials
        if (current.type === "PartialStatement") {
          // Pull out the whitespace from the final line
          current.indent = /([ \t]+$)/.exec(body[i - 1].original)[1];
        }
      }
    }

    if (doStandalone && openStandalone) {
      omitRight((current.program || current.inverse).body); // Strip out the previous content node if it's whitespace only

      omitLeft(body, i);
    }

    if (doStandalone && closeStandalone) {
      // Always strip the next node
      omitRight(body, i);
      omitLeft((current.inverse || current.program).body);
    }
  }

  return program;
};

WhitespaceControl.prototype.BlockStatement = WhitespaceControl.prototype.DecoratorBlock = WhitespaceControl.prototype.PartialBlockStatement = function (block) {
  this.accept(block.program);
  this.accept(block.inverse); // Find the inverse program that is involed with whitespace stripping.

  var program = block.program || block.inverse,
      inverse = block.program && block.inverse,
      firstInverse = inverse,
      lastInverse = inverse;

  if (inverse && inverse.chained) {
    firstInverse = inverse.body[0].program; // Walk the inverse chain to find the last inverse that is actually in the chain.

    while (lastInverse.chained) {
      lastInverse = lastInverse.body[lastInverse.body.length - 1].program;
    }
  }

  var strip = {
    open: block.openStrip.open,
    close: block.closeStrip.close,
    // Determine the standalone candiacy. Basically flag our content as being possibly standalone
    // so our parent can determine if we actually are standalone
    openStandalone: isNextWhitespace(program.body),
    closeStandalone: isPrevWhitespace((firstInverse || program).body)
  };

  if (block.openStrip.close) {
    omitRight(program.body, null, true);
  }

  if (inverse) {
    var inverseStrip = block.inverseStrip;

    if (inverseStrip.open) {
      omitLeft(program.body, null, true);
    }

    if (inverseStrip.close) {
      omitRight(firstInverse.body, null, true);
    }

    if (block.closeStrip.open) {
      omitLeft(lastInverse.body, null, true);
    } // Find standalone else statments


    if (!this.options.ignoreStandalone && isPrevWhitespace(program.body) && isNextWhitespace(firstInverse.body)) {
      omitLeft(program.body);
      omitRight(firstInverse.body);
    }
  } else if (block.closeStrip.open) {
    omitLeft(program.body, null, true);
  }

  return strip;
};

WhitespaceControl.prototype.Decorator = WhitespaceControl.prototype.MustacheStatement = function (mustache) {
  return mustache.strip;
};

WhitespaceControl.prototype.PartialStatement = WhitespaceControl.prototype.CommentStatement = function (node) {
  /* istanbul ignore next */
  var strip = node.strip || {};
  return {
    inlineStandalone: true,
    open: strip.open,
    close: strip.close
  };
};

function isPrevWhitespace(body, i, isRoot) {
  if (i === undefined) {
    i = body.length;
  } // Nodes that end with newlines are considered whitespace (but are special
  // cased for strip operations)


  var prev = body[i - 1],
      sibling = body[i - 2];

  if (!prev) {
    return isRoot;
  }

  if (prev.type === "ContentStatement") {
    return (sibling || !isRoot ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(prev.original);
  }
}

function isNextWhitespace(body, i, isRoot) {
  if (i === undefined) {
    i = -1;
  }

  var next = body[i + 1],
      sibling = body[i + 2];

  if (!next) {
    return isRoot;
  }

  if (next.type === "ContentStatement") {
    return (sibling || !isRoot ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(next.original);
  }
} // Marks the node to the right of the position as omitted.
// I.e. {{foo}}' ' will mark the ' ' node as omitted.
//
// If i is undefined, then the first child will be marked as such.
//
// If mulitple is truthy then all whitespace will be stripped out until non-whitespace
// content is met.


function omitRight(body, i, multiple) {
  var current = body[i == null ? 0 : i + 1];

  if (!current || current.type !== "ContentStatement" || !multiple && current.rightStripped) {
    return;
  }

  var original = current.value;
  current.value = current.value.replace(multiple ? /^\s+/ : /^[ \t]*\r?\n?/, "");
  current.rightStripped = current.value !== original;
} // Marks the node to the left of the position as omitted.
// I.e. ' '{{foo}} will mark the ' ' node as omitted.
//
// If i is undefined then the last child will be marked as such.
//
// If mulitple is truthy then all whitespace will be stripped out until non-whitespace
// content is met.


function omitLeft(body, i, multiple) {
  var current = body[i == null ? body.length - 1 : i - 1];

  if (!current || current.type !== "ContentStatement" || !multiple && current.leftStripped) {
    return;
  } // We omit the last node if it's whitespace only and not preceded by a non-content node.


  var original = current.value;
  current.value = current.value.replace(multiple ? /\s+$/ : /[ \t]+$/, "");
  current.leftStripped = current.value !== original;
  return current.leftStripped;
}

exports["default"] = WhitespaceControl;
exports = exports["default"]; 

var _whitespaceControl3 = exports;

var exports$1 = {};
exports$1.__esModule = true;
exports$1.SourceLocation = SourceLocation;
exports$1.id = id;
exports$1.stripFlags = stripFlags;
exports$1.stripComment = stripComment;
exports$1.preparePath = preparePath;
exports$1.prepareMustache = prepareMustache;
exports$1.prepareRawBlock = prepareRawBlock;
exports$1.prepareBlock = prepareBlock;
exports$1.prepareProgram = prepareProgram;
exports$1.preparePartialBlock = preparePartialBlock; // istanbul ignore next

function _interopRequireDefault$1(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

var _exception = _exception3;

var _exception2 = _interopRequireDefault$1(_exception);

function validateClose(open, close) {
  close = close.path ? close.path.original : close;

  if (open.path.original !== close) {
    var errorNode = {
      loc: open.path.loc
    };
    throw new _exception2["default"](open.path.original + " doesn't match " + close, errorNode);
  }
}

function SourceLocation(source, locInfo) {
  this.source = source;
  this.start = {
    line: locInfo.first_line,
    column: locInfo.first_column
  };
  this.end = {
    line: locInfo.last_line,
    column: locInfo.last_column
  };
}

function id(token) {
  if (/^\[.*\]$/.test(token)) {
    return token.substring(1, token.length - 1);
  } else {
    return token;
  }
}

function stripFlags(open, close) {
  return {
    open: open.charAt(2) === "~",
    close: close.charAt(close.length - 3) === "~"
  };
}

function stripComment(comment) {
  return comment.replace(/^\{\{~?!-?-?/, "").replace(/-?-?~?\}\}$/, "");
}

function preparePath(data, parts, loc) {
  loc = this.locInfo(loc);
  var original = data ? "@" : "",
      dig = [],
      depth = 0;

  for (var i = 0, l = parts.length; i < l; i++) {
    var part = parts[i].part,
        // If we have [] syntax then we do not treat path references as operators,
    // i.e. foo.[this] resolves to approximately context.foo['this']
    isLiteral = parts[i].original !== part;
    original += (parts[i].separator || "") + part;

    if (!isLiteral && (part === ".." || part === "." || part === "this")) {
      if (dig.length > 0) {
        throw new _exception2["default"]("Invalid path: " + original, {
          loc: loc
        });
      } else if (part === "..") {
        depth++;
      }
    } else {
      dig.push(part);
    }
  }

  return {
    type: "PathExpression",
    data: data,
    depth: depth,
    parts: dig,
    original: original,
    loc: loc
  };
}

function prepareMustache(path, params, hash, open, strip, locInfo) {
  // Must use charAt to support IE pre-10
  var escapeFlag = open.charAt(3) || open.charAt(2),
      escaped = escapeFlag !== "{" && escapeFlag !== "&";
  var decorator = /\*/.test(open);
  return {
    type: decorator ? "Decorator" : "MustacheStatement",
    path: path,
    params: params,
    hash: hash,
    escaped: escaped,
    strip: strip,
    loc: this.locInfo(locInfo)
  };
}

function prepareRawBlock(openRawBlock, contents, close, locInfo) {
  validateClose(openRawBlock, close);
  locInfo = this.locInfo(locInfo);
  var program = {
    type: "Program",
    body: contents,
    strip: {},
    loc: locInfo
  };
  return {
    type: "BlockStatement",
    path: openRawBlock.path,
    params: openRawBlock.params,
    hash: openRawBlock.hash,
    program: program,
    openStrip: {},
    inverseStrip: {},
    closeStrip: {},
    loc: locInfo
  };
}

function prepareBlock(openBlock, program, inverseAndProgram, close, inverted, locInfo) {
  if (close && close.path) {
    validateClose(openBlock, close);
  }

  var decorator = /\*/.test(openBlock.open);
  program.blockParams = openBlock.blockParams;
  var inverse = undefined,
      inverseStrip = undefined;

  if (inverseAndProgram) {
    if (decorator) {
      throw new _exception2["default"]("Unexpected inverse block on decorator", inverseAndProgram);
    }

    if (inverseAndProgram.chain) {
      inverseAndProgram.program.body[0].closeStrip = close.strip;
    }

    inverseStrip = inverseAndProgram.strip;
    inverse = inverseAndProgram.program;
  }

  if (inverted) {
    inverted = inverse;
    inverse = program;
    program = inverted;
  }

  return {
    type: decorator ? "DecoratorBlock" : "BlockStatement",
    path: openBlock.path,
    params: openBlock.params,
    hash: openBlock.hash,
    program: program,
    inverse: inverse,
    openStrip: openBlock.strip,
    inverseStrip: inverseStrip,
    closeStrip: close && close.strip,
    loc: this.locInfo(locInfo)
  };
}

function prepareProgram(statements, loc) {
  if (!loc && statements.length) {
    var firstLoc = statements[0].loc,
        lastLoc = statements[statements.length - 1].loc;
    /* istanbul ignore else */

    if (firstLoc && lastLoc) {
      loc = {
        source: firstLoc.source,
        start: {
          line: firstLoc.start.line,
          column: firstLoc.start.column
        },
        end: {
          line: lastLoc.end.line,
          column: lastLoc.end.column
        }
      };
    }
  }

  return {
    type: "Program",
    body: statements,
    strip: {},
    loc: loc
  };
}

function preparePartialBlock(open, program, close, locInfo) {
  validateClose(open, close);
  return {
    type: "PartialBlockStatement",
    name: open.path,
    params: open.params,
    hash: open.hash,
    program: program,
    openStrip: open.strip,
    closeStrip: close && close.strip,
    loc: this.locInfo(locInfo)
  };
}

var exports$2 = {};
exports$2.__esModule = true;
exports$2.parseWithoutProcessing = parseWithoutProcessing;
exports$2.parse = parse; // istanbul ignore next

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
} // istanbul ignore next


function _interopRequireDefault$2(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

var _parser = _parser3;

var _parser2 = _interopRequireDefault$2(_parser);

var _whitespaceControl = _whitespaceControl3;

var _whitespaceControl2 = _interopRequireDefault$2(_whitespaceControl);

var _helpers = exports$1;

var Helpers = _interopRequireWildcard(_helpers);

var _utils = exports$4;
exports$2.parser = _parser2["default"];
var yy = {};

_utils.extend(yy, Helpers);

function parseWithoutProcessing(input, options) {
  // Just return if an already-compiled AST was passed in.
  if (input.type === "Program") {
    return input;
  }

  _parser2["default"].yy = yy; // Altering the shared object here, but this is ok as parser is a sync operation

  yy.locInfo = function (locInfo) {
    return new yy.SourceLocation(options && options.srcName, locInfo);
  };

  var ast = _parser2["default"].parse(input);

  return ast;
}

function parse(input, options) {
  var ast = parseWithoutProcessing(input, options);
  var strip = new _whitespaceControl2["default"](options);
  return strip.accept(ast);
}

var exports$3 = {};
exports$3.__esModule = true; // istanbul ignore next

function _interopRequireDefault$3(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

var _handlebarsRuntime = _handlebars$1;

var _handlebarsRuntime2 = _interopRequireDefault$3(_handlebarsRuntime); // Compiler imports


var _handlebarsCompilerAst = _ast;

var _handlebarsCompilerAst2 = _interopRequireDefault$3(_handlebarsCompilerAst);

var _handlebarsCompilerBase = exports$2;
var _handlebarsCompilerCompiler = exports$5;
var _handlebarsCompilerJavascriptCompiler = _javascriptCompiler;

var _handlebarsCompilerJavascriptCompiler2 = _interopRequireDefault$3(_handlebarsCompilerJavascriptCompiler);

var _handlebarsCompilerVisitor = _visitor3;

var _handlebarsCompilerVisitor2 = _interopRequireDefault$3(_handlebarsCompilerVisitor);

var _handlebarsNoConflict = _noConflict;

var _handlebarsNoConflict2 = _interopRequireDefault$3(_handlebarsNoConflict);

var _create = _handlebarsRuntime2["default"].create;

function create() {
  var hb = _create();

  hb.compile = function (input, options) {
    return _handlebarsCompilerCompiler.compile(input, options, hb);
  };

  hb.precompile = function (input, options) {
    return _handlebarsCompilerCompiler.precompile(input, options, hb);
  };

  hb.AST = _handlebarsCompilerAst2["default"];
  hb.Compiler = _handlebarsCompilerCompiler.Compiler;
  hb.JavaScriptCompiler = _handlebarsCompilerJavascriptCompiler2["default"];
  hb.Parser = _handlebarsCompilerBase.parser;
  hb.parse = _handlebarsCompilerBase.parse;
  hb.parseWithoutProcessing = _handlebarsCompilerBase.parseWithoutProcessing;
  return hb;
}

var inst = create();
inst.create = create;

_handlebarsNoConflict2["default"](inst);

inst.Visitor = _handlebarsCompilerVisitor2["default"];
inst["default"] = inst;
exports$3["default"] = inst;
exports$3 = exports$3["default"]; 

var _handlebars = exports$3;
const __esModule = exports$3.__esModule;

export default _handlebars;
export { __esModule };

//# sourceMappingURL=handlebars!cjs.map