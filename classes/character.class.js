class Charackter extends MovableObject {
  height = 270; // 270
  x = 120; // 120
  width = 100;
  speed = 4;
  speedY = 0;
  walk;
  audioManager = new AudioManager();
  otherDirection = false;
  y = 50; //original 50 // collision with chicken Y // und 103 offset bottom 13
  offset = {
    top: 0,
    bottom: 40, // passend grafik auf chicken zu springen
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

  world;
  lastMoveTime = Date.now();
  sleepTimeout = 200; // 5 seconds

  constructor() {
    super().loadImage("./img/2_character_pepe/2_walk/W-21.png");
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
    this.audioManager.setVolume("walking_sound", 0.2);
    this.audioManager.setVolume("pepe_jumps", 0.5); // Set volume for jump sound if needed
    
    let isWalking = false;
    let jumpSoundPlayed = false;
  
    let charackterMoving = setInterval(() => {
      intervalIDs.push(charackterMoving);
  
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
        if (!isWalking) {
          this.audioManager.playSound("walking_sound");
          this.audioManager.stopSound("pepe_snor"); // Stop snoring sound when moving
          isWalking = true;
        }
        this.lastMoveTime = Date.now();
        jumpSoundPlayed = false; // Reset jump sound flag when moving
      } else if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true;
        if (!isWalking) {
          this.audioManager.playSound("walking_sound");
          this.audioManager.stopSound("pepe_snor");
          isWalking = true;
        }
        this.lastMoveTime = Date.now();
        jumpSoundPlayed = false; // Reset jump sound flag when moving
      } else {
        if (isWalking) {
          this.audioManager.stopSound("walking_sound");
          isWalking = false;
        }
      }
  
      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
        if (!jumpSoundPlayed) {
          this.audioManager.playSound("pepe_jumps");
          this.audioManager.stopSound("pepe_snor");
          jumpSoundPlayed = true; // Set flag to prevent retriggering
        }
        this.lastMoveTime = Date.now();
      }
  
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);
  
    let charackterInterval2 = setInterval(() => {
      intervalIDs.push(charackterInterval2);
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.IMAGES_WALKING);
        }
      }
    }, 50);
  
    let charackterInterval3 = setInterval(() => {
      intervalIDs.push(charackterInterval3);
      if (Date.now() - this.lastMoveTime > this.sleepTimeout) {
        this.playAnimation(this.IMAGES_SLEEPING);
        
      }
    }, 700);
  
    let charackterInterval4 = setInterval(() => {
      intervalIDs.push(charackterInterval4);
      if (Date.now() - this.lastMoveTime > this.sleepTimeout * 25) {
        this.playAnimation(this.IMAGES_SLEEPING_ZZZ);
        this.audioManager.playSound("pepe_snor");
      }
    }, 700);
  }
}