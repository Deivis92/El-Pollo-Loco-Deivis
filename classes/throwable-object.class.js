/**
 * Class representing a throwable object.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
  offset = {
    top: 0,
    bottom: 15,
    left: 0,
    right: 0,
  };

  splash = false;
  flyingInterval;

  bottleSplashSound;
  flyingBottleSound;

  IMAGES_ROTATION = [
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Create a throwable object.
   */
  constructor(x, y) {
    super().loadImage("./img/6_salsa_bottle/salsa_bottle.png");
    this.bottleSplashSound = new Audio("./audio/splash.mp3");
    this.flyingBottleSound = new Audio("./audio/flying_bottle.mp3");
    sounds.push(this.bottleSplashSound, this.flyingBottleSound);
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.animate();
    this.throw();
  }

  /**
   * Throw the object.
   */
  throw() {
    this.handleThrow();
    const initialDirection = world.character.otherDirection;
    this.flyingInterval = setInterval(() => {
      this.bottleGroundHit();
      if (this.splash) {
        this.bottleLandet();
      } else {
        this.x += initialDirection ? -7 : 7;
      }
    }, 1000 / 50);
  }

  /**
   * Handle the throw action.
   */
  handleThrow() {
    this.speedY = 20;
    this.applyGravity();
    this.flyingBottleSound.volume = isMuted ? 0 : 0.2;
    this.flyingBottleSound.muted = isMuted;
    this.flyingBottleSound.play();
  }

  /**
   * Check if the bottle has hit the ground.
   */
  bottleGroundHit() {
    if (this.y >= 360) {
      this.splash = true;
    }
  }

  /**
   * Handle the bottle landing.
   */
  bottleLandet() {
    this.bottleSplashSound.volume = isMuted ? 0 : 0.2;
    this.bottleSplashSound.muted = isMuted;
    this.bottleSplashSound.play();
    clearInterval(this.flyingInterval);
    clearInterval(this.gravityInterval);
  }

  /**
   * Trigger the splash animation and remove the object after a delay.
   */
  triggerSplashAnimation() {
    this.splash = true;
    this.playAnimation(this.IMAGES_SPLASH);
    setTimeout(() => this.remove(), 1000);
  }

  /**
   * Remove the object from the world.
   */
  remove() {
    clearInterval(this.flyingInterval);
    clearInterval(this.gravityInterval);
    // Implement removal logic, e.g., remove from the world's throwableObjects array
  }

  /**
   * Animate the object.
   */
  animate() {
    setInterval(() => {
      if (this.splash && this.isAboveGround()) {
        this.playAnimation(this.IMAGES_SPLASH);
      } else {
        this.playAnimation(this.IMAGES_ROTATION);
      }
    }, 1000 / 60);
  }
}