class Chicken extends MovableObject {
  y = 360;
  height = 70;
  width = 50;
  chickenDead = false;
  speedRight;  // Speed when moving right
  speedLeft;   // Speed when moving left
  movingRight = false;  // Direction state
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
    this.x = 300 + Math.random() * 1500; // Random start position
    this.speedRight = 0.15 + Math.random() * 0.5;
    this.speedLeft = 0.15 + Math.random() * 0.5;
    this.animate();
  }

  animate() {
    this.startMovementAnimation();
    this.startStateAnimation();
  }

  startMovementAnimation() {
    setInterval(() => {
      this.handleMovement();
    }, 1000 / 60); // 60 FPS
  }

  handleMovement() {
    if (this.movingRight) {
      if (this.x >= 2300) {
        this.movingRight = false; // Switch direction to left
        this.otherDirection = false; // Set to true for flipping
      } else {
        this.moveRight();
        this.otherDirection = true;
      }
    } else {
      if (this.x <= 100) { // Change this value as needed for the left boundary
        this.movingRight = true; // Switch direction to right
        this.otherDirection = true; // Reset to false for normal direction
      } else {
        this.moveLeft();
        this.otherDirection = false;
      }
    }
  }

  startStateAnimation() {
    setInterval(() => {
      this.handleStateAnimation();
    }, 200); // Animation frame rate for state changes
  }

  handleStateAnimation() {
    if (!this.chickenDead) {
      this.handleChickenAlive();
    } else {
      this.handleChickenDead();
    }
  }

  moveRight() {
    this.x += this.speedRight; // Move right with speedRight
  }

  moveLeft() {
    this.x -= this.speedLeft; // Move left with speedLeft
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
