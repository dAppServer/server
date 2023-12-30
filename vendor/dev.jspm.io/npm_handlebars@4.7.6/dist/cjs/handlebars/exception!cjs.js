var exports = {};
exports.__esModule = true;
var errorProps = ["description", "fileName", "lineNumber", "endLineNumber", "message", "name", "number", "stack"];

function Exception(message, node) {
  var loc = node && node.loc,
      line = undefined,
      endLineNumber = undefined,
      column = undefined,
      endColumn = undefined;

  if (loc) {
    line = loc.start.line;
    endLineNumber = loc.end.line;
    column = loc.start.column;
    endColumn = loc.end.column;
    message += " - " + line + ":" + column;
  }

  var tmp = Error.prototype.constructor.call(this, message); // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.

  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }
  /* istanbul ignore else */


  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, Exception);
  }

  try {
    if (loc) {
      this.lineNumber = line;
      this.endLineNumber = endLineNumber; // Work around issue under safari where we can't directly set the column value

      /* istanbul ignore next */

      if (Object.defineProperty) {
        Object.defineProperty(this, "column", {
          value: column,
          enumerable: true
        });
        Object.defineProperty(this, "endColumn", {
          value: endColumn,
          enumerable: true
        });
      } else {
        this.column = column;
        this.endColumn = endColumn;
      }
    }
  } catch (nop) {
    /* Ignore if the browser is very particular */
  }
}

Exception.prototype = new Error();
exports["default"] = Exception;
exports = exports["default"]; 

var _exception3 = exports;
const __esModule = exports.__esModule;

export default _exception3;
export { __esModule };

//# sourceMappingURL=exception!cjs.map