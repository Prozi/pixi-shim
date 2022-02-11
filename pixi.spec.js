const { createSprite, createView, toDataURL } = require("./to-data-url");

// base64 pixi.js example bunny png
const bunny =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAlCAYAAABcZvm2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWNJREFUeNrsV8sNwjAMbUqBBWACxB2pQ8AKcGALTsAJuDEFB1gBhuDAuWICmICPQh01pXWdJqEFcaglRGRbfonjPLuMc+5QwhjLGEJfZusjxZOL9akZKye9G98vPMfvsAx4qBfKwfzBL9s6uUHpI6U/u7+BKGkNb/H6umtk7MczF0HyfKS4zo/k/4AgTV8DOizrqX8oECgC+MGa8lGJp9sJDiAB8nyqYoglvJOPbP97IqoATGxWVZeXJlMQwYHA3piF8wJIblOVNBBxe3TPMLoHIKtxrbS7AAbBrA4Y5NaPAXf8LjN6wKZ0RaZOnlAFZnuXInVR4FTE6eYp0olPhhshtXsAwY3PquoAJNkIY33U7HTs7hYBwV24ItUKqDwgKF3VzAZ6k8HF+B1BMF8xRJbeJoqMXHZAAQ1kwoluURCdzepEugGEImBrIADB7I4lyfbJLlw92FKE6b5hVd+ktv4vAQYASMWxvlAAvcsAAAAASUVORK5CYII=";

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

  it("THEN toDataURL *should* work with pixi.js", async () => {
    const PIXI = require("./pixi");
    const app = new PIXI.Application({
      view: createView(320, 240),
      preserveDrawingBuffer: true,
    });

    const sprite = await createSprite(bunny);

    sprite.position.set(app.view.width / 2, app.view.height / 2);
    sprite.anchor.set(0.5);

    expect(sprite.width).toBeGreaterThan(0);
    expect(sprite.height).toBeGreaterThan(0);

    app.renderer.backgroundColor = 0xffffff;
    app.stage.addChild(sprite);
    app.render();

    const base64 = toDataURL(app);

    console.info(base64);
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
