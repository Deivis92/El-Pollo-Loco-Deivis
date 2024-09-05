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
  gravityInterval;
  energy = 100;
  audioManager = new AudioManager();
  speedY = 0;
  acceleration = 2.5;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
  lastHit = 0;


  

  applyGravity() {
    this.gravityInterval = setInterval(() => {
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
  //// Working on Bottle

  //end of bottle

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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
    if (this.isAboveGround()) {
      setTimeout(() => {
        if (this.character > 160) {
          // Use the appropriate method to check if the sound is playing
          this.audioManager.stopSound("hurt_sound");
        }
      }, 50);
    } else {
      this.audioManager.playSound("hurt_sound");
      this.energy = Math.max(this.energy - 5, 0);
      this.lastHit = new Date().getTime();
    }
  }

  endBossHit() {
    this.energy -= 20;
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
    if (this.energy === 0) {
      hideIconsCanvas();
      hideMobileControls();
      // Start the fade-out animation for the canvas
      document.getElementById("canvas").classList.add("fade-out");

      // Wait 1 second (1000 milliseconds) for the canvas animation to complete
      setTimeout(() => {
        // Hide the canvas after the animation
        document.getElementById("canvas").classList.add("d-none");

        // Start the fade-in animation for the game-over screen
        document.getElementById("game-over").classList.remove("d-none");
        document.getElementById("game-over").classList.add("fade-in");

        // Stop the game
        stopGame();
      }, 1000); // Duration of the fade-out animation

      return true; // Indicate that the character is dead
    }
    return false; // Indicate that the character is not dead
  }
  isDeadBoss() {
    if (world.endBossCollision.energy === 0) {
      clearInterval(this.alive);
      this.deadAnimate();
      stopGame();
      hideIconsCanvas();

      hideMobileControls();

      setTimeout(() => {
        document.getElementById("game-win").classList.remove("d-none");
        document.getElementById("canvas").classList.add("d-none");
      }, 2000);

      return true;
    }
    return false;
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
