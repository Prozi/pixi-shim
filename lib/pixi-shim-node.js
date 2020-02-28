require('./node/window')
require('./node/canvas')
require('./node/polyfill')

if (!window.PIXI) {
  console.log('pixi-shim ❤️ PIXI.js')

  const returnTrue = function() {
    return true
  }

  window.PIXI = require('pixi.js')
  window.PIXI.utils.isWebGLSupported = returnTrue // Here we cheat pixi.js
  window.PIXI.Renderer.prototype.resize = returnTrue
  window.PIXI.Loader.prototype.load = function load(done) {
    done(this)
  }
}
