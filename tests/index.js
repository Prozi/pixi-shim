const PIXI = require("..");

const app = new PIXI.Application();

console.log({ "PIXI.Application": !!app });

const bunny = "https://pixijs.io/examples/examples/assets/bunny.png";
const sprite = PIXI.Sprite.from(bunny);

console.log({ "PIXI.Sprite.from": !!sprite });

app.stage.addChild(sprite);
app.render();

const base64 = app.view.toDataURL("png", 1);

console.log({ toDataURL: base64 !== "data:," });

// FPS Test
app.ticker.add(gameLoop);

setTimeout(() => {
  console.log({ FPS: sprite.x.toFixed(2) });
  global.process.exit(0);
}, 1000);

function gameLoop(delta) {
  sprite.x += 1 + delta;
  //The `delta` value represents the amount of fractional lag between frames.
  //You can optionally add it to the cat's position, to make the cat's animation
  //independent of the frame rate. Whether or not you choose to add it is largely an
  //aestheic choice, and the difference in the effect will only really be noticable
  //if your animation is struggling to keep up with a consistent 60 frames per second
  //display rate.
}
