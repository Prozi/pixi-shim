// pixi-shim.js
require('jsdom-global')()

global.Canvas = require('canvas')
global.Image = global.Canvas.Image

// Node canvas Image's dont currently have `addEventListener` so we fake it for now.
// We can always make updates to the node-canvas lib
global.Image.prototype.addEventListener = function (event, fn) {
  const img = this

  switch (event) {
    case 'error':
      img.onerror = function () {
        img.onerror = null
        img.onload = null
        fn.call(img)
      }
      break

    case 'load':
      img.onload = function () {
        img.onerror = null
        img.onload = null
        fn.call(img)
      }
      break
  }
}

global.Image.prototype.removeEventListener = function () {}
global.navigator = { userAgent: 'node.js' } // could be anything
