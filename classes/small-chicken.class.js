/**
 * Represents a small chicken in the game.
 * @extends MovableObject
 */
class SmallChicken extends MovableObject {
  y = 370;
  height = 56;
  width = 38;
  chickenDead = false;
  speedRight;
  speedLeft;
  movingRight = false;
  offset = {
    top: 0,
    bottom: 0,
    left: 25,
    right: 25,
  };

  IMAGES_WALKING_SMALL = [
    "./img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  DEAD_SMALL_CHICKEN = [
    "./img/3_enemies_chicken/chicken_small/2_dead/dead.png",
  ];

  smallChickenDeadSound;
  soundPlayed = false;

  /**
   * Creates an instance of SmallChicken.
   */
  constructor() {
    super();
    this.smallChickenDeadSound = new Audio("./audio/small_chicken_dead.mp3");
    this.smallChickenDeadSound.volume = 1;
    sounds.push(this.smallChickenDeadSound);
    this.loadImage("./img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING_SMALL);
    this.loadImages(this.DEAD_SMALL_CHICKEN);
    this.x = 400 + Math.random() * 1500;
    this.speedRight = 0.15 + Math.random() * 0.5;
    this.speedLeft = 0.15 + Math.random() * 0.5;
    this.animate();
  }

  /**
   * Starts the animations for movement and state.
   */
  animate() {
    this.startMovementAnimation();
    this.startStateAnimation();
  }

  /**
   * Starts the movement animation loop.
   */
  startMovementAnimation() {
    let smallChickenInterval = setInterval(() => {
      intervalIDs.push(smallChickenInterval);
      this.handleMovement();
    }, 1000 / 60);
  }

  /**
   * Handles the movement of the chicken, switching direction as needed.
   */
  handleMovement() {
    if (this.movingRight) {
      this.handleMovementRight();
    } else {
      this.handleMovementLeft();
    }
  }

  /**
   * Handles the movement of the chicken to the right.
   * If the chicken reaches the edge of its movement area, it changes direction.
   */
  handleMovementRight() {
    if (this.x >= 2300) {
      this.movingRight = false;
      this.otherDirection = false;
    } else {
      this.moveRight();
      this.otherDirection = true;
    }
  }

  /**
   * Handles the movement of the chicken to the left.
   * If the chicken reaches the edge of its movement area, it changes direction.
   */
  handleMovementLeft() {
    if (this.x <= 100) {
      this.movingRight = true;
      this.otherDirection = true;
    } else {
      this.moveLeft();
      this.otherDirection = false;
    }
  }

  /**
   * Starts the state animation loop.
   */
  startStateAnimation() {
    let smallChickenInterval2 = setInterval(() => {
      intervalIDs.push(smallChickenInterval2);
      this.handleStateAnimation();
    }, 200);
  }

  /**
   * Handles the animation based on the chicken's state (alive or dead).
   */
  handleStateAnimation() {
    if (!this.chickenDead) {
      this.handleChickenAlive();
    } else {
      this.handleChickenDead();
    }
  }

  /**
   * Moves the chicken to the right.
   */
  moveRight() {
    this.x += this.speedRight;
  }

  /**
   * Moves the chicken to the left.
   */
  moveLeft() {
    this.x -= this.speedLeft;
  }

  /**
   * Handles the animation and sound for when the chicken is alive.
   */
  handleChickenAlive() {
    this.playAnimation(this.IMAGES_WALKING_SMALL);
    this.smallChickenDeadSound.pause();
    this.smallChickenDeadSound.currentTime = 0;
    this.soundPlayed = false;
  }

  /**
   * Handles the animation and sound for when the chicken is dead.
   */
  handleChickenDead() {
    this.playAnimation(this.DEAD_SMALL_CHICKEN);

    if (!this.soundPlayed) {
      this.smallChickenDeadSound.volume = 0.2;
      this.smallChickenDeadSound.play();
      this.soundPlayed = true;
    }
  }
}
