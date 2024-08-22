class SmallChicken extends MovableObject {
  y = 370;
  height = 56;
  width = 38;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  IMAGES_WALKING_SMALL = [
    "./img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/3_w.png"
  ];

  DEAD_SMALL_CHICKEN = "./img/3_enemies_chicken/chicken_small/2_dead/dead.png";

  constructor() {
    super().loadImage("./img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING_SMALL);
    this.x = this.x = 150 + Math.random() * 500;
    this.speed = this.speed = 0.15 + Math.random() * 0.5;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60); // orginal 1000 / 60

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING_SMALL);
    }, 200);
  }
}
