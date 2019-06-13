console.log('pixi-shim ❤️ browser environment')

if (!window.PIXI) {
  console.log('pixi-shim ❤️ pixijs')
  window.PIXI = require('pixi.js')
}
