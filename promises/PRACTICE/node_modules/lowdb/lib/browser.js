'use strict';

/* global localStorage */

module.exports = {
  read: function read(source) {
    var deserialize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : JSON.parse;

    var data = localStorage.getItem(source);
    if (data) {
      return deserialize(data);
    } else {
      localStorage.setItem(source, '{}');
      return {};
    }
  },
  write: function write(dest, obj) {
    var serialize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : JSON.stringify;
    return localStorage.setItem(dest, serialize(obj));
  }
};