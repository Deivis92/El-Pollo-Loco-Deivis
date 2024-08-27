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
  coins = new Coins();
  collect_bottle_sound = new Audio("./audio/collect_bottle.mp3");
  collect_coin_sound = new Audio("./audio/collect_coin.mp3");
  throwableObjects = [];
  canThrowBottle = true;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
    this.collectBottle();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      // check colisions
      this.checkCollisions();
      this.collectBottle();
      this.collectCoins();
      this.collisionBottle();
      this.checkThrowObjects();
      this.bottleOnGround();
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
    this.level.enemies.forEach((enemy, enemyIndex) => {
      if (this.character.isColliding(enemy)) {
        if (this.character.isAboveGround() && this.character.speedY < 0) {
          enemy.chickenDead = true;
          this.character.speedY = 20;

          setTimeout(() => {
            this.level.enemies.splice(enemyIndex, 1);
          }, 200);
        } else {
          this.character.hit();

          this.statusBar.setPercentage(this.character.energy);
        }
      }
    });
  }

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
    if (this.statusBarBottle.bottles >= 5) {
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
    mo.drawFrame(this.ctx);

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
