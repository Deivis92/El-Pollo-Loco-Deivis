/**
 * Represents a level in the game.
 */
class Level {
 
enemies;
endBoss;
groundBottles;
clouds;
backgroundObjects;
level_end_x = 2200;
coins;

  /**
   * Creates an instance of the Level class.
   */
  constructor(enemies, endBoss, groundBottles, clouds, backgroundObjects, coins) {
    this.enemies = enemies;
    this.endBoss = endBoss;
    this.groundBottles = groundBottles;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
  }
}