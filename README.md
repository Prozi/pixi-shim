
# pixi.js backend shim 

for using canvas in node with pixi.js

# installation

```
yarn add pixi-shim --save
# or
# npm install pixi-shim --save
```
# purpouse

1. designed for node - it makes you run universal javascript code that is designed with pixi.js on node.js environment

2. it is very lazy - meaning it won't load anything twice and won't attempt to load it if it's not required

3. it is singleton - including multiple instances of pixi.js can cause `Cannot redefine property isJson` Error

# lazy loading

with lazy loading of

* jsdom (window, ...)
* Canvas
* Image
* PIXI (as singleton)

# returns

PIXI instance

# example use (in node js env):

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
