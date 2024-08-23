class SmallChicken extends MovableObject {
  y = 370;
  height = 56;
  width = 38;
  chickenDead = false;
  offset = {
    top: -40,
    bottom: 0,
    left: 20,
    right: 20,
  };

  IMAGES_WALKING_SMALL = [
    "./img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  DEAD_SMALL_CHICKEN = [
    "./img/3_enemies_chicken/chicken_small/2_dead/dead.png",
  ];

  small_chicken_dead = new Audio("./audio/small_chicken_dead.mp3");

  constructor() {
    super().loadImage("./img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING_SMALL);
    this.loadImages(this.DEAD_SMALL_CHICKEN);
    this.x = 300 + Math.random() * 1500;
    this.speed = this.speed = 0.15 + Math.random() * 0.5;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      if (this.chickenDead === false) {
        this.handleChickenAlive();
      } else if (this.chickenDead === true) {
        this.handleChickenDead();
      }
    }, 200);
  }

  handleChickenAlive() {
    this.playAnimation(this.IMAGES_WALKING_SMALL);
    this.small_chicken_dead.pause();
    this.soundPlayed = false;
  }

  handleChickenDead() {
    this.playAnimation(this.DEAD_SMALL_CHICKEN);

    if (!this.soundPlayed) {
      this.small_chicken_dead.volume = 0.3;
      this.small_chicken_dead.play();
      this.soundPlayed = true;
    }
  }
}
