var exports = {};
exports.__esModule = true;
var AST = {
  // Public API used to evaluate derived attributes regarding AST nodes
  helpers: {
    // a mustache is definitely a helper if:
    // * it is an eligible helper, and
    // * it has at least one parameter or hash segment
    helperExpression: function helperExpression(node) {
      return node.type === "SubExpression" || (node.type === "MustacheStatement" || node.type === "BlockStatement") && !!(node.params && node.params.length || node.hash);
    },
    scopedId: function scopedId(path) {
      return /^\.|this\b/.test(path.original);
    },
    // an ID is simple if it only has one part, and that part is not
    // `..` or `this`.
    simpleId: function simpleId(path) {
      return path.parts.length === 1 && !AST.helpers.scopedId(path) && !path.depth;
    }
  }
}; // Must be exported as an object rather than the root of the module as the jison lexer
// must modify the object to operate properly.

exports["default"] = AST;
exports = exports["default"]; 

var _ast = exports;
const __esModule = exports.__esModule;

export default _ast;
export { __esModule };

//# sourceMappingURL=ast!cjs.map