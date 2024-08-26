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
  coins = new Coins();
  collectBottleSound = new Audio("./audio/collect_bottle.mp3");
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
      this.checkThrowObjects();
      
    }, 1000 / 60);
  }

  checkThrowObjects() {
    if (this.keyboard.D && this.canThrowBottle && this.statusBarBottle.bottles > 0) {
      
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
      this.statusBarBottle.setBottles(this.statusBarBottle.bottles - 1);
      console.log("Bottle thrown. Remaining bottles:", this.statusBarBottle.bottles);
      this.canThrowBottle = false;
    }
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

  collectBottle() {
    if (!this.collectBottleSound.paused) {
      this.collectBottleSound.pause();
    }
    this.collectBottleSound.currentTime = 0; // Reset the sound to the beginning

    this.level.groundBottles.forEach((bottle, bottleIndex) => {
      if (this.character.isColliding(bottle)) {
        this.level.groundBottles.splice(bottleIndex, 1);
        this.statusBarBottle.setBottles(this.statusBarBottle.bottles + 1);
        console.log("Bottle count after update:", this.statusBarBottle.bottles);
        this.collectBottleSound.play();
      }
    });
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
