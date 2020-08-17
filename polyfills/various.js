"use strict";

if (!window.navigator) {
  console.log("pixi-shim ❤️ polyfill navigator");

  window.navigator = { userAgent: "node.js" }; // could be anything

  if (typeof global !== "undefined") {
    global.navigator = window.navigator;
  }
}

if (!global.performance) {
  console.log("pixi-shim ❤️ polyfill performance.now");

  const performance = { now: () => Date.now() };

  Object.defineProperty(window, "performance", performance);
  global.performance = performance;
}

if (!window.requestAnimationFrame) {
  console.log("pixi-shim ❤️ polyfill requestAnimationFrame");

  global.requestAnimationFrame = window.requestAnimationFrame = setTimeout;
}
