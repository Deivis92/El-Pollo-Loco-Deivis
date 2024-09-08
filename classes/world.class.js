/**
 * Represents the game world, including characters, status bars, and game logic.
 */
class World {
  character = new Character();
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
  endBossCollision = this.level.endBoss[0];
  coins = new Coins();
  throwableObjects = [];
  canThrowBottle = true;
  allIntervals = [];
  
  collectBottleSound;
  collectCoinSound;

  /**
   * Create an instance of the World class.
   * @param {HTMLCanvasElement} canvas - The canvas element for rendering.
   */
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.lastCollisionTime = 0;
    this.collisionCooldown = 500;
    this.lastCollisionTimeEndBoss = 0;
    this.collisionCooldownEndBoss = 300;
    this.initSounds();
    this.setWorld();
    this.draw();
    this.checkCollisions();
    this.collectBottle();
    this.run();
    this.playThemeSong();
    this.lastThrowTime = 0; // Initialize the last throw time
    this.throwCooldown = 1000; // 1 second cooldown period
    this.canThrowBottle = true;

  }
  
  /**
   * Initialize sound effects.
   */
  initSounds() {
    this.collectBottleSound = new Audio("./audio/collect_bottle.mp3");
    this.collectCoinSound = new Audio("./audio/collect_coin.mp3");
    this.hit_endboss = new Audio("./audio/hit_endboss.mp3");
    this.theme_song = new Audio("./audio/theme_song.mp3");
    sounds.push(this.collectBottleSound, this.collectCoinSound, this.hit_endboss, this.theme_song);
  }
  
  /**
   * Play the theme song.
   */
  playThemeSong() {
    this.theme_song.play();
    this.theme_song.volume = 0.2;
  }

  /**
   * Set the world context for the character.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Start the game loop.
   */
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

  /**
   * Handle the state of bottles that have fallen to the ground.
   */
  bottleOnGround() {
    this.throwableObjects.forEach((throwableObject, bottleIndex) => {
      if (throwableObject.y >= 360) {
        setTimeout(() => {
          this.removeBottle(bottleIndex);
        }, 1000 / 3);
      }
    });
  }

  /**
   * Check for throwable objects and handle their throwing.
   */
  checkThrowObjects() {
    const currentTime = Date.now(); // Get the current timestamp

    if (
      this.keyboard.D &&
      this.canThrowBottle &&
      this.statusBarBottle.bottles > 0
    ) {
      if (currentTime - this.lastThrowTime >= this.throwCooldown) {
        this.throwBottle();
        this.lastThrowTime = currentTime; // Update the last throw time
        this.canThrowBottle = false; // Prevent throwing immediately
      }
    } else if (!this.keyboard.D) {
      this.canThrowBottle = true; // Allow throwing if the key is not pressed
    }
  }

  /**
   * Throw a bottle from the character's position.
   */
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

  /**
   * Check for collisions between the character and enemies.
   */
  checkCollisions() {
    const currentTime = Date.now();

    this.level.enemies.forEach((enemy, enemyIndex) => {
      if (this.character.isColliding(enemy)) {
        this.handleCollision(enemy, enemyIndex, currentTime);
      }
    });
  }

  /**
   * Handle collision with an enemy.
   * @param {Enemy} enemy - The enemy that is colliding with the character.
   * @param {number} enemyIndex - The index of the enemy in the level's enemies array.
   * @param {number} currentTime - The current timestamp in milliseconds.
   */
  handleCollision(enemy, enemyIndex, currentTime) {
    if (this.character.isAboveGround() && this.character.speedY < 0) {
      this.killEnemy(enemy, enemyIndex);
    } else if (this.isCollisionCooldownOver(currentTime)) {
      this.handleDamage(currentTime);
    }
  }

  /**
   * Mark an enemy as dead and remove it from the level.
   * @param {Enemy} enemy - The enemy to be killed.
   * @param {number} enemyIndex - The index of the enemy in the level's enemies array.
   */
  killEnemy(enemy, enemyIndex) {
    enemy.chickenDead = true;
    this.character.speedY = 20;

    setTimeout(() => {
      this.level.enemies.splice(enemyIndex, 1);
    }, 200);
  }

  /**
   * Check if enough time has passed since the last collision.
   * @param {number} currentTime - The current timestamp in milliseconds.
   * @returns {boolean} - Whether the collision cooldown period has elapsed.
   */
  isCollisionCooldownOver(currentTime) {
    return currentTime - this.lastCollisionTime >= this.collisionCooldown;
  }

  /**
   * Handle damage to the character and update the status bar.
   * @param {number} currentTime - The current timestamp in milliseconds.
   */
  handleDamage(currentTime) {
    this.character.hit();
    this.statusBar.setPercentage(this.character.energy);
    this.lastCollisionTime = currentTime;
  }

  /**
   * Check for collisions between the character and the end boss.
   */
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

  /**
   * Handle collisions between throwable bottles and the end boss.
   */
  collisionBottleEndboss() {
    this.throwableObjects.forEach((throwableObject, bottleIndex) => {
      if (throwableObject.isColliding(this.endBossCollision)) {
        if (throwableObject.isAboveGround() && throwableObject.speedY < 0) {
          throwableObject.speedY = 0;
          this.removeBottle(bottleIndex);
          this.hit_endboss.play();
          this.endBossCollision.endBossHit();
          this.statusBarEndboss.setPercentage(this.endBossCollision.energy);
          this.endBossCollision.lastHit = new Date().getTime();
        }
      }
    });
  }

  /**
   * Handle collisions between throwable bottles and enemies.
   */
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

  /**
   * Remove a throwable bottle from the game.
   * @param {number} index - The index of the bottle to remove.
   */
  removeBottle(index) {
    this.throwableObjects.splice(index, 1);
  }

  /**
   * Handle collection of bottles by the character.
   */
  collectBottle() {
    if (this.statusBarBottle.bottles >= 10) {
      return;
    }
    this.level.groundBottles.forEach((bottle, bottleIndex) => {
      if (this.character.isColliding(bottle)) {
        this.level.groundBottles.splice(bottleIndex, 1);
        this.statusBarBottle.setBottles(this.statusBarBottle.bottles + 1);
        this.collectBottleSound.play();
      }
    });
  }

  /**
   * Handle collection of coins by the character.
   */
  collectCoins() {
    let shouldPlaySound = false;
    this.level.coins.forEach((coin, coinIndex) => {
      if (this.character.isColliding(coin)) {
        this.level.coins.splice(coinIndex, 1);
        this.statusCoins.setCoins(this.statusCoins.coins + 1);
        shouldPlaySound = true;
      }
    });
    if (shouldPlaySound) {
      this.collectCoinSound.play();
    }
  }

  /**
   * Draw all elements onto the canvas.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectToMap(this.level.backgroundObjects);
    this.addObjectToMap(this.level.clouds);
    this.collectableObjects();
    this.notMovableObjects();
    this.addToMap(this.character);
    this.enemyObjects();
    this.addObjectToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
    self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Draw all enemy objects.
   */
  enemyObjects() {
    this.addObjectToMap(this.level.endBoss);
    this.addObjectToMap(this.level.enemies);
  }

  /**
   * Draw all collectable objects.
   */
  collectableObjects() {
    this.addObjectToMap(this.level.coins);
    this.addObjectToMap(this.level.groundBottles);
  }

  /**
   * Draw all non-movable objects.
   */
  notMovableObjects() {
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusCoins);
    this.addToMap(this.statusBarEndboss);
    this.addToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0);
  }

  /**
   * Add a list of objects to the map.
   * @param {MovableObject[]} objects - The list of objects to draw.
   */
  addObjectToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Draw a movable object to the canvas.
   * @param {MovableObject} mo - The movable object to draw.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flip an image horizontally.
   * @param {MovableObject} mo - The movable object to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restore an image to its original orientation.
   * @param {MovableObject} mo - The movable object to restore.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
