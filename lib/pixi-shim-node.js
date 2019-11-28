require("./node/window");
require("./node/canvas");
require("./node/image");
require("./node/webgl");
require("./node/polyfill");

if (!global.window.PIXI) {
  console.log("pixi-shim ❤️ PIXI.js");

  global.window.PIXI = require("pixi.js");
  global.window.PIXI.utils.isWebGLSupported = () => true; // Here we cheat pixi.js
  global.window.PIXI.Loader.prototype.load = function load(done) {
    done(this);
  };

  // This is required otherwise an error is thrown
  global.process.env.LIBGL_DRI3_DISABLE = 1;
}
