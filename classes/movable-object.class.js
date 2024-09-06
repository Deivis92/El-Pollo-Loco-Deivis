class MovableObject extends DrawableObject {
  x = 120;
  y = 50;
  img;
  height = 150;
  width = 100;
  imageCache = {};
  currentImage = 0;
  speed = 0;
  otherDirection = false;
  gravityInterval;
  energy = 100;
 audioManager;
  speedY = 0;
  acceleration = 2.5;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
  lastHit = 0;


  constructor(audioManager) {
    super();
    this.audioManager = audioManager; // Store the passed audioManager instance
  }



  applyGravity() {
    this.gravityInterval = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 30);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 160;
    }
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  isColliding(mo) {
    const isColliding =
      this.x + this.width - this.offset.right >= mo.x + mo.offset.left &&
      this.x + this.offset.left <= mo.x + mo.width - mo.offset.right &&
      this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top &&
      this.y + this.offset.top <= mo.y + mo.height - mo.offset.bottom;

    return isColliding;
  }

  hit() {
    if (this.isAboveGround()) {
      setTimeout(() => {
        if (this.character > 160) {
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
      document.getElementById("canvas").classList.add("fade-out");

      setTimeout(() => {
        document.getElementById("canvas").classList.add("d-none");
        document.getElementById("game-over").classList.remove("d-none");
        document.getElementById("game-over").classList.add("fade-in");
        stopGame();
      }, 1000);

      return true;
    }
    return false;
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
    this.speedY = 30;
  }

  chickenDead() {
    this.img.src = this.DEAD_CHICKEN;
  }
}
