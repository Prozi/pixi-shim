const PIXI = require("./pixi");
const { createCanvas, loadImage, Image } = require("canvas");

// creates new PIXI.Application({ --> view <-- })
module.exports.createView = function createView(width, height) {
  const view = createCanvas(width, height, "image");

  view.addEventListener = () => null;
  view.style = {};

  return view;
};

// creates sprite from source
module.exports.createSprite = async function createSprite(source) {
  const image = await loadImage(source);
  const canvas = createCanvas(image.width, image.height, "image");
  const ctx = canvas.getContext("2d");

  ctx.drawImage(image, 0, 0);

  const baseTexture = PIXI.BaseTexture.fromBuffer(
    canvas.toBuffer(),
    canvas.width,
    canvas.height
  );
  const texture = new PIXI.Texture(baseTexture);
  const sprite = new PIXI.Sprite(texture);

  return sprite;
};

// saves view to data url
module.exports.toDataURL = function toDataURL(app) {
  const ctx = app.view.getContext("2d");

  // iterate over children
  app.stage.children.forEach((child) => {
    if (child instanceof PIXI.Sprite) {
      const buffer = child.texture.baseTexture.resource.data;
      const image = new Image(child.width, child.height);

      image.src = buffer;

      // and draw them on canvas manually
      ctx.drawImage(
        image,
        child.x - child.anchor.x * child.width,
        child.y - child.anchor.y * child.height
      );
    }
  });

  const base64 = app.view.toDataURL("image/png");

  return base64;
};
