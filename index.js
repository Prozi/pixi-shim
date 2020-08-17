"use strict";

// those polyfills are harmless
require("./polyfills/window");
require("./polyfills/various");

// require("./polyfills/canvas-lib");
// require("./polyfills/webgl");

// this is a total shim of context
require("./polyfills/dummy");
require("./polyfills/canvas");

// finally pixi is propably going to load
if (!window.PIXI) {
  window.PIXI = require("./polyfills/pixi.js");
}

module.exports = window.PIXI;
