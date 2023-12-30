import { e as exports } from '../_/a17f45f2.js';
export { e as default } from '../_/a17f45f2.js';
import { promisify } from './util';
import './events';
import '../_/8ddf35de.js';
import '../_/8dc3f476.js';
import '../_/a421dfba.js';
import '../_/57403c48.js';
import '../_/633ae550.js';
import '../_/e0803811.js';
import '../_/cb95b980.js';

var Readable = exports.Readable;
Readable.wrap = function(src, options) {
  options = Object.assign({ objectMode: src.readableObjectMode != null || src.objectMode != null || true }, options);
  options.destroy = function(err, callback) {
    src.destroy(err);
    callback(err);
  };
  return new Readable(options).wrap(src);
};

var Writable = exports.Writable;
var Duplex = exports.Duplex;
var Transform = exports.Transform;
var PassThrough = exports.PassThrough;
var finished = exports.finished;
var pipeline = exports.pipeline;
var Stream = exports.Stream;

const promises = {
  finished: promisify(exports.finished),
  pipeline: promisify(exports.pipeline)
};

export { Duplex, PassThrough, Readable, Stream, Transform, Writable, finished, pipeline, promises };

//# sourceMappingURL=stream.map