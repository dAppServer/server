var _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : global;

var exports = {};

/**
 * Expose `Emitter`.
 */
exports = Emitter;
/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
}

;
/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }

  return obj;
}
/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */


Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
  (this || _global)._callbacks = (this || _global)._callbacks || {};
  ((this || _global)._callbacks["$" + event] = (this || _global)._callbacks["$" + event] || []).push(fn);
  return this || _global;
};
/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */


Emitter.prototype.once = function (event, fn) {
  function on() {
    this.off(event, on);
    fn.apply(this || _global, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this || _global;
};
/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */


Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
  (this || _global)._callbacks = (this || _global)._callbacks || {}; // all

  if (0 == arguments.length) {
    (this || _global)._callbacks = {};
    return this || _global;
  } // specific event


  var callbacks = (this || _global)._callbacks["$" + event];
  if (!callbacks) return this || _global; // remove all handlers

  if (1 == arguments.length) {
    delete (this || _global)._callbacks["$" + event];
    return this || _global;
  } // remove specific handler


  var cb;

  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];

    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  } // Remove event specific arrays for event types that no
  // one is subscribed for to avoid memory leak.


  if (callbacks.length === 0) {
    delete (this || _global)._callbacks["$" + event];
  }

  return this || _global;
};
/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */


Emitter.prototype.emit = function (event) {
  (this || _global)._callbacks = (this || _global)._callbacks || {};
  var args = new Array(arguments.length - 1),
      callbacks = (this || _global)._callbacks["$" + event];

  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }

  if (callbacks) {
    callbacks = callbacks.slice(0);

    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this || _global, args);
    }
  }

  return this || _global;
};
/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */


Emitter.prototype.listeners = function (event) {
  (this || _global)._callbacks = (this || _global)._callbacks || {};
  return (this || _global)._callbacks["$" + event] || [];
};
/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */


Emitter.prototype.hasListeners = function (event) {
  return !!this.listeners(event).length;
};

var exports$1 = exports;

export default exports$1;

//# sourceMappingURL=npm:component-emitter@1.3.0!cjs.map