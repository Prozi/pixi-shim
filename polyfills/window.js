"use strict";

if (!global.window) {
  console.log("pixi-shim ❤️ DOM");

  if (typeof window === "undefined") {
    require("jsdom-global")();
  }

  if (typeof window === "undefined") {
    global.window = {
      navigator: { userAgent: "node.js" },
    }; // total fallback / life for webworker
  }

  if (!window.innerWidth) {
    window.innerWidth =
      (typeof process !== "undefined" && process.env.WINDOW_WIDTH) || 800;
  }

  if (!window.innerHeight) {
    window.innerHeight =
      (typeof process !== "undefined" && process.env.WINDOW_HEIGHT) || 600;
  }

  console.log(`pixi-shim ❤️ Window ${window.innerWidth}x${window.innerHeight}`);

  global.window = window;
}
