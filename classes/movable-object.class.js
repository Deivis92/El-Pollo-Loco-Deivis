class MovableObject extends DrawableObject {
  x = 120;
  y = 50;
  img;
  height = 150;
  width = 100;
  imageCache = {};
  currentImage = 0;
  speed = 0; // orginal 0.15
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
  energy = 100;
  lastHit = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25); // orginal 1000 / 25
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      // ThrowableObject should fall to the ground
      return true;
    } else {
      return this.y < 160; // orginal 160
    }
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (
      this instanceof Charackter ||
      this instanceof Chicken ||
      this instanceof Endboss
    ) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  // isColliding(mo) {
  //   return (
  //     this.x + this.width >= mo.x && //Checks if the right edge of the current object is to the right of or touching the left edge of mo.
  //     this.x <= mo.x + mo.width && // Checks if the left edge of the current object is to the left of or touching the right edge of mo.
  //     this.y + this.offsetY + this.height >= mo.y && //Checks if the top edge of the current object (considering an offset) is above or touching the bottom edge of mo.
  //     this.y + this.offsetY <= mo.y + mo.height // Checks if the top edge of the current object (considering an offset) is above or touching the bottom edge of mo.
  //   );
  // }

  isColliding(mo) {
    const isColliding =
      this.x + this.width - this.offset.right >= mo.x + mo.offset.left && // Right edge of the current object with offset applied is to the right of or touching the left edge of mo
      this.x + this.offset.left <= mo.x + mo.width - mo.offset.right && // Left edge of the current object with offset applied is to the left of or touching the right edge of mo
      this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top && // Bottom edge of the current object with offset applied is above or touching the top edge of mo
      this.y + this.offset.top <= mo.y + mo.height - mo.offset.bottom; // Top edge of the current object with offset applied is below or touching the bottom edge of mo
  
    if (isColliding) {
      console.log(`Collision detected!`);
      console.log(`Current object position: x=${this.x}, y=${this.y}, width=${this.width}, height=${this.height}`);
      console.log(`Other object position: x=${mo.x}, y=${mo.y}, width=${mo.width}, height=${mo.height}`);
    }
  
    return isColliding;
  }


  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // 1000ms = 1s
    timePassed = timePassed / 1000; // Sekunden

    return timePassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30; // Geschwindigkeit nach oben
  }
}
