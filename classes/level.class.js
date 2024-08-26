class Level {
  enemies;
  groundBottles;
  clouds;
  backgroundObjects;
  level_end_x = 2200;

  constructor(enemies, groundBottles, clouds, backgroundObjects, coins) {
    this.enemies = enemies;
    this.groundBottles = groundBottles;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
  }
}
