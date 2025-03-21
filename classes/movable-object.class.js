/**
 * Represents a movable object in the game.
 * @extends DrawableObject
 */
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
  speedY = 0;
  acceleration = 1.8;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };
  lastHit = 0;
  theme_song;

  constructor() {
    super();
    this.hurtSound = new Audio("./audio/hurt.mp3");
    this.win_sound = new Audio("./audio/win.mp3");
    this.lost_sound = new Audio("./audio/lost.mp3");
    sounds.push(this.hurtSound, this.win_sound, this.lost_sound);
  }

  /**
   * Applies gravity to the object.
   */
  applyGravity() {
    this.gravityInterval = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 30);
  }

  /**
   * Checks if the object is above ground.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 160;
    }
  }

  /**
   * Loads an image from a given path.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the object on the canvas context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Checks if the object is colliding with another object.
   */
  isColliding(mo) {
    const isColliding =
      this.x + this.width - this.offset.right >= mo.x + mo.offset.left &&
      this.x + this.offset.left <= mo.x + mo.width - mo.offset.right &&
      this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top &&
      this.y + this.offset.top <= mo.y + mo.height - mo.offset.bottom;

    return isColliding;
  }

  /**
   * Handles the hit logic for the object.
   */
  hit() {
    if (this.isAboveGround()) {
      setTimeout(() => {
        if (this.character > 160) {
          this.hurtSound.pause(); 
          this.hurtSound.currentTime = 0;
        }
      }, 50);
    } else {
      this.hurtSound.play();
      this.energy = Math.max(this.energy - 10, 0);
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Handles the hit logic for the end boss.
   */
  endBossHit() {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object is hurt.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // 
    timePassed = timePassed / 500; 
    return timePassed < 1;
  }

  /**
   * Checks if the object is dead.
   */
  isDead() {
    if (this.energy === 0) {
      this.world.theme_song.pause();
      this.isCharackterDead();
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

  isCharackterDead() {
    closeFullscreen();
    hideIconsCanvas();
    hideMobileControls();
    this.lost_sound.play();
    document.getElementById("canvas").classList.add("fade-out");
  }

  /**
   * Checks if the end boss is dead.
   */
  isDeadBoss() {
    if (world.endBossCollision.energy === 0) {
      this.isDeadBossDead();
      setTimeout(() => {
        document.getElementById("game-win").classList.remove("d-none");
        document.getElementById("canvas").classList.add("d-none");
      }, 2000);

      return true;
    }
    return false;
  }

  /**
   * Handles the end boss death logic.
   */
  isDeadBossDead() {
    clearInterval(this.alive);
    closeFullscreen();
    this.win_sound.play();
    this.deadAnimate();
    stopGame();
    hideIconsCanvas();
    hideMobileControls();
  }

  /**
   * Loads images from an array of paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Plays an animation from an array of images.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Moves the object to the right.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the object jump.
   */
  jump() {
    this.speedY = 30;
  }

  /**
   * Sets the image to the dead chicken image.
   */
  chickenDead() {
    this.img.src = this.DEAD_CHICKEN;
  }
}
