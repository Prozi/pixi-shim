if (!global.Image) {
  console.log("pixi-shim ❤️ image");

  require("jsdom-global")();

  Object.defineProperty(
    global.Image.prototype,
    "addEventListener",
    (action, callback) => document.addEventListener(action, callback)
  );

  Object.defineProperty(
    global.Image.prototype,
    "removeEventListener",
    function removeEventListener() { }
  );

  Object.defineProperty(
    global.Image.prototype,
    "fillRect",
    function fillRect() { }
  );
}
