# PIXI-SHIM

PIXI.js Back-End "shim". For using <s>Canvas</s> WebGL in Node.js with <span style="color: red">❤️</span> pixi.js

## purpouse

1. Designed for node - it makes you run universal javascript code that is designed with pixi.js on node.js environment

2. It is very lazy - meaning it won't load anything twice and won't attempt to load it if it's not required

3. It wont even load itself twice - while including multiple instances of pixi.js can cause `Cannot redefine property isJson` Error

## lazy loading

with lazy loading of

* DOM
* Canvas
* WebGL
* PIXI

- `require('pixi-shim')` returns `PIXI` class just like
- `require('pixi')` would

## installation

```bash
yarn add pixi-shim --save
```

## WebGL State

* Version: 2.0
* FPS: ~666
* toDataURL: not implemented
* PIXI: implemented

## example use (in node js env):

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