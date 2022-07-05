"use strict";

const {
  Canvas,
  CanvasRenderingContext2D,
  createCanvas,
  loadImage,
} = require("canvas");

const debug = require('../debugLogger');

debug("❤️  Canvas");

global.Canvas = window.Canvas = Canvas;
global.Canvas.createCanvas = createCanvas;
global.Canvas.loadImage = loadImage;
global.CanvasRenderingContext2D = window.CanvasRenderingContext2D =
  CanvasRenderingContext2D;

const getCanvasContext = global.Canvas.prototype.getContext;

global.Canvas.prototype.getContext = function getContext(type) {
  return getCanvasContext.call(this, type);
};
