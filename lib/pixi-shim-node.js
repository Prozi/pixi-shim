require("./node/window");
require("./node/canvas");
require("./node/polyfill");

if (!window.PIXI) {
  console.log("pixi-shim ❤️ PIXI.js");

  window.PIXI = require("pixi.js");
  window.PIXI.utils.isWebGLSupported = () => true; // Here we cheat pixi.js
  window.PIXI.Renderer.prototype.resize = () => false;
  window.PIXI.Loader.prototype.load = function load(done) {
    done(this);
  };
}
