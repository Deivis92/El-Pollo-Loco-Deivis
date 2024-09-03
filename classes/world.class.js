class World {
  character = new Charackter();

 level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBarBottle = new StatusBarBottle();
  statusBar = new StatusBar();
  statusCoins = new StatusBarCoins();
  groundBottles = new GroundBottles();
  statusBarEndboss = new StatusBarEndboss();
  endBossCollision = new Endboss();
  coins = new Coins();
  collect_bottle_sound = new Audio("./audio/collect_bottle.mp3");
  collect_coin_sound = new Audio("./audio/collect_coin.mp3");
  throwableObjects = [];
  canThrowBottle = true;
  allIntervals = [];

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;

    this.draw();
    this.setWorld();
    this.checkCollisions();
    this.collectBottle();
    this.lastCollisionTime = 0; // To track the last time energy was reduced
    this.collisionCooldown = 500; // Cooldown period in milliseconds
    this.lastCollisionTimeEndBoss = 0; // To track the last time energy was reduced
    this.collisionCooldownEndBoss = 300; // Cooldown period in milliseconds
    this.run();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    let worldInterval1 = setInterval(() => {
      intervalIDs.push(worldInterval1);
      // check colisions
      this.checkCollisions();
      this.collectBottle();
      this.collectCoins();
      this.collisionBottle();
      this.checkThrowObjects();
      this.bottleOnGround();
      this.checkCollisionEndboss();
      this.collisionBottleEndboss();
      
    }, 1000 / 60);
  }

  bottleOnGround() {
    this.throwableObjects.forEach((throwableObject, bottleIndex) => {
      if (throwableObject.y >= 360) {
        setTimeout(() => {
          this.removeBottle(bottleIndex);
        }, 1000 / 3);
      }
    });
  }

  checkThrowObjects() {
    if (
      this.keyboard.D &&
      this.canThrowBottle &&
      this.statusBarBottle.bottles > 0
    ) {
      let bottle;

      // Check the character's direction and set the position accordingly
      if (this.character.otherDirection) {
        bottle = new ThrowableObject(
          this.character.x - 40, // Throw to the left
          this.character.y + 100
        );
      } else {
        bottle = new ThrowableObject(
          this.character.x + 100, // Throw to the right
          this.character.y + 100
        );
      }

      this.throwableObjects.push(bottle);
      this.statusBarBottle.setBottles(this.statusBarBottle.bottles - 1);
      this.canThrowBottle = false;
    }

    // Reset the throwing ability when the D key is released
    if (!this.keyboard.D) {
      this.canThrowBottle = true;
    }
  }

  checkCollisions() {
    const currentTime = Date.now();

    this.level.enemies.forEach((enemy, enemyIndex) => {
      if (this.character.isColliding(enemy)) {
        if (this.character.isAboveGround() && this.character.speedY < 0) {
          enemy.chickenDead = true;
          this.character.speedY = 20;

          setTimeout(() => {
            this.level.enemies.splice(enemyIndex, 1);
          }, 200);
        } else {
          // Check if enough time has passed since last collision
          if (currentTime - this.lastCollisionTime >= this.collisionCooldown) {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
            this.lastCollisionTime = currentTime; // Update last collision time
          }
        }
      }
    });
  }

  // endboss starts here
  checkCollisionEndboss() {
    const currentTime = Date.now();

    if (this.character.isColliding(this.endBossCollision)) {
      // Check if enough time has passed since the last collision with the end boss
      if (
        currentTime - this.lastCollisionTimeEndBoss >=
        this.collisionCooldownEndBoss
      ) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
        console.log("endboss collision");

        // Update last collision time
        this.lastCollisionTimeEndBoss = currentTime;
      }
    }
  }

  collisionBottleEndboss() {
    this.throwableObjects.forEach((throwableObject, bottleIndex) => {
      if (throwableObject.isColliding(this.endBossCollision)) {
        if (throwableObject.isAboveGround() && throwableObject.speedY < 0) {
          // endBoss.isDead = true;  // Mark the end boss as dead
          throwableObject.speedY = 0;
          this.removeBottle(bottleIndex);
          console.log("End boss dead");
          this.endBossCollision.endBossHit();
          console.log("End boss energy:", this.endBossCollision.energy);
          this.statusBarEndboss.setPercentage(this.endBossCollision.energy);
          this.endBossCollision.lastHit = new Date().getTime();
        }
      }
    });
  }

  // endboss ends here

  // bottle

  collisionBottle() {
    this.level.enemies.forEach((enemy, enemyIndex) => {
      this.throwableObjects.forEach((throwableObject, bottleIndex) => {
        if (throwableObject.isColliding(enemy)) {
          if (throwableObject.isAboveGround() && throwableObject.speedY < 0) {
            enemy.chickenDead = true;
            throwableObject.speedY = 0;
            this.removeBottle(bottleIndex);
            console.log("Enemy dead");

            setTimeout(() => {
              this.level.enemies.splice(enemyIndex, 1);
            }, 200);
          }
        }
      });
    }); // Added missing closing parenthesis and curly brace
  }

  removeBottle(index) {
    this.throwableObjects.splice(index, 1);
  }

  // bottle ends

  collectBottle() {
    if (this.statusBarBottle.bottles >= 10) {
      return; // Stop further collection if the bottle count exceeds 5
    }
    this.level.groundBottles.forEach((bottle, bottleIndex) => {
      if (this.character.isColliding(bottle)) {
        this.level.groundBottles.splice(bottleIndex, 1); // Remove the collected bottle
        this.statusBarBottle.setBottles(this.statusBarBottle.bottles + 1); // Update the bottle count

        // Play sound if it's not currently playing
        if (!this.collect_bottle_sound.isPlaying) {
          this.handleCollectBottleSound();
        }
      }
    });
  }

  handleCollectBottleSound() {
    this.collect_bottle_sound.isPlaying = true;
    this.collect_bottle_sound.play();

    // Reset the flag when the sound ends
    this.collect_bottle_sound.onended = () => {
      this.collect_bottle_sound.isPlaying = false;
    };
  }

  collectCoins() {
    let shouldPlaySound = false;

    this.level.coins.forEach((coin, coinIndex) => {
      if (this.character.isColliding(coin)) {
        this.level.coins.splice(coinIndex, 1);
        this.statusCoins.setCoins(this.statusCoins.coins + 1);
        shouldPlaySound = true; // Set the flag to play sound
      }
    });

    if (shouldPlaySound && this.collect_coin_sound.paused) {
      this.collect_coin_sound.play();
      this.collect_coin_sound.volume = 0.2; // Play sound only once
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectToMap(this.level.backgroundObjects);
    this.addObjectToMap(this.level.clouds);
    this.addObjectToMap(this.level.groundBottles);
    this.addObjectToMap(this.level.endBoss);
    this.addObjectToMap(this.level.coins);

    this.ctx.translate(-this.camera_x, 0);
    // Space for fixed objects
   
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusCoins);
    this.addToMap(this.statusBarEndboss);
    this.addToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectToMap(this.level.enemies);
    this.addObjectToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);

    // Draw() wird immer wieder aufgerufen
    self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    // mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
