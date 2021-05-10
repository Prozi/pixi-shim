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
  console.warn(err.message || err);

  console.info("please run:");
  console.info(
    "sudo apt install xserver-xorg-dev libxi-dev libxext-dev libstdc++6 libxrandr-dev libxinerama-dev libxcursor-dev libfreeimage-dev libglew-dev libxi-dev libglfw3 -y"
  );
}

module.exports = global.window.PIXI;
