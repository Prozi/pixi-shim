"use strict";

const DummyContext = require("../dummy");

console.log("pixi-shim ❤️ PIXI.js");

const getObject = () => {};
const context = new DummyContext();

class Point {
  constructor(x = 0, y = 0) {
    this.set(x, y);
    this.width = 16;
    this.height = 16;
  }
  
  set (x, y) {
    this.x = x;
    this.y = y;
  }
}

function Container() {
  this.position = new Point(0, 0);
  this.anchor = new Point(0, 0);
  this.scale = new Point(0, 0);
  this.children = [];
}
Container.prototype.addChildAt = () => undefined;
Container.prototype.addChild = () => undefined;
Container.prototype.removeChild = () => undefined;

class Rectangle extends Container {};

class Sprite extends Container {};
Sprite.from = () => new Sprite();

class TilingSprite extends Sprite {};

class Texture extends Sprite {};
Texture.from = () => new Texture();
Texture.prototype.baseTexture = {};

const PIXI = {
  utils: {},
  Renderer: { prototype: {} },
  Ticker: { shared: { add: getObject } },
  Loader: { shared: { add: getObject }, prototype: {} },
  Texture: { from: () => new Texture() },
  Sprite,
  Rectangle,
  Container,
  Texture,
  TilingSprite,
  SCALE_MODES: {},
  UPDATE_PRIORITY: {},
  Application: function () {
    this.stage = new Sprite();
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
