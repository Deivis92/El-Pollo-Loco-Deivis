class World {
  character;
  audioManager;
  // chicken;
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBarBottle = new StatusBarBottle();
  audioManager = new AudioManager();
  statusBar = new StatusBar();
  statusCoins = new StatusBarCoins();
  groundBottles = new GroundBottles();
  statusBarEndboss = new StatusBarEndboss();
  endBossCollision = this.level.endBoss[0];
  coins = new Coins();

  throwableObjects = [];
  canThrowBottle = true;
  allIntervals = [];

  constructor(canvas) {
    this.audioManager = new AudioManager(); // Create AudioManager in constructor
    this.character = new Character(this.audioManager);
    // this.chicken = new Chicken(this.audioManager);
    
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
    this.checkCollisions();
    this.collectBottle();
    this.lastCollisionTime = 0;
    this.collisionCooldown = 500;
    this.lastCollisionTimeEndBoss = 0;
    this.collisionCooldownEndBoss = 300;
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    let worldInterval1 = setInterval(() => {
      intervalIDs.push(worldInterval1);
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
      this.throwBottle();
    }
    if (!this.keyboard.D) {
      this.canThrowBottle = true;
    }
  }

  throwBottle() {
    const xOffset = this.character.otherDirection ? -40 : 100;
    const bottle = new ThrowableObject(
      this.character.x + xOffset,
      this.character.y + 100
    );
    this.throwableObjects.push(bottle);
    this.statusBarBottle.setBottles(this.statusBarBottle.bottles - 1);
    this.canThrowBottle = false;
  }

  checkCollisions() {
    const currentTime = Date.now();

    this.level.enemies.forEach((enemy, enemyIndex) => {
      if (this.character.isColliding(enemy)) {
        this.handleCollision(enemy, enemyIndex, currentTime);
      }
    });
  }

  handleCollision(enemy, enemyIndex, currentTime) {
    if (this.character.isAboveGround() && this.character.speedY < 0) {
      this.killEnemy(enemy, enemyIndex);
    } else if (this.isCollisionCooldownOver(currentTime)) {
      this.handleDamage(currentTime);
    }
  }

  killEnemy(enemy, enemyIndex) {
    enemy.chickenDead = true;
    this.character.speedY = 20;

    setTimeout(() => {
      this.level.enemies.splice(enemyIndex, 1);
    }, 200);
  }

  isCollisionCooldownOver(currentTime) {
    return currentTime - this.lastCollisionTime >= this.collisionCooldown;
  }

  handleDamage(currentTime) {
    this.character.hit();
    this.statusBar.setPercentage(this.character.energy);
    this.lastCollisionTime = currentTime;
  }

  checkCollisionEndboss() {
    const currentTime = Date.now();
    if (
      this.character.isColliding(this.endBossCollision) &&
      currentTime - this.lastCollisionTimeEndBoss >=
        this.collisionCooldownEndBoss
    ) {
      this.character.hit();
      this.statusBar.setPercentage(this.character.energy);
      this.lastCollisionTimeEndBoss = currentTime;
    }
  }

  collisionBottleEndboss() {
    this.throwableObjects.forEach((throwableObject, bottleIndex) => {
      if (throwableObject.isColliding(this.endBossCollision)) {
        if (throwableObject.isAboveGround() && throwableObject.speedY < 0) {
          throwableObject.speedY = 0;
          this.removeBottle(bottleIndex);
          this.endBossCollision.endBossHit();
          this.statusBarEndboss.setPercentage(this.endBossCollision.energy);
          this.endBossCollision.lastHit = new Date().getTime();
        }
      }
    });
  }

  collisionBottle() {
    this.level.enemies.forEach((enemy, enemyIndex) => {
      this.throwableObjects.forEach((throwableObject, bottleIndex) => {
        if (throwableObject.isColliding(enemy)) {
          if (throwableObject.isAboveGround() && throwableObject.speedY < 0) {
            enemy.chickenDead = true;
            throwableObject.speedY = 0;
            this.removeBottle(bottleIndex);

            setTimeout(() => {
              this.level.enemies.splice(enemyIndex, 1);
            }, 200);
          }
        }
      });
    });
  }

  removeBottle(index) {
    this.throwableObjects.splice(index, 1);
  }

  collectBottle() {
    if (this.statusBarBottle.bottles >= 10) {
      return;
    }
    this.level.groundBottles.forEach((bottle, bottleIndex) => {
      if (this.character.isColliding(bottle)) {
        this.level.groundBottles.splice(bottleIndex, 1);
        this.statusBarBottle.setBottles(this.statusBarBottle.bottles + 1);
        this.audioManager.playSound("collect_bottle_sound");
      }
    });
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
    if (shouldPlaySound) {
      this.audioManager.playSound("collect_coin_sound");
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
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusCoins);
    this.addToMap(this.statusBarEndboss);
    this.addToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectToMap(this.level.enemies);
    this.addObjectToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
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
