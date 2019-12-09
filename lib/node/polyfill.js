'use strict'

if (!window.navigator) {
  console.log("pixi-shim ❤️ polyfill navigator");

  navigator = window.navigator = { userAgent: "node.js" }; // could be anything
}

if (!global.performance) {
  console.log("pixi-shim ❤️ polyfill performance.now");

  performance = window.performance = { now: () => Date.now() }
}

if (!window.requestAnimationFrame) {
  console.log("pixi-shim ❤️ polyfill requestAnimationFrame");

  requestAnimationFrame = window.requestAnimationFrame = setTimeout;
}
