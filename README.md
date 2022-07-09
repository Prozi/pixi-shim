<h1 align="center">
    PIXI-SHIM
</h1>

<p align="center">
    PIXI.js Back-End "shim". For mocking Canvas in Node.js with <span style="color: red">❤️</span>
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

with lazy polyfill of

- DOM
- Window
- Canvas
- PIXI
- other polyfills (requestAnimationFrame, etc.)

## Usage

```js
require("pixi-shim");
```

## Usage if your game/app is feature-heavy:

and it still doesn't work, you might need to

```bash
$ yarn add pixi.js-legacy`
```

and then do

```js
require("pixi-shim");
require("pixi.js-legacy");
```

## Installation

```bash
$ yarn add pixi-shim
```

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

## Canvas.toDataURL()

a bit hackish but works, see:

- https://github.com/Prozi/pixi-shim/blob/master/pixi.spec.js
- https://github.com/Prozi/pixi-shim/blob/master/to-data-url.js

## Tests

```
Total test suites: 2
Passed test suites: 2
Done in 4.35s.
ites: 0

Total tests: 10
Passed tests: 10
Failed tests: 0

Test Suite - /home/pietal/projects/pixi-shim/index.spec.js
passed - GIVEN pixi-shim THEN requiring it doesnt throw error
passed - GIVEN pixi-shim THEN new PIXI.Application doesnt throw error
passed - GIVEN pixi-shim THEN new PIXI.Sprite from base64 image does *not* work
passed - GIVEN pixi-shim THEN toDataURL does *not* yet work
passed - GIVEN pixi-shim THEN normal PIXI gameLoop works

Test Suite - /home/pietal/projects/pixi-shim/pixi.spec.js
passed - GIVEN pixi-shim/pixi THEN requiring it doesnt throw error
passed - GIVEN pixi-shim/pixi THEN new PIXI.Application doesnt throw error
passed - GIVEN pixi-shim/pixi THEN new PIXI.Sprite from base64 image *should* work
passed - GIVEN pixi-shim/pixi THEN toDataURL *should* work with pixi.js
passed - GIVEN pixi-shim/pixi THEN normal PIXI gameLoop works
```

https://app.circleci.com/pipelines/github/Prozi/pixi-shim

## License

MIT (c) 2020-2022 Jacek Pietal
