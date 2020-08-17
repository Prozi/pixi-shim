"use strict";

/*global process*/

if (!global.window) {
  console.log("pixi-shim ❤️ DOM");

  require("jsdom-global")();

  if (!window.innerWidth) {
    window.innerWidth = process.env.WINDOW_WIDTH || 800;
  }

  if (!window.innerHeight) {
    window.innerHeight = process.env.WINDOW_HEIGHT || 600;
  }

  console.log(`pixi-shim ❤️ Window ${window.innerWidth}x${window.innerHeight}`);
}
