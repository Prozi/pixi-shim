const { loadImage } = require("canvas");

// base64 pixi.js example bunny png
const bunny =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAlCAYAAABcZvm2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWNJREFUeNrsV8sNwjAMbUqBBWACxB2pQ8AKcGALTsAJuDEFB1gBhuDAuWICmICPQh01pXWdJqEFcaglRGRbfonjPLuMc+5QwhjLGEJfZusjxZOL9akZKye9G98vPMfvsAx4qBfKwfzBL9s6uUHpI6U/u7+BKGkNb/H6umtk7MczF0HyfKS4zo/k/4AgTV8DOizrqX8oECgC+MGa8lGJp9sJDiAB8nyqYoglvJOPbP97IqoATGxWVZeXJlMQwYHA3piF8wJIblOVNBBxe3TPMLoHIKtxrbS7AAbBrA4Y5NaPAXf8LjN6wKZ0RaZOnlAFZnuXInVR4FTE6eYp0olPhhshtXsAwY3PquoAJNkIY33U7HTs7hYBwV24ItUKqDwgKF3VzAZ6k8HF+B1BMF8xRJbeJoqMXHZAAQ1kwoluURCdzepEugGEImBrIADB7I4lyfbJLlw92FKE6b5hVd+ktv4vAQYASMWxvlAAvcsAAAAASUVORK5CYII=";

// just parameterless proxy
async function createImage() {
  return await loadImage(bunny);
}

// this is how to create sprite for toDataURL
async function createSprite(base64) {
  const PIXI = require("./pixi");
  const image = await createImage(base64);
  const buffer = Buffer.from(image.src, "base64");
  const baseTexture = PIXI.BaseTexture.fromBuffer(
    buffer,
    image.width,
    image.height
  );
  const texture = new PIXI.Texture(baseTexture);

  return new PIXI.Sprite(texture);
}

describe("GIVEN pixi-shim/pixi", () => {
  it("THEN requiring it doesnt throw error", () => {
    const req = () => require("./pixi");

    expect(req).not.toThrow();
  });

  it("THEN new PIXI.Application doesnt throw error", () => {
    const PIXI = require("./pixi");
    const app = () => new PIXI.Application({ preserveDrawingBuffer: true });

    expect(app).not.toThrow();
  });

  it("THEN new PIXI.Sprite from base64 image *should* work", async () => {
    const sprite = await createSprite(bunny);

    expect(sprite).toBeTruthy();
    expect(sprite.width).toBeGreaterThan(1);
    expect(sprite.height).toBeGreaterThan(1);
  });

  it("THEN toDataURL *should* work with pixi.js", (done) => {
    const PIXI = require("./pixi");
    const app = new PIXI.Application();

    createSprite(bunny).then((sprite) => {
      sprite.position.set(400, 300);
      sprite.anchor.set(0.5);

      expect(sprite.width).toBeGreaterThan(0);
      expect(sprite.height).toBeGreaterThan(0);

      app.renderer.backgroundColor = "transparent";
      app.stage.addChild(sprite);
      app.render(sprite);

      const base64 = app.view.toDataURL("image/png", 1);

      console.info(base64);

      done();
    });
  });

  it("THEN normal PIXI gameLoop works", (done) => {
    const PIXI = require("./pixi");
    const app = new PIXI.Application({ preserveDrawingBuffer: true });

    createSprite(bunny).then((sprite) => {
      app.stage.addChild(sprite);
      app.render();

      requestAnimationFrame(gameLoop);

      function gameLoop() {
        sprite.x += 1000 / 60;

        requestAnimationFrame(gameLoop);
      }

      setTimeout(() => {
        expect(sprite.x).toBeGreaterThan(0);
        done();
      }, 1000);
    });
  });
});
