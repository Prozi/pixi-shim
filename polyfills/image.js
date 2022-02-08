"use strict";

if (!global.Image) {
  console.log("pixi-shim ❤️ image");

  require("jsdom-global")();

  if (!global.Image.prototype.addEventListener) {
    Object.defineProperty(
      global.Image.prototype,
      "addEventListener",
      function addEventListener(action, callback) {
        return document.addEventListener.call(this, action, callback);
      }
    );
  }

  if (!global.Image.prototype.removeEventListener) {
    Object.defineProperty(
      global.Image.prototype,
      "removeEventListener",
      function removeEventListener(action, callback) {
        return document.removeEventListener.call(this, action, callback);
      }
    );
  }

  if (!global.Image.prototype.fillRect) {
    Object.defineProperty(global.Image.prototype, "fillRect", () => {});
  }
}
