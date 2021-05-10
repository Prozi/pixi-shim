describe("GIVEN pixi-shim", () => {
  function createImage() {
    const bunny =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAlCAYAAABcZvm2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWNJREFUeNrsV8sNwjAMbUqBBWACxB2pQ8AKcGALTsAJuDEFB1gBhuDAuWICmICPQh01pXWdJqEFcaglRGRbfonjPLuMc+5QwhjLGEJfZusjxZOL9akZKye9G98vPMfvsAx4qBfKwfzBL9s6uUHpI6U/u7+BKGkNb/H6umtk7MczF0HyfKS4zo/k/4AgTV8DOizrqX8oECgC+MGa8lGJp9sJDiAB8nyqYoglvJOPbP97IqoATGxWVZeXJlMQwYHA3piF8wJIblOVNBBxe3TPMLoHIKtxrbS7AAbBrA4Y5NaPAXf8LjN6wKZ0RaZOnlAFZnuXInVR4FTE6eYp0olPhhshtXsAwY3PquoAJNkIY33U7HTs7hYBwV24ItUKqDwgKF3VzAZ6k8HF+B1BMF8xRJbeJoqMXHZAAQ1kwoluURCdzepEugGEImBrIADB7I4lyfbJLlw92FKE6b5hVd+ktv4vAQYASMWxvlAAvcsAAAAASUVORK5CYII=";
    const image = document.createElement("img");

    image.src = bunny;

    return image;
  }

  it("THEN requiring it doesnt throw error", () => {
    const req = () => require(".");

    expect(req).not.toThrow();
  });

  it("THEN new PIXI.Application doesnt throw error", () => {
    const PIXI = require(".");
    const app = () => new PIXI.Application({ preserveDrawingBuffer: true });

    expect(app).not.toThrow();
  });

  it("THEN new PIXI.Sprite from base64 image does work", () => {
    const PIXI = require(".");
    const image = createImage()
    const sprite = PIXI.Sprite.from(image.src);
    const { width, height } = sprite;

    expect(image).toBeTruthy();
    expect(width).toBeGreaterThan(0);
    expect(height).toBeGreaterThan(0);
    expect(sprite).toBeTruthy();
  });

  it("THEN toDataURL doesnt yet work", () => {
    const PIXI = require(".");
    const app = new PIXI.Application({ preserveDrawingBuffer: true });
    const image = createImage()
    const sprite = PIXI.Sprite.from(image.src);

    app.stage.addChild(sprite);
    app.render();

    const base64 = app.view.toDataURL("image/png", 1);

    expect(base64).toBeFalsy();
  });

  it("THEN normal PIXI gameLoop works", (done) => {
    const PIXI = require(".");
    const app = new PIXI.Application({ preserveDrawingBuffer: true });
    const image = createImage()
    const sprite = PIXI.Sprite.from(image.src);

    app.stage.addChild(sprite);
    app.render()

    requestAnimationFrame(gameLoop);

    function gameLoop() {
      sprite.x += 1000 / 60;
      // console.log({ spriteX: sprite.x.toFixed(2) });

      requestAnimationFrame(gameLoop);
    }

    setTimeout(() => {
      expect(sprite.x).toBeGreaterThan(0);
      done();
    }, 1000)
  });
});
