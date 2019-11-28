if (!global.window) {
  console.log("pixi-shim ❤️ window + DOM");

  require("jsdom-global")();
}
