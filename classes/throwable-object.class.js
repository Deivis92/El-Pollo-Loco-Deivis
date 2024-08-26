class ThrowableObject extends MovableObject {
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  splash = false;
  flyingInterval;

  flying_bottle = new Audio("./audio/flying_bottle.mp3");
  bottle_splash = new Audio("./audio/splash.mp3");

  IMAGES_ROTATION = [
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y) {
    super().loadImage("./img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 50;
    this.animate();
    this.throw();
    

    
  }

  //


checkCollisionWithEnemies(enemies) {
    for (let enemy of enemies) {
      if (this.isColliding(enemy)) {
        this.handleCollision(enemy);
        break;
      }
    }
  }

  handleCollision(enemy) {
    // Implement what happens when the bottle collides with an enemy
    this.splash = true;
    this.bottleLandet(); // Stop the bottle's movement
    enemy.takeDamage(); // Assuming the enemy has a method to take damage
  }



  //

  throw() {
 
    this.speedY = 20;
    this.applyGravity();
    this.flying_bottle.volume = 0.2;
    this.flying_bottle.play();
    this.flyingInterval = setInterval(() => {
      this.bottleGroundHit();
      if (this.splash) {
        this.bottleLandet();
      } else {
      this.x += 7;
      }
    }, 20);
  }

  bottleGroundHit() {
    if (this.y >= 360) {
      this.splash = true;
    }
  }

  bottleLandet() {
    this.bottle_splash.play();
    this.bottle_splash.volume = 0.2;  
    clearInterval(this.flyingInterval);
    clearInterval(this.gravityInterval);
  }

    

  animate() {
    setInterval(() => { 
      if (this.splash && this.isAboveGround()) {
        this.playAnimation(this.IMAGES_SPLASH);
      } else {
      this.playAnimation(this.IMAGES_ROTATION);
      }
    }, 1000 / 60);
  }
}

// Hey Developer Academy Team, danke für euren Support! //

/*
      _____
    /       \
   |  O   O  |
   |    ^    |
    \  ---  /
      -----
*/

/*
     ( (
      ) )
   ........
   |      |]
   \      /
    `----'
*/
