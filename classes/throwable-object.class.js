class ThrowableObject extends MovableObject {
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  splash = false;
  flyingInterval;

  

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

  constructor(x, y) {
    super().loadImage("./img/6_salsa_bottle/salsa_bottle.png");
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

  throw() {
    this.speedY = 20;
    this.applyGravity();
    this.audioManager.setVolume('flying_bottle', 0.2);
    this.audioManager.playSound('flying_bottle');

   
    const initialDirection = world.character.otherDirection;

    this.flyingInterval = setInterval(() => {
      this.bottleGroundHit();
      if (this.splash) {
        this.bottleLandet();
      } else {
        if (initialDirection) {
          this.x -= 7; 
        } else {
          this.x += 7; 
        }
      }
    }, 1000 / 50);
  }

  bottleGroundHit() {
    if (this.y >= 360) {
      this.splash = true;
    }
  }

  bottleLandet() {
    this.audioManager.playSound('bottle_splash');
    this.audioManager.setVolume('bottle_splash', 0.2);
    clearInterval(this.flyingInterval);
    clearInterval(this.gravityInterval);
  }

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
