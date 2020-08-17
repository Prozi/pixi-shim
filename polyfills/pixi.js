"use strict";

const DummyContext = require("../dummy");

console.log("pixi-shim ❤️ PIXI.js");

const getObject = () => {};
const context = new DummyContext();
const texture = { addChild: getObject, width: 16, height: 16, x: 0, y: 0 };
const sprite = texture;

const PIXI = {
  utils: {},
  Renderer: { prototype: {} },
  Ticker: { shared: { add: getObject } },
  Loader: { shared: { add: getObject }, prototype: {} },
  Texture: { from: () => texture },
  Sprite: { from: () => sprite },
  Application: function () {
    this.stage = window.PIXI.Sprite.from();
    this.view = { getContext: () => context, toDataURL: () => "" };
    this.render = getObject;
  },
};

PIXI.utils.isWebGLSupported = () => true; // Here we cheat pixi.js
PIXI.Renderer.prototype.resize = () => true;
PIXI.Loader.prototype.load = function load(done) {
  done(this);
};

module.exports = PIXI;
