class Chicken extends MovableObject {
  y = 360;
  height = 70;
  width = 50;
  chickenDead = false;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  IMAGES_WALKING = [
    "./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  DEAD_CHICKEN = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  dead_chicken = new Audio("./audio/dead_chicken.mp3");

  constructor() {
    super().loadImage("./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.DEAD_CHICKEN);
    this.x = 300 + Math.random() * 1500; // orginal this.x = 350 + Math.random() * 500;
    this.speed = this.speed = 0.15 + Math.random() * 0.5; // orginal this.speed = 0.15 + Math.random() * 0.5;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60); // orginal 1000 / 60

    setInterval(() => {
      if (this.chickenDead === false) {
      this.handleChickenAlive();
      } else if (this.chickenDead === true) {
        this.handleChickenDead();
      }
    }, 200);
  }

  handleChickenAlive() {
    this.playAnimation(this.IMAGES_WALKING);
    this.dead_chicken.pause();
    this.soundPlayed = false;
  }

  handleChickenDead() {
    this.playAnimation(this.DEAD_CHICKEN);

    if (!this.soundPlayed) {
      this.dead_chicken.volume = 0.2;
      this.dead_chicken.play();
      this.soundPlayed = true;
    }
  }
}
