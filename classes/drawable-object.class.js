class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
 
  x = 120;
  y = 50;
  height = 150;
  width = 100;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  drawFrame(ctx) {
    if (
      this instanceof Charackter ||
      this instanceof Chicken ||
      this instanceof Endboss ||
      this instanceof SmallChicken
    ) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "red";
      ctx.rect(this.x - 5, this.y - 5, this.width + 10, this.height + 10);
      ctx.stroke();
    }
  }

  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (e) {
      console.warn('Error loading image', e);
      console.log('Could not load image', this.img.src);
    }
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

}
