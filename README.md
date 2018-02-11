
# pixi.js backend shim 

for using canvas in node with pixi.js
(and maybe tiled-utils)

with lazy loading of

* jsdom (window, ...)
* Canvas
* Image
* PIXI (as singleton)

returns PIXI instance

example use (in node js env):
```javascript
// file1.js
const PIXI = require('pixi-shim')
...

// file2.js
const PIXI = require('pixi-shim')
...

// server.js
require('./file1')
require('./file2')
// no runtime conflicts, all dependencies have been included once
```

