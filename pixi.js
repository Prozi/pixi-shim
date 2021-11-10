"use strict";

try {
  // core
  require("./polyfills/window");
  require("./polyfills/various");

  // `npm install canvas@^2 --save`
  require("./polyfills/canvas-lib");

  // now fill with what it should be
  global.window.PIXI = require("pixi.js-legacy");
} catch (err) {
  console.error(err.message || err);

  console.info('sudo add-apt-repository ppa:ricotz/testing');
  console.info('sudo apt-get install libcairo2-dev');
}

module.exports = global.window.PIXI;
