class SmallChicken extends MovableObject {
  y = 370;
  height = 56;
  width = 38;
  chickenDead = false;
  speedRight;  // Speed when moving right
  speedLeft;   // Speed when moving left
  movingRight = false; // Start by moving left
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
    this.x = 300 + Math.random() * 1500; // Random start position
    this.speedRight = 0.15 + Math.random() * 0.5; // Adjusted speed range
    this.speedLeft = 0.15 + Math.random() * 0.5;  // Adjusted speed range
    this.animate();
  }

  animate() {
    this.startMovementAnimation();
    this.startStateAnimation();
  }

  startMovementAnimation() {
    let smallChickenInterval =  setInterval(() => {
      intervalIDs.push(smallChickenInterval);
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
    let smallChickenInterval2 = setInterval(() => {
      intervalIDs.push(smallChickenInterval2);
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
