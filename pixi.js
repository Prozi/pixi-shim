"use strict";

// those polyfills are harmless
require("./polyfills/window");

try {
  // `yarn add canvas`
  require("./polyfills/canvas-lib");

  // `yarn add pixi.js-legacy`
  global.window.PIXI = require("pixi.js-legacy");
} catch (err) {
  console.error(err.message || err);
  console.info("https://github.com/Automattic/node-canvas#compiling");
}

module.exports = global.window.PIXI;
