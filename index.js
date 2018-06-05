'use strict'

console.time('pixi-shim: initialized in');

if (typeof window === 'undefined') {

  // require once
  if (!global.window) {
    console.log('pixi-shim: polyfill dom')
    require('jsdom-global')()  
  }

  function tryCanvas(canvas) {
    try {
      return (canvas.getContext || canvas.getContext('2d'))
    } catch (err) {
      return false
    }
  }

  // test for canvas capabilities
  var canvas = document.createElement('canvas')
  if (!tryCanvas(canvas)) {
    // require once
    if (!global.Canvas) {
      console.log('pixi-shim: polyfill canvas for canvas')
      global.Canvas = require('canvas-prebuilt')
    }
  }

  if (!global.Image) {
    // this might be required for image
    if (!global.Canvas) {
      console.log('pixi-shim: polyfill canvas for image')
      global.Canvas = require('canvas-prebuilt')
    }
    global.Image = global.Canvas.Image

    // Node canvas Image's dont currently have `addEventListener` so we fake it for now.
    // We can always make updates to the node-canvas lib
    global.Image.prototype.addEventListener = function (event, fn) {
      var img = this

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
    console.log('pixi-shim: load pixijs')
    global.window.PIXI = require('pixi.js')
  }

  module.exports = global.window.PIXI
} else {

  console.warn('pixi-shim: detected browser environment')

  // require once
  if (!window.PIXI) {
    console.log('pixi-shim: load pixijs')
    window.PIXI = require('pixi.js')
  }

  module.exports = window.PIXI
}

console.timeEnd('pixi-shim: initialized in')

module.exports.default = module.exports
