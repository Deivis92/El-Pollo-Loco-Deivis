/**
 * Represents the end boss in the game.
 * @extends MovableObject
 */
class Endboss extends MovableObject {
  height = 450;
  width = 300;
  y = 1;
  x = 1000;
  alive;
  speed;
  speedRight;
  speedLeft;
  hasFollowStarted = false;

  offset = {
    top: 150,
    bottom: 0,
    left: 60,
    right: 50,
  };

  IMAGES_ALERT = [
    "./img/4_enemie_boss_chicken/2_alert/G5.png",
    "./img/4_enemie_boss_chicken/2_alert/G6.png",
    "./img/4_enemie_boss_chicken/2_alert/G7.png",
    "./img/4_enemie_boss_chicken/2_alert/G8.png",
    "./img/4_enemie_boss_chicken/2_alert/G9.png",
    "./img/4_enemie_boss_chicken/2_alert/G10.png",
    "./img/4_enemie_boss_chicken/2_alert/G11.png",
    "./img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "./img/4_enemie_boss_chicken/3_attack/G13.png",
    "./img/4_enemie_boss_chicken/3_attack/G14.png",
    "./img/4_enemie_boss_chicken/3_attack/G15.png",
    "./img/4_enemie_boss_chicken/3_attack/G16.png",
    "./img/4_enemie_boss_chicken/3_attack/G17.png",
    "./img/4_enemie_boss_chicken/3_attack/G18.png",
    "./img/4_enemie_boss_chicken/3_attack/G19.png",
    "./img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_WALKING = [
    "./img/4_enemie_boss_chicken/1_walk/G1.png",
    "./img/4_enemie_boss_chicken/1_walk/G2.png",
    "./img/4_enemie_boss_chicken/1_walk/G3.png",
    "./img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_HURT = [
    "./img/4_enemie_boss_chicken/4_hurt/G21.png",
    "./img/4_enemie_boss_chicken/4_hurt/G22.png",
    "./img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "./img/4_enemie_boss_chicken/5_dead/G24.png",
    "./img/4_enemie_boss_chicken/5_dead/G25.png",
    "./img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Creates an instance of the Endboss class.
   */
  constructor() {
    super().loadImage("./img/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadAllImages(); this.speed = 12;
    this.x = 2500;
    this.animate();
    this.monitorCharacterPosition();
  }

  /**
   * Loads all the images for the end boss's different states.
   * This includes images for alert, walking, attacking, hurt, and dead states.
   */
  loadAllImages() {
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_ATTACK);
  }

  /**
   * Monitors the character's position to start following when appropriate.
   */
  monitorCharacterPosition() {
    let endBossInterval1 = setInterval(() => {
      intervalIDs.push(endBossInterval1);
      if (!this.hasFollowStarted && world && world.character.x >= 2100) {
        this.hasFollowStarted = true;
        this.followPepe();
      }
    }, 100);
  }

  /**
   * Starts following the character once the condition is met.
   */
  followPepe() {
    let checkAndStart = () => {
      if (
        typeof world !== "undefined" &&
        typeof world.character !== "undefined"
      ) {
        this.intervalForFollow();
      } else {
        setTimeout(checkAndStart, 100);
      }
    };
    checkAndStart();
  }

  /**
   * Controls the following behavior of the end boss.
   */
  intervalForFollow() {
    let endBossInterval2 = setInterval(() => {
      intervalIDs.push(endBossInterval2);
      if (this.x > world.character.x - 25) {
        this.followPepeLeft();
      } else if (this.x < world.character.x - 150) {
        this.followPepeRight();
      }
    }, 1000 / 15);
  }

  /**
   * Moves the end boss to the left while following the character.
   * Updates the direction to face left and plays the walking animation.
   */
  followPepeLeft() {
    this.moveLeft();
    this.otherDirection = false;
    this.playAnimation(this.IMAGES_WALKING);
  }

  /**
   * Moves the end boss to the right while following the character.
   * Increases the speed to move faster and updates the direction to face right.
   * Plays the walking animation.
   */
  followPepeRight() {
    this.moveRight();
    this.otherDirection = true;
    this.playAnimation(this.IMAGES_WALKING);
  }

  /**
   * Starts animations for the end boss's various states.
   */
  animate() {
    this.alive = setInterval(() => {
      if (world && world.endBossCollision.isDeadBoss()) {
        // Optionally handle end boss death
      } else if (world && world.endBossCollision.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else {
        this.playAnimation(this.IMAGES_ALERT);
      }
    }, 400);
  }

  /**
   * Starts the dead animation for the end boss.
   */
  deadAnimate() {
    this.deadAnimation = setInterval(() => {
      this.playAnimation(this.IMAGES_DEAD);
    }, 100);
  }
}
