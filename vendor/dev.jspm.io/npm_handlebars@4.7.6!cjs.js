import './npm:handlebars@4.7.6/dist/cjs/handlebars/utils!cjs';
import './npm:handlebars@4.7.6/dist/cjs/handlebars/exception!cjs';
import './npm:handlebars@4.7.6/_/cac9e115.js';
import './npm:handlebars@4.7.6/dist/cjs/handlebars/safe-string!cjs';
import './npm:handlebars@4.7.6/dist/cjs/handlebars/runtime!cjs';
import './npm:handlebars@4.7.6/_/a1417093.js';
import './npm:handlebars@4.7.6/dist/cjs/handlebars/compiler/ast!cjs';
import './npm:handlebars@4.7.6/dist/cjs/handlebars/compiler/parser!cjs';
import _visitor3 from './npm:handlebars@4.7.6/dist/cjs/handlebars/compiler/visitor!cjs';
import _handlebars from './npm:handlebars@4.7.6/dist/cjs/handlebars!cjs';
import './npm:handlebars@4.7.6/dist/cjs/handlebars/compiler/compiler!cjs';
import '/npm:source-map@0.6!cjs';
import './npm:handlebars@4.7.6/dist/cjs/handlebars/compiler/javascript-compiler!cjs';
import _fs from '/npm:@jspm/core@2/nodelibs/fs';

var exports = {};
exports.__esModule = true;
exports.print = print;
exports.PrintVisitor = PrintVisitor; // istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

var _visitor = _visitor3;

var _visitor2 = _interopRequireDefault(_visitor);

function print(ast) {
  return new PrintVisitor().accept(ast);
}

function PrintVisitor() {
  this.padding = 0;
}

PrintVisitor.prototype = new _visitor2["default"]();

PrintVisitor.prototype.pad = function (string) {
  var out = "";

  for (var i = 0, l = this.padding; i < l; i++) {
    out += "  ";
  }

  out += string + "\n";
  return out;
};

PrintVisitor.prototype.Program = function (program) {
  var out = "",
      body = program.body,
      i = undefined,
      l = undefined;

  if (program.blockParams) {
    var blockParams = "BLOCK PARAMS: [";

    for (i = 0, l = program.blockParams.length; i < l; i++) {
      blockParams += " " + program.blockParams[i];
    }

    blockParams += " ]";
    out += this.pad(blockParams);
  }

  for (i = 0, l = body.length; i < l; i++) {
    out += this.accept(body[i]);
  }

  this.padding--;
  return out;
};

PrintVisitor.prototype.MustacheStatement = function (mustache) {
  return this.pad("{{ " + this.SubExpression(mustache) + " }}");
};

PrintVisitor.prototype.Decorator = function (mustache) {
  return this.pad("{{ DIRECTIVE " + this.SubExpression(mustache) + " }}");
};

PrintVisitor.prototype.BlockStatement = PrintVisitor.prototype.DecoratorBlock = function (block) {
  var out = "";
  out += this.pad((block.type === "DecoratorBlock" ? "DIRECTIVE " : "") + "BLOCK:");
  this.padding++;
  out += this.pad(this.SubExpression(block));

  if (block.program) {
    out += this.pad("PROGRAM:");
    this.padding++;
    out += this.accept(block.program);
    this.padding--;
  }

  if (block.inverse) {
    if (block.program) {
      this.padding++;
    }

    out += this.pad("{{^}}");
    this.padding++;
    out += this.accept(block.inverse);
    this.padding--;

    if (block.program) {
      this.padding--;
    }
  }

  this.padding--;
  return out;
};

PrintVisitor.prototype.PartialStatement = function (partial) {
  var content = "PARTIAL:" + partial.name.original;

  if (partial.params[0]) {
    content += " " + this.accept(partial.params[0]);
  }

  if (partial.hash) {
    content += " " + this.accept(partial.hash);
  }

  return this.pad("{{> " + content + " }}");
};

PrintVisitor.prototype.PartialBlockStatement = function (partial) {
  var content = "PARTIAL BLOCK:" + partial.name.original;

  if (partial.params[0]) {
    content += " " + this.accept(partial.params[0]);
  }

  if (partial.hash) {
    content += " " + this.accept(partial.hash);
  }

  content += " " + this.pad("PROGRAM:");
  this.padding++;
  content += this.accept(partial.program);
  this.padding--;
  return this.pad("{{> " + content + " }}");
};

PrintVisitor.prototype.ContentStatement = function (content) {
  return this.pad("CONTENT[ '" + content.value + "' ]");
};

PrintVisitor.prototype.CommentStatement = function (comment) {
  return this.pad("{{! '" + comment.value + "' }}");
};

PrintVisitor.prototype.SubExpression = function (sexpr) {
  var params = sexpr.params,
      paramStrings = [],
      hash = undefined;

  for (var i = 0, l = params.length; i < l; i++) {
    paramStrings.push(this.accept(params[i]));
  }

  params = "[" + paramStrings.join(", ") + "]";
  hash = sexpr.hash ? " " + this.accept(sexpr.hash) : "";
  return this.accept(sexpr.path) + " " + params + hash;
};

PrintVisitor.prototype.PathExpression = function (id) {
  var path = id.parts.join("/");
  return (id.data ? "@" : "") + "PATH:" + path;
};

PrintVisitor.prototype.StringLiteral = function (string) {
  return "\"" + string.value + "\"";
};

PrintVisitor.prototype.NumberLiteral = function (number) {
  return "NUMBER{" + number.value + "}";
};

PrintVisitor.prototype.BooleanLiteral = function (bool) {
  return "BOOLEAN{" + bool.value + "}";
};

PrintVisitor.prototype.UndefinedLiteral = function () {
  return "UNDEFINED";
};

PrintVisitor.prototype.NullLiteral = function () {
  return "NULL";
};

PrintVisitor.prototype.Hash = function (hash) {
  var pairs = hash.pairs,
      joinedPairs = [];

  for (var i = 0, l = pairs.length; i < l; i++) {
    joinedPairs.push(this.accept(pairs[i]));
  }

  return "HASH{" + joinedPairs.join(", ") + "}";
};

PrintVisitor.prototype.HashPair = function (pair) {
  return pair.key + "=" + this.accept(pair.value);
};

var exports$1 = {};
// USAGE:
// var handlebars = require('handlebars');

/* eslint-disable no-var */
// var local = handlebars.create();
var handlebars = _handlebars["default"];
var printer = exports;
handlebars.PrintVisitor = printer.PrintVisitor;
handlebars.print = printer.print;
exports$1 = handlebars; // Publish a Node.js require() handler for .handlebars and .hbs files

function extension(module, filename) {
  var fs = _fs;
  var templateString = fs.readFileSync(filename, "utf8");
  module.exports = handlebars.compile(templateString);
}
/* istanbul ignore else */


if ({}) {
  ({})[".handlebars"] = extension;
  ({})[".hbs"] = extension;
}

var exports$2 = exports$1;

export default exports$2;

//# sourceMappingURL=npm:handlebars@4.7.6!cjs.map