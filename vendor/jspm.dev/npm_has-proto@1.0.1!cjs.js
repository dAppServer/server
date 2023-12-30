var exports = {};
var test = {
  foo: {}
};
var $Object = Object;
exports = function hasProto() {
  return {
    __proto__: test
  }.foo === test.foo && !({
    __proto__: null
  } instanceof $Object);
};
var exports$1 = exports;

export { exports$1 as default };

//# sourceMappingURL=npm:has-proto@1.0.1!cjs.map