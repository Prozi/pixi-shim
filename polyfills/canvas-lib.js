"use strict";

const { Canvas, CanvasRenderingContext2D } = require("canvas");

console.log("pixi-shim ❤️ Canvas");

global.Canvas = window.Canvas = Canvas;
global.CanvasRenderingContext2D = window.CanvasRenderingContext2D = CanvasRenderingContext2D;
