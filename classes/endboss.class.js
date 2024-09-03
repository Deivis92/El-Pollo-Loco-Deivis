class Endboss extends MovableObject {
  height = 450;
  width = 300;
  y = 1;
  x = 1000; // 1000
  alive;
  speed;
  speedRight;
  speedLeft;
  hasFollowStarted = false;

  offset = {
    top: 0,
    bottom: 0,
    left: 58,
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

  constructor() {
    super().loadImage("./img/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_ATTACK);
    this.speedRight = 10;
    this.speed = 13;
    this.x = 2500; // 2500
    this.animate();

    this.monitorCharacterPosition();
  }

  monitorCharacterPosition() {
    let endBossInterval1 = setInterval(() => {
      intervalIDs.push(endBossInterval1); // Speichere die ID des Intervalls in der Variable "interval"
      if (!this.hasFollowStarted && world && world.character.x >= 2200) {
        this.hasFollowStarted = true;
        this.followPepe();
      }
    }, 100);
  }

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

  intervalForFollow() {
    let endBossInterval2 = setInterval(() => {
      intervalIDs.push(endBossInterval2);
      if (this.x > world.character.x - 25) {
        this.moveLeft();
        this.otherDirection = false;
        this.playAnimation(this.IMAGES_WALKING);
      } else if (this.x < world.character.x - 150) {
        this.moveRight();
        this.speedRight = 17;
        this.otherDirection = true;
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 1000 / 15);
  }

  animate() {
    this.alive = setInterval(() => {
      if (world && world.endBossCollision.isDeadBoss()) {
        console.log("Endboss is dead.");
       
        this.playAnimation(this.IMAGES_DEAD);
      } else if (world && world.endBossCollision.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else {
        this.playAnimation(this.IMAGES_ALERT);
      }
      // console.log("Endboss is alive.", this.alive);
    }, 400);
  }

  
}
