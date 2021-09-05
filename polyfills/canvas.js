"use strict";

const { createCanvas } = require("canvas");
const DummyContext = require("../dummy");

if (typeof HTMLCanvasElement === "undefined") {
  HTMLCanvasElement = function HTMLCanvasElement() {
    return createCanvas(1024, 768)
  }
}

if (!global.Canvas) {
  global.Canvas = HTMLCanvasElement
}

if (!HTMLCanvasElement.prototype.getContext) {
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
}