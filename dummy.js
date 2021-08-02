"use strict";

function DummyContext() {}

function getUndefined() {
  return undefined;
}

DummyContext.prototype = {
  drawImage: getUndefined,
  getImageData: getUndefined,
  fillRect: getUndefined,
  bindBuffer: getUndefined,
  createBuffer: getUndefined,
  createShader: () => ({}),
  createProgram: getUndefined,
  getInternalformatParameter: getUndefined,
  getExtension: getUndefined,
  getError: getUndefined,
  shaderSource: getUndefined,
  compileShader: getUndefined,
  attachShader: getUndefined,
  deleteShader: getUndefined,
  linkProgram: getUndefined,
  getProgramParameter: getUndefined,
  getProgramInfoLog: console.log,
  getShaderInfoLog: console.log,
  getShaderParameter: getUndefined,
  deleteProgram: getUndefined,
  enable: getUndefined,
  disable: getUndefined,
  blendFunc: getUndefined,
  pixelStorei: getUndefined,
  texParameteri: getUndefined,
  frontFace: getUndefined,
  blendEquationSeparate: getUndefined,
  createTexture: getUndefined,
  bindTexture: getUndefined,
  texImage2D: getUndefined,
  activeTexture: getUndefined,
  getParameter: () => 1,
  getContextAttributes: () => ({}),
  isContextLost: () => false,
};

module.exports = DummyContext;
