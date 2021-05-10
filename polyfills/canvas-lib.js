"use strict";

const { Canvas, CanvasRenderingContext2D } = require("canvas");

console.log("pixi-shim ❤️ Canvas");

window.Canvas = Canvas;
window.CanvasRenderingContext2D = CanvasRenderingContext2D;
