
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

## Installation

This depends on `node-canvas` library, so you can read the official guide:

https://github.com/Automattic/node-canvas/wiki

## Troubleshooting (Windows)

Install: https://chocolatey.org/

```bash
choco install -y python2 gtk-runtime microsoft-build-tools libjpeg-turbo
```

Find and install those:

* Microsoft Build Tools

* Windows SDK (Software Development Kit)

* Universal C Runtime
