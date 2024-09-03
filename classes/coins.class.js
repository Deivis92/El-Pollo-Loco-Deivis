/**
 * Represents a coin object in the game that can be animated.
 * 
 * @extends MovableObject
 */
class Coins extends MovableObject {
  /**
   * The y-coordinate position of the coin.
   * @type {number}
   */
  y = 50;

  /**
   * The height of the coin.
   * @type {number}
   */
  height = 120;

  /**
   * The width of the coin.
   * @type {number}
   */
  width = 120;

  /**
   * The index of the current image being used for animation.
   * @type {number}
   */
  currentImageIndex = 0;

  /**
   * The image element for the coin.
   * @type {HTMLImageElement}
   */
  img;

  /**
   * The offset values for collision detection.
   * @type {Object}
   * @property {number} top - The top offset.
   * @property {number} bottom - The bottom offset.
   * @property {number} left - The left offset.
   * @property {number} right - The right offset.
   */
  offset = {
      top: 0,
      bottom: 150,
      left: 0,
      right: 0,
  };

  /**
   * Array of image paths for coin animation.
   * @type {string[]}
   */
  IMAGES_COINS = ["./img/8_coin/coin_1.png", "./img/8_coin/coin_2.png"];

  /**
   * Creates an instance of the Coins.
   */
  constructor() {
      super().loadImage("./img/8_coin/coin_1.png");
      this.loadImages(this.IMAGES_COINS);
      this.playAnimation(this.IMAGES_COINS);
      this.coinsPosition();
      this.animate();
  }

  /**
   * Sets a random position for the coin within a specified range.
   */
  coinsPosition() {
      this.x = 300 + Math.random() * 1500;
      this.y = 60 + Math.random() * 100;
  }

  /**
   * Starts the animation for the coin, changing images at regular intervals.
   * Uses `setInterval` to update the animation every 500 milliseconds.
   */
  animate() {
      let coinInterval = setInterval(() => {
          intervalIDs.push(coinInterval);
          this.playAnimation(this.IMAGES_COINS);
      }, 500);
  }
}