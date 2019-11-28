console.time("pixi-shim ❤️ initialized in");

if (typeof window === "undefined") {
  require("./lib/pixi-shim-node");
} else {
  require("./lib/pixi-shim-browser");
}

console.timeEnd("pixi-shim ❤️ initialized in");

module.exports = window.PIXI;
