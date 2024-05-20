"use strict";

const DummyContext = require("../dummy");

if (typeof HTMLCanvasElement === "undefined") {
  function HTMLCanvasElement() {}

  global.HTMLCanvasElement = HTMLCanvasElement;
}

if (typeof OffscreenCanvas === "undefined") {
  function OffscreenCanvas() {}

  global.OffscreenCanvas = OffscreenCanvas;
}

if (typeof Canvas === "undefined") {
  function Canvas() {}

  global.Canvas = Canvas;
}

HTMLCanvasElement.prototype.getContext = getContext;

function getContext(type = "2d", contextOptions = {}) {
  const stringified = JSON.stringify(contextOptions);
  const ref = type === "2d" ? "_context2d" : "gl";

  if (!this[ref] || this._contextOptions !== stringified) {
    this._contextOptions = stringified;

    if (type === "2d") {
      this[ref] = new DummyContext(this, contextOptions);
    } else {
      this[ref] = createWebGLRenderingContext(contextOptions);
      this[ref].getParameter = () => ({});
    }

    this[ref].canvas = this;
  }

  this.context = this[ref];

  return this.context;
}

if (typeof document === "undefined") {
  global.document = {};
}

document.createElement = (function (create) {
  // Closure
  return function (type) {
    let element;

    switch (type) {
      case "canvas": {
        element = new Canvas(window.innerWidth, window.innerHeight);
        element.addEventListener = (action, callback) =>
          document.addEventListener(action, callback);
        element.getContext =
          HTMLCanvasElement.prototype.getContext.bind(element);
        break;
      }
      // If other type of createElement fallback to default
      default: {
        element = create.apply(this, arguments);
        break;
      }
    }

    // Monkey patch style prop
    element.style = document.createAttribute("style");

    return element;
  };
})(document.createElement);
