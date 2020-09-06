"use strict";

const DummyContext = require("../dummy");

/* global process */

HTMLCanvasElement.prototype.getContext = function (
  type = "2d",
  contextOptions = {}
) {
  if (
    typeof process !== "undefined" &&
    process.env &&
    process.env.NODE_ENV !== "production"
  ) {
    console.log({
      getContext: {
        type,
        contextOptions,
      },
    });
  }

  const stringified = JSON.stringify(contextOptions);
  const ref = type === "2d" ? "_context2d" : "gl";

  if (!this[ref] || this._contextOptions !== stringified) {
    this._contextOptions = stringified;

    if (type === "2d") {
      this[ref] = new DummyContext(this, contextOptions);
    } else {
      const gl = (this[ref] = createWebGLRenderingContext(contextOptions));

      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());

      if (
        typeof process !== "undefined" &&
        process.env &&
        process.env.NODE_ENV !== "production"
      ) {
        console.log("WebGL Context VERSION: " + gl.getParameter(gl.VERSION));
        console.log("WebGL Context RENDERER: " + gl.getParameter(gl.RENDERER));
      }
    }

    this[ref].canvas = this;
  }

  this.context = this[ref];

  return this.context;
};

document.createElement = (function (create) {
  // Closure
  return function (type) {
    let element;

    switch (type) {
      case "canvas": {
        element = new Canvas(window.innerWidth, window.innerHeight);
        element.addEventListener = (action, callback) =>
          document.addEventListener(action, callback);
        element.getContext = HTMLCanvasElement.prototype.getContext.bind(
          element
        );
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
