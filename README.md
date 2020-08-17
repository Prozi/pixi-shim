<h1 align="center">
    PIXI-SHIM
</h1>

<p align="center">
    PIXI.js Back-End "shim". For using <s>Canvas</s> WebGL in Node.js with <span style="color: red">❤️</span> pixi.js
</p>

<p align="center">
    <img src="https://badge.fury.io/js/pixi-shim.svg" alt="https://badge.fury.io/js/pixi-shim" />
    <img src="https://snyk.io/test/github/Prozi/pixi-shim/badge.svg" alt="https://snyk.io/test/github/Prozi/pixi-shim" />
    <img src="https://circleci.com/gh/Prozi/pixi-shim.svg?style=svg" alt="https://circleci.com/gh/Prozi/pixi-shim" />
</p>

## Purpouse

1. Designed for node - it makes you run universal javascript code that is designed with pixi.js on node.js environment

2. It is very lazy - meaning it won't load anything twice and won't attempt to load it if it's not required

3. It wont even load itself twice - while including multiple instances of pixi.js can cause `Cannot redefine property isJson` Error

## Lazy loading

with lazy loading of

- DOM
- Canvas
- WebGL
- PIXI

* `require('pixi-shim')` returns `PIXI` class just like
* `require('pixi.js')` would

## Installation

```bash
$ yarn add pixi-shim canvas@^2 --save

# in case of problems
$ npx node-gyp rebuild
```

## WebGL State

- Version: 2.0
- FPS: ~666
- toDataURL: not ready yet (renders transparent image)
- PIXI: implemented

## Example use (in node js env):

file1.js

```javascript
const PIXI = require("pixi-shim");
```

file2.js

```javascript
const PIXI = require("pixi-shim");
```

server.js

```javascript
require("./file1");
require("./file2");

// No runtime conflicts, all dependencies have been included once
```

## Current Implementation _does not load pixi_, it only shims it

- To make it work like it did before version 2.0:

```javascript
// this will make pixi-shim not shim pixi
global.window = require("pixi-shim/polyfills/window");
global.window.PIXI = true;
require("pixi-shim");

// `npm install canvas@^2 --save`
require("pixi-shim/polyfills/canvas-lib");
// `npm install gl node-addon-api node-gles --save`
require("pixi-shim/polyfills/webgl");

// now fill with what it should be
global.window.PIXI = require("pixi.js");
```

## Troubleshooting

- Error: node-gyp fails to build canvas library

Solution:

```bash
$ choco install python
$ npm install --global --production windows-build-tools --registry https://registry.npmjs.org
```

- Error: `undefined symbol: _Z15XextFindDisplayP15_XExtensionInfoP9_XDisplay`

Solution: `npm run rebuild`

More info: https://github.com/stackgl/headless-gl/issues/65

- Error: libpng12.so.0: cannot open shared object file: No such file or directory

Solution: `sudo apt install libpng-dev`

More info: https://github.com/node-gfx/node-canvas-prebuilt/issues/15

- Error: `undefined symbol: _ZN2v87Isolate19CheckMemoryPressureEv`

More info: https://github.com/Automattic/node-canvas/issues/1252

Solution: Use node >= 10

- Error: `node: cairo.c:305: cairo_destroy: Assertion '(_cairo_atomic_int_get (&(&cr->ref_count)->ref_count) > 0)' failed.`

Solution: `sudo apt install libcairo2-dev`

More info: https://www.cairographics.org/download/

- Error: `GLIBCXX_3.4.20 not found`

Solution: `sudo apt install libstdc++6`

More info: https://askubuntu.com/questions/575505/glibcxx-3-4-20-not-found-how-to-fix-this-error

## CI Setup

`sudo apt install xserver-xorg-dev libxi-dev libxext-dev libstdc++6 libxrandr-dev libxinerama-dev libxcursor-dev libfreeimage-dev libglew-dev libxi-dev libglfw3 -y`
