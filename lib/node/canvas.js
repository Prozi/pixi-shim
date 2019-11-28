
if (!global.Canvas) {
  console.log("pixi-shim ❤️ Canvas");
  const Canvas = require("canvas-prebuilt");

  global.Canvas = Canvas;
}

if (!global.CanvasRenderingContext2D) {
  console.log("pixi-shim ❤️ CanvasRenderingContext2D");

  global.CanvasRenderingContext2D = global.Canvas.Context2d;
}
