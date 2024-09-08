/**
 * Represents an object that can be drawn on a canvas.
 */
class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 50;
  height = 150;
  width = 100;

  /**
   * Loads an image and assigns it to the object.
   *
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the object on the provided canvas context.
   *
   */
  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (e) {
      console.warn("Error loading image", e);
      console.log("Could not load image", this.img.src);
    }
  }

  /**
   * Loads multiple images and caches them for future use.
   *
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
