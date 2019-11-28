if (!global.navigator) {
  console.log("pixi-shim ❤️ polyfill navigator");

  global.navigator = { userAgent: "node.js" }; // could be anything
}

if (!global.performance) {
  console.log("pixi-shim ❤️ polyfill performance.now");

  global.performance = {
    now: () => Date.now()
  };
}

if (!global.requestAnimationFrame) {
  console.log("pixi-shim ❤️ polyfill requestAnimationFrame");

  global.requestAnimationFrame = global.setTimeout;
}
