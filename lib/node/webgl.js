console.log("pixi-shim ❤️ WebGL");

const WebGLContext = require("gl");
WebGLContext.prototype.isContextLost = () => false
WebGLContext.prototype.createShader = () => null

const Canvas = global.Canvas;
CanvasRenderingContext2D.prototype.isContextLost = () => false

global.HTMLCanvasElement.prototype.getContext = function(type, attributes) {
  if (!this._contexts) {
    this._contexts = {};
  }
  if (!this._contexts[type]) {
    this._contexts[type] = createContext(type, attributes);
  }
  return this._contexts[type];
};

global.HTMLCanvasElement.prototype.toDataURL = function() {
  return new Canvas().toDataURL(...arguments);
};

function createContext(type, attributes) {
  switch (type) {
    case "experimental-webgl":
    case "webgl2":
    case "webgl": {
      return new WebGLContext(1024, 768, attributes || {});
    }
    default: {
      return new Canvas().getContext(type, attributes || {});
    }
  }
}

global.window.WebGLRenderingContext = global.WebGLRenderingContext = WebGLContext;
