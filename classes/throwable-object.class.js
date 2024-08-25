class ThrowableObject extends MovableObject {
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  flying_bottle = new Audio("./audio/flying_bottle.mp3");

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
    this.flying_bottle.volume = 0.2;
    this.flying_bottle.play();
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 20);
  }


  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_ROTATION);
    }, 1000 / 60);
  }

}
