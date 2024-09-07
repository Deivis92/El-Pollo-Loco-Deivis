/**
 * Represents a character in the game.
 * @extends MovableObject
 */
class Character extends MovableObject {
  height = 270;
  x = 120;
  width = 100;
  speed = 4;
  speedY = 0;
  walk;

  otherDirection = false;
  y = 50;
  offset = {
    top: 0,
    bottom: 40,
    left: 0,
    right: 0,
  };

  IMAGES_WALKING = [
    "./img/2_character_pepe/2_walk/W-21.png",
    "./img/2_character_pepe/2_walk/W-22.png",
    "./img/2_character_pepe/2_walk/W-23.png",
    "./img/2_character_pepe/2_walk/W-24.png",
    "./img/2_character_pepe/2_walk/W-25.png",
    "./img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "./img/2_character_pepe/3_jump/J-31.png",
    "./img/2_character_pepe/3_jump/J-32.png",
    "./img/2_character_pepe/3_jump/J-33.png",
    "./img/2_character_pepe/3_jump/J-34.png",
    "./img/2_character_pepe/3_jump/J-35.png",
    "./img/2_character_pepe/3_jump/J-36.png",
    "./img/2_character_pepe/3_jump/J-37.png",
    "./img/2_character_pepe/3_jump/J-38.png",
    "./img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "./img/2_character_pepe/5_dead/D-51.png",
    "./img/2_character_pepe/5_dead/D-52.png",
    "./img/2_character_pepe/5_dead/D-53.png",
    "./img/2_character_pepe/5_dead/D-54.png",
    "./img/2_character_pepe/5_dead/D-55.png",
    "./img/2_character_pepe/5_dead/D-56.png",
    "./img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_SLEEPING = [
    "./img/2_character_pepe/1_idle/idle/I-1.png",
    "./img/2_character_pepe/1_idle/idle/I-2.png",
    "./img/2_character_pepe/1_idle/idle/I-3.png",
    "./img/2_character_pepe/1_idle/idle/I-4.png",
    "./img/2_character_pepe/1_idle/idle/I-5.png",
    "./img/2_character_pepe/1_idle/idle/I-6.png",
    "./img/2_character_pepe/1_idle/idle/I-7.png",
    "./img/2_character_pepe/1_idle/idle/I-8.png",
    "./img/2_character_pepe/1_idle/idle/I-9.png",
    "./img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_SLEEPING_ZZZ = [
    "./img/2_character_pepe/1_idle/long_idle/I-11.png",
    "./img/2_character_pepe/1_idle/long_idle/I-12.png",
    "./img/2_character_pepe/1_idle/long_idle/I-13.png",
    "./img/2_character_pepe/1_idle/long_idle/I-14.png",
    "./img/2_character_pepe/1_idle/long_idle/I-15.png",
    "./img/2_character_pepe/1_idle/long_idle/I-16.png",
    "./img/2_character_pepe/1_idle/long_idle/I-17.png",
    "./img/2_character_pepe/1_idle/long_idle/I-18.png",
    "./img/2_character_pepe/1_idle/long_idle/I-19.png",
    "./img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  // Audio elements
  walkingSound;
  jumpSound;
  snoreSound;

  world;
  lastMoveTime = Date.now();
  sleepTimeout = 300;

  /**
   * Creates an instance of the Character class.
   */
  constructor() {
    super();
    this.walkingSound = new Audio("./audio/walk.mp3");
    this.jumpSound = new Audio("./audio/pepe_jumps.mp3");
    this.snoreSound = new Audio("./audio/pepe_snor.mp3");
    sounds.push(this.walkingSound, this.jumpSound, this.snoreSound);
    this.loadImage("./img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_SLEEPING);
    this.loadImages(this.IMAGES_SLEEPING_ZZZ);
    this.applyGravity();
    this.animate();
  }

  /**
   * Starts character animations and handles character behavior.
   */
  animate() {
    this.setInitialVolumes();
    this.handleCharacterMovement();
    this.handleCharacterAnimation();
    this.handleCharacterSleep();
    this.handleCharacterSnore();
  }

  /**
   * Sets the initial volume levels for sound effects.
   */
  setInitialVolumes() {
    this.walkingSound.volume = 0.2;
    this.jumpSound.volume = 0.5;
  }

  /**
   * Handles character movement and plays appropriate sounds.
   */
  handleCharacterMovement() {
    let isWalking = false;
    let jumpSoundPlayed = false;
    let characterMoving = setInterval(() => {
      intervalIDs.push(characterMoving);
      isWalking = this.handleMovement(isWalking, jumpSoundPlayed) ? true: (isWalking && (this.walkingSound.pause(), this.walkingSound.currentTime = 0, false));
      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.handleJump(jumpSoundPlayed);
        jumpSoundPlayed = true;
      } else if (this.isAboveGround()) {
        jumpSoundPlayed = false;
      }
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);
  }

  /**
   * Handles character movement based on keyboard input.
   * @param {boolean} isWalking - Indicates if the character is currently walking.
   * @param {boolean} jumpSoundPlayed - Indicates if the jump sound has been played.
   * @returns {boolean} - True if the character is moving, otherwise false.
   */
  handleMovement(isWalking, jumpSoundPlayed) {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
      this.handleWalkingSound(isWalking);
      this.lastMoveTime = Date.now();
      return true;
    } else if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
      this.handleWalkingSound(isWalking);
      this.lastMoveTime = Date.now();
      return true;
    }
    return false;
  }

  /**
   * Handles the walking sound effect.
   * @param {boolean} isWalking - Indicates if the character is currently walking.
   */
  handleWalkingSound(isWalking) {
    if (!isWalking) {
      this.walkingSound.play();
      this.snoreSound.pause();
      this.snoreSound.currentTime = 0;
    }
  }

  /**
   * Handles the character's jump action and plays the jump sound effect.
   * @param {boolean} jumpSoundPlayed - Indicates if the jump sound has been played.
   */
  handleJump(jumpSoundPlayed) {
    this.jump();
    if (!jumpSoundPlayed) {
      this.jumpSound.play();
      this.snoreSound.pause();
      this.snoreSound.currentTime = 0;
    }
    this.lastMoveTime = Date.now();
  }

  /**
   * Handles character animation based on the character's state.
   */
  handleCharacterAnimation() {
    let characterInterval2 = setInterval(() => {
      intervalIDs.push(characterInterval2);
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else {
        this.handleWalkingAnimation();
      }
    }, 50);
  }

  /**
   * Handles the walking animation of the character.
   */
  handleWalkingAnimation() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  /**
   * Handles the character's sleeping animation when inactive.
   */
  handleCharacterSleep() {
    let characterInterval3 = setInterval(() => {
      intervalIDs.push(characterInterval3);
      if (Date.now() - this.lastMoveTime > this.sleepTimeout) {
        this.playAnimation(this.IMAGES_SLEEPING);
      }
    }, 700);
  }

  /**
   * Handles the character's snoring animation and sound effect.
   */
  handleCharacterSnore() {
    let characterInterval4 = setInterval(() => {
      intervalIDs.push(characterInterval4);
      if (Date.now() - this.lastMoveTime > this.sleepTimeout * 25) {
        this.playAnimation(this.IMAGES_SLEEPING_ZZZ);
        this.snoreSound.play();
      }
    }, 700);
  }
}