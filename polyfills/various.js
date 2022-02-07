"use strict";

const window = global.window;

if (!window.navigator) {
  window.navigator = { userAgent: "node.js" }; // could be anything

  if (typeof global !== "undefined") {
    global.navigator = window.navigator;
  }
}

if (!global.performance) {
  const performance = { now: () => Date.now() };

  Object.defineProperty(window, "performance", performance);
  global.performance = performance;
}

if (!window.requestAnimationFrame) {
  function requestAnimationFrame(fn) {
    return setTimeout(fn, 17);
  }

  global.requestAnimationFrame = window.requestAnimationFrame =
    requestAnimationFrame;
}

if (!window.cancelAnimationFrame) {
  global.cancelAnimationFrame = window.cancelAnimationFrame = clearTimeout;
}
