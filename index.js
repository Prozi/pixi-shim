console.time('pixi-shim ❤️ initialized in');

module.exports = (typeof window === 'undefined') ? require('./lib/pixi-shim-node') : require('./lib/pixi-shim-browser')

console.timeEnd('pixi-shim ❤️ initialized in');

module.exports = window.PIXI
module.exports.default = module.exports
