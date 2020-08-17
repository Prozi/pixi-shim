"use strict";

const DummyContext = require("../dummy");

global.Canvas = global.Canvas || function DummyCanvas() {};

global.CanvasRenderingContext2D =
  global.CanvasRenderingContext2D || DummyContext;

global.WebGLRenderingContext = global.WebGLRenderingContext || DummyContext;

global.createWebGLRenderingContext =
  global.createWebGLRenderingContext || (() => new WebGLRenderingContext());
