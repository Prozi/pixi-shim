'use strict'

if (!global.window) {
  require('jsdom-global')()  
}

if (!global.Canvas) {
  global.Canvas = require('canvas-prebuilt')
}

if (!global.Image) {
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
}

if (!global.navigator) {
  global.navigator = { userAgent: 'node.js' } // could be anything
}

if (!global.window.PIXI) {
  global.window.PIXI = require('pixi.js')
}

module.exports = global.window.PIXI

module.exports.default = module.exports
