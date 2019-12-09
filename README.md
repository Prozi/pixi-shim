# PIXI-SHIM

PIXI.js Back-End "shim". For using <s>Canvas</s> WebGL in Node.js with <span style="color: red">❤️</span> pixi.js

[![npm version](https://badge.fury.io/js/pixi-shim.svg)](https://badge.fury.io/js/pixi-shim) 
[![Known Vulnerabilities](https://snyk.io/test/github/Prozi/pixi-shim/badge.svg)](https://snyk.io/test/github/Prozi/pixi-shim) 
[![CircleCI](https://circleci.com/gh/Prozi/pixi-shim.svg?style=svg)](https://circleci.com/gh/Prozi/pixi-shim) 

## Purpouse

1. Designed for node - it makes you run universal javascript code that is designed with pixi.js on node.js environment

2. It is very lazy - meaning it won't load anything twice and won't attempt to load it if it's not required

3. It wont even load itself twice - while including multiple instances of pixi.js can cause `Cannot redefine property isJson` Error

## Lazy loading

with lazy loading of

* DOM
* Canvas
* WebGL
* PIXI

- `require('pixi-shim')` returns `PIXI` class just like
- `require('pixi.js')` would

## Installation

```bash
yarn add pixi-shim --save
```

## WebGL State

* Version: 2.0
* FPS: ~666
* toDataURL: not ready yet (renders transparent image)
* PIXI: implemented

## Example use (in node js env):

file1.js
```javascript
const PIXI = require('pixi-shim')
```

file2.js
```javascript
const PIXI = require('pixi-shim')
```

server.js
```javascript
require('./file1')
require('./file2')

// No runtime conflicts, all dependencies have been included once
```

## Troubleshooting

* Error: `undefined symbol: _Z15XextFindDisplayP15_XExtensionInfoP9_XDisplay`

Solution: `npm run rebuild`

More info: https://github.com/stackgl/headless-gl/issues/65

* Error: libpng12.so.0: cannot open shared object file: No such file or directory

Solution: `sudo apt install libpng-dev`

More info: https://github.com/node-gfx/node-canvas-prebuilt/issues/15

* Error: `undefined symbol: _ZN2v87Isolate19CheckMemoryPressureEv`

More info: https://github.com/Automattic/node-canvas/issues/1252

Solution: Use node >= 10

* Error: `node: cairo.c:305: cairo_destroy: Assertion '(_cairo_atomic_int_get (&(&cr->ref_count)->ref_count) > 0)' failed.`

Solution: `sudo apt-get install libcairo2-dev`

More info: https://www.cairographics.org/download/

## CI Setup

`sudo apt install libxrandr-dev libxinerama-dev libxcursor-dev libfreeimage-dev libglew-dev libxi-dev libglfw3 -y`
