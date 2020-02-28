console.log('pixi-shim ❤️ browser environment')

if (!window.PIXI) {
    console.log('pixi-shim ❤️ PIXI.js')

    window.PIXI = require('pixi.js')
}
