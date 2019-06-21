if (!global.window) {
    console.log('pixi-shim ❤️ dom')
    require('jsdom-global')()
}

if (!global.Canvas) {
    console.log('pixi-shim ❤️ canvas')
    const canvas = require('canvas')
    global.Canvas = canvas.Canvas
}

if (!global.Image) {
    console.log('pixi-shim ❤️ image')
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

    global.Image.prototype.removeEventListener = function () { }
}

if (!global.navigator) {
    console.log('pixi-shim ❤️ navigator')
    global.navigator = { userAgent: 'node.js' } // could be anything
}

if (!global.performance) {
    global.performance = {
        now: () => Date.now()
    }
}

if (!global.requestAnimationFrame) {
    global.requestAnimationFrame = global.setTimeout
}

if (!global.window.PIXI) {
    console.log('pixi-shim ❤️ pixijs')
    global.window.PIXI = require('pixi.js-legacy')
}

