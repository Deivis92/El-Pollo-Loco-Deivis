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
  hurt_sound = new Audio("./audio/hurt.mp3");

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 30); // orginal 1000 / 25
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      // ThrowableObject should fall to the ground
      return true;
    } else {
      return this.y < 160; // orginal 160 return this.y < 160; // orginal 160 } }
    }
  }
  //// Working on Bottle Gravity
  applyGravityBottle() {
    setInterval(() => {
      if (this.isAboveGroundBottle() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 30); // orginal 1000 / 25
  }

  isAboveGroundBottle() {
    return true;
  }

  //end of bottle gravity

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this instanceof Charackter) {
      // Draw red frame for Charackter
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "red";
      ctx.rect(this.x + 10, this.y + 90, this.width - 27, this.height - 100);
      ctx.stroke();
    }

    if (
      this instanceof Charackter ||
      this instanceof Chicken ||
      this instanceof Endboss
    ) {
      // Draw blue frame for Charackter, Chicken, and Endboss
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  isColliding(mo) {
    const isColliding =
      this.x + this.width - this.offset.right >= mo.x + mo.offset.left && // Right edge of the current object with offset applied is to the right of or touching the left edge of mo
      this.x + this.offset.left <= mo.x + mo.width - mo.offset.right && // Left edge of the current object with offset applied is to the left of or touching the right edge of mo
      this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top && // Bottom edge of the current object with offset applied is above or touching the top edge of mo
      this.y + this.offset.top <= mo.y + mo.height - mo.offset.bottom; // Top edge of the current object with offset applied is below or touching the bottom edge of mo

    return isColliding;
  }

  hit() {
    this.hurt_sound.play();
    if (this.isAboveGround()) {
      this.hurt_sound.pause();
      return;
    }
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
    // return this.energy == 0;
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

  chickenDead() {
    this.img.src = this.DEAD_CHICKEN;
  }
}
