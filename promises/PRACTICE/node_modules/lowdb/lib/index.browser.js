'use strict';

var index = require('./_index');
var storage = require('./browser');

module.exports = function low(source) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { storage: storage };

  return index(source, opts, window._);
};