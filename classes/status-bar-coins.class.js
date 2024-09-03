/**
 * Represents a status bar for coins in the game, displaying the number of coins collected.
 * 
 * @extends MovableObject
 */
class StatusBarCoins extends MovableObject {
  /**
   * The number of coins currently collected.
   * @type {number}
   */
  coins = 0;

  /**
   * Array of image paths representing different coin status levels.
   * @type {string[]}
   */
  IMAGES_COINBAR = [
      "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
      "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
      "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
      "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
      "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
      "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  /**
   * Creates an instance of the StatusBarCoins.
   * Initializes the status bar with the starting number of coins and sets its position.
   */
  constructor() {
      super();
      this.loadImages(this.IMAGES_COINBAR);
      this.x = 12;
      this.y = 80;
      this.width = 200;
      this.height = 50;
      this.setCoins(0);
  }

  /**
   * Updates the number of coins and sets the appropriate image for the status bar.
   * 
   * @param {number} coins - The number of coins to display.
   */
  setCoins(coins) {
      this.coins = coins;
      let path = this.IMAGES_COINBAR[this.resolveImageIndexCoins()];
      this.img = this.imageCache[path];
  }

  /**
   * Determines the index of the image to use based on the number of coins.
   * 
   * @returns {number} The index of the image corresponding to the current number of coins.
   */
  resolveImageIndexCoins() {
      if (this.coins >= 10) {
          return 5;
      } else if (this.coins >= 8) {
          return 4;
      } else if (this.coins >= 6) {
          return 3;
      } else if (this.coins >= 4) {
          return 2;
      } else if (this.coins >= 2) {
          return 1;
      } else {
          return 0;
      }
  }
}

