const PIXI = require("..");

const app = new PIXI.Application({ preserveDrawingBuffer: true });

console.log({ "PIXI.Application": !!app });
console.log({ canvas: app.view });

// const bunny = "https://pixijs.io/examples/examples/assets/bunny.png";
const bunny = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAlCAYAAABcZvm2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWNJREFUeNrsV8sNwjAMbUqBBWACxB2pQ8AKcGALTsAJuDEFB1gBhuDAuWICmICPQh01pXWdJqEFcaglRGRbfonjPLuMc+5QwhjLGEJfZusjxZOL9akZKye9G98vPMfvsAx4qBfKwfzBL9s6uUHpI6U/u7+BKGkNb/H6umtk7MczF0HyfKS4zo/k/4AgTV8DOizrqX8oECgC+MGa8lGJp9sJDiAB8nyqYoglvJOPbP97IqoATGxWVZeXJlMQwYHA3piF8wJIblOVNBBxe3TPMLoHIKtxrbS7AAbBrA4Y5NaPAXf8LjN6wKZ0RaZOnlAFZnuXInVR4FTE6eYp0olPhhshtXsAwY3PquoAJNkIY33U7HTs7hYBwV24ItUKqDwgKF3VzAZ6k8HF+B1BMF8xRJbeJoqMXHZAAQ1kwoluURCdzepEugGEImBrIADB7I4lyfbJLlw92FKE6b5hVd+ktv4vAQYASMWxvlAAvcsAAAAASUVORK5CYII=";
const image = document.createElement('img');

console.log({ image, context: app.view.getContext('webgl2') });

image.src = bunny

const sprite = PIXI.Sprite.from(bunny);

const { width, height } = sprite

console.log({ 'sprite dimensions': { width, height } })
console.log({ "PIXI.Sprite.from": !!sprite });

app.stage.addChild(sprite);
app.render()

const base64 = app.view.toDataURL("image/png", 1);

console.log({
  base64,
  toDataURL: base64 !== "data:,"
});

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
