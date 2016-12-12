"use strict";

module.exports = {
  JSON: JSON,
  JS: JS,
  URL: URL
};

function JSON(s) {
  return !URL(s) && /\.json$/.test(s);
}

function JS(s) {
  return !URL(s) && /\.js$/.test(s);
}

function URL(s) {
  return (/^(http|https):/.test(s)
  );
}