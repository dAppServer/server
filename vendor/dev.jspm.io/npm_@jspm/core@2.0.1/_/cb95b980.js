for(var r$1={byteLength:function(r){var t=u$2(r),e=t[0],n=t[1];return 3*(e+n)/4-n},toByteArray:function(r){var t,o,a=u$2(r),h=a[0],c=a[1],d=new n$2(function(r,t,e){return 3*(t+e)/4-e}(0,h,c)),f=0,A=c>0?h-4:h;for(o=0;o<A;o+=4)t=e$2[r.charCodeAt(o)]<<18|e$2[r.charCodeAt(o+1)]<<12|e$2[r.charCodeAt(o+2)]<<6|e$2[r.charCodeAt(o+3)],d[f++]=t>>16&255,d[f++]=t>>8&255,d[f++]=255&t;2===c&&(t=e$2[r.charCodeAt(o)]<<2|e$2[r.charCodeAt(o+1)]>>4,d[f++]=255&t);1===c&&(t=e$2[r.charCodeAt(o)]<<10|e$2[r.charCodeAt(o+1)]<<4|e$2[r.charCodeAt(o+2)]>>2,d[f++]=t>>8&255,d[f++]=255&t);return d},fromByteArray:function(r){for(var e,n=r.length,o=n%3,a=[],h=0,u=n-o;h<u;h+=16383)a.push(c$1(r,h,h+16383>u?u:h+16383));1===o?(e=r[n-1],a.push(t$1[e>>2]+t$1[e<<4&63]+"==")):2===o&&(e=(r[n-2]<<8)+r[n-1],a.push(t$1[e>>10]+t$1[e>>4&63]+t$1[e<<2&63]+"="));return a.join("")}},t$1=[],e$2=[],n$2="undefined"!=typeof Uint8Array?Uint8Array:Array,o$2="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a$1=0,h$1=o$2.length;a$1<h$1;++a$1)t$1[a$1]=o$2[a$1],e$2[o$2.charCodeAt(a$1)]=a$1;function u$2(r){var t=r.length;if(t%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var e=r.indexOf("=");return -1===e&&(e=t),[e,e===t?0:4-e%4]}function c$1(r,e,n){for(var o,a,h=[],u=e;u<n;u+=3)o=(r[u]<<16&16711680)+(r[u+1]<<8&65280)+(255&r[u+2]),h.push(t$1[(a=o)>>18&63]+t$1[a>>12&63]+t$1[a>>6&63]+t$1[63&a]);return h.join("")}e$2["-".charCodeAt(0)]=62,e$2["_".charCodeAt(0)]=63;var a$1$1={read:function(a,t,o,r,h){var M,f,p=8*h-r-1,w=(1<<p)-1,e=w>>1,i=-7,N=o?h-1:0,n=o?-1:1,u=a[t+N];for(N+=n,M=u&(1<<-i)-1,u>>=-i,i+=p;i>0;M=256*M+a[t+N],N+=n,i-=8);for(f=M&(1<<-i)-1,M>>=-i,i+=r;i>0;f=256*f+a[t+N],N+=n,i-=8);if(0===M)M=1-e;else {if(M===w)return f?NaN:1/0*(u?-1:1);f+=Math.pow(2,r),M-=e;}return (u?-1:1)*f*Math.pow(2,M-r)},write:function(a,t,o,r,h,M){var f,p,w,e=8*M-h-1,i=(1<<e)-1,N=i>>1,n=23===h?Math.pow(2,-24)-Math.pow(2,-77):0,u=r?0:M-1,l=r?1:-1,s=t<0||0===t&&1/t<0?1:0;for(t=Math.abs(t),isNaN(t)||t===1/0?(p=isNaN(t)?1:0,f=i):(f=Math.floor(Math.log(t)/Math.LN2),t*(w=Math.pow(2,-f))<1&&(f--,w*=2),(t+=f+N>=1?n/w:n*Math.pow(2,1-N))*w>=2&&(f++,w/=2),f+N>=i?(p=0,f=i):f+N>=1?(p=(t*w-1)*Math.pow(2,h),f+=N):(p=t*Math.pow(2,N-1)*Math.pow(2,h),f=0));h>=8;a[o+u]=255&p,u+=l,p/=256,h-=8);for(f=f<<h|p,e+=h;e>0;a[o+u]=255&f,u+=l,f/=256,e-=8);a[o+u-l]|=128*s;}};var e$1$1={},n$1$1=r$1,i$1=a$1$1,o$1$1="function"==typeof Symbol&&"function"==typeof Symbol.for?Symbol.for("nodejs.util.inspect.custom"):null;e$1$1.Buffer=u$1$1,e$1$1.SlowBuffer=function(t){+t!=t&&(t=0);return u$1$1.alloc(+t)},e$1$1.INSPECT_MAX_BYTES=50;function f$2(t){if(t>2147483647)throw new RangeError('The value "'+t+'" is invalid for option "size"');var r=new Uint8Array(t);return Object.setPrototypeOf(r,u$1$1.prototype),r}function u$1$1(t,r,e){if("number"==typeof t){if("string"==typeof r)throw new TypeError('The "string" argument must be of type string. Received type number');return a$2(t)}return s$1(t,r,e)}function s$1(t,r,e){if("string"==typeof t)return function(t,r){"string"==typeof r&&""!==r||(r="utf8");if(!u$1$1.isEncoding(r))throw new TypeError("Unknown encoding: "+r);var e=0|y(t,r),n=f$2(e),i=n.write(t,r);i!==e&&(n=n.slice(0,i));return n}(t,r);if(ArrayBuffer.isView(t))return p(t);if(null==t)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t);if(F(t,ArrayBuffer)||t&&F(t.buffer,ArrayBuffer))return c$1$1(t,r,e);if("undefined"!=typeof SharedArrayBuffer&&(F(t,SharedArrayBuffer)||t&&F(t.buffer,SharedArrayBuffer)))return c$1$1(t,r,e);if("number"==typeof t)throw new TypeError('The "value" argument must not be of type number. Received type number');var n=t.valueOf&&t.valueOf();if(null!=n&&n!==t)return u$1$1.from(n,r,e);var i=function(t){if(u$1$1.isBuffer(t)){var r=0|l$1(t.length),e=f$2(r);return 0===e.length||t.copy(e,0,0,r),e}if(void 0!==t.length)return "number"!=typeof t.length||N(t.length)?f$2(0):p(t);if("Buffer"===t.type&&Array.isArray(t.data))return p(t.data)}(t);if(i)return i;if("undefined"!=typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof t[Symbol.toPrimitive])return u$1$1.from(t[Symbol.toPrimitive]("string"),r,e);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t)}function h$1$1(t){if("number"!=typeof t)throw new TypeError('"size" argument must be of type number');if(t<0)throw new RangeError('The value "'+t+'" is invalid for option "size"')}function a$2(t){return h$1$1(t),f$2(t<0?0:0|l$1(t))}function p(t){for(var r=t.length<0?0:0|l$1(t.length),e=f$2(r),n=0;n<r;n+=1)e[n]=255&t[n];return e}function c$1$1(t,r,e){if(r<0||t.byteLength<r)throw new RangeError('"offset" is outside of buffer bounds');if(t.byteLength<r+(e||0))throw new RangeError('"length" is outside of buffer bounds');var n;return n=void 0===r&&void 0===e?new Uint8Array(t):void 0===e?new Uint8Array(t,r):new Uint8Array(t,r,e),Object.setPrototypeOf(n,u$1$1.prototype),n}function l$1(t){if(t>=2147483647)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+2147483647..toString(16)+" bytes");return 0|t}function y(t,r){if(u$1$1.isBuffer(t))return t.length;if(ArrayBuffer.isView(t)||F(t,ArrayBuffer))return t.byteLength;if("string"!=typeof t)throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof t);var e=t.length,n=arguments.length>2&&!0===arguments[2];if(!n&&0===e)return 0;for(var i=!1;;)switch(r){case"ascii":case"latin1":case"binary":return e;case"utf8":case"utf-8":return _(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*e;case"hex":return e>>>1;case"base64":return z(t).length;default:if(i)return n?-1:_(t).length;r=(""+r).toLowerCase(),i=!0;}}function g(t,r,e){var n=!1;if((void 0===r||r<0)&&(r=0),r>this.length)return "";if((void 0===e||e>this.length)&&(e=this.length),e<=0)return "";if((e>>>=0)<=(r>>>=0))return "";for(t||(t="utf8");;)switch(t){case"hex":return O(this,r,e);case"utf8":case"utf-8":return I(this,r,e);case"ascii":return S(this,r,e);case"latin1":case"binary":return R(this,r,e);case"base64":return T(this,r,e);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return L(this,r,e);default:if(n)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),n=!0;}}function w(t,r,e){var n=t[r];t[r]=t[e],t[e]=n;}function d(t,r,e,n,i){if(0===t.length)return -1;if("string"==typeof e?(n=e,e=0):e>2147483647?e=2147483647:e<-2147483648&&(e=-2147483648),N(e=+e)&&(e=i?0:t.length-1),e<0&&(e=t.length+e),e>=t.length){if(i)return -1;e=t.length-1;}else if(e<0){if(!i)return -1;e=0;}if("string"==typeof r&&(r=u$1$1.from(r,n)),u$1$1.isBuffer(r))return 0===r.length?-1:v(t,r,e,n,i);if("number"==typeof r)return r&=255,"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(t,r,e):Uint8Array.prototype.lastIndexOf.call(t,r,e):v(t,[r],e,n,i);throw new TypeError("val must be string, number or Buffer")}function v(t,r,e,n,i){var o,f=1,u=t.length,s=r.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(t.length<2||r.length<2)return -1;f=2,u/=2,s/=2,e/=2;}function h(t,r){return 1===f?t[r]:t.readUInt16BE(r*f)}if(i){var a=-1;for(o=e;o<u;o++)if(h(t,o)===h(r,-1===a?0:o-a)){if(-1===a&&(a=o),o-a+1===s)return a*f}else -1!==a&&(o-=o-a),a=-1;}else for(e+s>u&&(e=u-s),o=e;o>=0;o--){for(var p=!0,c=0;c<s;c++)if(h(t,o+c)!==h(r,c)){p=!1;break}if(p)return o}return -1}function b(t,r,e,n){e=Number(e)||0;var i=t.length-e;n?(n=Number(n))>i&&(n=i):n=i;var o=r.length;n>o/2&&(n=o/2);for(var f=0;f<n;++f){var u=parseInt(r.substr(2*f,2),16);if(N(u))return f;t[e+f]=u;}return f}function m(t,r,e,n){return D(_(r,t.length-e),t,e,n)}function E(t,r,e,n){return D(function(t){for(var r=[],e=0;e<t.length;++e)r.push(255&t.charCodeAt(e));return r}(r),t,e,n)}function B(t,r,e,n){return E(t,r,e,n)}function A(t,r,e,n){return D(z(r),t,e,n)}function U(t,r,e,n){return D(function(t,r){for(var e,n,i,o=[],f=0;f<t.length&&!((r-=2)<0);++f)e=t.charCodeAt(f),n=e>>8,i=e%256,o.push(i),o.push(n);return o}(r,t.length-e),t,e,n)}function T(t,r,e){return 0===r&&e===t.length?n$1$1.fromByteArray(t):n$1$1.fromByteArray(t.slice(r,e))}function I(t,r,e){e=Math.min(t.length,e);for(var n=[],i=r;i<e;){var o,f,u,s,h=t[i],a=null,p=h>239?4:h>223?3:h>191?2:1;if(i+p<=e)switch(p){case 1:h<128&&(a=h);break;case 2:128==(192&(o=t[i+1]))&&(s=(31&h)<<6|63&o)>127&&(a=s);break;case 3:o=t[i+1],f=t[i+2],128==(192&o)&&128==(192&f)&&(s=(15&h)<<12|(63&o)<<6|63&f)>2047&&(s<55296||s>57343)&&(a=s);break;case 4:o=t[i+1],f=t[i+2],u=t[i+3],128==(192&o)&&128==(192&f)&&128==(192&u)&&(s=(15&h)<<18|(63&o)<<12|(63&f)<<6|63&u)>65535&&s<1114112&&(a=s);}null===a?(a=65533,p=1):a>65535&&(a-=65536,n.push(a>>>10&1023|55296),a=56320|1023&a),n.push(a),i+=p;}return function(t){var r=t.length;if(r<=4096)return String.fromCharCode.apply(String,t);var e="",n=0;for(;n<r;)e+=String.fromCharCode.apply(String,t.slice(n,n+=4096));return e}(n)}e$1$1.kMaxLength=2147483647,u$1$1.TYPED_ARRAY_SUPPORT=function(){try{var t=new Uint8Array(1),r={foo:function(){return 42}};return Object.setPrototypeOf(r,Uint8Array.prototype),Object.setPrototypeOf(t,r),42===t.foo()}catch(t){return !1}}(),u$1$1.TYPED_ARRAY_SUPPORT||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(u$1$1.prototype,"parent",{enumerable:!0,get:function(){if(u$1$1.isBuffer(this))return this.buffer}}),Object.defineProperty(u$1$1.prototype,"offset",{enumerable:!0,get:function(){if(u$1$1.isBuffer(this))return this.byteOffset}}),u$1$1.poolSize=8192,u$1$1.from=function(t,r,e){return s$1(t,r,e)},Object.setPrototypeOf(u$1$1.prototype,Uint8Array.prototype),Object.setPrototypeOf(u$1$1,Uint8Array),u$1$1.alloc=function(t,r,e){return function(t,r,e){return h$1$1(t),t<=0?f$2(t):void 0!==r?"string"==typeof e?f$2(t).fill(r,e):f$2(t).fill(r):f$2(t)}(t,r,e)},u$1$1.allocUnsafe=function(t){return a$2(t)},u$1$1.allocUnsafeSlow=function(t){return a$2(t)},u$1$1.isBuffer=function(t){return null!=t&&!0===t._isBuffer&&t!==u$1$1.prototype},u$1$1.compare=function(t,r){if(F(t,Uint8Array)&&(t=u$1$1.from(t,t.offset,t.byteLength)),F(r,Uint8Array)&&(r=u$1$1.from(r,r.offset,r.byteLength)),!u$1$1.isBuffer(t)||!u$1$1.isBuffer(r))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(t===r)return 0;for(var e=t.length,n=r.length,i=0,o=Math.min(e,n);i<o;++i)if(t[i]!==r[i]){e=t[i],n=r[i];break}return e<n?-1:n<e?1:0},u$1$1.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return !0;default:return !1}},u$1$1.concat=function(t,r){if(!Array.isArray(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return u$1$1.alloc(0);var e;if(void 0===r)for(r=0,e=0;e<t.length;++e)r+=t[e].length;var n=u$1$1.allocUnsafe(r),i=0;for(e=0;e<t.length;++e){var o=t[e];if(F(o,Uint8Array)&&(o=u$1$1.from(o)),!u$1$1.isBuffer(o))throw new TypeError('"list" argument must be an Array of Buffers');o.copy(n,i),i+=o.length;}return n},u$1$1.byteLength=y,u$1$1.prototype._isBuffer=!0,u$1$1.prototype.swap16=function(){var t=this.length;if(t%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var r=0;r<t;r+=2)w(this,r,r+1);return this},u$1$1.prototype.swap32=function(){var t=this.length;if(t%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var r=0;r<t;r+=4)w(this,r,r+3),w(this,r+1,r+2);return this},u$1$1.prototype.swap64=function(){var t=this.length;if(t%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var r=0;r<t;r+=8)w(this,r,r+7),w(this,r+1,r+6),w(this,r+2,r+5),w(this,r+3,r+4);return this},u$1$1.prototype.toString=function(){var t=this.length;return 0===t?"":0===arguments.length?I(this,0,t):g.apply(this,arguments)},u$1$1.prototype.toLocaleString=u$1$1.prototype.toString,u$1$1.prototype.equals=function(t){if(!u$1$1.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===u$1$1.compare(this,t)},u$1$1.prototype.inspect=function(){var t="",r=e$1$1.INSPECT_MAX_BYTES;return t=this.toString("hex",0,r).replace(/(.{2})/g,"$1 ").trim(),this.length>r&&(t+=" ... "),"<Buffer "+t+">"},o$1$1&&(u$1$1.prototype[o$1$1]=u$1$1.prototype.inspect),u$1$1.prototype.compare=function(t,r,e,n,i){if(F(t,Uint8Array)&&(t=u$1$1.from(t,t.offset,t.byteLength)),!u$1$1.isBuffer(t))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof t);if(void 0===r&&(r=0),void 0===e&&(e=t?t.length:0),void 0===n&&(n=0),void 0===i&&(i=this.length),r<0||e>t.length||n<0||i>this.length)throw new RangeError("out of range index");if(n>=i&&r>=e)return 0;if(n>=i)return -1;if(r>=e)return 1;if(this===t)return 0;for(var o=(i>>>=0)-(n>>>=0),f=(e>>>=0)-(r>>>=0),s=Math.min(o,f),h=this.slice(n,i),a=t.slice(r,e),p=0;p<s;++p)if(h[p]!==a[p]){o=h[p],f=a[p];break}return o<f?-1:f<o?1:0},u$1$1.prototype.includes=function(t,r,e){return -1!==this.indexOf(t,r,e)},u$1$1.prototype.indexOf=function(t,r,e){return d(this,t,r,e,!0)},u$1$1.prototype.lastIndexOf=function(t,r,e){return d(this,t,r,e,!1)},u$1$1.prototype.write=function(t,r,e,n){if(void 0===r)n="utf8",e=this.length,r=0;else if(void 0===e&&"string"==typeof r)n=r,e=this.length,r=0;else {if(!isFinite(r))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");r>>>=0,isFinite(e)?(e>>>=0,void 0===n&&(n="utf8")):(n=e,e=void 0);}var i=this.length-r;if((void 0===e||e>i)&&(e=i),t.length>0&&(e<0||r<0)||r>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var o=!1;;)switch(n){case"hex":return b(this,t,r,e);case"utf8":case"utf-8":return m(this,t,r,e);case"ascii":return E(this,t,r,e);case"latin1":case"binary":return B(this,t,r,e);case"base64":return A(this,t,r,e);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return U(this,t,r,e);default:if(o)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),o=!0;}},u$1$1.prototype.toJSON=function(){return {type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function S(t,r,e){var n="";e=Math.min(t.length,e);for(var i=r;i<e;++i)n+=String.fromCharCode(127&t[i]);return n}function R(t,r,e){var n="";e=Math.min(t.length,e);for(var i=r;i<e;++i)n+=String.fromCharCode(t[i]);return n}function O(t,r,e){var n=t.length;(!r||r<0)&&(r=0),(!e||e<0||e>n)&&(e=n);for(var i="",o=r;o<e;++o)i+=Y[t[o]];return i}function L(t,r,e){for(var n=t.slice(r,e),i="",o=0;o<n.length;o+=2)i+=String.fromCharCode(n[o]+256*n[o+1]);return i}function x(t,r,e){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(t+r>e)throw new RangeError("Trying to access beyond buffer length")}function C(t,r,e,n,i,o){if(!u$1$1.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(r>i||r<o)throw new RangeError('"value" argument is out of bounds');if(e+n>t.length)throw new RangeError("Index out of range")}function P(t,r,e,n,i,o){if(e+n>t.length)throw new RangeError("Index out of range");if(e<0)throw new RangeError("Index out of range")}function k(t,r,e,n,o){return r=+r,e>>>=0,o||P(t,0,e,4),i$1.write(t,r,e,n,23,4),e+4}function M(t,r,e,n,o){return r=+r,e>>>=0,o||P(t,0,e,8),i$1.write(t,r,e,n,52,8),e+8}u$1$1.prototype.slice=function(t,r){var e=this.length;(t=~~t)<0?(t+=e)<0&&(t=0):t>e&&(t=e),(r=void 0===r?e:~~r)<0?(r+=e)<0&&(r=0):r>e&&(r=e),r<t&&(r=t);var n=this.subarray(t,r);return Object.setPrototypeOf(n,u$1$1.prototype),n},u$1$1.prototype.readUIntLE=function(t,r,e){t>>>=0,r>>>=0,e||x(t,r,this.length);for(var n=this[t],i=1,o=0;++o<r&&(i*=256);)n+=this[t+o]*i;return n},u$1$1.prototype.readUIntBE=function(t,r,e){t>>>=0,r>>>=0,e||x(t,r,this.length);for(var n=this[t+--r],i=1;r>0&&(i*=256);)n+=this[t+--r]*i;return n},u$1$1.prototype.readUInt8=function(t,r){return t>>>=0,r||x(t,1,this.length),this[t]},u$1$1.prototype.readUInt16LE=function(t,r){return t>>>=0,r||x(t,2,this.length),this[t]|this[t+1]<<8},u$1$1.prototype.readUInt16BE=function(t,r){return t>>>=0,r||x(t,2,this.length),this[t]<<8|this[t+1]},u$1$1.prototype.readUInt32LE=function(t,r){return t>>>=0,r||x(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},u$1$1.prototype.readUInt32BE=function(t,r){return t>>>=0,r||x(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},u$1$1.prototype.readIntLE=function(t,r,e){t>>>=0,r>>>=0,e||x(t,r,this.length);for(var n=this[t],i=1,o=0;++o<r&&(i*=256);)n+=this[t+o]*i;return n>=(i*=128)&&(n-=Math.pow(2,8*r)),n},u$1$1.prototype.readIntBE=function(t,r,e){t>>>=0,r>>>=0,e||x(t,r,this.length);for(var n=r,i=1,o=this[t+--n];n>0&&(i*=256);)o+=this[t+--n]*i;return o>=(i*=128)&&(o-=Math.pow(2,8*r)),o},u$1$1.prototype.readInt8=function(t,r){return t>>>=0,r||x(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},u$1$1.prototype.readInt16LE=function(t,r){t>>>=0,r||x(t,2,this.length);var e=this[t]|this[t+1]<<8;return 32768&e?4294901760|e:e},u$1$1.prototype.readInt16BE=function(t,r){t>>>=0,r||x(t,2,this.length);var e=this[t+1]|this[t]<<8;return 32768&e?4294901760|e:e},u$1$1.prototype.readInt32LE=function(t,r){return t>>>=0,r||x(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},u$1$1.prototype.readInt32BE=function(t,r){return t>>>=0,r||x(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},u$1$1.prototype.readFloatLE=function(t,r){return t>>>=0,r||x(t,4,this.length),i$1.read(this,t,!0,23,4)},u$1$1.prototype.readFloatBE=function(t,r){return t>>>=0,r||x(t,4,this.length),i$1.read(this,t,!1,23,4)},u$1$1.prototype.readDoubleLE=function(t,r){return t>>>=0,r||x(t,8,this.length),i$1.read(this,t,!0,52,8)},u$1$1.prototype.readDoubleBE=function(t,r){return t>>>=0,r||x(t,8,this.length),i$1.read(this,t,!1,52,8)},u$1$1.prototype.writeUIntLE=function(t,r,e,n){(t=+t,r>>>=0,e>>>=0,n)||C(this,t,r,e,Math.pow(2,8*e)-1,0);var i=1,o=0;for(this[r]=255&t;++o<e&&(i*=256);)this[r+o]=t/i&255;return r+e},u$1$1.prototype.writeUIntBE=function(t,r,e,n){(t=+t,r>>>=0,e>>>=0,n)||C(this,t,r,e,Math.pow(2,8*e)-1,0);var i=e-1,o=1;for(this[r+i]=255&t;--i>=0&&(o*=256);)this[r+i]=t/o&255;return r+e},u$1$1.prototype.writeUInt8=function(t,r,e){return t=+t,r>>>=0,e||C(this,t,r,1,255,0),this[r]=255&t,r+1},u$1$1.prototype.writeUInt16LE=function(t,r,e){return t=+t,r>>>=0,e||C(this,t,r,2,65535,0),this[r]=255&t,this[r+1]=t>>>8,r+2},u$1$1.prototype.writeUInt16BE=function(t,r,e){return t=+t,r>>>=0,e||C(this,t,r,2,65535,0),this[r]=t>>>8,this[r+1]=255&t,r+2},u$1$1.prototype.writeUInt32LE=function(t,r,e){return t=+t,r>>>=0,e||C(this,t,r,4,4294967295,0),this[r+3]=t>>>24,this[r+2]=t>>>16,this[r+1]=t>>>8,this[r]=255&t,r+4},u$1$1.prototype.writeUInt32BE=function(t,r,e){return t=+t,r>>>=0,e||C(this,t,r,4,4294967295,0),this[r]=t>>>24,this[r+1]=t>>>16,this[r+2]=t>>>8,this[r+3]=255&t,r+4},u$1$1.prototype.writeIntLE=function(t,r,e,n){if(t=+t,r>>>=0,!n){var i=Math.pow(2,8*e-1);C(this,t,r,e,i-1,-i);}var o=0,f=1,u=0;for(this[r]=255&t;++o<e&&(f*=256);)t<0&&0===u&&0!==this[r+o-1]&&(u=1),this[r+o]=(t/f>>0)-u&255;return r+e},u$1$1.prototype.writeIntBE=function(t,r,e,n){if(t=+t,r>>>=0,!n){var i=Math.pow(2,8*e-1);C(this,t,r,e,i-1,-i);}var o=e-1,f=1,u=0;for(this[r+o]=255&t;--o>=0&&(f*=256);)t<0&&0===u&&0!==this[r+o+1]&&(u=1),this[r+o]=(t/f>>0)-u&255;return r+e},u$1$1.prototype.writeInt8=function(t,r,e){return t=+t,r>>>=0,e||C(this,t,r,1,127,-128),t<0&&(t=255+t+1),this[r]=255&t,r+1},u$1$1.prototype.writeInt16LE=function(t,r,e){return t=+t,r>>>=0,e||C(this,t,r,2,32767,-32768),this[r]=255&t,this[r+1]=t>>>8,r+2},u$1$1.prototype.writeInt16BE=function(t,r,e){return t=+t,r>>>=0,e||C(this,t,r,2,32767,-32768),this[r]=t>>>8,this[r+1]=255&t,r+2},u$1$1.prototype.writeInt32LE=function(t,r,e){return t=+t,r>>>=0,e||C(this,t,r,4,2147483647,-2147483648),this[r]=255&t,this[r+1]=t>>>8,this[r+2]=t>>>16,this[r+3]=t>>>24,r+4},u$1$1.prototype.writeInt32BE=function(t,r,e){return t=+t,r>>>=0,e||C(this,t,r,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),this[r]=t>>>24,this[r+1]=t>>>16,this[r+2]=t>>>8,this[r+3]=255&t,r+4},u$1$1.prototype.writeFloatLE=function(t,r,e){return k(this,t,r,!0,e)},u$1$1.prototype.writeFloatBE=function(t,r,e){return k(this,t,r,!1,e)},u$1$1.prototype.writeDoubleLE=function(t,r,e){return M(this,t,r,!0,e)},u$1$1.prototype.writeDoubleBE=function(t,r,e){return M(this,t,r,!1,e)},u$1$1.prototype.copy=function(t,r,e,n){if(!u$1$1.isBuffer(t))throw new TypeError("argument should be a Buffer");if(e||(e=0),n||0===n||(n=this.length),r>=t.length&&(r=t.length),r||(r=0),n>0&&n<e&&(n=e),n===e)return 0;if(0===t.length||0===this.length)return 0;if(r<0)throw new RangeError("targetStart out of bounds");if(e<0||e>=this.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-r<n-e&&(n=t.length-r+e);var i=n-e;if(this===t&&"function"==typeof Uint8Array.prototype.copyWithin)this.copyWithin(r,e,n);else if(this===t&&e<r&&r<n)for(var o=i-1;o>=0;--o)t[o+r]=this[o+e];else Uint8Array.prototype.set.call(t,this.subarray(e,n),r);return i},u$1$1.prototype.fill=function(t,r,e,n){if("string"==typeof t){if("string"==typeof r?(n=r,r=0,e=this.length):"string"==typeof e&&(n=e,e=this.length),void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!u$1$1.isEncoding(n))throw new TypeError("Unknown encoding: "+n);if(1===t.length){var i=t.charCodeAt(0);("utf8"===n&&i<128||"latin1"===n)&&(t=i);}}else "number"==typeof t?t&=255:"boolean"==typeof t&&(t=Number(t));if(r<0||this.length<r||this.length<e)throw new RangeError("Out of range index");if(e<=r)return this;var o;if(r>>>=0,e=void 0===e?this.length:e>>>0,t||(t=0),"number"==typeof t)for(o=r;o<e;++o)this[o]=t;else {var f=u$1$1.isBuffer(t)?t:u$1$1.from(t,n),s=f.length;if(0===s)throw new TypeError('The value "'+t+'" is invalid for argument "value"');for(o=0;o<e-r;++o)this[o+r]=f[o%s];}return this};var j=/[^+/0-9A-Za-z-_]/g;function _(t,r){var e;r=r||1/0;for(var n=t.length,i=null,o=[],f=0;f<n;++f){if((e=t.charCodeAt(f))>55295&&e<57344){if(!i){if(e>56319){(r-=3)>-1&&o.push(239,191,189);continue}if(f+1===n){(r-=3)>-1&&o.push(239,191,189);continue}i=e;continue}if(e<56320){(r-=3)>-1&&o.push(239,191,189),i=e;continue}e=65536+(i-55296<<10|e-56320);}else i&&(r-=3)>-1&&o.push(239,191,189);if(i=null,e<128){if((r-=1)<0)break;o.push(e);}else if(e<2048){if((r-=2)<0)break;o.push(e>>6|192,63&e|128);}else if(e<65536){if((r-=3)<0)break;o.push(e>>12|224,e>>6&63|128,63&e|128);}else {if(!(e<1114112))throw new Error("Invalid code point");if((r-=4)<0)break;o.push(e>>18|240,e>>12&63|128,e>>6&63|128,63&e|128);}}return o}function z(t){return n$1$1.toByteArray(function(t){if((t=(t=t.split("=")[0]).trim().replace(j,"")).length<2)return "";for(;t.length%4!=0;)t+="=";return t}(t))}function D(t,r,e,n){for(var i=0;i<n&&!(i+e>=r.length||i>=t.length);++i)r[i+e]=t[i];return i}function F(t,r){return t instanceof r||null!=t&&null!=t.constructor&&null!=t.constructor.name&&t.constructor.name===r.name}function N(t){return t!=t}var Y=function(){for(var t=new Array(256),r=0;r<16;++r)for(var e=16*r,n=0;n<16;++n)t[e+n]="0123456789abcdef"[r]+"0123456789abcdef"[n];return t}();e$1$1.Buffer;e$1$1.INSPECT_MAX_BYTES;e$1$1.kMaxLength;

var e={},n=e$1$1,o=n.Buffer;function t(r,e){for(var n in r)e[n]=r[n];}function f(r,e,n){return o(r,e,n)}o.from&&o.alloc&&o.allocUnsafe&&o.allocUnsafeSlow?e=n:(t(n,e),e.Buffer=f),f.prototype=Object.create(o.prototype),t(o,f),f.from=function(r,e,n){if("number"==typeof r)throw new TypeError("Argument must not be a number");return o(r,e,n)},f.alloc=function(r,e,n){if("number"!=typeof r)throw new TypeError("Argument must be a number");var t=o(r);return void 0!==e?"string"==typeof n?t.fill(e,n):t.fill(e):t.fill(0),t},f.allocUnsafe=function(r){if("number"!=typeof r)throw new TypeError("Argument must be a number");return o(r)},f.allocUnsafeSlow=function(r){if("number"!=typeof r)throw new TypeError("Argument must be a number");return n.SlowBuffer(r)};var u=e;var e$1={},s=u.Buffer,i=s.isEncoding||function(t){switch((t=""+t)&&t.toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":case"raw":return !0;default:return !1}};function a(t){var e;switch(this.encoding=function(t){var e=function(t){if(!t)return "utf8";for(var e;;)switch(t){case"utf8":case"utf-8":return "utf8";case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return "utf16le";case"latin1":case"binary":return "latin1";case"base64":case"ascii":case"hex":return t;default:if(e)return;t=(""+t).toLowerCase(),e=!0;}}(t);if("string"!=typeof e&&(s.isEncoding===i||!i(t)))throw new Error("Unknown encoding: "+t);return e||t}(t),this.encoding){case"utf16le":this.text=h,this.end=l,e=4;break;case"utf8":this.fillLast=n$1,e=4;break;case"base64":this.text=u$1,this.end=o$1,e=3;break;default:return this.write=f$1,this.end=c,void 0}this.lastNeed=0,this.lastTotal=0,this.lastChar=s.allocUnsafe(e);}function r(t){return t<=127?0:t>>5==6?2:t>>4==14?3:t>>3==30?4:t>>6==2?-1:-2}function n$1(t){var e=this.lastTotal-this.lastNeed,s=function(t,e,s){if(128!=(192&e[0]))return t.lastNeed=0,"�";if(t.lastNeed>1&&e.length>1){if(128!=(192&e[1]))return t.lastNeed=1,"�";if(t.lastNeed>2&&e.length>2&&128!=(192&e[2]))return t.lastNeed=2,"�"}}(this,t);return void 0!==s?s:this.lastNeed<=t.length?(t.copy(this.lastChar,e,0,this.lastNeed),this.lastChar.toString(this.encoding,0,this.lastTotal)):(t.copy(this.lastChar,e,0,t.length),this.lastNeed-=t.length,void 0)}function h(t,e){if((t.length-e)%2==0){var s=t.toString("utf16le",e);if(s){var i=s.charCodeAt(s.length-1);if(i>=55296&&i<=56319)return this.lastNeed=2,this.lastTotal=4,this.lastChar[0]=t[t.length-2],this.lastChar[1]=t[t.length-1],s.slice(0,-1)}return s}return this.lastNeed=1,this.lastTotal=2,this.lastChar[0]=t[t.length-1],t.toString("utf16le",e,t.length-1)}function l(t){var e=t&&t.length?this.write(t):"";if(this.lastNeed){var s=this.lastTotal-this.lastNeed;return e+this.lastChar.toString("utf16le",0,s)}return e}function u$1(t,e){var s=(t.length-e)%3;return 0===s?t.toString("base64",e):(this.lastNeed=3-s,this.lastTotal=3,1===s?this.lastChar[0]=t[t.length-1]:(this.lastChar[0]=t[t.length-2],this.lastChar[1]=t[t.length-1]),t.toString("base64",e,t.length-s))}function o$1(t){var e=t&&t.length?this.write(t):"";return this.lastNeed?e+this.lastChar.toString("base64",0,3-this.lastNeed):e}function f$1(t){return t.toString(this.encoding)}function c(t){return t&&t.length?this.write(t):""}e$1.StringDecoder=a,a.prototype.write=function(t){if(0===t.length)return "";var e,s;if(this.lastNeed){if(void 0===(e=this.fillLast(t)))return "";s=this.lastNeed,this.lastNeed=0;}else s=0;return s<t.length?e?e+this.text(t,s):this.text(t,s):e||""},a.prototype.end=function(t){var e=t&&t.length?this.write(t):"";return this.lastNeed?e+"�":e},a.prototype.text=function(t,e){var s=function(t,e,s){var i=e.length-1;if(i<s)return 0;var a=r(e[i]);if(a>=0)return a>0&&(t.lastNeed=a-1),a;if(--i<s||-2===a)return 0;if((a=r(e[i]))>=0)return a>0&&(t.lastNeed=a-2),a;if(--i<s||-2===a)return 0;if((a=r(e[i]))>=0)return a>0&&(2===a?a=0:t.lastNeed=a-3),a;return 0}(this,t,e);if(!this.lastNeed)return t.toString("utf8",e);this.lastTotal=s;var i=t.length-(s-this.lastNeed);return t.copy(this.lastChar,0,i),t.toString("utf8",e,i)},a.prototype.fillLast=function(t){if(this.lastNeed<=t.length)return t.copy(this.lastChar,this.lastTotal-this.lastNeed,0,this.lastNeed),this.lastChar.toString(this.encoding,0,this.lastTotal);t.copy(this.lastChar,this.lastTotal-this.lastNeed,0,t.length),this.lastNeed-=t.length;};

e$1.StringDecoder;

e$1.StringDecoder;

export { e$1$1 as a, e$1 as e, u };

//# sourceMappingURL=cb95b980.js.map