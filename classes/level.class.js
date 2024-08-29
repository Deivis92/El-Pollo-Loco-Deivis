class Level {
  enemies;
  endBoss;
  groundBottles;
  clouds;
  backgroundObjects;
  level_end_x = 2200;


  constructor(enemies, endBoss, groundBottles, clouds, backgroundObjects, coins) {
    this.enemies = enemies;
    this.endBoss = endBoss;
    this.groundBottles = groundBottles;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    
  }
}
