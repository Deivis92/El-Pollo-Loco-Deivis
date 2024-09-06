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
  sleepTimeout = 200;

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

  animate() {
    this.setInitialVolumes();
    this.handleCharacterMovement();
    this.handleCharacterAnimation();
    this.handleCharacterSleep();
    this.handleCharacterSnore();
  }

  setInitialVolumes() {
    this.walkingSound.volume = 0.2;
    this.jumpSound.volume = 0.5; // Set volume for jump sound if needed
  }

  handleCharacterMovement() {
    let isWalking = false;
    let jumpSoundPlayed = false;
    let characterMoving = setInterval(() => {
      intervalIDs.push(characterMoving);

      if (this.handleMovement(isWalking, jumpSoundPlayed)) {
        isWalking = true;
        jumpSoundPlayed = false;
      } else {
        if (isWalking) {
          this.walkingSound.pause();
          this.walkingSound.currentTime = 0;
          isWalking = false;
        }
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.handleJump(jumpSoundPlayed);
        jumpSoundPlayed = true;
      }

      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);
  }

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

  handleWalkingSound(isWalking) {
    if (!isWalking) {
      this.walkingSound.play();
      this.snoreSound.pause();
      this.snoreSound.currentTime = 0;
    }
  }

  handleJump(jumpSoundPlayed) {
    this.jump();
    if (!jumpSoundPlayed) {
      this.jumpSound.play();
      this.snoreSound.pause();
      this.snoreSound.currentTime = 0;
    }
    this.lastMoveTime = Date.now();
  }

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

  handleWalkingAnimation() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  handleCharacterSleep() {
    let characterInterval3 = setInterval(() => {
      intervalIDs.push(characterInterval3);
      if (Date.now() - this.lastMoveTime > this.sleepTimeout) {
        this.playAnimation(this.IMAGES_SLEEPING);
      }
    }, 700);
  }

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
