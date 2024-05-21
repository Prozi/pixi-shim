"use strict";

const polyfill = require("./window-polyfill");

polyfill("window", () => {
  require("jsdom-global")();
});

polyfill("window.navigator", () => ({ userAgent: "node.js" }));

polyfill(
  "window.innerWidth",
  () => (typeof process !== "undefined" && process.env.WINDOW_WIDTH) || 800,
);

polyfill(
  "window.innerHeight",
  () => (typeof process !== "undefined" && process.env.WINDOW_HEIGHT) || 600,
);

polyfill("window.performance", () => {
  Object.defineProperty(window, "performance", { now: () => Date.now() });
});

polyfill("Worker", () => class Worker {});

polyfill(
  "requestAnimationFrame",
  () =>
    function requestAnimationFrame(fn) {
      return setTimeout(fn, 1000 / 60);
    },
);

polyfill(
  "cancelAnimationFrame",
  () =>
    function cancelAnimationFrame(fn) {
      return clearTimeout(fn);
    },
);

polyfill("window.requestAnimationFrame", () => requestAnimationFrame);

polyfill("window.cancelAnimationFrame", () => cancelAnimationFrame);

globalThis.addEventListener = document.addEventListener.bind(document);

globalThis.removeEventListener = document.removeEventListener.bind(document);
