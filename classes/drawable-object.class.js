/**
 * Represents an object that can be drawn on a canvas.
 */
class DrawableObject {
  /**
   * The image element used for drawing the object.
   * @type {HTMLImageElement}
   */
  img;

  /**
   * Cache for images to optimize loading and reuse.
   * @type {Object.<string, HTMLImageElement>}
   */
  imageCache = {};

  /**
   * The index of the current image in the animation sequence.
   * @type {number}
   */
  currentImage = 0;

  /**
   * The x-coordinate position of the object.
   * @type {number}
   */
  x = 120;

  /**
   * The y-coordinate position of the object.
   * @type {number}
   */
  y = 50;

  /**
   * The height of the object.
   * @type {number}
   */
  height = 150;

  /**
   * The width of the object.
   * @type {number}
   */
  width = 100;

  /**
   * Loads an image and assigns it to the object.
   * 
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
      this.img = new Image();
      this.img.src = path;
  }

  /**
   * Draws the object on the provided canvas context.
   * 
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
      try {
          ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      } catch (e) {
          console.warn('Error loading image', e);
          console.log('Could not load image', this.img.src);
      }
  }

  /**
   * Loads multiple images and caches them for future use.
   * 
   * @param {string[]} arr - An array of image file paths.
   */
  loadImages(arr) {
      arr.forEach((path) => {
          let img = new Image();
          img.src = path;
          this.imageCache[path] = img;
      });
  }
}