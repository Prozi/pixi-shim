'use strict'

if (!global.WebGLRenderingContext) {
  console.log("pixi-shim ❤️ WebGL");

  const createWebGLContext = require("gl");

  global.WebGLRenderingContext = createWebGLContext;

  document.createElement = function (create) {
    // Closure
    return function (type, attributes) {
      if (type === 'canvas') {
        attributes = attributes || {
          preserveDrawingBuffer: true,
          stencil: true
        };

        const canvas = global.Canvas.createCanvas(window.innerWidth, window.innerHeight);
        const glContext = createWebGLContext(window.innerWidth, window.innerHeight, attributes);
        const context2d = canvas.getContext('2d', attributes);

        glContext.canvas = canvas;
        context2d.canvas = canvas;

        canvas.style = document.createAttribute('style');
        canvas.getContext = type => {
          switch (type) {
            case '2d': return context2d
            default: return glContext
          }
        }

        // Better to bind to something & this canvas is not inside DOM
        canvas.addEventListener = (action, callback) => document.addEventListener(action, callback);

        // Ready object
        return canvas;
      }

      // If other type of createElement fallback to default
      return create.apply(this, arguments);
    };
  }(document.createElement)
}
