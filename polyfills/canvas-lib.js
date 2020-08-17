"use strict";

const { Canvas, CanvasRenderingContext2D } = require("canvas");
const { createWebGLRenderingContext } = require("node-gles");

console.log("pixi-shim ❤️ Canvas + WebGL");

window.Canvas = Canvas;
window.CanvasRenderingContext2D = CanvasRenderingContext2D;
window.WebGLRenderingContext = global.WebGLRenderingContext = createWebGLRenderingContext;
window.WebGL2RenderingContext = global.WebGL2RenderingContext = createWebGLRenderingContext;
