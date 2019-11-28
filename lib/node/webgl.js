console.log("pixi-shim ❤️ WebGL");

const WebGLContext = require("gl");

global.WebGLRenderingContext = global.window.WebGLRenderingContext = WebGLContext;

global.HTMLCanvasElement.prototype.getContext = function(type) {
  switch (type) {
    case "webgl": {
      const webglContext = new WebGLContext(1024, 768);
      const dump = webglContext.getContextAttributes();
      dump.stencil = true; // Here we cheat pixi.js isWebGLSupported
      WebGLContext.prototype.getContextAttributes = () => dump;
      return webglContext;
    }
    default: {
      return new global.Canvas().getContext(...arguments);
    }
  }
};

global.HTMLCanvasElement.prototype.toDataURL = function() {
  return new global.Canvas().toDataURL();
};
