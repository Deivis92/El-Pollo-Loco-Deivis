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
   * @param {Array<Enemy>} enemies - The enemies in the level.
   * @param {Endboss} endBoss - The end boss of the level.
   * @param {Array<GroundBottle>} groundBottles - The ground bottles in the level.
   * @param {Array<Cloud>} clouds - The clouds in the level.
   * @param {Array<BackgroundObject>} backgroundObjects - The background objects in the level.
   * @param {Array<Coin>} coins - The coins in the level.
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