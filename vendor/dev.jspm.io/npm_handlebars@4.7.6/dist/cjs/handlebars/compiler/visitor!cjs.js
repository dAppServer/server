import _exception3 from '../exception!cjs';

var exports = {};
exports.__esModule = true; // istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

var _exception = _exception3;

var _exception2 = _interopRequireDefault(_exception);

function Visitor() {
  this.parents = [];
}

Visitor.prototype = {
  constructor: Visitor,
  mutating: false,
  // Visits a given value. If mutating, will replace the value if necessary.
  acceptKey: function acceptKey(node, name) {
    var value = this.accept(node[name]);

    if (this.mutating) {
      // Hacky sanity check: This may have a few false positives for type for the helper
      // methods but will generally do the right thing without a lot of overhead.
      if (value && !Visitor.prototype[value.type]) {
        throw new _exception2["default"]("Unexpected node type \"" + value.type + "\" found when accepting " + name + " on " + node.type);
      }

      node[name] = value;
    }
  },
  // Performs an accept operation with added sanity check to ensure
  // required keys are not removed.
  acceptRequired: function acceptRequired(node, name) {
    this.acceptKey(node, name);

    if (!node[name]) {
      throw new _exception2["default"](node.type + " requires " + name);
    }
  },
  // Traverses a given array. If mutating, empty respnses will be removed
  // for child elements.
  acceptArray: function acceptArray(array) {
    for (var i = 0, l = array.length; i < l; i++) {
      this.acceptKey(array, i);

      if (!array[i]) {
        array.splice(i, 1);
        i--;
        l--;
      }
    }
  },
  accept: function accept(object) {
    if (!object) {
      return;
    }
    /* istanbul ignore next: Sanity code */


    if (!this[object.type]) {
      throw new _exception2["default"]("Unknown type: " + object.type, object);
    }

    if (this.current) {
      this.parents.unshift(this.current);
    }

    this.current = object;
    var ret = this[object.type](object);
    this.current = this.parents.shift();

    if (!this.mutating || ret) {
      return ret;
    } else if (ret !== false) {
      return object;
    }
  },
  Program: function Program(program) {
    this.acceptArray(program.body);
  },
  MustacheStatement: visitSubExpression,
  Decorator: visitSubExpression,
  BlockStatement: visitBlock,
  DecoratorBlock: visitBlock,
  PartialStatement: visitPartial,
  PartialBlockStatement: function PartialBlockStatement(partial) {
    visitPartial.call(this, partial);
    this.acceptKey(partial, "program");
  },
  ContentStatement: function ContentStatement()
  /* content */
  {},
  CommentStatement: function CommentStatement()
  /* comment */
  {},
  SubExpression: visitSubExpression,
  PathExpression: function PathExpression()
  /* path */
  {},
  StringLiteral: function StringLiteral()
  /* string */
  {},
  NumberLiteral: function NumberLiteral()
  /* number */
  {},
  BooleanLiteral: function BooleanLiteral()
  /* bool */
  {},
  UndefinedLiteral: function UndefinedLiteral()
  /* literal */
  {},
  NullLiteral: function NullLiteral()
  /* literal */
  {},
  Hash: function Hash(hash) {
    this.acceptArray(hash.pairs);
  },
  HashPair: function HashPair(pair) {
    this.acceptRequired(pair, "value");
  }
};

function visitSubExpression(mustache) {
  this.acceptRequired(mustache, "path");
  this.acceptArray(mustache.params);
  this.acceptKey(mustache, "hash");
}

function visitBlock(block) {
  visitSubExpression.call(this, block);
  this.acceptKey(block, "program");
  this.acceptKey(block, "inverse");
}

function visitPartial(partial) {
  this.acceptRequired(partial, "name");
  this.acceptArray(partial.params);
  this.acceptKey(partial, "hash");
}

exports["default"] = Visitor;
exports = exports["default"]; 

var _visitor3 = exports;
const __esModule = exports.__esModule;

export default _visitor3;
export { __esModule };

//# sourceMappingURL=visitor!cjs.map