if (!global.Image) {
  console.log("pixi-shim ❤️ image");

  require("jsdom-global")();

  // Node canvas Image's dont currently have `addEventListener` so we fake it for now.
  // We can always make updates to the node-canvas lib
  Object.defineProperty(
    global.Image.prototype,
    "addEventListener",
    function addEventListener(event, callback) {
      const image = this;

      switch (event) {
        case "error":
          image.onerror = function() {
            image.onerror = null;
            image.onload = null;
            callback.call(image);
          };
          break;

        case "load":
          image.onload = function() {
            image.onerror = null;
            image.onload = null;
            callback.call(image);
          };
          break;
      }
    }
  );

  Object.defineProperty(
    global.Image.prototype,
    "removeEventListener",
    function removeEventListener() {}
  );

  Object.defineProperty(
    global.Image.prototype,
    "fillRect",
    function fillRect() {}
  );
}
